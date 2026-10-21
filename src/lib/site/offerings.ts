// Offering facts used across the homepage, offering pages, and diagnostic.
// Every statement here is traceable to the repository: pricing and plan
// contents (src/lib/plans.ts, /services/autopilot), application modules
// (src/app/(dashboard)/anovasos/*), and the Autopilot onboarding flow
// (anovas-autopilot/app/page.tsx). Anything not backed by those is left out.
// See docs/implementation-plan.md, "Decisions taken with a safe default".

export interface OfferingFacts {
  key: "anovasos" | "autopilot" | "services";
  name: string;
  tagline: string;
  type: string;
  summary: string;
  whoFor: string;
  problem: string;
  included: string[];
  youProvide: string[];
  implementation: string;
  support: string;
  pricing: string;
  href: string;
}

export const OFFERINGS: Record<OfferingFacts["key"], OfferingFacts> = {
  anovasos: {
    key: "anovasos",
    name: "AnovasOS",
    tagline: "Business growth platform",
    type: "Software subscription + team review",
    summary:
      "A web-based command center for your sales pipeline, jobs, crews, scheduling, invoices, SOPs, and automation rules, with risk flags for what's slipping.",
    whoFor: "Owner-operators and multi-crew service businesses that run on texts, spreadsheets, and memory.",
    problem: "Nobody can see the whole operation at once, so quotes go cold, jobs stall, and finished work sits unbilled.",
    included: [
      "Command-center dashboard",
      "Sales pipeline and quote tracking",
      "Jobs, job stages, and scheduling",
      "Crew assignment and accountability",
      "Invoice tracking",
      "Automation rules and SOP library",
      "Operational risk flags and reports",
    ],
    youProvide: [
      "Your services, team, and crew structure",
      "Current customers and open jobs (a spreadsheet export is fine)",
      "An owner or manager for setup decisions",
    ],
    implementation:
      "You subscribe to a plan and create your account. We configure workflows and templates around how your business runs.",
    support: "A recurring optimization review with our team: monthly, bi-weekly, or weekly depending on plan.",
    pricing: "From $1,000/month (Startup) to $5,000/month (Enterprise)",
    href: "/services/anovasos",
  },
  autopilot: {
    key: "autopilot",
    name: "Anovas Autopilot",
    tagline: "Revenue protection system",
    type: "Managed automation: setup + monthly",
    summary:
      "Five automations that run in the background: missed-call text-back, lead and quote follow-up, booking reminders, invoice nudges, and review requests.",
    whoFor: "Service businesses losing jobs to missed calls, slow follow-up, no-shows, and unpaid invoices.",
    problem: "Revenue leaks happen when nobody is free to respond, and they're invisible until the month is over.",
    included: [
      "Missed-call text-back",
      "Lead and quote follow-up sequences",
      "Booking confirmations and reminders",
      "Invoice and payment nudges",
      "Automated review requests",
    ],
    youProvide: [
      "The business phone numbers to cover",
      "Your approval on the message wording",
      "A point of contact for onboarding",
    ],
    implementation:
      "We build and configure the automations for you. Standard onboarding runs about two weeks on the Basic plan.",
    support: "Optimization check-ins (bi-weekly on Pro, weekly on Elite) plus email or phone support by tier.",
    pricing: "From $500/month + $1,000 setup (Basic) to custom Enterprise pricing",
    href: "/services/autopilot",
  },
  services: {
    key: "services",
    name: "Implementation & Growth Services",
    tagline: "Strategy, design & implementation",
    type: "Professional services: project or retainer",
    summary:
      "The team that implements AnovasOS and Autopilot and handles the work around them: websites, local SEO, Google Business Profile, branding, content, ads, and business structure.",
    whoFor: "Businesses that need more of the right leads, a credible web presence, or hands-on help putting systems in place.",
    problem: "The pipeline is too thin or unpredictable, and nobody has time to fix the foundations.",
    included: [
      "Website design and development",
      "SEO / AEO / GEO and Google Business Profile",
      "Brand identity and graphic design",
      "Social media, content, and paid advertising",
      "Business structure consulting",
      "AI agent builds for specific workflows",
    ],
    youProvide: ["Access to your current accounts (website, Google profile, ad accounts)", "Feedback and approvals on drafts"],
    implementation: "Scoped up front with a fixed deliverable list and timeline for each project or retainer.",
    support: "Retainers include monthly reporting. Projects end with a walkthrough and handoff.",
    pricing: "Priced per service, listed on each service page",
    href: "/services",
  },
};
