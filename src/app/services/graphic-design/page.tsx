import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Graphic Design | Anovas Integrated Systems",
  description:
    "Monthly graphic design retainer and one-off projects for local service businesses: social graphics, flyers, door hangers, truck wraps, and marketing collateral. Three tiers from $500/mo.",
  alternates: { canonical: "/services/graphic-design" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/discovery-call?utm_source=website&utm_medium=cta&utm_content=graphic-design";

const tiers = [
  {
    name: "Basic Design Pack",
    price: "$500",
    period: "/mo",
    badge: null,
    tagline: "For businesses that need consistent social and print assets every month.",
    features: [
      "Up to 8 social media graphics/month",
      "1–2 print assets/month (flyer, postcard)",
      "Brand-consistent templates",
      "All files delivered print-ready and web-ready",
      "1 revision round per piece",
    ],
    cta: "Get Started – $500/mo",
  },
  {
    name: "Pro Design Pack",
    price: "$1,200",
    period: "/mo",
    badge: "Most Popular",
    tagline: "For businesses running active campaigns that need high-volume, multi-format design.",
    features: [
      "Up to 20 social graphics/month",
      "Everything in Basic",
      "Ad creative for paid campaigns",
      "Branded presentation and proposal templates",
      "Print materials: flyers, door hangers, postcards",
      "2 revision rounds per piece",
      "Priority turnaround",
    ],
    cta: "Get Started – $1,200/mo",
  },
  {
    name: "Elite Design Pack",
    price: "$2,000+",
    period: "/mo",
    badge: null,
    tagline: "For businesses that need dedicated design support across every channel.",
    features: [
      "Unlimited requests (scoped monthly)",
      "Everything in Pro",
      "Truck wrap concepts and large-format",
      "Trade show banners and displays",
      "Email headers and digital collateral",
      "Dedicated design support",
      "Monthly scope review and planning call",
    ],
    cta: "Book a Discovery Call",
  },
];

const projectTypes = [
  "Social media graphics",
  "Flyers, door hangers, direct mail",
  "Business cards and letterhead",
  "Truck wrap concepts",
  "Trade show banners and displays",
  "Ad creative (Facebook, Instagram, Google)",
  "Email headers and digital collateral",
];

export default function GraphicDesignPage() {
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
              <PenTool size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Monthly Retainer · One-Off Projects · From $500/mo</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Graphic Design</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            On-demand graphic design for social media, print, and digital, briefed through a consistent process and reviewed internally before anything reaches you or goes live.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Monthly Retainer Plans</p>
          <h2 className="text-xl font-bold text-charcoal mb-2">Three tiers, all including brand-consistent output and file delivery.</h2>
          <p className="text-sm text-gray-500 mb-8">No setup fee. Cancel anytime. Work is scoped at the start of each month.</p>
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
                  <p className={`text-2xl font-black mb-0.5 ${featured ? "text-orange" : "text-charcoal"}`}>
                    {tier.price}<span className={`text-sm font-semibold ${featured ? "text-orange/60" : "text-gray-400"}`}>{tier.period}</span>
                  </p>
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

      {/* One-off */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <div className="rounded-2xl border border-gray-200 bg-white p-7">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-6 pb-6 border-b border-gray-100">
            <div className="flex-1">
              <p className="text-charcoal font-bold text-lg mb-0.5">One-Off Projects</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Need a single asset or a small run? Projects are quoted per type and complexity. One revision round included; additional rounds at $75/hr. Turnaround: 3–5 business days.
              </p>
            </div>
            <div className="shrink-0">
              <p className="text-2xl font-black text-orange">Quoted per project</p>
              <p className="text-xs text-gray-400">3–5 business day turnaround</p>
            </div>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
            {projectTypes.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="h-1.5 w-1.5 rounded-full bg-orange shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-center text-xs font-semibold border border-gray-300 text-charcoal rounded-lg px-5 py-2.5 hover:border-orange hover:text-orange transition-colors"
          >
            Request a Quote
          </a>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-white/60 text-sm mb-6">Not sure whether retainer or project is right for you? Book a quick call.</p>
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
