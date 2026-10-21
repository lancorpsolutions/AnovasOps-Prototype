"use client";

import Script from "next/script";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  CONSENT_EVENT,
  OPEN_CONSENT_EVENT,
  ConsentState,
  captureAttribution,
  getConsent,
  setConsent,
} from "@/lib/analytics/client";

// Validated because they're interpolated into script tags.
const GA_ID = /^G-[A-Z0-9]{4,20}$/.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "")
  ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  : undefined;
const HUBSPOT_PORTAL = /^\d{3,12}$/.test(process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? "")
  ? process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID
  : undefined;
// Portal 245271977 is hosted in na2 (app-na2.hubspot.com).
const HUBSPOT_SCRIPT_HOST = process.env.NEXT_PUBLIC_HUBSPOT_REGION === "na1" ? "js.hs-scripts.com" : "js-na2.hs-scripts.com";
const VENDORS_CONFIGURED = Boolean(GA_ID || HUBSPOT_PORTAL);

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, getConsent, () => "unset");
}

/**
 * Captures attribution on every page load and loads GA4 / HubSpot tracking
 * only after the visitor accepts. With no vendor IDs configured nothing
 * external is ever loaded and the banner stays hidden.
 */
export function AnalyticsProvider() {
  const consent = useConsent();
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  useEffect(() => {
    const open = () => setSettingsOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  const inApp = pathname?.startsWith("/anovasos");
  const showBanner = !inApp && (settingsOpen || (VENDORS_CONFIGURED && consent === "unset"));
  const granted = consent === "granted";

  function choose(state: "granted" | "denied") {
    setConsent(state);
    setSettingsOpen(false);
    if (state === "denied" && (GA_ID || HUBSPOT_PORTAL)) {
      // Already-loaded scripts can't be unloaded; a reload guarantees they stop.
      if (window.gtag || window._hsq) window.location.reload();
    }
  }

  return (
    <>
      {granted && GA_ID && (
        <>
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        </>
      )}
      {granted && HUBSPOT_PORTAL && (
        <Script id="hs-script-loader" src={`https://${HUBSPOT_SCRIPT_HOST}/${HUBSPOT_PORTAL}.js`} strategy="afterInteractive" async defer />
      )}

      {showBanner && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-xl rounded-2xl border border-white/10 bg-ink p-5 text-white shadow-2xl sm:inset-x-auto sm:right-4 sm:bottom-4"
        >
          <p className="text-sm font-semibold">Analytics cookies</p>
          {VENDORS_CONFIGURED ? (
            <p className="mt-1.5 text-sm leading-relaxed text-white/70">
              With your permission we use analytics cookies to see which pages help people and to
              connect your form submissions to how you found us. No advertising cookies.{" "}
              <Link href="/cookies" className="underline hover:text-white">Cookie policy</Link>
            </p>
          ) : (
            <p className="mt-1.5 text-sm leading-relaxed text-white/70">
              This site doesn&apos;t currently load any analytics or advertising cookies. You can
              still set a preference that will apply if that changes.
            </p>
          )}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="h-9 rounded-md bg-orange px-4 text-sm font-medium text-white hover:bg-orange-light"
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="h-9 rounded-md border border-white/25 px-4 text-sm font-medium text-white hover:bg-white/10"
            >
              Decline
            </button>
          </div>
          {consent !== "unset" && (
            <p className="mt-3 text-xs text-white/50">Current choice: {consent === "granted" ? "accepted" : "declined"}.</p>
          )}
        </div>
      )}
    </>
  );
}
