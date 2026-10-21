"use client";

import { getAttribution, identifyHubspotVisitor, track } from "@/lib/analytics/client";
import type { DiagnosticResult, LeadOffer } from "./schema";

export interface LeadFields {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  industry?: string;
  message?: string;
  diagnostic?: DiagnosticResult;
  /** Honeypot value; always empty for real visitors. */
  website?: string;
}

export class LeadSubmitError extends Error {
  fieldErrors: Record<string, string>;
  constructor(message: string, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.fieldErrors = fieldErrors;
  }
}

export function newSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/**
 * Posts a lead and fires `lead_form_submit` only after the server accepts it.
 * Throws LeadSubmitError with a visitor-safe message on failure.
 */
export async function submitLead(offer: LeadOffer, fields: LeadFields, submissionId: string) {
  let res: Response;
  try {
    res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...fields,
        offer,
        submissionId,
        attribution: getAttribution(),
        pageUri: window.location.pathname,
      }),
    });
  } catch {
    throw new LeadSubmitError("We couldn't reach our server. Check your connection and try again.");
  }

  let data: { ok?: boolean; crm?: string; errors?: Record<string, string> } = {};
  try {
    data = await res.json();
  } catch {
    // non-JSON error page
  }

  if (!res.ok || !data.ok) {
    const errors = data.errors ?? {};
    const message =
      errors.form ??
      (Object.keys(errors).length ? "Please check the highlighted fields." : "Something went wrong on our side. Please try again.");
    throw new LeadSubmitError(message, errors);
  }

  track("lead_form_submit", { offer, crm_status: data.crm ?? "unknown" }, submissionId);
  identifyHubspotVisitor(fields.email);
  return data;
}
