-- ============================================================================
-- What the referral was actually optimising for.
--
-- The referral row already recorded WHICH hospital and HOW FAR. That was
-- enough when the answer was always "the nearest government district
-- hospital", because the reasoning was implied by the rule.
--
-- It is not enough now. The ranking weighs capability, PM-JAY empanelment,
-- accreditation and travel time, and it weighs them differently for EMERGENCY
-- than for HIGH. So the row has to say what the case was judged to need, what
-- the chosen facility was believed to be, and why it came first — otherwise
-- the enquiry after a bad outcome can see the destination but not the
-- decision, which is the part that would actually be under question.
--
-- capability_status is stored as it stood at the time, including 'unverified'.
-- That is the honest record for today's dataset: the facility was chosen
-- without confirmed capability data, and a later backfill of that data must
-- not retroactively make the decision look better informed than it was.
-- ============================================================================

BEGIN;

ALTER TABLE referrals
  ADD COLUMN IF NOT EXISTS required_capabilities TEXT[],
  ADD COLUMN IF NOT EXISTS facility_ownership    VARCHAR(20),
  ADD COLUMN IF NOT EXISTS facility_pmjay        BOOLEAN,
  ADD COLUMN IF NOT EXISTS facility_capability_status VARCHAR(16),
  ADD COLUMN IF NOT EXISTS rank_basis            TEXT;

COMMENT ON COLUMN referrals.required_capabilities IS
  'Capabilities the case was judged to need, derived server-side from the visit. NULL means none were required or none could be derived.';
COMMENT ON COLUMN referrals.facility_pmjay IS
  'PM-JAY empanelment as known when the referral was shown. NULL means unknown, which is NOT the same as not empanelled.';
COMMENT ON COLUMN referrals.facility_capability_status IS
  'confirmed | unverified | lacking | not_required, as it stood at referral time.';

-- Answering "were we sending people to facilities we had not verified" needs
-- this to be cheap across a district's history.
CREATE INDEX IF NOT EXISTS idx_referrals_capability
  ON referrals(district_id, facility_capability_status);

COMMIT;
