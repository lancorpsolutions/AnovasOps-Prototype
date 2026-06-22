import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="bg-navy-light text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-bold text-sm">Anovas Integrated Systems</p>
          <p className="text-white/40 text-xs mt-2 max-w-xs leading-relaxed">
            We build and run the software and growth systems behind local and home service
            businesses — from AI back-office automation to full-scale growth marketing.
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/40 mb-3">Company</p>
          <nav className="flex flex-col gap-2 text-xs text-white/60">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/services" className="hover:text-white">Services</Link>
            <Link href="/revenue-leaks-guide" className="hover:text-white">Free Guide</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </nav>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/40 mb-3">Offerings</p>
          <nav className="flex flex-col gap-2 text-xs text-white/60">
            <Link href="/services/anovasos" className="hover:text-white">AnovasOS</Link>
            <Link href="/services/autopilot" className="hover:text-white">Anovas Autopilot</Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-white/30 text-[11px]">
          <p>© {new Date().getFullYear()} Anovas Integrated Systems. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="/terms" className="hover:text-white/70">Terms</Link>
            <Link href="/privacy" className="hover:text-white/70">Privacy</Link>
            <Link href="/cookies" className="hover:text-white/70">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
