"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { SplashScreen } from "@/components/layout/splash-screen";

const noChromeRoutes = ["/signup", "/login", "/terms", "/privacy", "/cookies"];

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noChrome = noChromeRoutes.includes(pathname);

  if (noChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <SplashScreen />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </>
  );
}
