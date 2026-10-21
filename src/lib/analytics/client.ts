"use client";

// Browser-side analytics: consent state, attribution storage, and track().
// Every event is pushed to window.dataLayer (GTM-compatible) and, when GA4 has
// been loaded after consent, sent through gtag. Nothing is sent to a vendor
// before the visitor grants consent.

import { EVENTS, EventName, EventParams, ga4Name, sanitizeParams } from "./events";
import { AttributionSnapshot, mergeAttribution, touchFromVisit } from "./attribution";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    _hsq?: unknown[];
  }
}

export type ConsentState = "granted" | "denied" | "unset";

const CONSENT_KEY = "anovas-consent-v1";
const ATTRIBUTION_KEY = "anovas-attribution-v1";
export const CONSENT_EVENT = "anovas:consent-change";
export const OPEN_CONSENT_EVENT = "anovas:open-consent";

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage unavailable (private mode, blocked) — degrade silently
  }
}

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return "unset";
  const value = safeGet(CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : "unset";
}

export function setConsent(state: "granted" | "denied") {
  safeSet(CONSENT_KEY, state);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}

/** Records this visit's attribution. Called once per page load. */
export function captureAttribution(): AttributionSnapshot {
  if (typeof window === "undefined") return {};
  let existing: AttributionSnapshot = {};
  try {
    existing = JSON.parse(safeGet(ATTRIBUTION_KEY) ?? "{}") as AttributionSnapshot;
  } catch {
    existing = {};
  }
  const visit = touchFromVisit(window.location.href, document.referrer, window.location.hostname);
  const merged = mergeAttribution(existing, visit, window.location.href);
  safeSet(ATTRIBUTION_KEY, JSON.stringify(merged));
  return merged;
}

export function getAttribution(): AttributionSnapshot {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(safeGet(ATTRIBUTION_KEY) ?? "{}") as AttributionSnapshot;
  } catch {
    return {};
  }
}

/**
 * Links this browser's HubSpot visit history to the contact who just
 * submitted a form, so HubSpot can set original/latest traffic source. Runs
 * only when the visitor consented and the HubSpot tracking code is loaded.
 * The email goes to HubSpot (the CRM of record), never to analytics events.
 */
export function identifyHubspotVisitor(email: string) {
  if (typeof window === "undefined" || getConsent() !== "granted" || !window._hsq) return;
  window._hsq.push(["identify", { email }]);
  window._hsq.push(["trackPageView"]);
}

const firedOnce = new Set<string>();

/**
 * Sends an event. Pass `onceKey` to make it fire at most once per page
 * session for that key (e.g. a submission ID), which prevents duplicates
 * from re-renders or double clicks.
 */
export function track(event: EventName, params: EventParams = {}, onceKey?: string) {
  if (typeof window === "undefined") return;
  if (onceKey) {
    const key = `${event}:${onceKey}`;
    if (firedOnce.has(key)) return;
    firedOnce.add(key);
  }
  const clean = sanitizeParams({
    ...params,
    page_path: window.location.pathname,
    is_conversion: EVENTS[event].conversion,
  });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...clean });

  if (getConsent() === "granted" && typeof window.gtag === "function") {
    window.gtag("event", ga4Name(event), clean);
  }

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, clean);
  }
}
