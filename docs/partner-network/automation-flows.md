# Anovas Partner Network — n8n Automation Flows

## Overview

Five automation flows handle the full partner lifecycle from referral submission through payout execution. All flows run in n8n and communicate with HubSpot as the system of record. Stripe (or QBO) is the payment confirmation source.

---

## Flow A — New Referral Ingestion

**Trigger:** Partner submits referral form (Typeform / HubSpot Form / custom intake)

**Steps:**
1. Receive form submission webhook
2. Look up Partner record in HubSpot by `partner_email`
   - If not found: flag error, notify Ari in Slack — do not proceed
3. Check `partner_status = Active`
   - If not Active: reject submission, notify partner via email that their account is not active
4. Check if Contact already exists in HubSpot by referred lead's email
   - If exists: stamp `referring_partner_id` and `referral_date` only if those fields are currently empty (first-touch attribution)
   - If new: create Contact with all referral fields populated
5. Set `referral_attribution_expires = referral_date + 60 days`
6. Increment `total_referrals` on Partner record
7. Notify Jalen in Slack: new referral received, partner name, tier, referred lead name and contact info
8. Send confirmation email to partner: referral received, next steps

**Attribution Rule:** If a Contact already has a `referring_partner_id` from a prior referral, do not overwrite it. First-touch wins.

---

## Flow B — Deal Won → Commission Calculation

**Trigger:** HubSpot webhook — Deal stage changes to `Closed Won` AND `is_referred_deal = true`

**Steps:**
1. Pull deal properties: `commission_tier_at_close`, `deal_structure`, `amount`, `retainer_monthly_value`, `referring_partner_id`, `referral_date`, `close_date`
2. **Attribution check:** Confirm `close_date <= referral_attribution_expires`
   - If outside 60-day window: set `attribution_valid = false`, do not create payout records, notify Josh and Ari
   - If within window: set `attribution_valid = true`, proceed
3. **Commission calculation** (see commission-rules.md for full logic):
   - Determine number of payout records to create and amount for each
4. **Create Commission_Payout records** in HubSpot (one per payout obligation):
   - Set `status = Pending`
   - Set `payout_period` based on expected client payment dates
   - Set `eligible_release_date` based on deal structure (see below)
5. Move Commission_Payout records into Commission Pipeline at `Earned` stage
6. Notify Josh and Ari in Slack: commission schedule created, total expected payout, partner name and tier

**Waiting Windows (baked into eligible_release_date):**
- One-Time deal: `client_payment_date + 7 days`
- Retainer deal: `client_payment_date + 30 days` per month

---

## Flow C — Monthly Payment Reconciliation (Cron)

**Trigger:** Scheduled — runs on the 1st of every month at 8:00 AM CT

**Steps:**
1. Query all Commission_Payout records where `status = Pending`
2. For each record:
   a. Check Stripe (or QBO) for client payment matching the linked deal for the relevant month
   b. **If client payment confirmed:**
      - Set `client_payment_confirmed = true`
      - Set `client_payment_date` to actual payment date
      - Set `eligible_release_date = client_payment_date + 30 days` (retainer) or `+ 7 days` (one-time)
      - If `today >= eligible_release_date`: move status to `Approved`, move Commission Pipeline stage to `Approved`
      - If `today < eligible_release_date`: leave as `Pending`, re-check next cycle
   c. **If client payment NOT confirmed:**
      - Leave status as `Pending`
      - If payment is more than 15 days overdue: alert Josh in Slack with deal name, partner name, and amount at risk
3. **Clawback check:** Query all `Approved` (not yet `Paid`) records where linked deal has been refunded or cancelled in Stripe/QBO
   - If refund detected: set `clawback_flag = true`, set `status = Voided`, log `clawback_reason`, notify Josh and partner via email

---

## Flow D — Weekly Payout Release (Manual Trigger)

**Trigger:** Josh triggers manually in HubSpot (bulk action on Approved records) or via n8n webhook with auth token

**Steps:**
1. Pull all Commission_Payout records where `status = Approved` AND `eligible_release_date <= today` AND `w9_on_file = true` on linked Partner
2. **W-9 gate:** If `w9_on_file = false` on any partner: skip those records, notify Josh with list of blocked payouts and missing W-9s
3. For each eligible record:
   a. Initiate payout via Stripe Connect or ACH (based on `payout_method` on Partner record)
   b. On success:
      - Set `status = Paid`
      - Set `payout_date = today`
      - Set `payout_reference = Stripe/ACH transaction ID`
      - Move Commission Pipeline stage to `Paid`
      - Increment `total_commission_paid` on Partner record
      - Send payout confirmation email to partner with amount, deal reference, and transaction ID
   c. On failure:
      - Log error, notify Josh immediately in Slack with failure reason
      - Do not change status — leave as `Approved` for retry
4. After all payouts processed: send Josh a summary in Slack (total paid out, number of partners paid, any failures or blocks)

---

## Flow E — Partner Onboarding

**Trigger:** Partner submits onboarding application form

**Tier 1 — Community Referral (Auto-Provisioned):**
1. Receive form submission
2. Create Partner record in HubSpot with `partner_tier = Community`, `partner_status = Active`
3. Generate unique partner referral link (UTM-tagged or form pre-fill with partner ID)
4. Send welcome email with referral link, program overview, and W-9 collection link
5. Notify Ari in Slack: new Tier 1 partner onboarded

**Tier 2 — Certified Affiliate (Approval Required):**
1. Receive form submission
2. Create Partner record with `partner_status = Pending`
3. Notify Jalen in Slack: new Tier 2 application, review required
4. Jalen reviews and approves/rejects in HubSpot
5. On approval: set `partner_status = Active`, trigger welcome email + referral link + W-9 collection
6. On rejection: send polite decline email, set `partner_status = Terminated`

**Tier 3 — Strategic Partner (Invite-Only):**
1. Application form requires valid `tier_3_invite_code`
2. n8n validates invite code against Partner records in HubSpot
3. If invalid: reject with message
4. If valid: create Partner record with `partner_tier = Strategic`, `partner_status = Pending`
5. Notify Josh directly in Slack: Tier 3 application received, manual review
6. Josh approves in HubSpot → `partner_status = Active`, welcome email + W-9 collection triggered

---

## Flow F — W-9 / Document Collection

**Trigger:** Partner onboarding approval (any tier)

**Steps:**
1. Send W-9 collection email to partner with link to Dropbox Sign (or SharePoint/M365 equivalent)
2. Set `w9_on_file = false` on Partner record
3. On document completion webhook from Dropbox Sign:
   - Set `w9_on_file = true`
   - Set `w9_document_link` to signed document URL
   - Notify Josh/Ari: W-9 received for [partner name]
4. At year-end (December 31): query all partners where `total_commission_paid >= 600`
   - Flag for 1099-NEC generation
   - Notify Josh with list for accounting handoff
