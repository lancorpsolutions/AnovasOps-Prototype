import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "SEO / AEO / GEO Services — Anovas Integrated Systems",
  description:
    "Local SEO, Answer Engine Optimization, and Generative Engine Optimization for local service businesses. Monthly retainer — rank in Google, voice search, and AI-generated results.",
  alternates: { canonical: "/services/seo" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const disciplines = [
  {
    abbr: "SEO",
    name: "Search Engine Optimization",
    desc: "Traditional local search — Google Maps rankings, organic positions, citation building, on-page optimization, and local keyword targeting.",
  },
  {
    abbr: "AEO",
    name: "Answer Engine Optimization",
    desc: "Optimizing for AI-powered search features — Google AI Overviews, featured snippets, and voice search queries that give spoken answers instead of a list of links.",
  },
  {
    abbr: "GEO",
    name: "Generative Engine Optimization",
    desc: "Positioning your business in AI-generated answers from ChatGPT, Perplexity, and similar platforms. Search is no longer just Google — we cover all three channels.",
  },
];

const tiers = [
  {
    name: "Local",
    price: "$750/mo",
    badge: null,
    tagline: "For single-location businesses establishing their local search presence.",
    features: [
      "Up to 10 target keywords",
      "1 service area / location",
      "On-page SEO optimization",
      "Google Business Profile sync",
      "Citation building & cleanup",
      "Monthly performance report",
    ],
  },
  {
    name: "Growth",
    price: "$1,250/mo",
    badge: "Most Popular",
    tagline: "For growing businesses that want to dominate local search and capture AI results.",
    features: [
      "Up to 25 target keywords",
      "Up to 3 service areas",
      "Everything in Local",
      "AEO content optimization",
      "Featured snippet targeting",
      "Schema markup implementation",
      "Bi-monthly strategy call",
    ],
  },
  {
    name: "Authority",
    price: "$2,000/mo",
    badge: null,
    tagline: "Full SEO + AEO + GEO stack for established businesses competing aggressively.",
    features: [
      "Unlimited target keywords",
      "Multi-location coverage",
      "Everything in Growth",
      "GEO content optimization",
      "AI platform citation building",
      "Competitor gap analysis",
      "Monthly strategy call",
      "Priority reporting + consulting",
    ],
  },
];

export default function SeoPage() {
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
              <Search size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Monthly Retainer</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">SEO / AEO / GEO</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Search has three channels now — Google, AI-powered answers, and generative results from tools like ChatGPT. We manage all three so your business shows up where the decision is being made.
          </p>
        </div>
      </section>

      {/* Three disciplines */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-8">Three Disciplines, One Service</p>
        <div className="grid md:grid-cols-3 gap-5">
          {disciplines.map((d) => (
            <div key={d.abbr} className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-2xl font-black text-orange mb-2">{d.abbr}</p>
              <p className="text-sm font-semibold text-charcoal mb-2">{d.name}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Monthly Plans</p>
          <h2 className="text-xl font-bold text-charcoal mb-8">Pick the right coverage for your market.</h2>
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
                  <p className="text-2xl font-black text-orange">{tier.price}</p>
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
                    Get Started with {tier.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-white/60 text-sm mb-6">Not sure which tier fits your market? Book a call and we&apos;ll audit your current visibility first.</p>
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
