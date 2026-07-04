import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Google Business Profile Management | Anovas Integrated Systems",
  description:
    "Google Business Profile management for local service businesses: one-time cleanup or monthly management. Three tiers from $300. Posts, reviews, photos, and citation accuracy handled for you.",
  alternates: { canonical: "/services/google-my-business" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/discovery-call?utm_source=websitehttps://calendly.com/d/cysq-pnv-zpx/discovery-call"utm_medium=ctahttps://calendly.com/d/cysq-pnv-zpx/discovery-call"utm_content=google-my-business";

const tiers = [
  {
    name: "GBP Cleanup",
    price: "$300–$500",
    period: "one-time",
    badge: null,
    tagline: "For businesses with an incomplete or inaccurate profile that needs a clean foundation.",
    features: [
      "Full profile audit and gap analysis",
      "Category, service area, and hours optimization",
      "Photo and logo upload",
      "Citation accuracy check across major directories",
      "Q&A section setup and initial responses",
      "Delivery within 5 business days",
    ],
    cta: "Book a Discovery Call",
  },
  {
    name: "Local Profile Management",
    price: "$500",
    period: "/mo",
    badge: "Most Popular",
    tagline: "For businesses that want consistent, active management of their GBP every month.",
    features: [
      "2 keyword-optimized posts per week",
      "Monthly photo uploads",
      "Review responses within 24 hours",
      "Q&A monitoring and responses",
      "Profile accuracy maintenance",
      "Monthly performance snapshot",
    ],
    cta: "Get Started – $500/mo",
  },
  {
    name: "Local Visibility System",
    price: "$1,000+",
    period: "/mo",
    badge: null,
    tagline: "For businesses in competitive markets that need full GMB + local SEO integration.",
    features: [
      "Everything in Local Profile Management",
      "Local keyword tracking and ranking reports",
      "Citation building and cleanup",
      "Competitor GBP analysis",
      "Integration with local SEO strategy",
      "Multi-location support available",
      "Monthly strategy review",
    ],
    cta: "Book a Discovery Call",
  },
];

export default function GoogleMyBusinessPage() {
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
              <MapPin size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">One-Time or Monthly · From $300</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Google Business Profile Management</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Your GBP is often the first thing a prospect sees before they call. We keep it active, accurate, and optimized: posts, photos, reviews, and Q&amp;A handled consistently every week.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Plans</p>
          <h2 className="text-xl font-bold text-charcoal mb-2">Three options, from a one-time cleanup to full monthly management.</h2>
          <p className="text-sm text-gray-500 mb-8">GBP management is also included in our Local SEO retainers.</p>
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

          <div className="mt-8 rounded-xl border border-orange/30 bg-orange/5 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-orange mb-1">Already doing SEO with us?</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              GBP management is included as part of our{" "}
              <Link href="/services/seo" className="text-orange font-semibold hover:underline">
                Local SEO retainers
              </Link>
              . If you&apos;re already on an SEO plan, your GBP is covered; no separate fee needed.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-3">Ready to Get Started?</p>
          <h2 className="text-2xl font-bold text-white mb-3">Let&apos;s audit your profile.</h2>
          <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
            Book a call and we&apos;ll review your current GBP and tell you exactly what&apos;s missing before you commit.
          </p>
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
