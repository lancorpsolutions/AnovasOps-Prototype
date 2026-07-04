import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Content Creation | Anovas Integrated Systems",
  description:
    "Monthly content creation for local service businesses: posts, reel scripts, carousels, email, and blog content written in your brand voice. Three tiers from $750/mo.",
  alternates: { canonical: "/services/content-creation" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const tiers = [
  {
    name: "Content Starter",
    price: "$750",
    period: "/mo",
    badge: null,
    tagline: "For businesses getting consistent with content and building early authority.",
    features: [
      "8–10 content pieces/month",
      "Captions and posts",
      "Hooks and messaging",
      "Basic graphics coordination",
      "Monthly content calendar",
    ],
    cta: "Get Started – $750/mo",
  },
  {
    name: "Content Growth",
    price: "$1,500",
    period: "/mo",
    badge: "Most Popular",
    tagline: "For businesses building real audience momentum across multiple channels.",
    features: [
      "16–20 pieces/month",
      "Everything in Starter",
      "Reel and video scripts",
      "Carousel outlines",
      "Email or blog content",
      "Graphics coordination",
      "Offer and educational post mix",
      "Monthly performance recap",
    ],
    cta: "Get Started – $1,500/mo",
  },
  {
    name: "Content Engine",
    price: "$3,000+",
    period: "/mo",
    badge: null,
    tagline: "For businesses that need content across every channel at authority scale.",
    features: [
      "30+ assets/month",
      "Everything in Growth",
      "Long-form + short-form content",
      "Repurposing strategy",
      "Campaign-based content",
      "Thought leadership positioning",
      "Performance review",
      "Content strategy sessions",
    ],
    cta: "Book a Discovery Call",
  },
];

const formats = [
  { name: "Captions & Posts", desc: "Platform-native copy written in your brand voice: educational, offer, and engagement posts." },
  { name: "Reel & Video Scripts", desc: "Short-form video scripts with hook, body, and CTA, ready for filming or voiceover." },
  { name: "Carousels", desc: "Slide-by-slide outlines for multi-image posts, structured to teach, build trust, and drive saves." },
  { name: "Blog & Email Content", desc: "Long-form content that supports SEO, nurtures leads, and positions your expertise." },
];

export default function ContentCreationPage() {
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
              <FileText size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Monthly Retainer · From $750/mo</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Content Creation</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Content is how your business teaches the market what problem you solve before they ever get on the phone. We produce written, video, and educational content that attracts attention, builds trust, and converts prospects.
          </p>
        </div>
      </section>

      {/* Formats */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-8">Content Formats</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {formats.map((f) => (
            <div key={f.name} className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-semibold text-charcoal mb-2">{f.name}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Plans</p>
          <h2 className="text-xl font-bold text-charcoal mb-2">Three tiers, all including strategy, copy, and review.</h2>
          <p className="text-sm text-gray-500 mb-8">Every piece is reviewed before delivery. One revision round included on all content.</p>
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
          <p className="text-white/60 text-sm mb-6">Already running SEO or social with us? Content is often bundled at a reduced rate. Ask on the call.</p>
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
