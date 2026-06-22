import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { PLANS } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Pricing | AnovasOS",
  description:
    "Simple, transparent pricing for AnovasOS — the operating system for home service businesses.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="bg-navy text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
            Pricing
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Simple, transparent pricing.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Pick the plan that matches where your business is today. Every plan includes a real
            optimization review with our team — not just software.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => {
            const featured = i === 1;
            return (
              <div
                key={plan.name}
                className={
                  featured
                    ? "rounded-xl border-2 border-orange bg-white shadow-md p-6 flex flex-col"
                    : "rounded-xl border border-gray-200 bg-white shadow-sm p-6 flex flex-col"
                }
              >
                {featured && (
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-orange mb-2">
                    Most Popular
                  </span>
                )}
                <p className="text-base font-bold text-charcoal mb-1">{plan.name}</p>
                <p className="text-2xl font-bold text-charcoal mb-2">{plan.price}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-5">{plan.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check size={14} className="text-orange shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={featured ? "primary" : "outline"} size="lg" className="w-full">
                  <Link href={plan.name === "Enterprise" ? "/contact" : "/anovasos/signup"}>
                    {plan.name === "Enterprise" ? "Talk to Us" : "Get Started"}
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-navy-light text-white">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-base md:text-lg font-semibold mb-6">
            Not sure which plan fits? Let&apos;s talk through your operation.
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
