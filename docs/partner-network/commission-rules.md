# Anovas Partner Network — Commission Rules

## Governing Principles

1. Attribution window: 60 days from referral submission date to deal close date. If the deal closes after 60 days, no commission is owed regardless of tier.
2. First-touch attribution: If a lead was referred by multiple partners, the first partner to submit the referral owns it. No splitting.
3. Tier snapshot: Commission rate is locked to the partner tier at the time the deal closes. If a partner is upgraded or downgraded after close, it does not affect existing payout records.
4. Client-payment-first: No commission is paid until the client payment is confirmed in Stripe or QBO. Commission is earned on collected revenue only.
5. Waiting windows: One-time deals release after 7 days from client payment. Retainer deals release 30 days after each monthly payment is confirmed.
6. Clawback policy: If a client refunds or cancels before a payout is released, all pending and approved payout records for that deal are voided immediately. Payouts already marked Paid are not clawed back — they are offset against the partner next payout cycle.
7. W-9 gate: No payout is released to any partner without a W-9 on file. Partners earning $600 or more in a calendar year receive a 1099-NEC.
8. Weekly release cadence: Josh reviews and releases all Approved payouts once per week. Payouts do not release automatically.

---

## Commission Structure by Tier

### Tier 1 — Community Referral Partner
- Who: Clients, friends, local entrepreneurs, community members
- Onboarding: Auto-provisioned via application form
- One-Time Deal: 10% of first payment collected. 1 payout record.
- Retainer: 10% of first payment only. No recurring commission. 1 payout record.
- Recurring months: 0

### Tier 2 — Certified Affiliate Partner
- Who: Coaches, creators, group admins, newsletter owners, influencers
- Onboarding: Application form, Jalen approval required
- One-Time Deal: 15% of first payment collected. 1 payout record.
- Retainer: 10% of each of the first 3 paid months. 3 payout records.
- Recurring months: 3

Tier 2 Examples:
- $5,000 one-time project = $750 commission (1 payout)
- $1,500/mo retainer = $150/mo x 3 months = $450 total (3 payouts)
- $2,500/mo retainer = $250/mo x 3 months = $750 total (3 payouts)

### Tier 3 — Strategic Partner
- Who: Accountants, bookkeepers, attorneys, lenders, HR consultants, agencies
- Onboarding: Invite-only. Requires valid invite code. Josh approves manually.
- One-Time Deal: 20% of first payment collected. 1 payout record.
- Retainer: 10% of each of the first 6 paid months. 6 payout records.
- Recurring months: 6

Tier 3 Examples:
- $5,000 one-time project = $1,000 commission (1 payout)
- $10,000 build = $2,000 commission (1 payout)
- $3,000/mo retainer = $300/mo x 6 months = $1,800 total (6 payouts)
- $5,000/mo retainer = $500/mo x 6 months = $3,000 total (6 payouts)

---

## Commission Calculation Logic

INPUTS: tier, dealStructure, firstPayment, retainerMonthly

Tier 1, any deal structure:
  payouts = [{ month: 1, type: First-Payment, amount: firstPayment x 0.10 }]

Tier 2, One-Time:
  payouts = [{ month: 1, type: First-Payment, amount: firstPayment x 0.15 }]

Tier 2, Retainer:
  payouts = [
    { month: 1, type: First-Payment, amount: retainerMonthly x 0.10 },
    { month: 2, type: Recurring,     amount: retainerMonthly x 0.10 },
    { month: 3, type: Recurring,     amount: retainerMonthly x 0.10 }
  ]

Tier 3, One-Time:
  payouts = [{ month: 1, type: First-Payment, amount: firstPayment x 0.20 }]

Tier 3, Retainer:
  payouts = [
    { month: 1, type: First-Payment, amount: retainerMonthly x 0.10 },
    { month: 2, type: Recurring,     amount: retainerMonthly x 0.10 },
    { month: 3, type: Recurring,     amount: retainerMonthly x 0.10 },
    { month: 4, type: Recurring,     amount: retainerMonthly x 0.10 },
    { month: 5, type: Recurring,     amount: retainerMonthly x 0.10 },
    { month: 6, type: Recurring,     amount: retainerMonthly x 0.10 }
  ]

---

## Payout Timing Rules

Deal Structure | Waiting Window | Starts From
One-Time       | 7 days         | Date client payment confirmed in Stripe/QBO
Retainer       | 30 days        | Date that month's client payment confirmed in Stripe/QBO

A payout record moves from Pending to Approved only when all three conditions are true:
1. client_payment_confirmed = true
2. today is on or after eligible_release_date
3. w9_on_file = true on the Partner record

---

## Clawback Rules

Scenario: Client refunds before payout is released
Action: Void all Pending and Approved payout records for that deal

Scenario: Client cancels retainer before commission window closes
Action: Void all future Pending payout records. Do not void already-Paid records.

Scenario: Commission already paid on a deal that later refunds
Action: Do not claw back cash. Offset against partner next payout cycle and log the offset.

---

## Attribution Rules

Window: 60 days from referral_date to close_date
First-touch: First partner to submit referral owns it. No overwriting.
Self-referral: If the referred contact is the same person as the partner, commission is void.
Existing contact with no prior attribution: New referral attribution applies.
Existing contact with prior attribution: Prior attribution is preserved. New referral does not overwrite.
