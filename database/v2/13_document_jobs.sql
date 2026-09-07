-- ============================================================================
-- Asynchronous document extraction.
--
-- Reading a prescription takes 23-29 seconds at the model, and the operator
-- was made to watch all of it. They already know the patient's name and the
-- date; making them stare at a spinner before they can type it wastes the one
-- resource a rural clinic has least of.
--
-- So the upload returns a job id immediately and the extraction runs behind
-- it, arriving over the /realtime socket the notification system already
-- uses. The health worker types what they know while the model reads.
--
-- ── What this does NOT change ───────────────────────────────────────────────
--
-- The extraction is still a DRAFT. It lands in the verification window exactly
-- as it does today, and a human still confirms every field before anything
-- touches the clinical record. Async makes the wait disappear; it does not
-- make the check disappear. patient_documents.verified_at remains the only
-- thing that promotes an extraction to clinical data.
--
-- ── Why the cache is keyed on the patient as well as the image ──────────────
--
-- A SHA-256 of the image alone would be a cross-patient leak waiting to
-- happen: two patients handed the same photographed page — a shared family
-- record, a clinic's own template, a re-used demo file — would silently read
-- each other's extraction. Keying on (hash, patient) makes that structurally
-- impossible rather than merely disallowed. The saving that matters is the
-- retry of the same page for the same patient, which is the case that
-- actually happens.
-- ============================================================================

-- ALTER TYPE ... ADD VALUE cannot run inside a transaction, so this sits above
-- the BEGIN, matching 06 and 07. The result arrives as a notification on the
-- existing socket rather than a second channel — same reasoning as
-- consultation signalling.
ALTER TYPE notification_event ADD VALUE IF NOT EXISTS 'DOCUMENT_EXTRACTED';

BEGIN;

DO $$ BEGIN
  CREATE TYPE document_job_status AS ENUM ('queued', 'running', 'done', 'failed', 'timeout');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS document_jobs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status        document_job_status NOT NULL DEFAULT 'queued',

  patient_id    VARCHAR(12) REFERENCES patients(aadhaar_number) ON DELETE CASCADE,
  visit_id      UUID REFERENCES visits(id) ON DELETE CASCADE,
  document_type VARCHAR(24) NOT NULL DEFAULT 'prescription',

  -- SHA-256 of the normalised image bytes. Scoped by patient_id above, never
  -- used as a lookup key on its own.
  content_hash  CHAR(64) NOT NULL,

  -- The draft. NEVER read as clinical data: patient_documents is where a
  -- confirmed extraction lives, and it gets there only through verification.
  extraction    JSONB,
  raw_text      TEXT,
  engine        VARCHAR(64),
  error         TEXT,

  -- Which document row the result was written to, once one exists.
  document_id   UUID REFERENCES patient_documents(id) ON DELETE SET NULL,

  requested_by  UUID REFERENCES staff_profiles(id) ON DELETE SET NULL,
  district_id   UUID REFERENCES districts(id) ON DELETE SET NULL,

  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at   TIMESTAMPTZ,
  -- Cache entries expire. A prescription re-photographed a week later should
  -- be re-read, not served from a stale extraction of a page that may since
  -- have been annotated by hand.
  expires_at    TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours')
);

-- The cache lookup: this exact page, for this exact patient, still fresh.
CREATE INDEX IF NOT EXISTS idx_document_jobs_cache
  ON document_jobs(patient_id, content_hash, status, expires_at DESC);

CREATE INDEX IF NOT EXISTS idx_document_jobs_requester
  ON document_jobs(requested_by, created_at DESC);

ALTER TABLE document_jobs ENABLE ROW LEVEL SECURITY;

-- Reached only through the service role, like every other clinical table here.
DROP POLICY IF EXISTS document_jobs_service ON document_jobs;
CREATE POLICY document_jobs_service ON document_jobs
  FOR ALL TO service_role USING (true) WITH CHECK (true);

COMMIT;
