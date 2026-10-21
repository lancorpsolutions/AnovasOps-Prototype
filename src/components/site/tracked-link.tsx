"use client";

import Link from "next/link";
import { track } from "@/lib/analytics/client";
import type { EventName } from "@/lib/analytics/events";

type Props = React.ComponentProps<typeof Link> & {
  /** Where on the site the CTA lives, e.g. "home_hero". Sent as cta_location. */
  location: string;
  /** Defaults to primary_cta_click. */
  event?: EventName;
  ctaId?: string;
};

/** A Link that records a CTA click. Clicks are intent signals, never conversions. */
export function TrackedLink({ location, event = "primary_cta_click", ctaId, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event, { cta_location: location, cta_id: ctaId ?? String(props.href) });
        onClick?.(e);
      }}
    />
  );
}
