"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/sales", label: "Sales Pipeline", icon: TrendingUp },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/scheduling", label: "Scheduling", icon: CalendarDays },
  { href: "/crews", label: "Crews", icon: Users2 },
  { href: "/customers", label: "Customers", icon: UserSquare2 },
  { href: "/invoices", label: "Invoices", icon: Receipt },
  { href: "/risks", label: "Operational Risks", icon: ShieldAlert },
  { href: "/sop", label: "SOP Library", icon: BookOpen },
  { href: "/automation", label: "Automation Rules", icon: Zap },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-navy text-white h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-white/10">
        <p className="text-lg font-bold tracking-tight">
          Anovas<span className="text-orange-light">OS</span>
        </p>
        <p className="text-[11px] text-white/50 mt-0.5">Operating system for home service businesses</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-2.5">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium mb-0.5 transition-colors",
                active ? "bg-orange text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-4 border-t border-white/10 text-[11px] text-white/40">
        Anovas Integrated Systems
      </div>
    </aside>
  );
}
