"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { href: "/services/anovasos", label: "AnovasOS", summary: "Business growth platform" },
  { href: "/services/autopilot", label: "Anovas Autopilot", summary: "Revenue Protection System" },
];

const resources = [
  { href: "/revenue-leaks-guide", label: "Free Revenue Leaks Guide", summary: "Free diagnostic guide" },
  { href: "/blog", label: "Blog", summary: "Insights & updates" },
];

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-sm text-white border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/branding/anovas-phoenix-icon.png" alt="" width={28} height={28} className="h-7 w-7" />
          <span className="font-bold text-base">
            Anovas <span className="text-white/50 font-medium">Integrated Systems</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors">
            About
          </Link>

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
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64">
                <div className="rounded-xl border border-white/10 bg-navy-light shadow-xl p-2">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block rounded-lg px-3 py-2.5 hover:bg-white/10 transition-colors"
                    >
                      <p className="text-sm font-semibold text-white">{s.label}</p>
                      <p className="text-xs text-white/50">{s.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

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

        <div className="hidden md:flex items-center gap-3">
          <Link href="/anovasos/login" className="text-sm text-white/70 hover:text-white transition-colors">
            Log In
          </Link>
          <Button asChild variant="primary" size="sm">
            <Link href="/aros-growth-score">Book Free Audit</Link>
          </Button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pl-3 border-l border-white/10">
            <p className="text-[11px] uppercase tracking-wide text-white/40">Services</p>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-sm text-white/80 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {s.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pl-3 border-l border-white/10">
            <p className="text-[11px] uppercase tracking-wide text-white/40">Resources</p>
            {resources.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="text-sm text-white/80 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {r.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
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
