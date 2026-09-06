/**
 * Shrink a photograph before it is uploaded.
 *
 * A phone camera produces a 3-8 MB JPEG at 4000x3000. Every byte of that was
 * being pushed up a rural uplink, and the upload — not the model — was most of
 * the wait: a wound photo took 41-59 seconds end to end, and a document upload
 * 30-41, against a client that gave up at 20. Raising the deadline stopped the
 * failures but did nothing about the cause.
 *
 * Nothing downstream benefits from those pixels. The vision model reads a
 * wound perfectly well at 1600px on the long edge, and OCR needs resolution
 * only to the point where the printed characters are crisp. Re-encoding to
 * that size typically cuts the payload by ten to twenty times, which is the
 * difference between a demo that feels broken and one that feels instant.
 *
 * Three rules keep this safe on clinical images:
 *
 *   Documents get more resolution than wounds. Text degrades in a way a wound
 *   does not — a smudged 5 read as a 6 in a lab value is a clinical error, so
 *   the document path keeps a longer edge and a higher quality factor.
 *
 *   Nothing is ever upscaled, and a file that does not get smaller is sent
 *   exactly as it arrived. Re-encoding a small image just loses information.
 *
 *   Anything that is not an image — a PDF lab report, most obviously — is
 *   passed through untouched.
 *
 * Any failure returns the original file. A photograph that uploads slowly is a
 * far better outcome than one that does not upload at all.
 */

/** Wound photographs: the model reads shape, colour and margin, not fine text. */
export const WOUND = { maxEdge: 1600, quality: 0.85 };

/** Prescriptions and lab reports: OCR has to resolve printed characters. */
export const DOCUMENT = { maxEdge: 2200, quality: 0.92 };

const isImage = (file) => Boolean(file?.type?.startsWith('image/'));

/**
 * Decode with the camera's own orientation applied.
 *
 * Phones record rotation in EXIF rather than in the pixels. Drawing to a canvas
 * discards that tag, so without `from-image` a portrait wound photo arrives at
 * the model lying on its side — and a model asked to read a sideways wound
 * gives a worse answer than one shown a smaller upright picture.
 */
const decode = async (file) => {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
      /* Safari has historically rejected the options bag — fall through. */
    }
    try {
      return await createImageBitmap(file);
    } catch {
      /* fall through to the <img> path */
    }
  }

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('decode failed')); };
    img.src = url;
  });
};

const toBlob = (canvas, quality) =>
  new Promise((resolve) => {
    if (canvas.toBlob) canvas.toBlob((b) => resolve(b), 'image/jpeg', quality);
    else resolve(null);
  });

/**
 * @param {File} file            the file the health worker chose
 * @param {{maxEdge:number, quality:number}} profile  WOUND or DOCUMENT
 * @returns {Promise<File>} a smaller JPEG, or the original file unchanged
 */
export const prepareForUpload = async (file, profile = WOUND) => {
  if (!isImage(file)) return file;

  try {
    const src = await decode(file);
    const w = src.width;
    const h = src.height;
    if (!w || !h) return file;

    // Never upscale: a photo already under the cap is only made worse by a
    // round trip through JPEG.
    const scale = Math.min(1, profile.maxEdge / Math.max(w, h));
    const outW = Math.round(w * scale);
    const outH = Math.round(h * scale);

    const canvas = document.createElement('canvas');
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(src, 0, 0, outW, outH);
    if (typeof src.close === 'function') src.close();

    const blob = await toBlob(canvas, profile.quality);
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return new File([blob], name, { type: 'image/jpeg', lastModified: Date.now() });
  } catch {
    return file;
  }
};

/** Prepare a list, leaving non-images (PDFs) alone. */
export const prepareAll = (files, profile = WOUND) =>
  Promise.all(Array.from(files).map((f) => prepareForUpload(f, profile)));

/** "3.4 MB → 240 KB" for the progress line, so the saving is visible. */
export const formatBytes = (n) => {
  if (!Number.isFinite(n)) return '';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
};
