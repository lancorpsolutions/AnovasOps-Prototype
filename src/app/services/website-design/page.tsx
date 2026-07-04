import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Website Design & Development | Anovas Integrated Systems",
  description:
    "Mobile-optimized, lead-converting websites for local service businesses. Three tiers from $1,250. Built in 2 weeks with contact forms, booking integration, and SEO-ready copy.",
  alternates: { canonical: "/services/website-design" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/discovery-call?utm_source=websitehttps://calendly.com/d/cysq-pnv-zpx/discovery-call"utm_medium=ctahttps://calendly.com/d/cysq-pnv-zpx/discovery-call"utm_content=website-design";

const tiers = [
  {
    name: "Basic Website",
    price: "$1,250–$1,500",
    period: "one-time",
    badge: null,
    tagline: "For businesses that need a clean, professional online presence fast.",
    features: [
      "Up to 5 pages",
      "Mobile-responsive design",
      "Contact form with email notification",
      "Google My Business link",
      "Social media links connected",
      "Basic on-page SEO setup",
      "2 week delivery",
    ],
    cta: "Book a Discovery Call",
  },
  {
    name: "Pro Website",
    price: "$2,500–$3,000",
    period: "one-time",
    badge: "Most Popular",
    tagline: "For businesses ready to turn their website into a lead generation asset.",
    features: [
      "Up to 10–15 pages",
      "Everything in Basic",
      "Dedicated service pages per offering",
      "Lead capture and CTA optimization",
      "Booking integration (where applicable)",
      "Copy drafted and reviewed before build",
      "Basic integrations (forms, scheduling)",
    ],
    cta: "Book a Discovery Call",
  },
  {
    name: "Elite Website",
    price: "$4,000–$6,500+",
    period: "one-time",
    badge: null,
    tagline: "For established businesses that need a full digital foundation built to scale.",
    features: [
      "Full site strategy and architecture",
      "Everything in Pro",
      "Landing pages for campaigns",
      "CRM and form integrations",
      "SEO architecture and schema markup",
      "Analytics and conversion tracking",
      "Priority delivery and dedicated review rounds",
    ],
    cta: "Book a Discovery Call",
  },
];

const addons = [
  { name: "Additional landing page", price: "$500–$1,000" },
  { name: "Website maintenance", price: "$250–$500/mo" },
  { name: "E-commerce setup", price: "$1,000+" },
  { name: "Copywriting (full site)", price: "$500–$2,000+" },
  { name: "CRM integration", price: "$500–$1,500+" },
  { name: "Rush delivery (50% faster)", price: "+25–50% fee" },
];

const process = [
  { step: "01", title: "Brief & Intake", body: "A short intake form covering your services, service areas, and brand assets." },
  { step: "02", title: "Copy First", body: "All website copy is drafted and reviewed before build starts. The site is built around your message, not retrofitted around a template." },
  { step: "03", title: "Design & Build", body: "Built to brief: mobile-first, fast, and optimized for lead capture." },
  { step: "04", title: "Review & Launch", body: "You review a staging version. Revisions handled. We launch on your timeline." },
];

export default function WebsiteDesignPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-6">
            <ArrowLeft size={13} /> Back to Services
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/20 text-orange-light">
              <Globe size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Project · From $1,250</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Website Design &amp; Development</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            A site that looks like you mean business and converts visitors into calls. Copy first, design second, built in 2 weeks, mobile-optimized, and ready to generate leads from day one.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-6">How It Works</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {process.map((p) => (
            <div key={p.step} className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-2xl font-black text-orange/30 mb-2">{p.step}</p>
              <p className="text-sm font-semibold text-charcoal mb-1">{p.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Plans</p>
          <h2 className="text-xl font-bold text-charcoal mb-2">Three tiers, all including copy review and mobile-optimized design.</h2>
          <p className="text-sm text-gray-500 mb-8">Hosting and maintenance available as an add-on after launch.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => {
              const featured = tier.badge === "Most Popular";
              return (
                <div
                  key={tier.name}
                  className={
                    featured
                      ? "rounded-2xl border-2 border-orange bg-navy p-6 flex flex-col relative shadow-[0_0_40px_-8px_rgba(242,88,30,0.35)]"
                      : "rounded-2xl border border-gray-200 bg-background p-6 flex flex-col"
                  }
                >
                  {featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange to-orange-light text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                      Most Popular
                    </span>
                  )}
                  <p className={`text-base font-bold mb-0.5 ${featured ? "text-white" : "text-charcoal"}`}>{tier.name}</p>
                  <p className={`text-2xl font-black mb-0.5 ${featured ? "text-orange" : "text-charcoal"}`}>{tier.price}</p>
                  <p className={`text-xs font-semibold mb-1 ${featured ? "text-orange/60" : "text-gray-400"}`}>{tier.period}</p>
                  <p className={`text-xs mt-1 mb-4 pb-4 border-b leading-relaxed ${featured ? "text-white/50 border-white/10" : "text-gray-500 border-gray-100"}`}>
                    {tier.tagline}
                  </p>
                  <ul className="space-y-2.5 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2 text-xs ${featured ? "text-white/80" : "text-gray-600"}`}>
                        <CheckCircle size={13} className="text-orange shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      featured
                        ? "mt-6 block text-center text-xs font-semibold bg-gradient-to-r from-orange to-orange-light text-white rounded-lg py-2.5 hover:opacity-90 transition-opacity"
                        : "mt-6 block text-center text-xs font-semibold border border-gray-300 text-charcoal rounded-lg py-2.5 hover:border-orange hover:text-orange transition-colors"
                    }
                  >
                    {tier.cta}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-6">Add-Ons</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addons.map((a) => (
            <div key={a.name} className="rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-between gap-4">
              <p className="text-sm text-charcoal font-medium">{a.name}</p>
              <p className="text-sm font-bold text-orange shrink-0">{a.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-white/60 text-sm mb-6">Questions about your project? Let&apos;s talk it through before you commit to anything.</p>
          <Button asChild variant="primary" size="lg">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              Book a Discovery Call <ArrowRight size={16} />
            </a>
          </Button>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
