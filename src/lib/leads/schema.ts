// Shared lead schema used by the browser forms and the /api/leads route.
// Kept free of framework imports (relative imports only) so it can be unit
// tested with the Node test runner.

import type { AttributionSnapshot, Touch } from "../analytics/attribution";

export const LEAD_OFFERS = {
  diagnostic: { label: "Business Systems Diagnostic", followUp: true },
  consultation: { label: "Consultation request", followUp: true },
  "autopilot-inquiry": { label: "Anovas Autopilot inquiry", followUp: true },
  contact: { label: "Contact form", followUp: true },
  "revenue-leaks-guide": { label: "Revenue Leaks Guide download", followUp: false },
} as const;

export type LeadOffer = keyof typeof LEAD_OFFERS;

export const PILLARS = ["A", "R", "O", "S"] as const;
export type Pillar = (typeof PILLARS)[number];

export interface DiagnosticResult {
  score: number;
  band: string;
  pillars: Record<Pillar, number>;
  recommendation: string;
}

export interface LeadInput {
  offer: LeadOffer;
  submissionId: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  industry?: string;
  message?: string;
  diagnostic?: DiagnosticResult;
  attribution?: AttributionSnapshot;
  pageUri?: string;
}

export type ValidationResult =
  | { ok: true; data: LeadInput }
  | { ok: false; errors: Record<string, string>; spam?: boolean };

const LIMITS = { name: 120, email: 254, company: 160, phone: 40, industry: 80, message: 4000 };
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const SUBMISSION_ID_RE = /^[a-zA-Z0-9-]{8,64}$/;

/** Trims, strips control characters, and caps length. Returns undefined for empty input. */
export function cleanText(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  if (!cleaned) return undefined;
  return cleaned.slice(0, max);
}

function cleanTouch(value: unknown): Touch | undefined {
  if (!value || typeof value !== "object") return undefined;
  const src = value as Record<string, unknown>;
  const keys: (keyof Touch)[] = [
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
    "gclid", "fbclid", "msclkid", "referrer", "landing_page", "captured_at",
  ];
  const out: Touch = {};
  for (const key of keys) {
    const v = cleanText(src[key], 500);
    if (v) out[key] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

function cleanDiagnostic(value: unknown): DiagnosticResult | undefined {
  if (!value || typeof value !== "object") return undefined;
  const src = value as Record<string, unknown>;
  const score = Number(src.score);
  if (!Number.isFinite(score) || score < 0 || score > 100) return undefined;
  const rawPillars = (src.pillars ?? {}) as Record<string, unknown>;
  const pillars = {} as Record<Pillar, number>;
  for (const p of PILLARS) {
    const n = Number(rawPillars[p]);
    if (!Number.isFinite(n) || n < 0 || n > 4) return undefined;
    pillars[p] = Math.round(n * 10) / 10;
  }
  return {
    score: Math.round(score),
    band: cleanText(src.band, 60) ?? "",
    pillars,
    recommendation: cleanText(src.recommendation, 60) ?? "",
  };
}

export function validateLead(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object") return { ok: false, errors: { form: "Invalid request." } };
  const body = raw as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return { ok: false, errors: { form: "Rejected." }, spam: true };
  }

  const errors: Record<string, string> = {};
  const offer = body.offer as LeadOffer;
  if (typeof offer !== "string" || !Object.hasOwn(LEAD_OFFERS, offer)) errors.offer = "Unknown form.";

  const name = cleanText(body.name, LIMITS.name);
  if (!name || name.length < 2) errors.name = "Please enter your name.";

  const email = cleanText(body.email, LIMITS.email)?.toLowerCase();
  if (!email || !EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";

  const submissionId = cleanText(body.submissionId, 64);
  if (!submissionId || !SUBMISSION_ID_RE.test(submissionId)) errors.form = "Invalid submission.";

  const phone = cleanText(body.phone, LIMITS.phone);
  if (phone && !/^[0-9+().\-\s x]{7,40}$/i.test(phone)) errors.phone = "Please enter a valid phone number.";

  const message = cleanText(body.message, LIMITS.message);
  if ((offer === "contact" || offer === "consultation") && !message) {
    errors.message = "Tell us a little about what you need.";
  }

  if (Object.keys(errors).length) return { ok: false, errors };

  const attributionRaw = (body.attribution ?? {}) as Record<string, unknown>;
  const first = cleanTouch(attributionRaw.first);
  const last = cleanTouch(attributionRaw.last);

  return {
    ok: true,
    data: {
      offer,
      submissionId: submissionId!,
      name: name!,
      email: email!,
      company: cleanText(body.company, LIMITS.company),
      phone,
      industry: cleanText(body.industry, LIMITS.industry),
      message,
      diagnostic: offer === "diagnostic" ? cleanDiagnostic(body.diagnostic) : undefined,
      attribution: first || last ? { first, last } : undefined,
      pageUri: cleanText(body.pageUri, 500),
    },
  };
}

export function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return { firstname: parts[0] ?? fullName, lastname: parts.slice(1).join(" ") };
}
