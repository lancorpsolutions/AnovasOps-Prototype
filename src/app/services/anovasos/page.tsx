import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  Workflow,
  ShieldCheck,
  Clock,
  Users2,
  Receipt,
  AlertTriangle,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { PLANS } from "@/lib/plans";

export const metadata: Metadata = {
  title: "AnovasOS: The Business Growth Platform for Local Service Businesses",
  description:
    "AnovasOS gives HVAC, plumbing, electrical, roofing, landscaping, and pest control operators one place to see what's happening, fix what's stuck, and protect revenue.",
  keywords: [
    "AnovasOS",
    "business growth platform for contractors",
    "HVAC business management software",
    "plumbing business growth software",
    "operational risk tracking for service businesses",
  ],
  alternates: { canonical: "/services/anovasos" },
  openGraph: {
    title: "AnovasOS: The Business Growth Platform for Local Service Businesses",
    description:
      "One command center for HVAC, plumbing, electrical, roofing, and pest control operators to see what's happening, fix what's stuck, and protect revenue.",
    url: "/services/anovasos",
    type: "website",
  },
};

const anovasOSJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AnovasOS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AnovasOS is a business growth platform providing demand generation, content creation, campaign management, SEO, lead nurturing, and consumer intelligence for local and home service businesses.",
  brand: { "@type": "Organization", name: "Anovas Integrated Systems" },
  offers: PLANS.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: plan.price.replace(/[^0-9.]/g, ""),
    priceCurrency: "USD",
    description: plan.description,
  })),
};

const painPoints = [
  {
    icon: Clock,
    title: "Quotes go cold",
    summary: "No one follows up before the customer books a competitor.",
  },
  {
    icon: AlertTriangle,
    title: "Jobs slip behind",
    summary: "Materials, customers, or crews stall a job and nobody notices until it's late.",
  },
  {
    icon: Users2,
    title: "Crews are a blind spot",
    summary: "Jobs sit unassigned, or crews get stacked too tight, and quality slips.",
  },
  {
    icon: Receipt,
    title: "Finished work sits unbilled",
    summary: "Completed jobs wait days before anyone sends the invoice.",
  },
];

const features = [
  {
    icon: LayoutDashboard,
    title: "One command center",
    summary:
      "See every quote, job, crew, and invoice in one live dashboard instead of piecing it together from texts and spreadsheets.",
  },
  {
    icon: Workflow,
    title: "Automation that runs the boring parts",
    summary:
      "Automation rules and SOPs handle the follow-ups, reminders, and handoffs so nothing falls through the cracks.",
  },
  {
    icon: ShieldCheck,
    title: "Risk caught before it costs you",
    summary:
      "Operational risk tracking flags cold quotes, slipping jobs, and overloaded crews while there's still time to fix them.",
  },
];

export default function AnovasOSPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
            A Product of Anovas Integrated Systems
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
            Run your business like nothing slips through the cracks.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            AnovasOS is the business growth platform for HVAC, plumbing, electrical, roofing,
            landscaping, and pest control teams. One place to see what&apos;s happening, fix
            what&apos;s stuck, and protect revenue before small issues become bigger problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/anovasos">
                Try the Live Demo <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/5 border-white/30 text-white hover:bg-white/10">
              <Link href="/anovasos/signup">Sign Up &amp; Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-xl font-bold text-charcoal mb-2 text-center">Sound familiar?</h2>
        <p className="text-sm text-gray-500 mb-10 max-w-xl mx-auto text-center">
          These are the quiet revenue leaks we see across home service businesses every day.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {painPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-orange/10 text-orange mb-3">
                  <Icon size={18} />
                </span>
                <p className="text-sm font-semibold text-charcoal mb-1.5">{point.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{point.summary}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold text-charcoal mb-2 text-center">What AnovasOS gives you</h2>
          <p className="text-sm text-gray-500 mb-10 max-w-xl mx-auto text-center">
            Visibility, automation, and accountability, built specifically for trades businesses.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-background p-6 hover:shadow-md transition-shadow"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-light text-white mb-4 shadow-sm">
                    <Icon size={18} />
                  </span>
                  <p className="text-sm font-semibold text-charcoal mb-2">{feature.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{feature.summary}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
            Simple, transparent AnovasOS pricing.
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Pick the plan that matches where your business is today. Every plan includes a real
            optimization review with our team, not just software.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => {
            const featured = i === 1;
            return (
              <div
                key={plan.name}
                className={
                  featured
                    ? "rounded-2xl border-2 border-orange bg-white shadow-md p-6 flex flex-col"
                    : "rounded-2xl border border-gray-200 bg-white shadow-sm p-6 flex flex-col"
                }
              >
                {featured && (
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-orange mb-2">
                    Most Popular
                  </span>
                )}
                <p className="text-base font-bold text-charcoal mb-1">{plan.name}</p>
                <p className="text-2xl font-bold text-charcoal mb-2">{plan.price}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-5">{plan.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check size={14} className="text-orange shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={featured ? "primary" : "outline"} size="lg" className="w-full">
                  <Link href={plan.name === "Enterprise" ? "/contact" : "/anovasos/signup"}>
                    {plan.name === "Enterprise" ? "Talk to Us" : "Get Started"}
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy-light to-navy text-white">
        <div className="relative max-w-4xl mx-auto px-6 py-14 text-center">
          <p className="text-base md:text-lg font-semibold mb-2">
            See what is happening, fix what is stuck, and protect revenue before small issues
            become bigger problems.
          </p>
          <p className="text-white/50 text-xs mb-6">
            AnovasOS is built by Anovas Integrated Systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/anovasos">
                Try the Live Demo <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/5 border-white/30 text-white hover:bg-white/10">
              <Link href="/services/autopilot">See Anovas Autopilot</Link>
            </Button>
          </div>
        </div>
      </section>

      <MarketingFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(anovasOSJsonLd) }}
      />
    </div>
  );
}
