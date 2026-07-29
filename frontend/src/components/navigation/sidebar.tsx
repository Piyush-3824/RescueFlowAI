"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, AlertTriangle, Radio,
  BarChart2, Map, Settings, Activity,
  User, ChevronRight, Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_STATS, MOCK_USER } from "@/lib/mock-data";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Command Center", href: "/dashboard",  icon: LayoutDashboard, badge: null },
  { label: "Incidents",      href: "/incidents",  icon: AlertTriangle,   badge: MOCK_STATS.activeIncidents },
  { label: "Dispatch",       href: "/dispatch",   icon: Radio,           badge: null },
  { label: "Analytics",      href: "/analytics",  icon: BarChart2,       badge: null },
  { label: "Live Map",       href: "/map",        icon: Map,             badge: null },
] as const;

const BOTTOM_NAV = [
  { label: "Profile",  href: "/settings/profile", icon: User     },
  { label: "Settings", href: "/settings",          icon: Settings },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  const initials = MOCK_USER.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <aside
      aria-label="Main navigation"
      className="hidden md:flex w-[240px] shrink-0 flex-col border-r border-white/[0.06] bg-card"
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-white/[0.06] px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-400/10 ring-1 ring-amber-400/20">
          <Activity className="h-4 w-4 text-amber-400" aria-hidden="true" />
        </div>
        <span className="font-bold tracking-tight text-foreground">
          <span className="gradient-text">Rescue</span>FlowAI
        </span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto p-3" aria-label="Main menu">
        <p className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/50">
          Main Menu
        </p>
        <ul className="space-y-0.5" role="list">
          {NAV_ITEMS.map(({ label, href, icon: Icon, badge }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-amber-400/10 text-amber-400"
                      : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-pill"
                      className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-amber-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="flex-1">{label}</span>
                  {badge !== null && badge > 0 && (
                    <span className={cn(
                      "flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold",
                      isActive
                        ? "bg-amber-400/20 text-amber-400"
                        : "bg-red-500/15 text-red-400"
                    )}>
                      {badge}
                    </span>
                  )}
                  {isActive && !badge && (
                    <ChevronRight className="h-3.5 w-3.5 text-amber-400/60" aria-hidden="true" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Secondary nav */}
        <p className="mb-2 mt-5 px-3 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/50">
          Account
        </p>
        <ul className="space-y-0.5" role="list">
          {BOTTOM_NAV.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-amber-400/10 text-amber-400"
                      : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-pill"
                      className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-amber-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User profile footer */}
      <div className="border-t border-white/[0.06] p-3 space-y-2">
        {/* System status */}
        <div className="flex items-center gap-2 rounded-xl bg-green-500/8 px-3 py-2">
          <span className="dot-online" aria-hidden="true" />
          <span className="text-xs font-medium text-green-400">All Systems Operational</span>
        </div>

        {/* User mini-card */}
        <Link href="/settings/profile"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
          aria-label="Go to profile"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-400/25 bg-amber-400/10 text-xs font-bold text-amber-400">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-foreground">{MOCK_USER.name}</p>
            <p className="truncate text-[10px] text-muted-foreground">{MOCK_USER.role}</p>
          </div>
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-400/10">
            <Shield className="h-2.5 w-2.5 text-amber-400" aria-hidden="true" />
          </div>
        </Link>

        <p className="text-center text-[10px] text-muted-foreground/40">v0.1.0 · OSHA Compliant</p>
      </div>
    </aside>
  );
}
