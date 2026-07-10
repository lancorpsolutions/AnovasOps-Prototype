# Anovas Partner Network

The Anovas Partner Network is the referral and affiliate program that pays outside partners for bringing Anovas paying clients.

## Tiers (finalized)

| Tier | Who | First Payment | Recurring | Onboarding |
|------|-----|---------------|-----------|------------|
| 1 — Community Referral | Clients, friends, local entrepreneurs | 10% | None | Form → auto-provision |
| 2 — Certified Affiliate | Coaches, creators, group admins, newsletters, influencers | 15% one-time / 10% retainer | 10% for months 1–3 (retainers only) | Form → Josh approval |
| 3 — Strategic Partner | Accountants, bookkeepers, attorneys, lenders, HR consultants, agencies | 20% one-time / 10% retainer | 10% for months 1–6 (retainers only) | Invite-only → manual HubSpot record |
| 4 — Agency / White-Label | TBD | **ON HOLD** | **ON HOLD** | **DO NOT BUILD** |

## Governing rules (finalized)

- **Attribution:** 60 days from first contact. First-touch wins.
- **Payout waiting window:**
  - One-time deals: partner paid within 7 days of client payment
  - Retainers: each monthly commission paid 30 days after each monthly client payment
- **Payout release cadence:** Weekly manual review and release by Josh. Nothing auto-releases.
- **Clawback:** On refund or cancel, all Pending/Approved payouts void immediately. Already-paid commissions are offset against the partner's next payout cycle. No cash clawback.
- **W-9 gate:** No payout releases until W-9 is on file. Collected via M365.
- **1099-NEC:** Auto-flagged at year-end for any partner earning $600+.
- **Portal:** Deferred to v2. HubSpot internal visibility + monthly email statements for MVP.

## Documents in this directory

- `data-model.md` — HubSpot schema (Partner object, Commission_Payout object, Contact/Deal properties, Commission Pipeline)
- `automation-flows.md` — n8n automation flow specs
- `commission-rules.md` — Full rulebook with worked dollar examples

## Source-of-truth code

- `src/lib/partner-network/commission-calculator.ts` — TypeScript commission engine
- `src/lib/partner-network/commission-calculator.test.ts` — Unit tests against Josh's finalized dollar examples
- `scripts/hubspot/setup-partner-network.ts` — HubSpot API script that provisions all custom objects and properties
