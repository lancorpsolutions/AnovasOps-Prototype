"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/client";
import type { EventName } from "@/lib/analytics/events";

/** Fires an event once when the page that renders it is viewed. */
export function TrackOnMount({ event }: { event: EventName }) {
  useEffect(() => {
    track(event, {}, event);
  }, [event]);
  return null;
}
