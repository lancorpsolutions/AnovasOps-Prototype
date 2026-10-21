import Link from "next/link";
import Image from "next/image";
import { CookieSettingsButton } from "@/components/analytics/cookie-settings-button";
import { ROUTES, SUPPORT_EMAIL } from "@/lib/site/config";

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: "Offerings",
    links: [
      ["/services/anovasos", "AnovasOS"],
      ["/services/autopilot", "Anovas Autopilot"],
      ["/services/ai-agents", "AI Agent Services"],
      ["/services", "All services"],
    ],
  },
  {
    title: "Get started",
    links: [
      [ROUTES.diagnostic, "Business Systems Diagnostic"],
      [ROUTES.sampleReport, "Sample report"],
      [ROUTES.book, "Book a consultation"],
      [ROUTES.guide, "Revenue Leaks Guide"],
    ],
  },
  {
    title: "Company",
    links: [
      ["/about", "About"],
      ["/faq", "FAQ"],
      ["/blog", "Blog"],
      ["/contact", "Contact"],
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Image src="/branding/anovas-phoenix-icon.png" alt="" width={24} height={24} className="h-6 w-6" />
            <p className="font-semibold">Anovas Integrated Systems</p>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
            Connected marketing, CRM, automation, and operations systems for local and home service
            businesses. Based in Little Rock, Arkansas.
          </p>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-4 inline-block text-sm text-orange-light hover:text-white">
            {SUPPORT_EMAIL}
          </a>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/60">{col.title}</p>
            <nav aria-label={col.title} className="flex flex-col gap-2 text-sm text-white/70">
              {col.links.map(([href, label]) => (
                <Link key={href} href={href} className="hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Anovas Integrated Systems LLC. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-4">
            <Link href="/terms" className="hover:text-white/80">Terms</Link>
            <Link href="/privacy" className="hover:text-white/80">Privacy</Link>
            <Link href="/cookies" className="hover:text-white/80">Cookies</Link>
            <CookieSettingsButton className="hover:text-white/80" />
          </nav>
        </div>
      </div>
    </footer>
  );
}
