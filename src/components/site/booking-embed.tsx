"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics/client";
import { BOOKING_URL } from "@/lib/site/config";

const CALENDLY_ORIGIN = "https://calendly.com";

/**
 * Inline Calendly scheduler. `meeting_booked` fires only on Calendly's
 * `calendly.event_scheduled` message, which is sent after the invitee
 * confirms a time. Opening this page is tracked separately as booking_view.
 */
export function BookingEmbed() {
  const params = useSearchParams();
  const from = params.get("from") ?? "book_page";
  const path = params.get("path") ?? undefined;
  const isCalendly = BOOKING_URL.startsWith(CALENDLY_ORIGIN);

  const src = useMemo(() => {
    const url = new URL(BOOKING_URL);
    url.searchParams.set("utm_source", "website");
    url.searchParams.set("utm_medium", "book_page");
    url.searchParams.set("utm_content", from.slice(0, 60));
    if (isCalendly && typeof window !== "undefined") {
      url.searchParams.set("embed_domain", window.location.hostname);
      url.searchParams.set("embed_type", "Inline");
      url.searchParams.set("hide_gdpr_banner", "1");
    }
    return url.toString();
  }, [from, isCalendly]);

  useEffect(() => {
    track("booking_view", { source: from, recommendation: path }, "booking_view");
    function onMessage(e: MessageEvent) {
      if (e.origin !== CALENDLY_ORIGIN) return;
      const data = e.data as { event?: string; payload?: { event?: { uri?: string } } };
      if (data?.event === "calendly.event_scheduled") {
        track("meeting_booked", { source: from, recommendation: path, tool: "calendly" }, data.payload?.event?.uri ?? "booked");
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [from, path]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <iframe
        title="Schedule a consultation with Anovas Integrated Systems"
        src={src}
        className="h-[720px] w-full"
        loading="lazy"
      />
      <p className="border-t border-gray-200 px-4 py-3 text-xs text-muted-ink">
        Scheduler not loading?{" "}
        <a href={src} target="_blank" rel="noopener noreferrer" className="font-medium text-navy underline">
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  );
}
