import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Anovas Integrated Systems",
  description: "Get in touch with the Anovas Integrated Systems team to talk through your business.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
              Contact Us
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Let&apos;s talk about your business.
            </h1>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg mb-6">
              Tell us where things are slipping — quotes, scheduling, crews, billing — and we&apos;ll
              show you which of our products and services fits your operation.
            </p>
            <p className="text-white/40 text-xs">
              Prefer to explore first?{" "}
              <Link href="/revenue-leaks-guide" className="underline hover:text-white/70">
                Get the free Revenue Leaks Guide
              </Link>{" "}
              or{" "}
              <Link href="/services" className="underline hover:text-white/70">
                explore our services
              </Link>
              .
            </p>
          </div>
          <div className="md:max-w-sm md:ml-auto w-full">
            <ContactForm />
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
