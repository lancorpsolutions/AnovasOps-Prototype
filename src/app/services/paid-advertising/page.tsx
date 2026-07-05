import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Paid Advertising | Anovas Integrated Systems",
  description:
    "Facebook, Instagram, and Google ad campaigns built, launched, and actively managed for local service businesses. Management fee from $750/mo; ad spend billed separately.",
  alternates: { canonical: "/services/paid-advertising" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/discovery-call?utm_source=website&utm_medium=cta&utm_content=paid-advertising";

const tiers = [
  {
    name: "Ad Launch",
    price: "$750",
    period: "/mo",
    badge: null,
    tagline: "For businesses testing a single platform campaign.",
    features: [
      "1 platform",
      "Campaign setup and targeting",
      "2–4 ad creatives",
      "Basic optimization",
      "Monthly reporting",
    ],
    cta: "Get Started – $750/mo",
  },
  {
    name: "Ad Growth",
    price: "$1,500",
    period: "/mo",
    badge: "Most Popular",
    tagline: "For businesses running active lead generation campaigns.",
    features: [
      "1–2 platforms",
      "Everything in Ad Launch",
      "Campaign strategy",
      "Creative testing",
      "Landing page recommendations",
      "Conversion tracking review",
      "Monthly performance report",
    ],
    cta: "Get Started – $1,500/mo",
  },
  {
    name: "Ad Scale",
    price: "$3,000+",
    period: "/mo",
    badge: null,
    tagline: "For businesses ready for aggressive multi-platform growth.",
    features: [
      "Multi-platform campaigns",
      "Everything in Ad Growth",
      "Full funnel strategy",
      "Weekly optimization",
      "Creative testing at volume",
      "Audience expansion strategy",
      "Advanced reporting",
    ],
    cta: "Book a Discovery Call",
  },
];

const platforms = [
  {
    name: "Meta (Facebook & Instagram)",
    desc: "Awareness, lead generation, and retargeting campaigns, targeted by zip code, service area, and homeowner demographics.",
  },
  {
    name: "Google Ads",
    desc: "Search campaigns targeting high-intent keywords: people actively searching for your services right now in your area.",
  },
  {
    name: "Retargeting",
    desc: "Follow-up campaigns that reach people who visited your site but didn't call, keeping you top-of-mind until they're ready.",
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
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Monthly Management Fee · Ad Spend Billed Separately · From $750/mo</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Paid Advertising</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Paid ads don&apos;t fix a broken business; they amplify what&apos;s already there. We make sure your offer, page, tracking, and follow-up are ready before the budget gets burned. Then we build campaigns that actually convert.
          </p>
        </div>
      </section>

      {/* Platforms */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-8">Platforms We Manage</p>
        <div className="grid md:grid-cols-3 gap-5">
          {platforms.map((p) => (
            <div key={p.name} className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-semibold text-charcoal mb-2">{p.name}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Management Plans</p>
          <h2 className="text-xl font-bold text-charcoal mb-2">Three tiers, management fee only.</h2>
          <p className="text-sm text-gray-500 mb-8">Ad spend goes directly to the platforms, not marked up. You own your ad accounts at all times.</p>
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

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-white/60 text-sm mb-6">Not sure which platform to start with? We&apos;ll tell you what we&apos;d recommend for your market and budget on the call.</p>
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
