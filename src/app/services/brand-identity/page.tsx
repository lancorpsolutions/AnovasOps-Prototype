import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Brand Identity Design — Anovas Integrated Systems",
  description:
    "Complete brand identity packages for local service businesses — logo, color palette, typography, and a brand style guide. Delivered with source files and a walkthrough call.",
  alternates: { canonical: "/services/brand-identity" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const tiers = [
  {
    name: "Starter",
    price: "$1,500",
    badge: null,
    tagline: "Core brand foundation for a new or rebranding business.",
    features: [
      "Primary logo + 1 alternate version",
      "Brand color palette (primary + secondary)",
      "Font pairing selection",
      "1-page brand reference sheet",
      "Final files: SVG, PNG, PDF",
      "2 revision rounds",
    ],
  },
  {
    name: "Standard",
    price: "$2,500",
    badge: "Most Popular",
    tagline: "Full identity system for businesses that show up consistently across every channel.",
    features: [
      "Everything in Starter",
      "Logo suite (primary, stacked, icon-only)",
      "Full typography system",
      "Brand style guide (8–12 pages)",
      "Social media profile assets",
      "Walkthrough call on delivery",
      "3 revision rounds",
    ],
  },
  {
    name: "Premium",
    price: "$3,500",
    badge: null,
    tagline: "Extended identity for established businesses with broad collateral needs.",
    features: [
      "Everything in Standard",
      "Business card & letterhead templates",
      "Vehicle wrap or signage mock-up",
      "Email signature template",
      "Extended brand guide (16–20 pages)",
      "Unlimited revisions (30-day window)",
    ],
  },
];

export default function BrandIdentityPage() {
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
              <Sparkles size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Project · One-Time</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Brand Identity Design</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            A brand that earns trust before anyone picks up the phone. Logo, palette, typography, and a style guide that keeps everything consistent — whether it&apos;s your truck wrap, your website, or your social profiles.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Packages</p>
          <h2 className="text-2xl font-bold text-charcoal">Pick the right scope for your business.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const featured = tier.badge === "Most Popular";
            return (
              <div
                key={tier.name}
                className={
                  featured
                    ? "rounded-2xl border-2 border-orange bg-navy p-6 flex flex-col relative shadow-[0_0_40px_-8px_rgba(242,88,30,0.35)]"
                    : "rounded-2xl border border-gray-200 bg-white p-6 flex flex-col"
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
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
            Not sure which package is right? Book a quick discovery call and we&apos;ll size it for you.
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
