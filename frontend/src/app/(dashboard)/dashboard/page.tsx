"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle, ShieldCheck, Clock, CheckCircle2, MapPin,
  Activity, ChevronRight, Volume2, VolumeX
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IncidentHeatmap } from "@/components/dashboard/incident-heatmap";
import { IncidentTimeline } from "@/components/dashboard/incident-timeline";
import { useIncidents } from "@/hooks/use-incidents";
import { useSpeechSynthesis } from "@/hooks/use-speech";

// ── Static KPIs ───────────────────────────────────────────────────────────────
const BASE_KPIS = [
  { label: "Active Incidents",  value: "12",     sub: "4 requires immediate action", icon: AlertTriangle, iconColor: "text-amber-400",   glowClass: "shadow-[0_0_12px_rgba(245,158,11,0.25)]",  bg: "bg-amber-400/10",   pulse: false },
  { label: "Critical",          value: "3",      sub: "Zone C, Bay 4, Sector 1",     icon: ShieldCheck,   iconColor: "text-red-400",     glowClass: "shadow-[0_0_12px_rgba(239,68,68,0.3)]",   bg: "bg-red-500/10",     pulse: true  },
  { label: "Average Response",  value: "4m 12s", sub: "18% faster than last week",   icon: Clock,         iconColor: "text-blue-400",    glowClass: "shadow-[0_0_12px_rgba(59,130,246,0.2)]",  bg: "bg-blue-500/10",    pulse: false },
  { label: "Safety Score",      value: "87/100", sub: "OSHA Compliant Status",        icon: CheckCircle2,  iconColor: "text-emerald-400", glowClass: "shadow-[0_0_12px_rgba(52,211,153,0.2)]",  bg: "bg-emerald-500/10", pulse: false },
];

const STATIC_INCIDENTS = [
  { id: "INC-2024-001", title: "Chemical Leak",  severity: "CRITICAL", severityClass: "bg-red-500/20 text-red-400 border border-red-500/30",        zone: "Zone C",        time: "10 mins ago" },
  { id: "INC-2024-002", title: "Welding Hazard", severity: "HIGH",     severityClass: "bg-orange-500/20 text-orange-400 border border-orange-500/30", zone: "Zone B",        time: "24 mins ago" },
  { id: "INC-2024-003", title: "PPE Violation",  severity: "MEDIUM",   severityClass: "bg-amber-500/20 text-amber-400 border border-amber-500/30",    zone: "Assembly Line", time: "1 hour ago"  },
];

export default function DashboardPage() {
  const { incidents: liveIncidents } = useIncidents();
  const { speak, stop: stopSpeech, speaking } = useSpeechSynthesis();

  const newIncidents = liveIncidents.filter(
    (inc) => !STATIC_INCIDENTS.find((s) => s.id === inc.id)
  );

  const displayIncidents = [
    ...newIncidents.map((inc) => ({
      id:            inc.id,
      title:         inc.title,
      severity:      inc.severity.toUpperCase(),
      severityClass: inc.severity === "critical"
        ? "bg-red-500/20 text-red-400 border border-red-500/30"
        : inc.severity === "high"
          ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
          : "bg-amber-500/20 text-amber-400 border border-amber-500/30",
      zone: inc.location,
      time: "Just now",
    })),
    ...STATIC_INCIDENTS,
  ].slice(0, 6);

  const kpis = BASE_KPIS.map((k) =>
    k.label === "Active Incidents"
      ? { ...k, value: String(12 + newIncidents.length) }
      : k
  );

  const handleBriefing = () => {
    if (speaking) { stopSpeech(); return; }
    const criticalCount = newIncidents.filter((i) => i.severity === "critical").length + 3;
    speak(
      `Dispatcher briefing. There are currently ${12 + newIncidents.length} active incidents. ` +
      `${criticalCount} are classified as critical and require immediate attention. ` +
      `Average response time is 4 minutes 12 seconds, 18 percent faster than last week. ` +
      `Safety score stands at 87 out of 100.`,
      0.9
    );
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white/90 tracking-tight">Safety Command Centre</h1>
          <p className="text-xs text-white/40 mt-0.5">Real-time site monitoring, incident tracking and automated dispatch.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleBriefing}
            title={speaking ? "Stop briefing" : "Play dispatcher briefing"}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all border",
              speaking
                ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                : "bg-white/[0.05] border-white/[0.08] text-white/50 hover:bg-white/[0.10] hover:text-white/80"
            )}
          >
            {speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {speaking ? "Stop" : "Briefing"}
          </button>

          <Link
            href="/report"
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)]"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Report Incident</span>
            {newIncidents.length > 0 && (
              <span className="ml-1 rounded-full bg-slate-950/40 text-white text-[10px] font-black w-4 h-4 flex items-center justify-center">
                {newIncidents.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, value, sub, icon: Icon, iconColor, glowClass, bg, pulse }) => (
          <div
            key={label}
            className={cn(
              "glass-card p-5 transition-all",
              pulse && "ring-1 ring-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</span>
              <div className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl",
                bg, glowClass,
                pulse && "animate-pulse"
              )}>
                <Icon className={cn("h-4 w-4", iconColor)} />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white/90 tracking-tight">{value}</span>
              <p className="text-[11px] text-white/40 mt-1">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Site Map */}
        <div className="lg:col-span-2 glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white/80">Site / Plant Map</h2>
            </div>
            <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Live Telemetry</span>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]">
            <IncidentHeatmap />
          </div>
        </div>

        {/* Active Incidents */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <h2 className="text-sm font-bold text-white/80">Active Incidents</h2>
            </div>
            <Link href="/incidents" className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
              View All
            </Link>
          </div>

          <div className="space-y-2">
            {displayIncidents.map((inc) => (
              <Link
                key={inc.id}
                href={`/incidents/${inc.id}`}
                className="block rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 hover:bg-white/[0.07] hover:border-white/[0.12] transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white/75 group-hover:text-amber-400 transition-colors">
                    {inc.title}
                  </span>
                  <span className={cn(
                    "rounded-md px-2 py-0.5 text-[9px] font-black uppercase",
                    inc.severityClass,
                    inc.severity === "CRITICAL" && "animate-pulse"
                  )}>
                    {inc.severity}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-white/30 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-2.5 w-2.5" />{inc.zone}
                  </span>
                  <span>{inc.time}</span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/incidents"
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-xs font-bold text-white/50 hover:bg-white/[0.08] hover:text-white/70 transition-colors"
          >
            <span>Manage All {12 + newIncidents.length} Incidents</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Timeline */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white/80">Recent Incident Timeline</h2>
          </div>
          <span className="text-[10px] text-white/30 font-medium">Auto-updated 1m ago</span>
        </div>
        <IncidentTimeline />
      </div>
    </div>
  );
}
