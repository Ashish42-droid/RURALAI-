/**
 * Which facility a patient is actually sent to.
 *
 * This is the highest-consequence ranking in the platform. The failure modes
 * are not "a slightly worse suggestion" — they are sending a haemorrhaging
 * patient past the hospital that could have transfused them, or sending a
 * landless family to a private hospital that will bill them for a year's
 * income. Both are ranking bugs, and both look completely reasonable on the
 * screen.
 *
 * So the tests below fix the behaviour that must not drift: the tier rules,
 * the treatment of data we do not have, and the absolute exclusion of star
 * ratings from anything except a final tiebreak.
 */
import { describe, expect, it } from '@jest/globals';
import {
  rankFacilities, capabilityStatus, costImplication, qualityScore,
  estimateTravelMinutes, HIGH_DETOUR_MINUTES
} from '../src/services/facilityRanking.js';
import { capabilitiesForCase } from '../src/services/referralService.js';

/** A facility with everything unknown, so each test states only what it means. */
const facility = (over = {}) => ({
  district: 'Test', name: 'Test Facility', lat: 26.8, lon: 81.0,
  ownership: null, facility_type: null, capabilities: null,
  nabh_accredited: null, pmjay_empanelled: null, bed_count: null,
  phone: null, emergency_24x7: null,
  straight_line_km: 10,
  ...over
});

describe('capability is three states, not two', () => {
  it('confirms a facility whose sourced list covers what the case needs', () => {
    const f = facility({ capabilities: ['trauma', 'blood_bank', 'icu'] });
    expect(capabilityStatus(f, ['trauma', 'blood_bank'])).toBe('confirmed');
  });

  it('treats null capabilities as unverified, never as capable', () => {
    expect(capabilityStatus(facility(), ['trauma'])).toBe('unverified');
  });

  it('treats an empty sourced list as a positive lack, not as unknown', () => {
    // The dataset stores null for unknown precisely so [] can mean this.
    expect(capabilityStatus(facility({ capabilities: [] }), ['trauma'])).toBe('lacking');
  });

  it('marks a facility that lacks one of several needs', () => {
    const f = facility({ capabilities: ['trauma'] });
    expect(capabilityStatus(f, ['trauma', 'obstetric'])).toBe('lacking');
  });

  it('requires nothing when the case requires nothing', () => {
    expect(capabilityStatus(facility(), [])).toBe('not_required');
  });
});

describe('EMERGENCY routes to the nearest capable facility, full stop', () => {
  const near = facility({
    name: 'Near CHC', straight_line_km: 8,
    capabilities: ['trauma', 'icu'], facility_type: 'chc', ownership: 'government'
  });
  const farAndBetter = facility({
    name: 'Distant NABH Private', straight_line_km: 70,
    capabilities: ['trauma', 'icu'], facility_type: 'private_multispeciality',
    nabh_accredited: true, pmjay_empanelled: true, bed_count: 800, public_rating: 4.9
  });

  it('never routes past a nearer capable facility to reach a better one', () => {
    const [first] = rankFacilities({
      facilities: [farAndBetter, near], tier: 'EMERGENCY', required: ['trauma']
    });
    expect(first.name).toBe('Near CHC');
    expect(first.rank_basis).toBe('nearest capable facility');
  });

  it('still prefers a capable facility over a nearer one that positively lacks the capability', () => {
    const nearerButLacking = facility({
      name: 'Nearer Eye Hospital', straight_line_km: 3, capabilities: ['cardiac']
    });
    const [first] = rankFacilities({
      facilities: [nearerButLacking, near], tier: 'EMERGENCY', required: ['trauma']
    });
    expect(first.name).toBe('Near CHC');
  });

  it('ranks a confirmed facility above an unverified one at equal distance', () => {
    const unverified = facility({ name: 'Unverified', straight_line_km: 8 });
    const [first] = rankFacilities({
      facilities: [unverified, near], tier: 'EMERGENCY', required: ['trauma']
    });
    expect(first.name).toBe('Near CHC');
  });
});

describe('HIGH lets cost and quality decide inside a bounded detour', () => {
  const nearChargeable = facility({
    name: 'Near Private', straight_line_km: 10,
    capabilities: ['obstetric'], ownership: 'private', pmjay_empanelled: false
  });
  const slightlyFurtherEmpanelled = facility({
    name: 'Empanelled Private', straight_line_km: 24,
    capabilities: ['obstetric'], ownership: 'private', pmjay_empanelled: true
  });

  it('prefers a cashless hospital a little further over a chargeable near one', () => {
    const [first] = rankFacilities({
      facilities: [nearChargeable, slightlyFurtherEmpanelled], tier: 'HIGH', required: ['obstetric']
    });
    expect(first.name).toBe('Empanelled Private');
    expect(first.cost.status).toBe('pmjay');
  });

  it('will not send a patient beyond the detour budget for a better hospital', () => {
    const veryFar = facility({
      name: 'Far Empanelled', straight_line_km: 400,
      capabilities: ['obstetric'], ownership: 'private', pmjay_empanelled: true,
      nabh_accredited: true
    });
    const [first] = rankFacilities({
      facilities: [nearChargeable, veryFar], tier: 'HIGH', required: ['obstetric']
    });
    expect(first.name).toBe('Near Private');
  });

  it('applies the detour budget from the nearest capable facility', () => {
    const nearest = estimateTravelMinutes(10);
    const justInside = facility({
      name: 'Just Inside', capabilities: ['obstetric'], ownership: 'government',
      straight_line_km: 10 + ((HIGH_DETOUR_MINUTES - 5) / 60) * 35
    });
    const [first] = rankFacilities({
      facilities: [nearChargeable, justInside], tier: 'HIGH', required: ['obstetric']
    });
    expect(first.name).toBe('Just Inside');
    expect(justInside.straight_line_km).toBeGreaterThan(10);
    expect(nearest).toBeGreaterThan(0);
  });
});

describe('public review scores are never a clinical signal', () => {
  it('does not let a rating outrank capability', () => {
    const rated = facility({ name: 'Five Star', straight_line_km: 5, capabilities: [], public_rating: 5 });
    const capable = facility({ name: 'Unrated Capable', straight_line_km: 6, capabilities: ['cardiac'] });
    const [first] = rankFacilities({ facilities: [rated, capable], tier: 'HIGH', required: ['cardiac'] });
    expect(first.name).toBe('Unrated Capable');
  });

  it('does not let a rating outrank PM-JAY empanelment', () => {
    const rated = facility({
      name: 'Rated Chargeable', straight_line_km: 10,
      ownership: 'private', pmjay_empanelled: false, public_rating: 5
    });
    const empanelled = facility({
      name: 'Unrated Cashless', straight_line_km: 10,
      ownership: 'private', pmjay_empanelled: true
    });
    const [first] = rankFacilities({ facilities: [rated, empanelled], tier: 'HIGH', required: [] });
    expect(first.name).toBe('Unrated Cashless');
  });

  it('separates two otherwise identical options, and only then', () => {
    const a = facility({ name: 'A', ownership: 'government', public_rating: 3.1 });
    const b = facility({ name: 'B', ownership: 'government', public_rating: 4.6 });
    const [first] = rankFacilities({ facilities: [a, b], tier: 'HIGH', required: [] });
    expect(first.name).toBe('B');
  });
});

describe('the cost line a family actually acts on', () => {
  it('says free for a government facility', () => {
    expect(costImplication(facility({ ownership: 'government' })).status).toBe('government');
  });

  it('says cashless for an empanelled private hospital', () => {
    const c = costImplication(facility({ ownership: 'private', pmjay_empanelled: true }));
    expect(c.status).toBe('pmjay');
    expect(c.line).toMatch(/cashless/i);
  });

  it('warns plainly when a private hospital is not empanelled', () => {
    const c = costImplication(facility({ ownership: 'private', pmjay_empanelled: false }));
    expect(c.status).toBe('chargeable');
    expect(c.line).toMatch(/chargeable/i);
  });

  it('tells the worker to ask when empanelment is unknown, rather than reassuring them', () => {
    const c = costImplication(facility({ ownership: 'private' }));
    expect(c.status).toBe('unknown');
    expect(c.line).toMatch(/not confirmed/i);
    // Unknown must never read as free.
    expect(c.line).not.toMatch(/cashless|free/i);
  });

  it('carries a Hindi line for every case, because this screen is used in Hindi', () => {
    for (const f of [
      { ownership: 'government' }, { ownership: 'private', pmjay_empanelled: true },
      { ownership: 'private', pmjay_empanelled: false }, { ownership: 'private' }
    ]) {
      expect(costImplication(facility(f)).line_hi).toBeTruthy();
    }
  });
});

describe('missing fields never fabricate a score', () => {
  it('scores a facility with nothing known as zero rather than penalising it', () => {
    expect(qualityScore(facility())).toBe(0);
  });

  it('does not credit an unknown accreditation', () => {
    expect(qualityScore(facility({ nabh_accredited: null })))
      .toBe(qualityScore(facility({ nabh_accredited: false })));
  });

  it('still returns three options when every facility is unsourced', () => {
    const bare = [1, 2, 3, 4].map((i) => facility({ name: `F${i}`, straight_line_km: i * 5 }));
    const out = rankFacilities({ facilities: bare, tier: 'HIGH', required: ['trauma'] });
    expect(out).toHaveLength(3);
    expect(out.every((f) => f.capability === 'unverified')).toBe(true);
  });

  it('backfills to three even when only one facility is within the detour budget', () => {
    const out = rankFacilities({
      facilities: [
        facility({ name: 'Near', straight_line_km: 2, capabilities: ['icu'] }),
        facility({ name: 'Far', straight_line_km: 300 }),
        facility({ name: 'Further', straight_line_km: 400 })
      ],
      tier: 'HIGH', required: ['icu']
    });
    expect(out).toHaveLength(3);
    expect(out[0].name).toBe('Near');
  });

  it('survives a facility with no distance at all', () => {
    const out = rankFacilities({
      facilities: [facility({ name: 'No Distance', straight_line_km: null }), facility({ name: 'Known' })],
      tier: 'EMERGENCY', required: []
    });
    expect(out[0].name).toBe('Known');
  });
});

describe('what the case is judged to need, derived from the record', () => {
  it('asks for obstetric care and a blood bank for a post-partum bleed', () => {
    const needs = capabilitiesForCase({ tier: 'EMERGENCY', text: 'Post-partum collapse, heavy bleeding' });
    expect(needs).toContain('obstetric');
    expect(needs).toContain('blood_bank');
  });

  it('asks for paediatric care for a small child', () => {
    expect(capabilitiesForCase({ tier: 'HIGH', text: 'loose stools', ageYears: 4 })).toContain('paediatric');
  });

  it('asks for an ICU for anything triaged EMERGENCY', () => {
    expect(capabilitiesForCase({ tier: 'EMERGENCY', text: 'unresponsive' })).toContain('icu');
  });

  it('asks for trauma care after a fall or road accident', () => {
    expect(capabilitiesForCase({ tier: 'HIGH', text: 'road traffic accident, fracture' })).toContain('trauma');
  });

  it('returns nothing rather than guessing for a vague complaint', () => {
    expect(capabilitiesForCase({ tier: 'HIGH', text: 'feeling unwell' })).toEqual([]);
  });

  it('never returns a capability outside the known set', () => {
    const needs = capabilitiesForCase({ tier: 'EMERGENCY', text: 'bleeding pregnancy chest pain injury', ageYears: 3 });
    for (const n of needs) {
      expect(['trauma', 'obstetric', 'paediatric', 'cardiac', 'icu', 'blood_bank']).toContain(n);
    }
  });
});
