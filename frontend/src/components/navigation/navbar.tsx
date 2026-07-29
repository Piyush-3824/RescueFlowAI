"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, Menu, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NotificationPanel } from "@/components/ui/notification-panel";
import { SearchModal } from "@/components/ui/search-modal";
import { MOCK_NOTIFICATIONS, MOCK_USER } from "@/lib/mock-data";

/* ── Route label map ─────────────────────────────────────────────────────── */
const ROUTE_LABELS: Record<string, string> = {
  "/dashboard":        "Command Center",
  "/incidents":        "Incident History",
  "/dispatch":         "Dispatch",
  "/analytics":        "Analytics",
  "/map":              "Live Map",
  "/settings":         "Settings",
  "/settings/profile": "Profile",
  "/report":           "Report Incident",
};

function useBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [
    { label: "RescueFlowAI", href: "/dashboard" },
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
        className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] bg-card/90 px-4 backdrop-blur-sm md:px-6 z-30"
      >
        {/* Left: mobile menu + breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Open mobile menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="hidden items-center gap-1 text-xs md:flex">
            {crumbs.map((crumb, idx) => (
              <span key={crumb.href} className="flex items-center gap-1">
                {idx > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/40" aria-hidden="true" />}
                {idx === crumbs.length - 1 ? (
                  <span className="font-semibold text-foreground" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search (Ctrl+K)"
            id="navbar-search-btn"
            onClick={() => setSearchOpen(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Notifications (${unreadCount} unread)`}
            id="navbar-notifications-btn"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative text-muted-foreground hover:text-foreground"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white"
              >
                {unreadCount}
              </span>
            )}
          </Button>

          {/* Divider */}
          <div className="mx-1 h-5 w-px bg-white/10" aria-hidden="true" />

          {/* User avatar */}
          <Link
            href="/settings/profile"
            aria-label="User profile"
            id="navbar-user-avatar"
          >
            <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-amber-400/25 bg-gradient-to-br from-amber-400/15 to-orange-400/10 text-xs font-bold text-amber-400 transition-all hover:border-amber-400/40 hover:shadow-md hover:shadow-amber-400/10">
              {initials}
            </div>
          </Link>
        </div>
      </header>

      {/* Panels */}
      <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
