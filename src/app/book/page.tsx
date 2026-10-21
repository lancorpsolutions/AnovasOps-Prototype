import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { BookingEmbed } from "@/components/site/booking-embed";
import { Container, Eyebrow } from "@/components/site/section";
import { ROUTES, SUPPORT_EMAIL } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Book a consultation with Anovas Integrated Systems to walk through your Business Systems Diagnostic, or talk through AnovasOS, Anovas Autopilot, and implementation services.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a Consultation | Anovas Integrated Systems",
    description: "Walk through your diagnostic results or talk through the right system for your business.",
    url: "/book",
    type: "website",
  },
};

const agenda = [
  "Your current setup: how leads come in, how they're followed up, and how jobs and invoices are tracked",
  "Where your diagnostic says you're leaking the most (or we'll score it together on the call)",
  "Which fix we'd start with, what it involves, and what it costs",
  "What we'd need from you, and a realistic timeline",
];

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main id="main">
        <section className="surface-ink text-white">
          <Container className="py-14 md:py-16">
            <Eyebrow tone="ink">Consultation</Eyebrow>
            <h1 className="max-w-2xl text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              Book a consultation with our team.
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed">
              A working conversation about your business, not a pitch deck. Pick a time below and
              you&apos;ll get a calendar confirmation from our scheduler.
            </p>
          </Container>
        </section>

        <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-charcoal">What we&apos;ll cover</h2>
              <ul className="mt-4 space-y-3">
                {agenda.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-charcoal">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-orange" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-charcoal">Haven&apos;t taken the diagnostic?</h2>
              <p className="mt-1.5 text-sm text-muted-ink">
                It takes about three minutes and makes the call more specific.{" "}
                <Link href={ROUTES.diagnostic} className="font-medium text-navy underline">Take it first</Link>.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-charcoal">Prefer to write?</h2>
              <p className="mt-1.5 text-sm text-muted-ink">
                Use the <Link href={ROUTES.contact} className="font-medium text-navy underline">contact form</Link> or email{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-1 font-medium text-navy underline">
                  <Mail size={13} aria-hidden="true" />
                  {SUPPORT_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
          <Suspense fallback={<div className="h-[720px] rounded-2xl border border-gray-200 bg-white" />}>
            <BookingEmbed />
          </Suspense>
        </Container>
      </main>
      <MarketingFooter />
    </div>
  );
}
