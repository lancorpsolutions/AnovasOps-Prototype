"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";

const MARKETING_PREFIXES = ["/resources"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMarketing = MARKETING_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isMarketing) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
