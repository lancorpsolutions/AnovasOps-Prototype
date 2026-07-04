import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Paid Advertising — Anovas Integrated Systems",
  description:
    "Facebook, Instagram, and Google ad campaigns built, launched, and actively managed for local service businesses. Monthly management fee — ad spend billed separately.",
  alternates: { canonical: "/services/paid-advertising" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const tiers = [
  {
    name: "Starter",
    price: "$750/mo",
    adSpend: "Up to $2,500 ad spend",
    badge: null,
    tagline: "For businesses running their first ad campaign or testing a single platform.",
    features: [
      "1 ad platform (Facebook/Instagram or Google)",
      "Campaign setup and launch",
      "Ad copy + creative production",
      "Audience targeting & setup",
      "Monthly performance report",
      "Campaign optimization (monthly)",
    ],
  },
  {
    name: "Growth",
    price: "$1,250/mo",
    adSpend: "Up to $5,000 ad spend",
    badge: "Most Popular",
    tagline: "For businesses running active campaigns across multiple platforms.",
    features: [
      "Up to 2 platforms",
      "Everything in Starter",
      "Retargeting campaigns",
      "A/B creative testing",
      "Bi-weekly optimization",
      "Bi-weekly performance call",
    ],
  },
  {
    name: "Scale",
    price: "$1,750/mo",
    adSpend: "Unlimited ad spend",
    badge: null,
    tagline: "For high-spend operations that need aggressive, active campaign management.",
    features: [
      "All platforms (Facebook, Instagram, Google)",
      "Everything in Growth",
      "Landing page optimization support",
      "Weekly optimization reviews",
      "Weekly performance reporting",
      "Priority creative turnaround",
    ],
  },
];

export default function PaidAdvertisingPage() {
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
              <Megaphone size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Monthly Retainer · Ad Spend Separate</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Paid Advertising</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Facebook, Instagram, and Google campaigns built and actively managed — not set-and-forgotten. Ad copy, creative, targeting, and monthly optimization are included. You own your ad accounts. Ad spend is billed directly by the platform.
          </p>
        </div>
      </section>

      <section className="bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Management Plans</p>
            <h2 className="text-xl font-bold text-charcoal">Management fee + your ad spend.</h2>
            <p className="text-sm text-gray-500 mt-2">Ad spend goes directly to the platforms. Our fee covers build, management, and optimization.</p>
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
                  <p className={`text-[11px] mb-1 ${featured ? "text-white/30" : "text-gray-400"}`}>{tier.adSpend}</p>
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
          <p className="text-white/60 text-sm mb-6">Not sure which platform or budget to start with? We&apos;ll tell you what we&apos;d recommend for your market.</p>
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
