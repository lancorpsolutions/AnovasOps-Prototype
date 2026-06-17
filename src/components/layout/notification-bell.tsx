"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export function NotificationBell() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useStore();
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative text-gray-500 hover:text-charcoal cursor-pointer"
      >
        <Bell size={19} />
        {unread.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-semibold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
            {unread.length}
          </span>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-charcoal">Notifications</p>
              {unread.length > 0 && (
                <button
                  onClick={() => markAllNotificationsRead()}
                  className="text-xs text-orange font-medium hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              )}
            </div>
            {notifications.length === 0 ? (
              <p className="text-xs text-gray-400 px-4 py-6 text-center">No notifications yet.</p>
            ) : (
              <div>
                {notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer ${
                      n.read ? "bg-white" : "bg-orange/5"
                    }`}
                  >
                    <p className="text-sm text-charcoal">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(n.createdAt)}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
