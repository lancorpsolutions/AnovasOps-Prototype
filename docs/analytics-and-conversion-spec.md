# Analytics & Conversion Measurement Spec

Status key: **Implemented**: code is in the repo and verified in a local browser. **Needs account
config**: code is ready but does nothing until an ID or token is set. **HubSpot-side**: configured
in HubSpot, not in website code.

No traffic, conversion, or revenue baseline exists. None has been estimated or invented. The first
30 days after launch **are** the baseline.

## 1. Architecture

```
Browser                                   Server (/api/leads)                HubSpot (system of record)
───────                                   ───────────────────                ──────────────────────────
captureAttribution()  → localStorage      validateLead()                     Contact (upsert by email)
track(event)          → window.dataLayer  rate limit + dedupe (submissionId)  Note (full context)
   └─ consent granted → gtag (GA4)        syncContact()  ─────────────────▶  Task (if owner configured)
submitLead()          → POST /api/leads   after(): note, task, fallback,     Lifecycle → Deals → Revenue
identifyHubspotVisitor (consent only)              n8n webhook                 (sales-owned stages)
```

* `src/lib/analytics/events.ts`: taxonomy, GA4 name mapping, PII stripping.
* `src/lib/analytics/client.ts`: consent state, attribution storage, `track()` with de-duplication.
* `src/components/analytics/analytics-provider.tsx`: consent banner, GA4 and HubSpot loaders.
* `src/lib/leads/*`: schema, HubSpot client, pipeline, browser submit helper.

## 2. Event taxonomy (browser-side)

Every event is pushed to `window.dataLayer` as `{ event, ...params, page_path, is_conversion }`.
When the visitor has accepted analytics and GA4 is configured, it's also sent via
`gtag('event', <ga4 name>, params)`.

| Internal name | GA4 name | Fires when | Key params | Conversion? | Status |
|---|---|---|---|---|---|
| `primary_cta_click` | `primary_cta_click` | A tracked CTA link is clicked (intent only, not a conversion) | `cta_location`, `cta_id` | No | Implemented |
| `diagnostic_start` | `diagnostic_start` | The first diagnostic question is answered | `diagnostic` | No | Implemented |
| `diagnostic_complete` | `diagnostic_complete` | The 10th question is answered | `score`, `score_band`, `recommendation` | No (micro) | Implemented |
| `lead_form_submit` | `generate_lead` (GA4 recommended) | **After** `/api/leads` returns `ok: true`, never on click | `offer`, `crm_status` | **Yes** | Implemented |
| `booking_view` | `booking_view` | `/book` is opened (a page visit, **not** a booking) | `source`, `recommendation` | No | Implemented |
| `meeting_booked` | `meeting_booked` | Calendly posts `calendly.event_scheduled` (invitee confirmed a time) | `source`, `tool` | **Yes** | Implemented (Calendly only) |
| `sample_report_view` | `sample_report_view` | The sample report page is viewed | none | No | Implemented |
| `guide_download` | `file_download` (GA4 recommended) | The guide PDF link is clicked after unlocking | `file_name` | No | Implemented |
| `qualified_lead` | n/a | Sales sets lifecycle stage → SQL in HubSpot | n/a | **Yes** (pipeline) | HubSpot-side |
| `deal_created` | n/a | A deal is created and associated with the contact | n/a | Pipeline | HubSpot-side |
| `deal_won` | n/a | Deal stage → Closed Won, with amount | n/a | **Revenue** | HubSpot-side |

`offer` values: `diagnostic`, `consultation`, `autopilot-inquiry`, `contact`, `revenue-leaks-guide`.

### Rules enforced in code
* **No PII in events.** `sanitizeParams` drops keys matching email/phone/name/company/message/address
  and any value that looks like an email or phone number (unit tested). The browser smoke test asserts
  that the test email and company never appear in `dataLayer`.
* **No duplicates.** `track(..., onceKey)` fires at most once per key per page session
  (`submissionId` for leads, the Calendly event URI for bookings). The server also ignores a repeated
  `submissionId`.
* **Success-only conversions.** `lead_form_submit` fires inside `submitLead()` only after a 2xx
  `ok: true` response. The smoke test asserts it does **not** fire on a 500.
* **Consent before vendors.** GA4 and the HubSpot tracking code load only after "Accept analytics".
  Declining reloads the page if a vendor had already loaded. With no IDs set, no third-party scripts
  load at all (verified).

### Browser vs server truth
| Signal | Source of truth |
|---|---|
| Lead received | Server: `/api/leads` 200 with `crm: "synced"` and the HubSpot contact + note |
| `lead_form_submit` in GA4 | Browser, consented visitors only, so it will undercount real leads |
| Meeting booked | Calendly (and HubSpot, if the Calendly↔HubSpot integration is enabled). `meeting_booked` in GA4 is browser-side and consent-dependent. |
| Qualified, deal, revenue | HubSpot only |

Report lead and revenue numbers from HubSpot. Use GA4 for channel and page-level conversion *rates*.

## 3. Attribution

Captured on every page load (`captureAttribution`), stored in `localStorage` key `anovas-attribution-v1`:

* **First touch**: set once, never overwritten. A direct first visit is recorded as `(direct) / (none)`.
* **Latest touch**: updated whenever a visit carries UTM/click IDs or an external referrer. Internal
  navigation and direct return visits don't overwrite it.
* Fields: `utm_source/medium/campaign/term/content`, `gclid`, `fbclid`, `msclkid`, referrer host,
  landing page **path only** (query strings can carry PII), timestamp.

Sent to the server only when a visitor submits a form. Where it lands in HubSpot:

| Data | Default (no setup) | With `HUBSPOT_CUSTOM_PROPERTIES=enabled` |
|---|---|---|
| First/latest touch summary | In the contact's **note** | Also `anovas_first_utm_*`, `anovas_last_utm_*`, `anovas_first_landing_page` |
| gclid | Note only | `anovas_gclid` (enables Google Ads offline conversion import) |
| Offer converted on | Note | `anovas_last_conversion_offer`, `anovas_last_conversion_date` |
| Diagnostic score | Note | `anovas_diagnostic_score`, `_band`, `_recommendation` |
| HubSpot Original/Latest Source | **Not set** for website leads | Set automatically by HubSpot once `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` is configured and the visitor consents (`_hsq identify` after submit) |

First-touch custom properties are written only when the contact is *created* by the website, so an
existing contact's original attribution is never overwritten.

## 4. Funnel and KPI definitions

| Stage | Definition | Where measured |
|---|---|---|
| Visitor | Session on the marketing site | GA4 (consented) |
| Diagnostic start rate | `diagnostic_start` ÷ diagnostic page views | GA4 |
| Diagnostic completion rate | `diagnostic_complete` ÷ `diagnostic_start` | GA4 |
| Lead | Contact created/updated by `/api/leads` with a follow-up offer | HubSpot (filter by note "Website conversion" or `anovas_last_conversion_offer`) |
| Diagnostic → lead rate | `lead_form_submit{offer=diagnostic}` ÷ `diagnostic_complete` | GA4 |
| Meeting booked | Calendly booking | Calendly / HubSpot meetings |
| Qualified lead (SQL) | Lifecycle stage = Sales Qualified Lead, set by a person after a call | HubSpot |
| Opportunity | Deal created, lifecycle = Opportunity | HubSpot |
| Won revenue | Deal Closed Won amount (setup + first-year recurring, define once and keep it fixed) | HubSpot |
| CAC (when measurable) | Paid media + tooling spend for a channel ÷ won customers whose first touch = that channel | HubSpot attribution + ad spend; needs `anovas_first_utm_source` or HubSpot Original Source |

### Recommended HubSpot qualification flow (HubSpot-side, not automated by the site)
1. Website lead arrives: lifecycle `lead`, lead status `NEW`, owner (if configured), follow-up task due next business day.
2. Rep works it → lead status `ATTEMPTED_TO_CONTACT` / `CONNECTED`.
3. After a consultation: **qualified** → lifecycle `salesqualifiedlead` (this *is* `qualified_lead`).
4. Proposal → create a **deal** in the sales pipeline associated with the contact (`deal_created`).
5. Closed Won with amount (`deal_won`). The revenue-by-source report uses the deal's associated
   contact's original source.

Deals are deliberately not auto-created by the website. Auto-creating a deal for every form would
inflate pipeline and break win-rate reporting.

## 5. External configuration required (not done; no access or authorization)

| Item | Owner action | Unlocks |
|---|---|---|
| `HUBSPOT_ACCESS_TOKEN` in Vercel (Production + Preview) | Create Private App with `crm.objects.contacts.read/write` | Any CRM sync at all |
| `HUBSPOT_DEFAULT_OWNER_ID` | Look up the owner ID in HubSpot | Owner assignment + follow-up tasks |
| Run `npm run setup:hubspot-properties -- --apply`, then set `HUBSPOT_CUSTOM_PROPERTIES=enabled` | Needs `crm.schemas.contacts.write` temporarily | Reportable offer / score / UTM properties |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Create a GA4 web stream; mark `generate_lead` and `meeting_booked` as key events | GA4 reporting |
| `NEXT_PUBLIC_HUBSPOT_PORTAL_ID=245271977` | In HubSpot, turn off "Collected forms" for this site, or rely on the `data-hs-do-not-collect` attribute already on every form | HubSpot Original Source, page-view history |
| Calendly ↔ HubSpot integration (Calendly plan dependent) | Connect in Calendly | Server-side booking record in HubSpot |
| `LEAD_FALLBACK_WEBHOOK_URL` | Point at an n8n/Zapier hook that emails the team | No lead loss when HubSpot is down or misconfigured |
| Legal review of `/cookies` and `/privacy` | Counsel | Confirm consent model (US opt-in banner, no ad cookies) fits target markets |

## 6. Verification performed

| Check | Result |
|---|---|
| Events fire exactly once through the full diagnostic, with no PII in `dataLayer` | Pass (Playwright, `tests/e2e/smoke.mjs`) |
| `lead_form_submit` not fired when the API returns 500 | Pass |
| No third-party scripts load without configured IDs | Pass |
| PII sanitizer, attribution merge, GA4 name mapping | Pass (unit tests) |
| GA4 receiving events | **Not verified**: no measurement ID available |
| HubSpot contact/note/task creation | **Not verified live**: no token in this environment; test leads were never sent to the production portal. Properties used by default were confirmed to exist via a read-only query. |
| Calendly `event_scheduled` message | **Not verified**: needs a real booking; message format per Calendly's embed docs |
