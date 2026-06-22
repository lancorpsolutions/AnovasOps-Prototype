export const PLANS = [
  {
    name: "Startup",
    price: "$1,000/month",
    description: "For owner-operators ready to get out of the day-to-day firefighting.",
    features: [
      "Up to 3 workflows/templates",
      "Basic command center",
      "Basic operational risk tracking",
      "Basic SOP library",
      "Monthly optimization review",
    ],
  },
  {
    name: "Small Business",
    price: "$2,500/month",
    description: "For growing teams that need automation and crew accountability.",
    features: [
      "Up to 10 workflows/templates",
      "Advanced dashboard",
      "Automation rules",
      "Operational risk reporting",
      "SOP library",
      "Crew accountability tracking",
      "Bi-weekly optimization review",
    ],
  },
  {
    name: "Enterprise",
    price: "$5,000/month",
    description: "For multi-crew operations that need full visibility and priority support.",
    features: [
      "Unlimited workflows/templates",
      "Advanced reporting",
      "Custom automations",
      "Executive dashboards",
      "Full SOP system",
      "Priority support",
      "Weekly optimization review",
    ],
  },
] as const;
