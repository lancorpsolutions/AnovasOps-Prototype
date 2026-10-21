// Event taxonomy. See docs/analytics-and-conversion-spec.md.
// Pure module: no browser globals, so it can be unit tested.

export const EVENTS = {
  primary_cta_click: { ga4: "primary_cta_click", conversion: false },
  diagnostic_start: { ga4: "diagnostic_start", conversion: false },
  diagnostic_complete: { ga4: "diagnostic_complete", conversion: false },
  // GA4 recommended event name for a submitted lead.
  lead_form_submit: { ga4: "generate_lead", conversion: true },
  booking_view: { ga4: "booking_view", conversion: false },
  meeting_booked: { ga4: "meeting_booked", conversion: true },
  sample_report_view: { ga4: "sample_report_view", conversion: false },
  guide_download: { ga4: "file_download", conversion: false },
} as const;

export type EventName = keyof typeof EVENTS;
export type EventParams = Record<string, string | number | boolean | undefined>;

// Keys that must never reach an analytics vendor.
const PII_KEY_RE = /(e-?mail|phone|first_?name|last_?name|full_?name|^name$|company|message|address|hutk)/i;
const EMAIL_VALUE_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE_VALUE_RE = /(?:\+?\d[\s().-]?){7,}/;

/** Drops PII-looking keys and values, and caps string length. */
export function sanitizeParams(params: EventParams = {}): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || PII_KEY_RE.test(key)) continue;
    if (typeof value === "string") {
      if (EMAIL_VALUE_RE.test(value) || PHONE_VALUE_RE.test(value)) continue;
      out[key] = value.slice(0, 100);
    } else {
      out[key] = value;
    }
  }
  return out;
}

export function ga4Name(event: EventName): string {
  return EVENTS[event].ga4;
}
