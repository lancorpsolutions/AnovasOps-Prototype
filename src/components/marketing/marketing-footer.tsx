import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="bg-navy-light text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="font-bold text-sm">
            Anovas<span className="text-orange-light">OS</span>
          </p>
          <p className="text-white/40 text-xs mt-1">
            The operating system for home service businesses, built by Anovas Integrated Systems.
          </p>
        </div>
        <nav className="flex flex-wrap gap-5 text-xs text-white/50">
          <Link href="/about" className="hover:text-white/80">About</Link>
          <Link href="/pricing" className="hover:text-white/80">Pricing</Link>
          <Link href="/revenue-leaks-guide" className="hover:text-white/80">Free Guide</Link>
          <Link href="/contact" className="hover:text-white/80">Contact</Link>
          <Link href="/terms" className="hover:text-white/80">Terms</Link>
          <Link href="/privacy" className="hover:text-white/80">Privacy</Link>
          <Link href="/cookies" className="hover:text-white/80">Cookies</Link>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="max-w-6xl mx-auto px-6 py-4 text-white/30 text-[11px]">
          © {new Date().getFullYear()} Anovas Integrated Systems. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
