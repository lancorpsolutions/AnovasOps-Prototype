"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  CalendarDays,
  Users2,
  UserSquare2,
  Receipt,
  ShieldAlert,
  BookOpen,
  Zap,
  BarChart3,
  Settings,
  Plug,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/anovasos", label: "Dashboard", icon: LayoutDashboard },
  { href: "/anovasos/sales", label: "Sales Pipeline", icon: TrendingUp },
  { href: "/anovasos/jobs", label: "Jobs", icon: Briefcase },
  { href: "/anovasos/scheduling", label: "Scheduling", icon: CalendarDays },
  { href: "/anovasos/crews", label: "Crews", icon: Users2 },
  { href: "/anovasos/customers", label: "Customers", icon: UserSquare2 },
  { href: "/anovasos/invoices", label: "Invoices", icon: Receipt },
  { href: "/anovasos/risks", label: "Operational Risks", icon: ShieldAlert },
  { href: "/anovasos/sop", label: "SOP Library", icon: BookOpen },
  { href: "/anovasos/automation", label: "Automation Rules", icon: Zap },
  { href: "/anovasos/reports", label: "Reports", icon: BarChart3 },
  { href: "/anovasos/integrations", label: "Integrations", icon: Plug },
  { href: "/anovasos/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("anovasos-sidebar");
    if (stored === "collapsed") setCollapsed(true);
  }, []);

  function toggleCollapsed() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("anovasos-sidebar", next ? "collapsed" : "expanded");
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/anovasos/login");
    router.refresh();
  }

  return (
    <aside
      className={cn(
        "hidden md:flex shrink-0 flex-col bg-navy text-white h-screen sticky top-0 transition-all duration-200",
        collapsed ? "w-[60px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("border-b border-white/10 flex items-center gap-2.5", collapsed ? "px-3 py-5 justify-between" : "px-5 py-5")}>
        <div className="flex items-center gap-2.5">
          <Image src="/branding/anovas-phoenix-icon.png" alt="" width={28} height={28} className="shrink-0" />
          {!collapsed && (
            <div>
              <p className="text-lg font-bold tracking-tight">
                Anovas<span className="text-orange-light">OS</span>
              </p>
              <p className="text-[11px] text-white/50 mt-0.5">Operating system for home service businesses</p>
            </div>
          )}
        </div>
        <button
          onClick={toggleCollapsed}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="text-white/40 hover:text-white transition-colors cursor-pointer shrink-0"
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center rounded-lg px-2.5 py-2.5 text-sm font-medium mb-0.5 transition-colors",
                collapsed ? "justify-center" : "gap-3",
                active ? "bg-orange text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={17} className="shrink-0" />
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-2 pb-2 space-y-0.5">
        <button
          onClick={handleLogout}
          title={collapsed ? "Log Out" : undefined}
          className={cn(
            "flex items-center rounded-lg px-2.5 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors w-full cursor-pointer",
            collapsed ? "justify-center" : "gap-3"
          )}
        >
          <LogOut size={17} className="shrink-0" />
          {!collapsed && "Log Out"}
        </button>
      </div>

      {!collapsed && (
        <div className="px-4 py-4 border-t border-white/10 text-[11px] text-white/40">
          Anovas Integrated Systems
        </div>
      )}
    </aside>
  );
}
