"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, AlertTriangle, Radio,
  BarChart2, FileText, Settings, Activity,
  User, Shield, PlusCircle, Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_STATS, MOCK_USER } from "@/lib/mock-data";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Overview",       href: "/dashboard",  icon: LayoutDashboard, badge: null },
  { label: "Incidents",      href: "/incidents",  icon: AlertTriangle,   badge: MOCK_STATS.activeIncidents },
  { label: "Report Incident",href: "/report",     icon: PlusCircle,      badge: null },
  { label: "Response Teams", href: "/dispatch",   icon: Users,           badge: null },
  { label: "Analytics",      href: "/analytics",  icon: BarChart2,       badge: null },
  { label: "Reports",        href: "/incidents?view=reports", icon: FileText, badge: null },
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
      className="hidden md:flex w-[240px] shrink-0 flex-col bg-[#0F172A] text-slate-200 shadow-xl border-r border-slate-800"
    >
      {/* Logo */}
      <Link href="/" className="flex h-16 items-center gap-2.5 border-b border-slate-800 px-5 hover:bg-slate-800/50 transition-colors">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 ring-1 ring-amber-500/30">
          <Activity className="h-4 w-4 text-amber-400" aria-hidden="true" />
        </div>
        <span className="font-bold tracking-tight text-white text-base">
          Rescue<span className="text-amber-400">FlowAI</span>
        </span>
      </Link>


      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto p-3" aria-label="Main menu">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </p>
        <ul className="space-y-1" role="list">
          {NAV_ITEMS.map(({ label, href, icon: Icon, badge }) => {
            const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150",
                    isActive
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-slate-950" : "text-slate-400 group-hover:text-white")} aria-hidden="true" />
                  <span className="flex-1">{label}</span>
                  {badge !== null && badge > 0 && (
                    <span className={cn(
                      "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-extrabold",
                      isActive
                        ? "bg-slate-950 text-amber-400"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    )}>
                      {badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Secondary nav */}
        <p className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          System
        </p>
        <ul className="space-y-1" role="list">
          {BOTTOM_NAV.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-slate-800 text-white font-semibold"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Footer Card */}
      <div className="border-t border-slate-800 p-3">
        <div className="flex items-center gap-3 rounded-xl bg-slate-900/90 p-2.5 border border-slate-800">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 text-xs font-black ring-1 ring-amber-500/30">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-white">{MOCK_USER.name}</p>
            <p className="truncate text-[10px] text-slate-400">{MOCK_USER.role}</p>
          </div>
          <Shield className="h-4 w-4 text-emerald-400 shrink-0" />
        </div>
      </div>
    </aside>
  );
}
