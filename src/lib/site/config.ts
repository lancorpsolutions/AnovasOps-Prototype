// Site-wide marketing constants. One place to change routes and the booking tool.

/** Existing Calendly discovery-call event. Override with NEXT_PUBLIC_BOOKING_URL (e.g. a HubSpot Meetings link). */
export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://calendly.com/d/cysq-pnv-zpx/discovery-call";

export const SUPPORT_EMAIL = "support@anovasintegratedsystems.com";

export const ROUTES = {
  diagnostic: "/aros-growth-score",
  sampleReport: "/diagnostic/sample-report",
  book: "/book",
  howItWorks: "/#how-it-works",
  contact: "/contact",
  anovasos: "/services/anovasos",
  autopilot: "/services/autopilot",
  services: "/services",
  guide: "/revenue-leaks-guide",
} as const;

/** Appends UTM parameters so Calendly/HubSpot can attribute a booking to the site section it came from. */
export function bookingUrl(content: string) {
  const url = new URL(BOOKING_URL);
  url.searchParams.set("utm_source", "website");
  url.searchParams.set("utm_medium", "cta");
  url.searchParams.set("utm_content", content);
  return url.toString();
}
