import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  Bot,
  Gauge,
  FileText,
  Wrench,
  Globe,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Services & Offerings | Anovas Integrated Systems",
  description:
    "AnovasOS, Anovas Autopilot, and Professional Services — the products and strategy Anovas Integrated Systems offers local and home service businesses.",
};

const products = [
  {
    icon: LayoutDashboard,
    name: "AnovasOS",
    tagline: "Business growth platform",
    summary:
      "Demand generation, content creation, campaign management, SEO, lead nurturing, and consumer intelligence in one command center. Built exclusively for businesses and their authorized teams.",
    bullets: ["Live dashboard for jobs, crews, and revenue", "Automation rules and SOPs", "Operational risk tracking"],
    href: "/services/anovasos",
    cta: "Explore AnovasOS",
  },
  {
    icon: Bot,
    name: "Anovas Autopilot",
    tagline: "AI back-office automation",
    summary:
      "An AI-powered back office automation platform for local service businesses, available in Basic, Pro, Elite, and Enterprise tiers with defined capacity limits.",
    bullets: ["Missed-call text-back", "Lead and quote follow-up", "Booking, invoice, and review automation"],
    href: "/services/autopilot",
    cta: "Explore Autopilot",
  },
];

const professionalServices = [
  { icon: Gauge, name: "AROS Growth Score", summary: "A free diagnostic that benchmarks where your business is leaking revenue and opportunity." },
  { icon: FileText, name: "Growth Blueprint", summary: "A strategic analysis and roadmap tailored to your business and market." },
  { icon: Wrench, name: "Implementation Services", summary: "Hands-on setup and rollout so AnovasOS and Autopilot are configured right from day one." },
  { icon: Globe, name: "Website Design", summary: "A site built to convert, designed around how your customers actually find and choose you." },
  { icon: Users, name: "Fractional Growth Advisor", summary: "Ongoing strategic guidance from our team, without the cost of a full-time hire." },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
            Services &amp; Offerings
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Two products. One team behind both.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            AnovasOS and Anovas Autopilot are the SaaS products at the core of what we build —
            backed by professional services that help you put them to work.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.name}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow p-8 flex flex-col"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-light text-white mb-5 shadow-sm">
                  <Icon size={22} />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-orange mb-1.5">
                  {product.tagline}
                </p>
                <p className="text-lg font-bold text-charcoal mb-3">{product.name}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{product.summary}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {product.bullets.map((b) => (
                    <li key={b} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange shrink-0 mt-1.5" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="primary" size="lg" className="w-full">
                  <Link href={product.href}>
                    {product.cta} <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">
              Professional Services
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
              Strategy and implementation, not just software.
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Beyond AnovasOS and Autopilot, our team works directly with you to build and run
              the growth strategy behind your business.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {professionalServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.name}
                  className="rounded-xl border border-gray-200 bg-background p-5 hover:shadow-md transition-shadow"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-orange/10 text-orange mb-3">
                    <Icon size={17} />
                  </span>
                  <p className="text-sm font-semibold text-charcoal mb-1.5">{service.name}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{service.summary}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy-light to-navy text-white">
        <div className="relative max-w-4xl mx-auto px-6 py-14 text-center">
          <p className="text-base md:text-lg font-semibold mb-6">
            Not sure where to start? Let&apos;s talk through your operation.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/contact">
              Contact Us <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
