"use client";

import { openConsentSettings } from "@/lib/analytics/client";

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie settings
    </button>
  );
}
