"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const platforms = [
  { href: "/services/anovasos", label: "AnovasOS", summary: "Business growth platform" },
  { href: "/services/autopilot", label: "Anovas Autopilot", summary: "Revenue Protection System" },
  { href: "/services/ai-agents", label: "AI Agent Services", summary: "Custom AI workforce for your operation" },
];

const professionalServices = [
  { href: "/services/brand-identity", label: "Brand Identity Design" },
  { href: "/services/website-design", label: "Website Design & Development" },
  { href: "/services/seo", label: "SEO / AEO / GEO" },
  { href: "/services/google-my-business", label: "Google My Business" },
  { href: "/services/social-media", label: "Social Media Management" },
  { href: "/services/content-creation", label: "Content Creation" },
  { href: "/services/graphic-design", label: "Graphic Design" },
  { href: "/services/paid-advertising", label: "Paid Advertising" },
  { href: "/services/business-structure", label: "Business Structure Consulting" },
];

const resources = [
  { href: "/revenue-leaks-guide", label: "Free Revenue Leaks Guide", summary: "Free diagnostic guide" },
  { href: "/blog", label: "Blog", summary: "Insights & updates" },
];

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-sm text-white border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/branding/anovas-phoenix-icon.png" alt="" width={28} height={28} className="h-7 w-7" />
          <span className="font-bold text-base">
            Anovas <span className="text-white/50 font-medium">Integrated Systems</span>
          </span>
        </Link>

        {/* Desktop nav — hidden below lg (1024px) */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors">
            About
          </Link>

          {/* Services mega-menu */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
            >
              Services <ChevronDown size={14} />
            </Link>
            {servicesOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[560px]">
                <div className="rounded-xl border border-white/10 bg-navy-light shadow-xl p-4">
                  <div className="grid grid-cols-2 gap-x-6">
                    {/* Left: Platforms */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 px-2">Platforms</p>
                      {platforms.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block rounded-lg px-2 py-2 hover:bg-white/10 transition-colors"
                        >
                          <p className="text-sm font-semibold text-white">{s.label}</p>
                          <p className="text-xs text-white/50">{s.summary}</p>
                        </Link>
                      ))}
                    </div>
                    {/* Right: Professional Services */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 px-2">Professional Services</p>
                      {professionalServices.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block rounded-lg px-2 py-1.5 hover:bg-white/10 transition-colors"
                        >
                          <p className="text-sm text-white/80 hover:text-white">{s.label}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <Link
                      href="/services"
                      className="flex items-center gap-1.5 px-2 text-xs font-semibold text-orange-light hover:text-white transition-colors"
                    >
                      View all services <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resources dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors">
              Resources <ChevronDown size={14} />
            </button>
            {resourcesOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64">
                <div className="rounded-xl border border-white/10 bg-navy-light shadow-xl p-2">
                  {resources.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="block rounded-lg px-3 py-2.5 hover:bg-white/10 transition-colors"
                    >
                      <p className="text-sm font-semibold text-white">{r.label}</p>
                      <p className="text-xs text-white/50">{r.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/faq" className="text-sm text-white/70 hover:text-white transition-colors">
            FAQ
          </Link>

          <Link href="/contact" className="text-sm text-white/70 hover:text-white transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/anovasos/login" className="text-sm text-white/70 hover:text-white transition-colors">
            Log In
          </Link>
          <Button asChild variant="primary" size="sm">
            <Link href="/aros-growth-score">Book Free Audit</Link>
          </Button>
        </div>

        {/* Hamburger — visible below lg */}
        <button
          className="lg:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
          <Link href="/" className="text-sm text-white/80 hover:text-white py-2" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" className="text-sm text-white/80 hover:text-white py-2" onClick={() => setOpen(false)}>About</Link>

          {/* Services accordion */}
          <button
            className="flex items-center justify-between text-sm text-white/80 hover:text-white py-2 w-full text-left"
            onClick={() => setMobileServicesOpen((v) => !v)}
          >
            Services
            <ChevronDown size={14} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileServicesOpen && (
            <div className="pl-3 border-l border-white/10 mb-1 flex flex-col gap-0.5">
              <p className="text-[10px] uppercase tracking-wide text-white/30 pt-1 pb-0.5">Platforms</p>
              {platforms.map((s) => (
                <Link key={s.href} href={s.href} className="text-sm text-white/80 hover:text-white py-1.5" onClick={() => setOpen(false)}>
                  {s.label}
                </Link>
              ))}
              <p className="text-[10px] uppercase tracking-wide text-white/30 pt-2 pb-0.5">Professional Services</p>
              {professionalServices.map((s) => (
                <Link key={s.href} href={s.href} className="text-sm text-white/80 hover:text-white py-1" onClick={() => setOpen(false)}>
                  {s.label}
                </Link>
              ))}
              <Link href="/services" className="text-xs font-semibold text-orange-light py-2" onClick={() => setOpen(false)}>
                View all services →
              </Link>
            </div>
          )}

          <div className="flex flex-col gap-0.5 pl-3 border-l border-white/10">
            <p className="text-[10px] uppercase tracking-wide text-white/30 pt-1 pb-0.5">Resources</p>
            {resources.map((r) => (
              <Link key={r.href} href={r.href} className="text-sm text-white/80 hover:text-white py-1.5" onClick={() => setOpen(false)}>
                {r.label}
              </Link>
            ))}
          </div>

          <Link href="/faq" className="text-sm text-white/80 hover:text-white py-2" onClick={() => setOpen(false)}>FAQ</Link>
          <Link href="/contact" className="text-sm text-white/80 hover:text-white py-2" onClick={() => setOpen(false)}>Contact</Link>

          <div className="flex flex-col gap-2 pt-3 border-t border-white/10 mt-1">
            <Link href="/anovasos/login" className="text-sm text-white/80 hover:text-white" onClick={() => setOpen(false)}>
              Log In
            </Link>
            <Button asChild variant="primary" size="sm" className="w-full">
              <Link href="/aros-growth-score" onClick={() => setOpen(false)}>Book Free Audit</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
