import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Social Media Management — Anovas Integrated Systems",
  description:
    "Monthly social media management for local service businesses — content calendar, post production, graphics, scheduling, and performance reporting. Three tiers from $500/mo.",
  alternates: { canonical: "/services/social-media" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const tiers = [
  {
    name: "Basic",
    price: "$500",
    period: "/mo",
    badge: null,
    tagline: "For businesses that need a consistent, professional social presence.",
    features: [
      "2 platforms",
      "8–12 posts/month",
      "Post writing and captions",
      "Basic scheduling",
      "Content calendar",
      "Monthly performance recap",
    ],
    cta: "Get Started — $500/mo",
  },
  {
    name: "Pro",
    price: "$1,000",
    period: "/mo",
    badge: "Most Popular",
    tagline: "For businesses building consistent visibility across multiple channels.",
    features: [
      "2–3 platforms",
      "16–20 posts/month",
      "Everything in Basic",
      "Custom branded graphics",
      "Offer and CTA rotation",
      "Platform optimization",
      "Monthly performance review",
    ],
    cta: "Get Started — $1,000/mo",
  },
  {
    name: "Elite",
    price: "$2,000+",
    period: "/mo",
    badge: null,
    tagline: "For businesses using social as a primary authority and lead channel.",
    features: [
      "3–5 platforms",
      "High-frequency posting",
      "Everything in Pro",
      "Campaign strategy",
      "Engagement support",
      "Audience growth strategy",
      "Full performance reporting",
      "Monthly strategy call",
    ],
    cta: "Book a Discovery Call",
  },
];

const workflow = [
  { title: "Content Calendar", body: "We build a monthly calendar aligned to your services, offers, and seasonal demand." },
  { title: "Copy & Graphics", body: "Copy is drafted and graphics are produced to match your brand. Everything is reviewed internally before it reaches you." },
  { title: "Your Approval", body: "Nothing goes live without your sign-off on copy and creative." },
  { title: "Post & Report", body: "We schedule, post, and send you a monthly performance recap." },
];

export default function SocialMediaPage() {
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
              <Share2 size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Monthly Retainer · No Setup Fee · From $500/mo</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Social Media Management</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            This is not just posting. It&apos;s visibility, trust-building, and audience education — handled consistently so your business stays top-of-mind before prospects are ready to buy.
          </p>
        </div>
      </section>

      {/* Workflow */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-6">How It Works</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {workflow.map((w, i) => (
            <div key={w.title} className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-2xl font-black text-orange/30 mb-2">0{i + 1}</p>
              <p className="text-sm font-semibold text-charcoal mb-1">{w.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Plans</p>
          <h2 className="text-xl font-bold text-charcoal mb-2">Three tiers — all include copy, graphics, and approval workflow.</h2>
          <p className="text-sm text-gray-500 mb-8">No setup fee on any tier. You approve everything before it goes live.</p>
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
          <p className="text-white/60 text-sm mb-6">Social media should not be random posting. It should build trust, explain your value, and keep your business visible before people are ready to buy.</p>
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
