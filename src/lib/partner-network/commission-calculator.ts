/**
 * Anovas Partner Network — Commission Calculator
 *
 * Source-of-truth commission logic. This function is the single definition
 * of how payouts are calculated. n8n flows mirror this logic exactly.
 *
 * Rules:
 * - Tier 1: 10% of first payment, no recurring
 * - Tier 2 One-Time: 15% of first payment
 * - Tier 2 Retainer: 10% x 3 months
 * - Tier 3 One-Time: 20% of first payment
 * - Tier 3 Retainer: 10% x 6 months
 * - Attribution window: 60 days (enforced upstream, not here)
 * - Waiting window: 7 days (one-time), 30 days (retainer) — set on eligible_release_date upstream
 */

export type PartnerTier = "Community" | "Certified Affiliate" | "Strategic";
export type DealStructure = "One-Time" | "Retainer";
export type PayoutType = "First-Payment" | "Recurring";

export interface PayoutRecord {
  monthNumber: number;
  payoutType: PayoutType;
  amount: number;
}

export interface CommissionSchedule {
  tier: PartnerTier;
  dealStructure: DealStructure;
  totalExpected: number;
  payouts: PayoutRecord[];
}

/**
 * Calculate the full commission payout schedule for a referred deal.
 *
 * @param tier - The partner's tier at time of deal close (snapshot, not live)
 * @param dealStructure - Whether the deal is a one-time payment or recurring retainer
 * @param firstPayment - The first payment amount collected from the client
 * @param retainerMonthly - Monthly retainer value (required if dealStructure is Retainer)
 * @returns CommissionSchedule with all payout records and total expected commission
 */
export function calculateCommission(
  tier: PartnerTier,
  dealStructure: DealStructure,
  firstPayment: number,
  retainerMonthly?: number
): CommissionSchedule {
  if (firstPayment < 0) {
    throw new Error("firstPayment must be a non-negative number");
  }

  if (dealStructure === "Retainer") {
    if (retainerMonthly === undefined || retainerMonthly === null) {
      throw new Error("retainerMonthly is required for Retainer deals");
    }
    if (retainerMonthly < 0) {
      throw new Error("retainerMonthly must be a non-negative number");
    }
  }

  let payouts: PayoutRecord[] = [];

  if (tier === "Community") {
    // Tier 1: 10% of first payment only, regardless of deal structure
    payouts = [
      {
        monthNumber: 1,
        payoutType: "First-Payment",
        amount: round(firstPayment * 0.1),
      },
    ];
  } else if (tier === "Certified Affiliate") {
    if (dealStructure === "One-Time") {
      // Tier 2 One-Time: 15% of first payment
      payouts = [
        {
          monthNumber: 1,
          payoutType: "First-Payment",
          amount: round(firstPayment * 0.15),
        },
      ];
    } else {
      // Tier 2 Retainer: 10% x 3 months
      payouts = buildRetainerPayouts(retainerMonthly!, 3);
    }
  } else if (tier === "Strategic") {
    if (dealStructure === "One-Time") {
      // Tier 3 One-Time: 20% of first payment
      payouts = [
        {
          monthNumber: 1,
          payoutType: "First-Payment",
          amount: round(firstPayment * 0.2),
        },
      ];
    } else {
      // Tier 3 Retainer: 10% x 6 months
      payouts = buildRetainerPayouts(retainerMonthly!, 6);
    }
  } else {
    throw new Error(`Unknown partner tier: ${tier}`);
  }

  const totalExpected = payouts.reduce((sum, p) => sum + p.amount, 0);

  return {
    tier,
    dealStructure,
    totalExpected: round(totalExpected),
    payouts,
  };
}

/**
 * Build recurring payout records for retainer deals.
 * Month 1 is always First-Payment; months 2+ are Recurring.
 */
function buildRetainerPayouts(
  retainerMonthly: number,
  months: number
): PayoutRecord[] {
  return Array.from({ length: months }, (_, i) => ({
    monthNumber: i + 1,
    payoutType: i === 0 ? "First-Payment" : ("Recurring" as PayoutType),
    amount: round(retainerMonthly * 0.1),
  }));
}

/** Round to 2 decimal places to avoid floating point drift on currency */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}
