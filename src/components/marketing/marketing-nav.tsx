"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useId } from "react";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/site/tracked-link";
import { ROUTES } from "@/lib/site/config";

const platforms = [
  { href: "/services/anovasos", label: "AnovasOS", summary: "Business growth platform" },
  { href: "/services/autopilot", label: "Anovas Autopilot", summary: "Revenue protection system" },
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
  { href: ROUTES.diagnostic, label: "Business Systems Diagnostic", summary: "Free 3-minute AROS score" },
  { href: ROUTES.sampleReport, label: "Sample Diagnostic Report", summary: "See what the full report covers" },
  { href: ROUTES.guide, label: "Revenue Leaks Guide", summary: "Free PDF guide" },
  { href: "/blog", label: "Blog", summary: "Insights & updates" },
];

type MenuKey = "services" | "resources" | null;

function Dropdown({
  label,
  open,
  onToggle,
  children,
  align = "left",
  width,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  align?: "left" | "center";
  width: string;
}) {
  const id = useId();
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-white/75 hover:text-white transition-colors"
      >
        {label}
        <ChevronDown size={14} aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        id={id}
        hidden={!open}
        className={`absolute top-full pt-3 ${align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"} ${width}`}
      >
        <div className="rounded-xl border border-white/10 bg-navy-light p-3 shadow-2xl">{children}</div>
      </div>
    </div>
  );
}

export function MarketingNav() {
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close menus on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onPointer(e: MouseEvent | TouchEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggle = (key: Exclude<MenuKey, null>) => setMenu((m) => (m === key ? null : key));
  const linkClass = "rounded-md px-2 py-1.5 text-sm text-white/75 hover:text-white transition-colors";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 text-white backdrop-blur-md">
      <a href="#main" className="skip-link">Skip to content</a>
      <div
        ref={navRef}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setMenu(null);
        }}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Anovas Integrated Systems home">
          <Image src="/branding/anovas-phoenix-icon.png" alt="" width={28} height={28} className="h-7 w-7" priority />
          <span className="font-semibold tracking-tight">
            Anovas<span className="hidden font-normal text-white/50 sm:inline"> Integrated Systems</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <Dropdown label="Solutions" open={menu === "services"} onToggle={() => toggle("services")} width="w-[560px]">
            <div className="grid grid-cols-2 gap-x-6">
              <div>
                <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-white/40">Platforms</p>
                {platforms.map((s) => (
                  <Link key={s.href} href={s.href} className="block rounded-lg px-2 py-2 hover:bg-white/10">
                    <span className="block text-sm font-semibold text-white">{s.label}</span>
                    <span className="block text-xs text-white/55">{s.summary}</span>
                  </Link>
                ))}
              </div>
              <div>
                <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-white/40">Professional Services</p>
                {professionalServices.map((s) => (
                  <Link key={s.href} href={s.href} className="block rounded-lg px-2 py-1.5 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-3 border-t border-white/10 pt-3">
              <Link href="/services" className="flex items-center gap-1.5 px-2 text-xs font-semibold text-orange-light hover:text-white">
                View all services <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          </Dropdown>
          <Link href="/#how-it-works" className={linkClass}>How it works</Link>
          <Dropdown label="Resources" open={menu === "resources"} onToggle={() => toggle("resources")} align="center" width="w-72">
            {resources.map((r) => (
              <Link key={r.href} href={r.href} className="block rounded-lg px-3 py-2.5 hover:bg-white/10">
                <span className="block text-sm font-semibold text-white">{r.label}</span>
                <span className="block text-xs text-white/55">{r.summary}</span>
              </Link>
            ))}
          </Dropdown>
          <Link href="/about" className={linkClass}>About</Link>
          <Link href="/faq" className={linkClass}>FAQ</Link>
          <Link href="/contact" className={linkClass}>Contact</Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link href="/anovasos/login" className="hidden text-sm text-white/70 hover:text-white xl:block">
            Log in
          </Link>
          <Button asChild variant="primary" size="sm" className="hidden h-9 px-4 text-sm sm:inline-flex">
            <TrackedLink href={ROUTES.diagnostic} location="nav" ctaId="diagnostic">
              Get the Diagnostic
            </TrackedLink>
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 hover:bg-white/10 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!mobileOpen} className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-ink lg:hidden">
        <nav
          aria-label="Mobile"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setMobileOpen(false);
          }}
          className="mx-auto max-w-6xl space-y-6 px-5 py-6">
          <Button asChild variant="primary" size="lg" className="w-full">
            <TrackedLink href={ROUTES.diagnostic} location="nav_mobile" ctaId="diagnostic">
              Get Your Business Systems Diagnostic
            </TrackedLink>
          </Button>
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/40">Platforms</p>
            {platforms.map((s) => (
              <Link key={s.href} href={s.href} className="block py-2 text-base font-medium text-white">{s.label}</Link>
            ))}
          </div>
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/40">Resources</p>
            {resources.map((r) => (
              <Link key={r.href} href={r.href} className="block py-2 text-base text-white/85">{r.label}</Link>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            {[
              ["/#how-it-works", "How it works"],
              ["/services", "All services"],
              ["/about", "About"],
              ["/faq", "FAQ"],
              ["/contact", "Contact"],
              ["/book", "Book a call"],
              ["/anovasos/login", "Log in"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="block py-2 text-base text-white/85">{label}</Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
