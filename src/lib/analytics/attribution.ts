// First-touch / last-touch attribution. Pure functions; browser storage lives
// in attribution-client.ts.

export interface Touch {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  referrer?: string;
  landing_page?: string;
  captured_at?: string;
}

export interface AttributionSnapshot {
  first?: Touch;
  last?: Touch;
}

const CAMPAIGN_KEYS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "gclid", "fbclid", "msclkid",
] as const;

/**
 * Builds a touch from the current URL and referrer. Returns null when the
 * visit carries no campaign parameters and no external referrer — an
 * internal navigation or a direct visit shouldn't overwrite last touch.
 */
export function touchFromVisit(url: string, referrer: string, siteHost: string, now = new Date()): Touch | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const touch: Touch = {};
  for (const key of CAMPAIGN_KEYS) {
    const value = parsed.searchParams.get(key);
    if (value) touch[key] = value.slice(0, 200);
  }

  let externalReferrer: string | undefined;
  if (referrer) {
    try {
      const refHost = new URL(referrer).hostname.replace(/^www\./, "");
      if (refHost && refHost !== siteHost.replace(/^www\./, "")) externalReferrer = refHost;
    } catch {
      // ignore malformed referrers
    }
  }

  const hasCampaign = Object.keys(touch).length > 0;
  if (!hasCampaign && !externalReferrer) return null;

  if (externalReferrer) touch.referrer = externalReferrer;
  // Only the path is kept: query strings can carry PII (e.g. ?email=).
  touch.landing_page = parsed.pathname;
  touch.captured_at = now.toISOString();
  return touch;
}

/** Direct-visit touch, used only when no first touch exists yet. */
export function directTouch(url: string, now = new Date()): Touch {
  let path = "/";
  try {
    path = new URL(url).pathname;
  } catch {
    // keep default
  }
  return { utm_source: "(direct)", utm_medium: "(none)", landing_page: path, captured_at: now.toISOString() };
}

/** First touch is set once and never overwritten; last touch moves on every attributable visit. */
export function mergeAttribution(existing: AttributionSnapshot, visit: Touch | null, url: string, now = new Date()): AttributionSnapshot {
  const first = existing.first ?? visit ?? directTouch(url, now);
  const last = visit ?? existing.last ?? first;
  return { first, last };
}

/** Short human-readable source label, e.g. "google / cpc / spring-promo". */
export function describeTouch(touch?: Touch): string {
  if (!touch) return "unknown";
  const parts = [touch.utm_source ?? touch.referrer ?? (touch.gclid ? "google (gclid)" : undefined), touch.utm_medium, touch.utm_campaign]
    .filter(Boolean);
  return parts.length ? parts.join(" / ") : "unknown";
}
