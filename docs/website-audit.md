# Anovas Integrated Systems — Website Audit

Audit date: 2026-10-21. Branch: `ccr-29101c74-13vtfg` (clean working tree at start, HEAD `3b722d4`).

Legend: **[V]** verified from repository code, command output, or a read-only HubSpot API query ·
**[I]** reasonable inference · **[U]** unknown / not verifiable from this environment.

---

## 1. Stack and hosting

| Item | Finding | Status |
|---|---|---|
| Framework | Next.js 16.2.9 (App Router, Turbopack), React 19.2.4, TypeScript strict | [V] |
| Styling | Tailwind CSS v4 (`@theme inline` tokens in `src/app/globals.css`), `class-variance-authority`, `tailwind-merge` | [V] |
| UI primitives | Hand-rolled `src/components/ui/*` (Button, Input, Card, Badge, Modal, Tabs, Toast); Radix packages installed | [V] |
| Icons | `lucide-react` | [V] |
| Auth / data (AnovasOS app) | Supabase (`@supabase/ssr`), `src/proxy.ts` (Next 16 replacement for middleware) guards `/anovasos/*` | [V] |
| Payments | PayPal subscriptions on `/anovasos/signup` (`src/lib/paypal.ts`, `/api/paypal/verify-subscription`) | [V] |
| Hosting | Vercel. Evidence: `anovas-autopilot/vercel.json`, host-based redirect for `anovas-ops-prototype.vercel.app` in `next.config.ts`, git history ("Trigger Vercel deploy") | [I] (strong) |
| Production domain | `https://anovasintegratedsystems.com` (default of `NEXT_PUBLIC_SITE_URL`) — the brief says `www.`; canonical host is not confirmed | [U] |
| Staging / preview | Vercel preview deployments likely exist per branch; none reachable from this session | [U] |
| Tests | No test framework or test files existed | [V] |
| Monorepo | `anovas-autopilot/` is a separate Next app (own `vercel.json`) — a static demo dashboard with hard-coded sample leads | [V] |

Environment variables referenced (names only): `HUBSPOT_ACCESS_TOKEN`, `HUBSPOT_LEAD_MAGNET_PROPERTY`,
`N8N_AUTOPILOT_LEAD_WEBHOOK_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_API_BASE`,
`NEXT_PUBLIC_PAYPAL_CLIENT_ID`, `NEXT_PUBLIC_PAYPAL_PLAN_*_ID`. `N8N_AUTOPILOT_LEAD_WEBHOOK_URL` and the
Supabase variables were missing from `.env.example`. [V]

## 2. Baseline quality gates (before changes)

| Check | Result | Status |
|---|---|---|
| `npx tsc --noEmit` | Pass | [V] |
| `npm run build` | Pass (34 static pages + dynamic dashboard routes) | [V] |
| `npx eslint` | **21 errors, 7 warnings — all in the AnovasOS dashboard** (`src/lib/store.tsx` `no-explicit-any`, `react-hooks/set-state-in-effect` in sidebar/splash/theme-provider). None in marketing pages. Left untouched as out of scope; recorded as debt. | [V] |
| Browser render (Playwright/Chromium, prod build) | Home renders with no console errors at 1440px and 390px | [V] |

## 3. Public pages and conversion paths

Routes: `/`, `/about`, `/services` (+ 12 service pages), `/services/anovasos`, `/services/autopilot`,
`/services/ai-agents`, `/aros-growth-score`, `/revenue-leaks-guide`, `/faq`, `/blog`, `/contact`,
`/pricing` (redirects to `/services`), `/terms`, `/privacy`, `/cookies`, `/anovasos/login`, `/anovasos/signup`.

| Conversion path | Mechanism | Finding |
|---|---|---|
| AROS Growth Score (10-question diagnostic) | `GrowthScoreQuiz` → `POST /api/contact` | Strong asset. Asks for 6 PII fields **before** the first question (high friction). Submission is fire-and-forget; failure is silent. [V] |
| Contact form | `ContactForm` → `/api/contact` | Shows "Thanks" even when the server returns 400/500 — `fetch` does not throw on HTTP errors and `res.ok` is never checked. [V] |
| Autopilot "Admin Audit" form | `AutopilotInquiryForm` → `/api/contact` | Same `res.ok` bug. Button says "Book My Autopilot Demo" but nothing is booked; it only sends an inquiry. [V] |
| Revenue Leaks Guide (PDF lead magnet) | `LeadCaptureForm` → `/api/lead-magnet` | Works; the PDF unlocks even when CRM sync fails (good UX). [V] |
| Discovery call | External Calendly link `calendly.com/d/cysq-pnv-zpx/discovery-call` with UTM params, opened in a new tab | No way to confirm a booking happened; no on-site booking page. [V] |
| "Try the Live Demo" (AnovasOS page, ×2) | Links to `/anovasos` | **Misleading CTA**: `/anovasos` is behind Supabase auth, so visitors get redirected to a login screen. [V] |
| Header CTA "Book Free Audit" | Links to `/aros-growth-score` | Label promises a booked audit, destination is a self-serve quiz. [V] |

## 4. HubSpot integration (verified against the live portal with read-only queries)

Portal: account type **STANDARD**, seat type `core`, timezone America/Chicago. [V] Subscription tier
(Starter/Pro/Enterprise per hub) is **not** exposed by that call. [U]

| Finding | Status |
|---|---|
| Integration is the CRM v3 contacts API with a Private App token (`HUBSPOT_ACCESS_TOKEN`), server-side only. Token is never sent to the client. | [V] |
| Upsert = `PATCH /contacts/{email}?idProperty=email`, then `POST` on 404. Dedupes by email. | [V] |
| **Critical: `/api/contact` writes `lead_source`, which does not exist in the portal** (`propertiesNotFound: ["lead_source"]`). HubSpot rejects the whole request with a 400, so **every Growth Score and Autopilot inquiry fails to sync** whenever the token is set. The error is caught and the client is told `ok: true`. Generic contact messages are unaffected. | [V] |
| `/api/contact` puts the message and diagnostic results in `hs_content_membership_notes` ("Membership Notes", meant for CMS memberships). Sales would not see it in the normal place. The standard `message` property exists and is the right place. | [V] |
| `/api/lead-magnet` writes the guide title into `hs_analytics_last_touch_converting_campaign`, a HubSpot analytics property. Whether the API accepts writes to it is unknown, and using it overwrites campaign attribution. | [V] property exists / [U] writability |
| Sets `lifecyclestage=lead` on every PATCH. HubSpot does not let lifecycle stage move backwards, so a PATCH on an existing customer may be rejected or have no effect. | [I] |
| No custom properties exist for AROS score, conversion offer, or UTM values (searched `aros`, `score`, `utm`, `source`, `lead_magnet`). | [V] |
| No notes, tasks, owner assignment, company or deal associations. | [V] |
| No HubSpot tracking code (`hs-scripts.com`) on the site, so HubSpot's own original/latest traffic-source properties are never set for website leads. | [V] |
| No retries, no input validation beyond presence checks, no spam protection, no rate limiting. | [V] |
| An n8n webhook (`N8N_AUTOPILOT_LEAD_WEBHOOK_URL`) fires for Autopilot/diagnostic inquiries without being awaited. On serverless hosts an un-awaited fetch can be cut off when the response returns. | [V] code / [I] runtime behavior |
| Whether `HUBSPOT_ACCESS_TOKEN` is actually set in production. | [U] |

## 5. Analytics, attribution, consent

| Finding | Status |
|---|---|
| **No analytics installed**: no GA4/gtag, GTM, HubSpot tracking, Vercel Analytics, Clarity, Meta pixel, or PostHog anywhere in the code. | [V] |
| The cookie policy lists HubSpot and "Microsoft — Website analytics" and says a consent banner will be shown "where required". None of these exist in code. The policy describes tracking that isn't deployed. | [V] |
| No UTM / click-ID capture. Calendly links carry hard-coded `utm_source=website` only. | [V] |
| No conversion events of any kind. Traffic, conversion rates, and baselines are **unknown**; none have been invented. | [V] / [U] |

## 6. Product truth and content risks

| Finding | Status |
|---|---|
| **AnovasOS is described two different ways.** Homepage, `/services`, FAQ, and `llms.txt` call it a marketing platform ("demand generation, content creation, campaign management, SEO, lead nurturing, consumer intelligence"). The product page and the actual application (`src/app/(dashboard)/anovasos/*`) are an operations command center: sales pipeline, jobs, scheduling, crews, invoices, automation rules, SOPs, operational risks, reports, integrations catalog. | [V] |
| `/services` claims "AI agents handling 70%+ of execution" for AnovasOS. Nothing in the code backs this up. | [V] claim present / [U] truth |
| `/services/autopilot` claims "The missed-call text-back alone typically recovers enough jobs in month one to cover the fee" and "Most owners spend less than 2 hours total on setup". Both are unsubstantiated outcome claims. | [V] present / [U] truth |
| The AnovasOS integrations page lists ServiceTitan, QuickBooks, HubSpot, Salesforce, etc. as connectable. Whether these connections actually work is unverified, so the marketing site should not advertise them. | [U] |
| The Autopilot sub-app (`anovas-autopilot/`) is a sample-data dashboard. Useful as illustration, not proof. | [V] |
| No testimonials, logos, or case studies. None should be invented. | [V] |
| Company is Little Rock, AR in JSON-LD but "North Little Rock" in `llms.txt`. | [V] |

## 7. Design and UX

| Finding | Status |
|---|---|
| Brand assets: phoenix icon (`/branding/anovas-phoenix-icon.png`, 46 KB) and full logo PNG (2.2 MB, used only in JSON-LD). Palette is navy `#0f1b2d` and burnt orange `#c9622d`, with a sky-blue accent `#1F9FE0` used only in the score ring. These are recognizable and kept. | [V] |
| Every page repeats the same centered navy hero with a dot grid, then rows of identical small cards. Type is small (`text-xs`/`text-sm` body copy), and there's no product visual anywhere on the homepage. | [V] (screenshot) |
| **Mobile nav is broken**: all links are crammed into one row with horizontal overflow; at 390px "FAQ" is clipped and "Contact" is off-screen. | [V] (screenshot) |
| Dropdowns open on hover/click with no `aria-expanded`, no Escape handling, and no visible focus styles. | [V] |
| Buttons and links have no `focus-visible` ring. Inputs only have `focus:` styles. | [V] |
| No `prefers-reduced-motion` handling. | [V] |
| The Tailwind class `to-blue` used in the quiz progress bar has no matching color token, so the gradient falls back to transparent. | [V] |
| The homepage has two primary CTAs competing (Services vs Guide) and no diagnostic in the hero. | [V] |

## 8. SEO

| Finding | Status |
|---|---|
| Per-page metadata, canonical URLs, and Organization/SoftwareApplication JSON-LD exist. | [V] |
| The sitemap omits `/faq`, `/services/ai-agents`, and all 9 professional-service pages. | [V] |
| `robots.ts` correctly disallows the authenticated app. | [V] |

## 9. Priorities (what this pass addresses)

1. **P0** Fix HubSpot sync failures (non-existent property), stop false-success UI, validate input, add spam protection and retries.
2. **P0** Add a consent-aware analytics layer, the event taxonomy, and attribution capture.
3. **P1** Homepage rebuild with the value proposition, diagnostic CTA, and a labeled interactive workflow demo.
4. **P1** Reposition the AROS Growth Score as the Business Systems Diagnostic: questions first, contact details after.
5. **P1** On-site booking page with confirmed-booking tracking, plus a sample diagnostic report.
6. **P1** Mobile navigation, focus states, reduced motion.
7. **P2** Offering-page clarity (who / what / software vs service / what you provide), remove unsupported claims, fix the misleading "Live Demo" CTA.
8. **P2** Sitemap completeness, `.env.example` completeness, tests.

## 10. Found during implementation

| Finding | Status | Resolution |
|---|---|---|
| **AROS scoring floor**: each answer scores 1–4 and the overall was `sum / 40 × 100`, so the minimum possible score was 25 and "Foundation Stage" (≤ 25) was only reachable by answering A on every question. | [V] | Normalized to a true 0–100 (`(sum − 10) / 30`). Scores before and after this change aren't comparable. No historical scores reached HubSpot anyway, because of the `lead_source` bug. |
| The diagnostic asked for six contact fields before the first question. | [V] | Questions first, contact second, phone optional, honest "skip" link. |
| The cookie policy table overflowed at 390 px and listed tools not on the site. | [V] | Table made scrollable and updated to reflect actual/conditional scripts. **Needs legal review.** |
| Legacy grey text (`gray-400/500` on `#f4f5f7`) fails WCAG AA on the offering pages and the guide. | [V] (axe) | Fixed on the pages touched. Other professional-service pages still use it (see follow-ups). |
| Company city differs: "Little Rock" (JSON-LD, new footer and FAQ copy) vs "North Little Rock" (`llms.txt`). | [U] | Left as is; owner to confirm, then make all three match. |
