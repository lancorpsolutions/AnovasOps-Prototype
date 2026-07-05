import { StoreProvider } from "@/lib/store";
import { Sidebar } from "@/components/layout/sidebar";
import { SplashScreen } from "@/components/layout/splash-screen";
import { ThemeProvider } from "@/components/layout/theme-provider";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <StoreProvider>
        <SplashScreen />
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </StoreProvider>
    </ThemeProvider>
  );
}
