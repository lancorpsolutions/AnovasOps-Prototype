# Anovas Partner Network — HubSpot Data Model

## Overview

The Partner Network uses three layers in HubSpot:
1. A custom `Partner` object to track partner identity and tier
2. Custom properties on existing `Contact` and `Deal` objects to track referrals
3. A custom `Commission_Payout` object to track every individual payout obligation

---

## Custom Object: Partner

| Property | Type | Notes |
|---|---|---|
| `partner_id` | Auto-generated | Internal HubSpot ID |
| `partner_name` | Text | Full legal name |
| `partner_email` | Email | Primary contact |
| `partner_tier` | Enum | Community / Certified Affiliate / Strategic |
| `partner_status` | Enum | Pending / Active / Paused / Terminated |
| `onboarding_date` | Date | Date application approved and tier provisioned |
| `payout_method` | Enum | Stripe / ACH / PayPal |
| `payout_email` | Email | Where payouts are sent |
| `w9_on_file` | Boolean | Required before any payout is released |
| `w9_document_link` | Text/URL | Link to signed W-9 in SharePoint or Dropbox Sign |
| `total_referrals` | Number | Rollup count of linked referred deals |
| `total_commission_earned` | Currency | Rollup of all Commission_Payout.amount_owed |
| `total_commission_paid` | Currency | Rollup of all Commission_Payout where status = Paid |
| `attribution_window_days` | Number | Default: 60. Days from first contact to close for referral to count |
| `tier_3_invite_code` | Text | Unique code used during Tier 3 onboarding (invite-only) |

---

## Contact Object — Added Properties

| Property | Type | Notes |
|---|---|---|
| `referring_partner_id` | Lookup → Partner | Stamped at referral submission |
| `referral_source_channel` | Enum | Form / Manual / Link |
| `referral_date` | Date | Date referral was submitted |
| `referral_attribution_expires` | Date | referral_date + 60 days. After this date, no commission is owed |

---

## Deal Object — Added Properties

| Property | Type | Notes |
|---|---|---|
| `is_referred_deal` | Boolean | True if deal originated from a partner referral |
| `referring_partner_id` | Lookup → Partner | Copied from Contact at deal creation |
| `referral_date` | Date | Copied from Contact |
| `deal_structure` | Enum | One-Time / Retainer |
| `retainer_monthly_value` | Currency | Monthly contract value (retainer only) |
| `commission_tier_at_close` | Enum | Snapshot of partner tier at time of close — does not change if partner tier changes later |
| `commission_rate_first_payment` | Percent | Rate applied to first payment |
| `commission_recurring_months` | Number | 0 (one-time or Tier 1), 3 (Tier 2 retainer), 6 (Tier 3 retainer) |
| `commission_recurring_rate` | Percent | Rate applied to recurring months (10% for Tier 2 and 3 retainers) |
| `commission_total_expected` | Currency | Calculated total across all payout records |
| `commission_total_paid` | Currency | Rollup from Commission_Payout records |
| `attribution_valid` | Boolean | True if deal closed within 60-day attribution window |

---

## Custom Object: Commission_Payout

One record per payout obligation. A one-time deal generates 1 record. A Tier 2 retainer generates 3. A Tier 3 retainer generates 6.

| Property | Type | Notes |
|---|---|---|
| `payout_id` | Auto-generated | |
| `linked_deal_id` | Lookup → Deal | |
| `linked_partner_id` | Lookup → Partner | |
| `payout_month_number` | Number | 1 for one-time; 1–3 for Tier 2 retainer; 1–6 for Tier 3 retainer |
| `payout_type` | Enum | First-Payment / Recurring |
| `payout_period` | Date | Date the client payment is expected/confirmed |
| `client_payment_confirmed` | Boolean | Set to true by n8n when Stripe/QBO confirms payment |
| `client_payment_date` | Date | Actual date client payment was received |
| `eligible_release_date` | Date | client_payment_date + 30 days (retainer) or + 7 days (one-time) |
| `amount_owed` | Currency | Calculated commission for this payout |
| `status` | Enum | Pending / Approved / Paid / Voided |
| `approved_by` | Text | Josh's HubSpot user ID |
| `approved_date` | Date | |
| `payout_date` | Date | Date payout was actually sent |
| `payout_reference` | Text | Stripe/ACH transaction ID |
| `clawback_flag` | Boolean | Set to true if client refunds or cancels before payout is released |
| `clawback_reason` | Text | Notes if voided due to refund or cancellation |

---

## Pipelines

### Sales Pipeline (existing — no structural change)
Referred deals flow through the normal pipeline. The `is_referred_deal` flag and partner lookup are stamped on the deal record. No separate pipeline needed.

### Commission Pipeline (new)
Tracks the lifecycle of each Commission_Payout record.

| Stage | Description |
|---|---|
| Earned | Payout record created at deal close. Waiting for client payment confirmation. |
| Approved | Client payment confirmed + waiting window passed. Ready for Josh's weekly release. |
| Paid | Payout executed. Transaction reference logged. |
| Reconciled | Confirmed by accounting. Final state. |
| Voided | Clawback applied or payout cancelled. |
