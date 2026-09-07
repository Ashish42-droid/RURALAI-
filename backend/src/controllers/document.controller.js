import { supabaseAdmin } from '../config/supabase.js';
import { processMedicalDocument, readHealthCard } from '../services/ocrService.js';
import { contentHash, findFreshExtraction, createJob, processJob, getJob } from '../services/documentJobs.js';
import { logAuditEvent } from '../middleware/audit.middleware.js';
import { AADHAAR_RE, digitsOnly } from '../services/patientFields.js';

/**
 * Document upload and OCR.
 *
 * One upload may carry several files, because one document often is several
 * files: pages 1..N of a lab report, or the front and back of a prescription.
 * They are read together in a single model call so cross-page context survives.
 */

const DOC_TYPES = ['prescription', 'lab_report', 'abha_card', 'discharge_summary', 'other'];

export const uploadDocument = async (req, res) => {
  try {
    const { aadhaar_number, visit_id, document_type = 'prescription' } = req.body;

    const files = (req.files?.length ? req.files : (req.file ? [req.file] : []));
    if (!files.length) {
      return res.status(400).json({ error: 'At least one file is required.' });
    }

    const aadhaar = digitsOnly(aadhaar_number);
    if (!AADHAAR_RE.test(aadhaar)) {
      return res.status(400).json({ error: 'A 12-digit Aadhaar number is required to attach a document.' });
    }

    const kind = DOC_TYPES.includes(String(document_type).toLowerCase())
      ? String(document_type).toLowerCase()
      : 'other';

    // The patient must be on this clinic's register.
    const { data: patient } = await supabaseAdmin
      .from('patients')
      .select('aadhaar_number')
      .eq('aadhaar_number', aadhaar)
      .eq('clinic_district_id', req.user.districtId)
      .maybeSingle();
    if (!patient) return res.status(404).json({ error: 'No such patient at this clinic.' });

    /*
     * The same page, for the same patient, already read.
     *
     * Worth checking because the case it catches is the one that actually
     * happens: a health worker retries a page that looked like it failed, or
     * re-photographs one they already sent. Both halves of the key matter —
     * see findFreshExtraction for why the hash alone would be a cross-patient
     * leak rather than a cache.
     */
    const hash = contentHash(files);
    const cached = await findFreshExtraction({ patientId: aadhaar, hash });

    const writeDocumentRow = async (extraction, rawText) => {
      const { data, error } = await supabaseAdmin
        .from('patient_documents')
        .insert([{
          patient_id: aadhaar,
          visit_id: visit_id || null,
          document_type: kind,
          mime_type: files[0].mimetype,
          ocr_text: rawText || null,
          extracted_data: extraction || {},
          // Deliberately NOT verified. This row is a draft until a person
          // confirms it through /:id/verify, and neither the cache nor the
          // async path may shortcut that.
          uploaded_by: req.user.id
        }])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    };

    if (cached) {
      const doc = await writeDocumentRow(cached.extraction, cached.raw_text);
      await logAuditEvent({
        actorId: req.user.id, actorRole: req.user.role,
        action: 'DOCUMENT_UPLOADED', entityType: 'PATIENT_DOCUMENTS', entityId: doc.id,
        metadata: { document_type: kind, files: files.length, engine: cached.engine, cache: 'hit' },
        ip: req.ip
      });
      return res.status(201).json({
        cached: true,
        document: doc,
        extraction: cached.extraction,
        raw_ocr: cached.raw_text,
        engine: cached.engine,
        // Unchanged by the cache: a draft is a draft however fast it arrived.
        needs_manual_entry: false
      });
    }

    /*
     * Hand back a job id and let the operator start typing.
     *
     * The model needs 23-29 seconds and the health worker already knows the
     * patient's name and the date. Making them watch a spinner before they can
     * enter what they already know was the most wasteful thing this screen did.
     */
    const job = await createJob({ patientId: aadhaar, visitId: visit_id, kind, hash, actor: req.user });

    if (!job) {
      // The job table is unavailable. Fall back to the synchronous path rather
      // than failing the upload: slow is a worse experience, not a broken one.
      const result = await processMedicalDocument(files, kind);
      const doc = await writeDocumentRow(result.extracted_data, result.raw_text);
      await logAuditEvent({
        actorId: req.user.id, actorRole: req.user.role,
        action: 'DOCUMENT_UPLOADED', entityType: 'PATIENT_DOCUMENTS', entityId: doc.id,
        metadata: { document_type: kind, files: files.length, engine: result.ocr_engine, mode: 'sync-fallback' },
        ip: req.ip
      });
      return res.status(201).json({
        document: doc,
        extraction: result.extracted_data,
        raw_ocr: result.raw_text,
        engine: result.ocr_engine,
        files_read: result.files_read,
        confidence: result.confidence,
        needs_manual_entry: result.needs_manual_entry
      });
    }

    res.status(202).json({ job_id: job.id, status: 'queued', document_type: kind, visit_id: visit_id || null });

    // Deliberately not awaited: the response has already gone. Every failure
    // inside is handled there and lands the job in a terminal state.
    processJob({
      jobId: job.id,
      files,
      kind,
      actor: req.user,
      visitId: visit_id,
      onExtracted: async (result) => {
        const doc = await writeDocumentRow(result.extracted_data, result.raw_text);
        await logAuditEvent({
          actorId: req.user.id, actorRole: req.user.role,
          action: 'DOCUMENT_UPLOADED', entityType: 'PATIENT_DOCUMENTS', entityId: doc.id,
          metadata: { document_type: kind, files: files.length, engine: result.ocr_engine, mode: 'async' },
          ip: req.ip
        });
        return doc.id;
      }
    });
    return undefined;
  } catch (error) {
    console.error('Document upload error:', error.message);
    if (!res.headersSent) return res.status(500).json({ error: 'Document upload failed.' });
    return undefined;
  }
};

/**
 * GET /api/documents/jobs/:id
 *
 * The draft, once it is ready. Scoped to whoever asked for it — a job id is a
 * bearer token for a clinical extraction, and guessing one must not be enough
 * to read another clinic's prescription.
 */
export const getDocumentJob = async (req, res) => {
  const job = await getJob(req.params.id, req.user);
  if (!job) return res.status(404).json({ error: 'No such job.' });

  return res.json({
    job_id: job.id,
    status: job.status,
    extraction: job.extraction || null,
    raw_ocr: job.raw_text || null,
    engine: job.engine || null,
    document_id: job.document_id || null,
    visit_id: job.visit_id || null,
    error: job.error || null,
    // A timeout is not a failure the operator can do anything about except
    // type the details in, so say that rather than offering a retry loop.
    needs_manual_entry: job.status === 'timeout' || job.status === 'failed'
  });
};

/**
 * POST /api/documents/:id/verify
 *
 * Mandatory human verification. The extraction is a draft until an assistant
 * confirms it; only then is it marked verified and allowed to reach the AI
 * assessment as source data.
 */
export const verifyDocumentExtraction = async (req, res) => {
  const { corrected_data } = req.body || {};
  if (!corrected_data || typeof corrected_data !== 'object') {
    return res.status(400).json({ error: 'corrected_data is required.' });
  }

  const { data: doc } = await supabaseAdmin
    .from('patient_documents')
    .select('id, patient_id')
    .eq('id', req.params.id)
    .maybeSingle();
  if (!doc) return res.status(404).json({ error: 'No such document.' });

  const { data: patient } = await supabaseAdmin
    .from('patients')
    .select('aadhaar_number')
    .eq('aadhaar_number', doc.patient_id)
    .eq('clinic_district_id', req.user.districtId)
    .maybeSingle();
  if (!patient) return res.status(404).json({ error: 'That document belongs to another clinic.' });

  const { data, error } = await supabaseAdmin
    .from('patient_documents')
    .update({
      extracted_data: corrected_data,
      verified_by: req.user.id,
      verified_at: new Date().toISOString()
    })
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: 'The verification could not be saved.' });

  await logAuditEvent({
    actorId: req.user.id, actorRole: req.user.role,
    action: 'DOCUMENT_EXTRACTION_VERIFIED', entityType: 'PATIENT_DOCUMENTS',
    entityId: req.params.id, ip: req.ip
  });

  return res.json({ document: data, verified: true });
};

/** GET /api/documents?visit_id=... — documents attached to one visit. */
export const listDocuments = async (req, res) => {
  const { visit_id } = req.query;
  if (!visit_id) return res.status(400).json({ error: 'visit_id is required.' });

  const { data: visit } = await supabaseAdmin
    .from('visits').select('id')
    .eq('id', visit_id)
    .eq('district_id', req.user.districtId)
    .maybeSingle();
  if (!visit) return res.status(404).json({ error: 'No such visit at this clinic.' });

  const { data } = await supabaseAdmin
    .from('patient_documents')
    .select('id, document_type, extracted_data, verified_at, created_at')
    .eq('visit_id', visit_id)
    .order('created_at', { ascending: false });

  return res.json({ documents: data || [] });
};

/**
 * POST /api/documents/health-card — read a health card to pre-fill registration.
 *
 * Nothing is stored. This runs during registration, before a patient record or
 * a visit exists, and its only output is a *proposal* the operator accepts
 * field by field. Persisting an identity document read from an unverified
 * photo, against a patient who does not exist yet, would create a record
 * nobody had checked.
 *
 * The response deliberately reports which fields were rejected as well as
 * which were read. A card whose date of birth failed validation should say so
 * — silently returning three fields when the operator can see four printed on
 * the card looks like the feature half-working rather than the value being
 * refused.
 */
export const scanHealthCard = async (req, res) => {
  const files = (req.files || []).filter((f) => f?.buffer?.length);
  if (!files.length) {
    return res.status(400).json({ error: 'Attach a photo of the card.' });
  }

  let result;
  try {
    result = await readHealthCard(files);
  } catch (err) {
    console.error('health card OCR failed:', err.message);
    return res.status(502).json({ error: 'The card could not be read. Enter the details by hand.' });
  }

  await logAuditEvent({
    actorId: req.user.id, actorRole: req.user.role,
    action: 'HEALTH_CARD_SCANNED', entityType: 'PATIENTS', entityId: null,
    metadata: { ok: result.ok, confidence: result.confidence, fields: Object.keys(result.fields || {}) },
    ip: req.ip
  });

  if (!result.ok) {
    return res.status(422).json({ error: result.error, fields: {}, confidence: result.confidence });
  }

  return res.json({
    fields: result.fields,
    confidence: result.confidence,
    // What the model claimed but validation refused, so the UI can say the
    // card was read yet a field was not trustworthy.
    rejected: ['full_name', 'gender', 'date_of_birth'].filter((k) => !(k in result.fields)),
    raw_text: result.raw_text
  });
};
