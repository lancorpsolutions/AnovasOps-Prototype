/**
 * Anovas Partner Network — Commission Calculator Tests
 *
 * Tests are written against the exact dollar examples Josh finalized.
 * If any of these fail, the calculator is wrong — not the tests.
 */

import { calculateCommission } from "./commission-calculator";

// ---------------------------------------------------------------------------
// TIER 1 — Community Referral Partner
// ---------------------------------------------------------------------------

describe("Tier 1 — Community", () => {
  test("One-Time: 10% of first payment", () => {
    const result = calculateCommission("Community", "One-Time", 5000);
    expect(result.totalExpected).toBe(500);
    expect(result.payouts).toHaveLength(1);
    expect(result.payouts[0]).toMatchObject({
      monthNumber: 1,
      payoutType: "First-Payment",
      amount: 500,
    });
  });

  test("Retainer: 10% of first payment only, no recurring", () => {
    const result = calculateCommission("Community", "Retainer", 1500, 1500);
    expect(result.totalExpected).toBe(150);
    expect(result.payouts).toHaveLength(1);
    expect(result.payouts[0].payoutType).toBe("First-Payment");
  });
});

// ---------------------------------------------------------------------------
// TIER 2 — Certified Affiliate Partner
// ---------------------------------------------------------------------------

describe("Tier 2 — Certified Affiliate", () => {
  test("One-Time $5,000 project: 15% = $750", () => {
    const result = calculateCommission("Certified Affiliate", "One-Time", 5000);
    expect(result.totalExpected).toBe(750);
    expect(result.payouts).toHaveLength(1);
    expect(result.payouts[0]).toMatchObject({
      monthNumber: 1,
      payoutType: "First-Payment",
      amount: 750,
    });
  });

  test("Retainer $1,500/mo: 10% x 3 months = $450 total", () => {
    const result = calculateCommission(
      "Certified Affiliate",
      "Retainer",
      1500,
      1500
    );
    expect(result.totalExpected).toBe(450);
    expect(result.payouts).toHaveLength(3);
    expect(result.payouts[0]).toMatchObject({
      monthNumber: 1,
      payoutType: "First-Payment",
      amount: 150,
    });
    expect(result.payouts[1]).toMatchObject({
      monthNumber: 2,
      payoutType: "Recurring",
      amount: 150,
    });
    expect(result.payouts[2]).toMatchObject({
      monthNumber: 3,
      payoutType: "Recurring",
      amount: 150,
    });
  });

  test("Retainer $2,500/mo: 10% x 3 months = $750 total", () => {
    const result = calculateCommission(
      "Certified Affiliate",
      "Retainer",
      2500,
      2500
    );
    expect(result.totalExpected).toBe(750);
    expect(result.payouts).toHaveLength(3);
    result.payouts.forEach((p) => {
      expect(p.amount).toBe(250);
    });
  });
});

// ---------------------------------------------------------------------------
// TIER 3 — Strategic Partner
// ---------------------------------------------------------------------------

describe("Tier 3 — Strategic", () => {
  test("One-Time $5,000 project: 20% = $1,000", () => {
    const result = calculateCommission("Strategic", "One-Time", 5000);
    expect(result.totalExpected).toBe(1000);
    expect(result.payouts).toHaveLength(1);
    expect(result.payouts[0]).toMatchObject({
      monthNumber: 1,
      payoutType: "First-Payment",
      amount: 1000,
    });
  });

  test("One-Time $10,000 build: 20% = $2,000", () => {
    const result = calculateCommission("Strategic", "One-Time", 10000);
    expect(result.totalExpected).toBe(2000);
    expect(result.payouts).toHaveLength(1);
    expect(result.payouts[0].amount).toBe(2000);
  });

  test("Retainer $3,000/mo: 10% x 6 months = $1,800 total", () => {
    const result = calculateCommission("Strategic", "Retainer", 3000, 3000);
    expect(result.totalExpected).toBe(1800);
    expect(result.payouts).toHaveLength(6);
    expect(result.payouts[0]).toMatchObject({
      monthNumber: 1,
      payoutType: "First-Payment",
      amount: 300,
    });
    result.payouts.slice(1).forEach((p, i) => {
      expect(p.monthNumber).toBe(i + 2);
      expect(p.payoutType).toBe("Recurring");
      expect(p.amount).toBe(300);
    });
  });

  test("Retainer $5,000/mo: 10% x 6 months = $3,000 total", () => {
    const result = calculateCommission("Strategic", "Retainer", 5000, 5000);
    expect(result.totalExpected).toBe(3000);
    expect(result.payouts).toHaveLength(6);
    result.payouts.forEach((p) => {
      expect(p.amount).toBe(500);
    });
  });
});

// ---------------------------------------------------------------------------
// EDGE CASES & VALIDATION
// ---------------------------------------------------------------------------

describe("Edge cases", () => {
  test("Throws if firstPayment is negative", () => {
    expect(() =>
      calculateCommission("Community", "One-Time", -100)
    ).toThrow("firstPayment must be a non-negative number");
  });

  test("Throws if Retainer deal is missing retainerMonthly", () => {
    expect(() =>
      calculateCommission("Certified Affiliate", "Retainer", 1500)
    ).toThrow("retainerMonthly is required for Retainer deals");
  });

  test("Throws if retainerMonthly is negative", () => {
    expect(() =>
      calculateCommission("Strategic", "Retainer", 3000, -500)
    ).toThrow("retainerMonthly must be a non-negative number");
  });

  test("Handles zero-dollar first payment (edge case for setup fees)", () => {
    const result = calculateCommission("Community", "One-Time", 0);
    expect(result.totalExpected).toBe(0);
    expect(result.payouts[0].amount).toBe(0);
  });

  test("Floating point: rounds to 2 decimal places", () => {
    // $333.33/mo retainer — 10% = $33.33
    const result = calculateCommission(
      "Certified Affiliate",
      "Retainer",
      333.33,
      333.33
    );
    result.payouts.forEach((p) => {
      expect(p.amount).toBe(33.33);
    });
  });
});
