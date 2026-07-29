"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, User, Clock, Shield, Cpu, Phone, Users2,
  AlertTriangle, CheckCircle2, Radio, ChevronRight, Brain,
  FileText, Zap, Download,
} from "lucide-react";
import { MOCK_INCIDENTS, type IncidentSeverity, type IncidentStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { RingProgress } from "@/components/ui/ring-progress";

const SEV_STYLES: Record<IncidentSeverity, {
  badge: string; headerBg: string; headerBorder: string; glow: string; bannerBg: string; bannerText: string;
}> = {
  critical: {
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
    headerBg: "bg-gradient-to-r from-red-500/8 to-transparent",
    headerBorder: "border-red-500/25",
    glow: "glow-red",
    bannerBg: "bg-red-500",
    bannerText: "CRITICAL — IMMEDIATE ACTION REQUIRED",
  },
  high: {
    badge: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    headerBg: "bg-gradient-to-r from-orange-500/8 to-transparent",
    headerBorder: "border-orange-500/25",
    glow: "glow-orange",
    bannerBg: "bg-orange-500",
    bannerText: "HIGH PRIORITY — RESPONSE DISPATCHED",
  },
  moderate: {
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    headerBg: "bg-gradient-to-r from-amber-500/8 to-transparent",
    headerBorder: "border-amber-500/25",
    glow: "glow-yellow",
    bannerBg: "bg-amber-500",
    bannerText: "MODERATE — ACTION REQUIRED",
  },
  low: {
    badge: "bg-green-500/15 text-green-400 border-green-500/30",
    headerBg: "bg-gradient-to-r from-green-500/8 to-transparent",
    headerBorder: "border-green-500/25",
    glow: "glow-green",
    bannerBg: "bg-green-600",
    bannerText: "LOW SEVERITY — ROUTINE HANDLING",
  },
};

const STATUS_CONFIG: Record<IncidentStatus, { label: string; color: string; dot: string }> = {
  active:     { label: "Active",     color: "text-red-400    bg-red-500/10    border-red-500/20",    dot: "bg-red-500"    },
  dispatched: { label: "Dispatched", color: "text-amber-400  bg-amber-500/10  border-amber-500/20",  dot: "bg-amber-500"  },
  resolved:   { label: "Resolved",   color: "text-green-400  bg-green-500/10  border-green-500/20",  dot: "bg-green-500"  },
  pending:    { label: "Pending",    color: "text-blue-400   bg-blue-500/10   border-blue-500/20",   dot: "bg-blue-500"   },
};

const TIMELINE_EVENTS = [
  { time: "08:12", label: "Incident Reported",       icon: AlertTriangle, color: "text-red-400 bg-red-400/10",      borderColor: "border-red-500/30"    },
  { time: "08:14", label: "AI Analysis Complete",    icon: Cpu,           color: "text-blue-400 bg-blue-400/10",    borderColor: "border-blue-500/30"   },
  { time: "08:16", label: "Teams Notified",          icon: Phone,         color: "text-amber-400 bg-amber-400/10",  borderColor: "border-amber-500/30"  },
  { time: "08:18", label: "Responders Dispatched",   icon: Radio,         color: "text-orange-400 bg-orange-400/10",borderColor: "border-orange-500/30" },
  { time: "08:45", label: "Teams On-Site",           icon: Users2,        color: "text-purple-400 bg-purple-400/10",borderColor: "border-purple-500/30" },
];

export default function IncidentDetailPage() {
  const params   = useParams();
  const id       = params["id"] as string;
  const incident = MOCK_INCIDENTS.find((i) => i.id === id) ?? MOCK_INCIDENTS[0]!;
  const sev      = SEV_STYLES[incident.severity];
  const stat     = STATUS_CONFIG[incident.status];

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/incidents" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Incidents
        </Link>
        <ChevronRight className="h-4 w-4 opacity-40" aria-hidden="true" />
        <span className="font-mono-id text-foreground">{incident.id}</span>
      </div>

      {/* Severity banner strip */}
      <div className={cn("flex items-center gap-3 rounded-xl px-4 py-2.5", sev.bannerBg)}>
        <div className="osha-stripe h-4 w-8 rounded" />
        <span className="text-xs font-black tracking-widest text-white">{sev.bannerText}</span>
        <div className="ml-auto osha-stripe h-4 w-8 rounded" />
      </div>

      {/* Header card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className={cn("relative overflow-hidden rounded-2xl border p-6", sev.headerBorder, sev.headerBg)}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-10" aria-hidden="true" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className={cn("rounded-lg border px-2.5 py-1 text-[11px] font-black uppercase tracking-wider", sev.badge)}>
                {incident.severity}
              </span>
              <span className={cn("flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold capitalize", stat.color)}>
                <span className={cn("h-1.5 w-1.5 rounded-full", stat.dot, incident.status === "active" && "animate-pulse")} aria-hidden="true" />
                {stat.label}
              </span>
              <span className="font-mono-id text-xs text-muted-foreground">{incident.id}</span>
            </div>
            <h1 className="text-2xl font-black text-foreground">{incident.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{incident.location}</span>
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" aria-hidden="true" />{incident.reportedBy}</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {new Date(incident.reportedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
              </span>
            </div>
          </div>

          {/* Safety score ring */}
          <div className="flex flex-col items-center gap-1">
            <RingProgress
              value={incident.safetyScore}
              size={72}
              strokeWidth={6}
              label={
                <span className={cn("text-base font-black",
                  incident.safetyScore >= 85 ? "text-green-400" :
                  incident.safetyScore >= 70 ? "text-amber-400" : "text-red-400"
                )}>
                  {incident.safetyScore}
                </span>
              }
            />
            <p className="text-[10px] text-muted-foreground">Safety Score</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="relative mt-5 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
          {[
            { label: "Mark Resolved",    icon: CheckCircle2, style: "bg-green-500/10 text-green-400 hover:bg-green-500/15 border-green-500/20" },
            { label: "Dispatch Units",   icon: Radio,        style: "bg-amber-400/10 text-amber-400 hover:bg-amber-400/15 border-amber-400/20" },
            { label: "OSHA Report",      icon: FileText,     style: "bg-blue-500/10 text-blue-400 hover:bg-blue-500/15 border-blue-500/20"   },
            { label: "Export",           icon: Download,     style: "bg-secondary/40 text-muted-foreground hover:text-foreground border-white/[0.06]" },
          ].map(({ label, icon: Icon, style }) => (
            <button key={label} className={cn("flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all", style)}>
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left: description + AI + responders */}
        <div className="space-y-5 lg:col-span-2">

          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/[0.06] bg-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <h2 className="text-sm font-bold text-foreground">Incident Description</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{incident.description}</p>
          </motion.div>

          {/* AI Analysis */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 p-5">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-400/5 blur-2xl" aria-hidden="true" />
            <div className="relative mb-3 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400/20 to-purple-400/10">
                <Brain className="h-4 w-4 text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">AI Analysis</h2>
                <p className="text-[10px] text-muted-foreground">Gemini AI · Analyzed in 2.1s · 94% confidence</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
                <span className="text-[10px] font-semibold text-blue-400">Auto-Generated</span>
              </div>
            </div>
            <p className="relative text-sm leading-relaxed text-muted-foreground">{incident.aiSummary}</p>

            {/* AI recommendation tags */}
            <div className="relative mt-3 flex flex-wrap gap-1.5">
              {["Immediate Response", "PPE Required", "OSHA Recordable", "HazMat Protocol"].map((tag) => (
                <span key={tag} className="rounded-full border border-blue-500/20 bg-blue-500/8 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Responders */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/[0.06] bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">Assigned Responders</h2>
              <span className="rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400">
                {incident.responders.length} assigned
              </span>
            </div>
            <div className="space-y-2">
              {incident.responders.map((r, i) => (
                <div key={r} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-secondary/20 px-3 py-2.5 transition-colors hover:bg-secondary/40">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 text-xs font-bold text-amber-400">
                    {r.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                  </div>
                  <span className="flex-1 text-sm font-medium text-foreground">{r}</span>
                  <span className={cn("flex items-center gap-1 text-xs font-semibold",
                    i === 0 ? "text-green-400" : "text-amber-400"
                  )}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", i === 0 ? "bg-green-400" : "bg-amber-400 animate-pulse")} aria-hidden="true" />
                    {i === 0 ? "On-site" : "En route"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: timeline + quick info */}
        <div className="space-y-5">
          {/* Response timeline */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="rounded-2xl border border-white/[0.06] bg-card p-5">
            <h2 className="mb-4 text-sm font-bold text-foreground">Response Timeline</h2>
            <ol className="relative space-y-4 pl-6">
              {/* Vertical line */}
              <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-red-500/50 via-amber-500/30 to-transparent" aria-hidden="true" />

              {TIMELINE_EVENTS.map(({ time, label, icon: Icon, color, borderColor }, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.08 }}
                  className="relative"
                >
                  <div className={cn(
                    "absolute -left-[22px] flex h-5 w-5 items-center justify-center rounded-full border bg-card",
                    borderColor
                  )}>
                    <Icon className={cn("h-2.5 w-2.5", color.split(" ")[0])} aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold text-foreground">{label}</p>
                  <p className="text-[10px] text-muted-foreground">{time} · Today</p>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          {/* Quick info card */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/[0.06] bg-card p-5">
            <h2 className="mb-3 text-sm font-bold text-foreground">Incident Details</h2>
            <div className="space-y-2">
              {[
                { label: "Type",       value: incident.type.replace("-", " "), icon: AlertTriangle },
                { label: "Department", value: incident.department,              icon: Shield        },
                { label: "Reporter",   value: incident.reportedBy,              icon: User          },
                { label: "Reported",   value: new Date(incident.reportedAt).toLocaleDateString("en-IN"), icon: Clock },
                { label: "Resolved",   value: incident.resolvedAt ? new Date(incident.resolvedAt).toLocaleDateString("en-IN") : "Pending", icon: CheckCircle2 },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2.5 rounded-lg bg-secondary/20 px-3 py-2">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className="ml-auto text-right text-xs font-semibold capitalize text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
