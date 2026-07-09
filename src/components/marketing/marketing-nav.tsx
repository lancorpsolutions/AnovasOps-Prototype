"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [servicesPos, setServicesPos] = useState({ top: 0, left: 0 });
  const [resourcesPos, setResourcesPos] = useState({ top: 0, left: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const servicesWrapRef = useRef<HTMLDivElement>(null);
  const resourcesWrapRef = useRef<HTMLDivElement>(null);
  const servicesPanelRef = useRef<HTMLDivElement>(null);
  const resourcesPanelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }
  function scheduleClose(setOpen: (v: boolean) => void) {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  // The nav strip scrolls horizontally on narrow screens (overflow-x-auto),
  // which per the CSS spec forces overflow-y to clip too — so the dropdown
  // panels are portaled to <body> and positioned from the trigger's rect
  // instead of being laid out as absolute descendants of the nav.
  useLayoutEffect(() => {
    if (servicesOpen && servicesWrapRef.current) {
      const r = servicesWrapRef.current.getBoundingClientRect();
      const panelWidth = Math.min(560, window.innerWidth * 0.9);
      const left = Math.min(r.left, window.innerWidth - panelWidth - 16);
      setServicesPos({ top: r.bottom + 12, left: Math.max(16, left) });
    }
  }, [servicesOpen]);

  useLayoutEffect(() => {
    if (resourcesOpen && resourcesWrapRef.current) {
      const r = resourcesWrapRef.current.getBoundingClientRect();
      const panelWidth = 256;
      const centered = r.left + r.width / 2 - panelWidth / 2;
      const left = Math.min(Math.max(16, centered), window.innerWidth - panelWidth - 16);
      setResourcesPos({ top: r.bottom + 12, left });
    }
  }, [resourcesOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        !servicesPanelRef.current?.contains(target) &&
        !resourcesPanelRef.current?.contains(target)
      ) {
        setServicesOpen(false);
        setResourcesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-sm text-white border-b border-white/5">
      <div ref={navRef} className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">

        {/* Logo — abbreviates on small screens */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <Image src="/branding/anovas-phoenix-icon.png" alt="" width={26} height={26} className="h-6 w-6 sm:h-7 sm:w-7" />
          <span className="font-bold text-sm sm:text-base">
            Anovas
            <span className="hidden sm:inline text-white/50 font-medium"> Integrated Systems</span>
          </span>
        </Link>

        {/* Nav tabs — always visible, compress on small screens */}
        <nav className="flex items-center gap-1 xs:gap-2 sm:gap-4 lg:gap-6 overflow-x-auto">

          <Link href="/about" className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap">
            About
          </Link>

          {/* Services mega-menu */}
          <div
            ref={servicesWrapRef}
            className="relative"
            onMouseEnter={() => { cancelClose(); setServicesOpen(true); }}
            onMouseLeave={() => scheduleClose(setServicesOpen)}
          >
            <button
              onClick={() => { setServicesOpen(!servicesOpen); setResourcesOpen(false); }}
              className="flex items-center gap-0.5 text-xs sm:text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap"
            >
              Services <ChevronDown size={12} className="shrink-0" />
            </button>
            {servicesOpen && createPortal(
              <div
                ref={servicesPanelRef}
                style={{ position: "fixed", top: servicesPos.top, left: servicesPos.left, width: "min(560px,90vw)" }}
                className="z-[60]"
                onMouseEnter={cancelClose}
                onMouseLeave={() => scheduleClose(setServicesOpen)}
              >
                <div className="rounded-xl border border-white/10 bg-navy-light shadow-xl p-4">
                  <div className="grid grid-cols-2 gap-x-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 px-2">Platforms</p>
                      {platforms.map((s) => (
                        <Link key={s.href} href={s.href} onClick={() => setServicesOpen(false)} className="block rounded-lg px-2 py-2 hover:bg-white/10 transition-colors">
                          <p className="text-sm font-semibold text-white">{s.label}</p>
                          <p className="text-xs text-white/50">{s.summary}</p>
                        </Link>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 px-2">Professional Services</p>
                      {professionalServices.map((s) => (
                        <Link key={s.href} href={s.href} onClick={() => setServicesOpen(false)} className="block rounded-lg px-2 py-1.5 hover:bg-white/10 transition-colors">
                          <p className="text-sm text-white/80 hover:text-white">{s.label}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <Link href="/services" onClick={() => setServicesOpen(false)} className="flex items-center gap-1.5 px-2 text-xs font-semibold text-orange-light hover:text-white transition-colors">
                      View all services <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>,
              document.body
            )}
          </div>

          {/* Resources dropdown */}
          <div
            ref={resourcesWrapRef}
            className="relative hidden sm:block"
            onMouseEnter={() => { cancelClose(); setResourcesOpen(true); }}
            onMouseLeave={() => scheduleClose(setResourcesOpen)}
          >
            <button
              onClick={() => { setResourcesOpen(!resourcesOpen); setServicesOpen(false); }}
              className="flex items-center gap-0.5 text-xs sm:text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap"
            >
              Resources <ChevronDown size={12} className="shrink-0" />
            </button>
            {resourcesOpen && createPortal(
              <div
                ref={resourcesPanelRef}
                style={{ position: "fixed", top: resourcesPos.top, left: resourcesPos.left, width: 256 }}
                className="z-[60]"
                onMouseEnter={cancelClose}
                onMouseLeave={() => scheduleClose(setResourcesOpen)}
              >
                <div className="rounded-xl border border-white/10 bg-navy-light shadow-xl p-2">
                  {resources.map((r) => (
                    <Link key={r.href} href={r.href} onClick={() => setResourcesOpen(false)} className="block rounded-lg px-3 py-2.5 hover:bg-white/10 transition-colors">
                      <p className="text-sm font-semibold text-white">{r.label}</p>
                      <p className="text-xs text-white/50">{r.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>,
              document.body
            )}
          </div>

          <Link href="/faq" className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap">
            FAQ
          </Link>

          <Link href="/contact" className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap">
            Contact
          </Link>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/anovasos/login" className="hidden md:block text-xs sm:text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap">
            Log In
          </Link>
          <Button asChild variant="primary" size="sm" className="text-xs px-2.5 py-1.5 sm:px-3 sm:py-2 sm:text-sm">
            <Link href="/aros-growth-score">
              <span className="hidden sm:inline">Book Free Audit</span>
              <span className="sm:hidden">Free Audit</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
