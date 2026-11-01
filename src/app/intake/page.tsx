import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { IntakeFormEmbed } from "@/components/forms/intake-form-embed";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Tell us about your business and what you need, then book your discovery call with the Anovas Integrated Systems team.",
  alternates: { canonical: "/intake" },
  openGraph: {
    title: "Get Started",
    description:
      "Tell us about your business and what you need, then book your discovery call with the Anovas Integrated Systems team.",
    url: "/intake",
    type: "website",
  },
};

export default async function IntakePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (key.startsWith("utm_") && typeof value === "string") query.set(key, value);
  }

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">Get Started</p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Tell us about your business.</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            A few quick questions so we show up to your discovery call prepared. Pick a time at the end
            and you&apos;ll get a welcome email from our team right away.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <IntakeFormEmbed query={query.toString()} />
      </section>

      <MarketingFooter />
    </div>
  );
}
