"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, Menu, ChevronRight, AlertTriangle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NotificationPanel } from "@/components/ui/notification-panel";
import { SearchModal } from "@/components/ui/search-modal";
import { MOCK_NOTIFICATIONS, MOCK_USER } from "@/lib/mock-data";

const ROUTE_LABELS: Record<string, string> = {
  "/dashboard":        "Safety Command Centre",
  "/incidents":        "Incident Management",
  "/dispatch":         "Response Teams",
  "/analytics":        "Analytics & Reports",
  "/map":              "Plant Site Map",
  "/settings":         "System Settings",
  "/settings/profile": "User Profile",
  "/report":           "Report Incident",
};

function useBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [
    { label: "Safety Centre", href: "/dashboard" },
  ];
  let built = "";
  for (const seg of segments) {
    built += `/${seg}`;
    const label = ROUTE_LABELS[built] ?? seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ label, href: built });
  }
  return crumbs;
}

export function Navbar() {
  const [notifOpen,  setNotifOpen]  = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const crumbs = useBreadcrumbs();
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;
  const initials = MOCK_USER.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <>
      <header
        aria-label="Top navigation bar"
        className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 z-30 shadow-xs"
      >
        {/* Left: breadcrumb */}
        <div className="flex items-center gap-3">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-slate-500">
            {crumbs.map((crumb, idx) => {
              const isLast = idx === crumbs.length - 1;
              return (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {idx > 0 && <ChevronRight className="h-3 w-3 text-slate-400" aria-hidden="true" />}
                  {isLast ? (
                    <span className="font-bold text-slate-900">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-slate-900 transition-colors font-medium">
                      {crumb.label}
                    </Link>
                  )}
                </span>
              );
            })}
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline font-medium">Search incidents, sites...</span>
            <kbd className="hidden sm:inline-block rounded bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-200">
              ⌘K
            </kbd>
          </button>

          {/* Report Incident CTA */}
          <Link
            href="/report"
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-all shadow-xs"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Report Incident</span>
          </Link>

          {/* Notifications */}
          <button
            onClick={() => setNotifOpen(true)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-extrabold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Avatar */}
          <Link href="/settings/profile" className="flex items-center gap-2 pl-1 border-l border-slate-200">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-amber-400 font-bold text-xs">
              {initials}
            </div>
          </Link>
        </div>
      </header>

      <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
