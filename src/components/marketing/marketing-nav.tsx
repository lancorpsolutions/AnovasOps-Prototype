"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/revenue-leaks-guide", label: "Free Guide" },
  { href: "/contact", label: "Contact" },
];

export function MarketingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy text-white">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/branding/anovas-phoenix-icon.png" alt="" width={28} height={28} className="h-7 w-7" />
          <span className="font-bold text-base">
            Anovas<span className="text-orange-light">OS</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/anovasos/login" className="text-sm text-white/70 hover:text-white transition-colors">
            Log In
          </Link>
          <Button asChild variant="primary" size="sm">
            <Link href="/anovasos/signup">Get Started</Link>
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
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <Link href="/anovasos/login" className="text-sm text-white/80 hover:text-white" onClick={() => setOpen(false)}>
              Log In
            </Link>
            <Button asChild variant="primary" size="sm" className="w-full">
              <Link href="/anovasos/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
