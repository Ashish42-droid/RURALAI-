/**
 * Which facility should this patient actually be taken to.
 *
 * The old answer was "the nearest government district hospital", which is a
 * distance calculation wearing a clinical decision's clothes. A district
 * hospital with no blood bank is the wrong destination for a haemorrhage
 * however close it is, and an unempanelled private hospital is the wrong
 * destination for a landless family however good it is.
 *
 * So four things decide, in this order:
 *
 *   1. Capability   — can this place treat THIS case at all
 *   2. Affordability — PM-JAY empanelment, because a cashless admission and a
 *                      catastrophic bill are not a matter of preference
 *   3. Quality      — NABH/NABL, facility type, bed count
 *   4. Travel time
 *
 * Public star ratings are a tiebreaker of last resort and never enter the
 * score. A Google rating measures parking and politeness; it is not evidence
 * that a hospital can run a caesarean at 3 a.m., and presenting it as a
 * clinical quality signal on a referral screen would be a lie with
 * consequences.
 *
 * ── Why the order is applied differently by tier ──────────────────────────
 *
 * Strict lexicographic ranking with travel time last is right until it sends
 * a patient past a capable hospital to reach a marginally better one two
 * hours away. Two devices prevent that, and they differ by tier because the
 * clinical reality differs:
 *
 *   EMERGENCY — the nearest capable facility wins outright. Nothing reorders
 *   it. A haemorrhaging or unstable patient is treated where they can be
 *   reached in time, and no accreditation is worth the extra thirty minutes.
 *
 *   HIGH — a bounded detour. Only facilities within a set number of minutes
 *   of the nearest capable one are candidates; inside that set the stated
 *   order applies strictly, so affordability and quality genuinely decide.
 *   The patient is stable enough for the extra half hour to be worth a
 *   cashless bed.
 */

/** The capabilities a case can require. Anything outside this list is ignored. */
export const CAPABILITIES = ['trauma', 'obstetric', 'paediatric', 'cardiac', 'icu', 'blood_bank'];

/**
 * How far past the nearest capable facility a HIGH case may be sent to reach a
 * better or cheaper one. Beyond this the detour stops being a trade-off and
 * starts being a risk.
 */
export const HIGH_DETOUR_MINUTES = 45;

/**
 * Average rural road speed, used only when no maps key is configured.
 *
 * Deliberately pessimistic. UP district roads are not motorways, and a
 * referral that under-promises the journey is safer than one that over-
 * promises it. Every figure derived from this is labelled `estimated` so the
 * screen never presents it as a routed drive time.
 */
export const ROAD_SPEED_KMH = 35;

export const estimateTravelMinutes = (km) =>
  Number.isFinite(km) ? Math.round((km / ROAD_SPEED_KMH) * 60) : null;

/* ── capability ─────────────────────────────────────────────────────────── */

/**
 * Three states, not two.
 *
 * `null` capabilities means nobody has sourced them — which is the case for
 * every record in the dataset today. That must not read as "cannot treat":
 * excluding every unsourced facility would empty the screen. It also must not
 * read as "can treat". It ranks below anything confirmed and says so.
 *
 * An empty array is different again, and means a source positively told us the
 * facility has none of these — which is why the dataset stores null and never
 * `[]` for unknown.
 */
export const capabilityStatus = (facility, required = []) => {
  if (!required.length) return 'not_required';
  const have = facility?.capabilities;
  if (have == null) return 'unverified';
  if (!Array.isArray(have)) return 'unverified';
  const missing = required.filter((c) => !have.includes(c));
  return missing.length ? 'lacking' : 'confirmed';
};

const CAPABILITY_RANK = { confirmed: 0, not_required: 0, unverified: 1, lacking: 2 };

/* ── affordability ──────────────────────────────────────────────────────── */

/**
 * What this admission will cost the family, and how sure we are.
 *
 * This is the field most likely to change a rural patient's outcome and the
 * one most likely to be missing, so every branch is explicit and the unknown
 * case tells the health worker to ask rather than reassuring them.
 */
export const costImplication = (facility) => {
  const gov = facility?.ownership === 'government';
  const pmjay = facility?.pmjay_empanelled;

  if (gov) {
    return {
      status: 'government',
      score: 3,
      line: 'Government facility — treatment is free or nominal.',
      line_hi: 'सरकारी अस्पताल — इलाज निःशुल्क या मामूली शुल्क पर।'
    };
  }
  if (pmjay === true) {
    return {
      status: 'pmjay',
      score: 3,
      line: 'Cashless under Ayushman Bharat (PM-JAY). Carry the family’s card.',
      line_hi: 'आयुष्मान भारत (PM-JAY) के तहत कैशलेस। परिवार का कार्ड साथ ले जाएँ।'
    };
  }
  if (pmjay === false) {
    return {
      status: 'chargeable',
      score: 0,
      line: 'Private hospital, not PM-JAY empanelled — treatment is chargeable. Confirm costs before admission.',
      line_hi: 'निजी अस्पताल, PM-JAY में नहीं — इलाज शुल्क सहित। भर्ती से पहले खर्च पूछ लें।'
    };
  }
  return {
    status: 'unknown',
    score: 1,
    line: 'PM-JAY status not confirmed — ask at the desk before admission.',
    line_hi: 'PM-JAY स्थिति की पुष्टि नहीं — भर्ती से पहले पूछें।'
  };
};

/* ── quality ────────────────────────────────────────────────────────────── */

const TYPE_WEIGHT = {
  medical_college: 3,
  district_hospital: 2,
  private_multispeciality: 2,
  chc: 1,
  private_singlespeciality: 1,
  phc: 0
};

/**
 * Structural quality only — accreditation, facility class, size.
 *
 * Unknown scores zero rather than a penalty or a bonus: a facility nobody has
 * accredited is not thereby bad, and must not be promoted either.
 */
export const qualityScore = (facility) => {
  let score = 0;
  if (facility?.nabh_accredited === true) score += 3;
  score += TYPE_WEIGHT[facility?.facility_type] ?? 0;
  const beds = facility?.bed_count;
  if (Number.isFinite(beds)) {
    if (beds >= 500) score += 2;
    else if (beds >= 200) score += 1;
  }
  return score;
};

/* ── ranking ────────────────────────────────────────────────────────────── */

const cmp = (...comparators) => (a, b) => {
  for (const c of comparators) {
    const r = c(a, b);
    if (r !== 0) return r;
  }
  return 0;
};

const byCapability = (a, b) => CAPABILITY_RANK[a.capability] - CAPABILITY_RANK[b.capability];
const byTravel = (a, b) => (a.travel_minutes ?? Infinity) - (b.travel_minutes ?? Infinity);
const byAffordability = (a, b) => b.cost.score - a.cost.score;
const byQuality = (a, b) => b.quality_score - a.quality_score;

/**
 * Public reviews, used only to separate options that are otherwise equal on
 * every clinical and financial axis. Never surfaced as a quality measure.
 */
const byPublicRating = (a, b) => (b.public_rating ?? 0) - (a.public_rating ?? 0);

/**
 * @param {object[]} facilities   candidate facilities (already distance-annotated)
 * @param {'EMERGENCY'|'HIGH'|string} tier
 * @param {string[]} required     capabilities this case needs
 * @param {number} limit
 */
export const rankFacilities = ({ facilities = [], tier = 'HIGH', required = [], limit = 3 }) => {
  const wanted = required.filter((c) => CAPABILITIES.includes(c));

  const annotated = facilities.map((f) => ({
    ...f,
    capability: capabilityStatus(f, wanted),
    cost: costImplication(f),
    quality_score: qualityScore(f),
    travel_minutes: f.travel_minutes ?? estimateTravelMinutes(f.straight_line_km)
  }));

  const isEmergency = String(tier).toUpperCase() === 'EMERGENCY';

  if (isEmergency) {
    // Nearest capable, full stop. Affordability and quality may only separate
    // facilities that are equally capable AND equally far.
    return annotated
      .sort(cmp(byCapability, byTravel, byAffordability, byQuality, byPublicRating))
      .slice(0, limit)
      .map((f, i) => ({ ...f, rank_basis: i === 0 ? 'nearest capable facility' : 'next nearest' }));
  }

  // HIGH: bound the detour off the nearest capable option, then apply the
  // stated priority order strictly inside that set.
  const nearestCapable = annotated
    .filter((f) => f.capability === 'confirmed' || f.capability === 'not_required')
    .sort(byTravel)[0]
    || annotated.slice().sort(byTravel)[0];

  const budget = Number.isFinite(nearestCapable?.travel_minutes)
    ? nearestCapable.travel_minutes + HIGH_DETOUR_MINUTES
    : Infinity;

  const withinBudget = annotated.filter((f) => (f.travel_minutes ?? Infinity) <= budget);

  const ranked = withinBudget
    .sort(cmp(byCapability, byAffordability, byQuality, byTravel, byPublicRating));

  // Always three options. Backfill from outside the detour budget rather than
  // returning a short list — a health worker with one option has no decision
  // to make, and the alternatives carry their own labels.
  const chosen = [...ranked];
  if (chosen.length < limit) {
    const rest = annotated
      .filter((f) => !chosen.includes(f))
      .sort(cmp(byCapability, byTravel));
    chosen.push(...rest.slice(0, limit - chosen.length));
  }

  return chosen.slice(0, limit).map((f, i) => ({
    ...f,
    rank_basis: i === 0
      ? (f.cost.status === 'pmjay' || f.cost.status === 'government'
          ? 'best combination of capability, cost and quality within reach'
          : 'best available within reach')
      : 'alternative'
  }));
};
