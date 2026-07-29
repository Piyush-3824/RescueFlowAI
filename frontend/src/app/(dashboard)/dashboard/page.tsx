"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle, ShieldCheck, Clock, CheckCircle2, MapPin,
  ArrowRight, Activity, ChevronRight, Filter, Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IncidentHeatmap } from "@/components/dashboard/incident-heatmap";
import { IncidentTimeline } from "@/components/dashboard/incident-timeline";

const TOP_KPIS = [
  { label: "Active Incidents",  value: "12",     sub: "4 requires immediate action", icon: AlertTriangle, color: "text-amber-500 bg-amber-50" },
  { label: "Critical",          value: "3",      sub: "Zone C, Bay 4, Sector 1",     icon: ShieldCheck,   color: "text-red-600 bg-red-50" },
  { label: "Average Response",  value: "4m 12s", sub: "18% faster than last week",   icon: Clock,         color: "text-blue-600 bg-blue-50" },
  { label: "Safety Score",      value: "87/100", sub: "OSHA Compliant Status",        icon: CheckCircle2,  color: "text-emerald-600 bg-emerald-50" },
];

const ACTIVE_INCIDENTS = [
  { id: "INC-2024-001", title: "Chemical Leak",  severity: "CRITICAL", severityClass: "bg-red-600 text-white", zone: "Zone C", time: "10 mins ago" },
  { id: "INC-2024-002", title: "Welding Hazard", severity: "HIGH",     severityClass: "bg-orange-500 text-white", zone: "Zone B", time: "24 mins ago" },
  { id: "INC-2024-003", title: "PPE Violation",  severity: "MEDIUM",   severityClass: "bg-amber-500 text-slate-950", zone: "Assembly Line", time: "1 hour ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-8">
      {/* Top Welcome Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Safety Command Centre</h1>
          <p className="text-xs text-slate-500">Real-time site monitoring, incident tracking and automated dispatch.</p>
        </div>
        <Link
          href="/report"
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-xs hover:bg-amber-400 transition-all"
        >
          <AlertTriangle className="h-4 w-4" />
          <span>Report Incident</span>
        </Link>
      </div>

      {/* Top Row: ONLY 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOP_KPIS.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", color)}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</span>
              <p className="text-[11px] text-slate-500 mt-1">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: LEFT (Plant Map) | RIGHT (Active Incidents) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT: Large Site / Plant Map (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-500" />
              <h2 className="text-base font-bold text-slate-900">Site / Plant Map</h2>
            </div>
            <span className="text-xs font-semibold text-slate-400">Live Telemetry</span>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <IncidentHeatmap />
          </div>
        </div>

        {/* RIGHT: Active Incidents list (1 col) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <h2 className="text-base font-bold text-slate-900">Active Incidents</h2>
            </div>
            <Link href="/incidents" className="text-xs font-bold text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {ACTIVE_INCIDENTS.map((inc) => (
              <Link
                key={inc.id}
                href={`/incidents/${inc.id}`}
                className="block rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 hover:bg-slate-100/70 transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {inc.title}
                  </span>
                  <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-black uppercase", inc.severityClass)}>
                    {inc.severity}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    {inc.zone}
                  </span>
                  <span>{inc.time}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/incidents"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span>Manage All 12 Incidents</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom: Recent Activity / Incident Timeline */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Recent Incident Timeline</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Auto-updated 1m ago</span>
        </div>

        <IncidentTimeline />
      </div>
    </div>
  );
}
