"use client";

import { useStore } from "@/lib/store";
import { NotificationBell } from "@/components/layout/notification-bell";

export function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  const { company, users } = useStore();
  const currentUser = users[0];
  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-charcoal px-6 py-4 sticky top-0 z-30">
      <div>
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-white/50 mt-0.5 max-w-2xl">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-white">{company.name}</p>
          <p className="text-xs text-white/50">{company.subscriptionTier} Plan</p>
        </div>
        <NotificationBell />
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-semibold">
            {currentUser.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-white">{currentUser.name}</p>
            <p className="text-xs text-white/50">{currentUser.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
