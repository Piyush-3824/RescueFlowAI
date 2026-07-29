"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpRight, AlertTriangle, Clock, CheckCircle2, Download, Zap } from "lucide-react";
import { MOCK_INCIDENTS, type IncidentSeverity, type IncidentStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const SEVERITY_BADGE: Record<IncidentSeverity, string> = {
  critical: "bg-red-500/15 text-red-400 border-red-500/25",
  high:     "bg-orange-500/15 text-orange-400 border-orange-500/25",
  moderate: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  low:      "bg-green-500/15 text-green-400 border-green-500/25",
};

const SEVERITY_BORDER: Record<IncidentSeverity, string> = {
  critical: "border-l-red-500",
  high:     "border-l-orange-500",
  moderate: "border-l-amber-500",
  low:      "border-l-green-500",
};

const STATUS_ICON: Record<IncidentStatus, { icon: typeof AlertTriangle; color: string }> = {
  active:     { icon: AlertTriangle, color: "text-red-400"    },
  dispatched: { icon: Clock,         color: "text-amber-400"  },
  resolved:   { icon: CheckCircle2,  color: "text-green-400"  },
  pending:    { icon: Zap,           color: "text-blue-400"   },
};

const FILTERS_SEV:  (IncidentSeverity | "all")[] = ["all", "critical", "high", "moderate", "low"];
const FILTERS_STAT: (IncidentStatus  | "all")[] = ["all", "active", "dispatched", "resolved", "pending"];

const SEVERITY_ORDER: Record<IncidentSeverity, number> = { critical: 0, high: 1, moderate: 2, low: 3 };

export default function IncidentsPage() {
  const [query,    setQuery]    = useState("");
  const [severity, setSeverity] = useState<IncidentSeverity | "all">("all");
  const [status,   setStatus]   = useState<IncidentStatus   | "all">("all");
  const [page,     setPage]     = useState(1);
  const PER_PAGE = 6;

  const filtered = useMemo(() => MOCK_INCIDENTS.filter((i) => {
    if (severity !== "all" && i.severity !== severity) return false;
    if (status   !== "all" && i.status   !== status)   return false;
    if (query && !`${i.title} ${i.location} ${i.department} ${i.id}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  }).sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]), [query, severity, status]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged      = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /* Severity counts */
  const counts = useMemo(() => ({
    critical: MOCK_INCIDENTS.filter((i) => i.severity === "critical").length,
    high:     MOCK_INCIDENTS.filter((i) => i.severity === "high").length,
    moderate: MOCK_INCIDENTS.filter((i) => i.severity === "moderate").length,
    low:      MOCK_INCIDENTS.filter((i) => i.severity === "low").length,
  }), []);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">Incident History</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} incident{filtered.length !== 1 ? "s" : ""} found</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-card px-3 py-2 text-xs font-semibold text-muted-foreground transition-all hover:border-amber-400/30 hover:text-amber-400">
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Export CSV
          </button>
          <Link href="/report"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-background transition-all hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            Report New
          </Link>
        </div>
      </div>

      {/* Severity summary row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(["critical", "high", "moderate", "low"] as IncidentSeverity[]).map((sev) => (
          <button key={sev} onClick={() => { setSeverity(sev); setPage(1); }}
            className={cn(
              "rounded-2xl border p-3 text-left transition-all hover:border-white/10",
              severity === sev ? SEVERITY_BADGE[sev] : "border-white/[0.06] bg-card"
            )}>
            <p className="text-2xl font-black text-foreground">{counts[sev]}</p>
            <p className={cn("text-[11px] font-semibold capitalize", severity === sev ? "" : "text-muted-foreground")}>{sev}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-card p-4 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="incidents-search"
            type="search"
            placeholder="Search by title, location, department, ID…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            className="w-full rounded-xl border border-input bg-secondary/40 py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
          />
        </div>

        {/* Severity chips */}
        <div className="flex flex-wrap gap-1.5">
          {FILTERS_SEV.map((s) => (
            <button key={s} onClick={() => { setSeverity(s); setPage(1); }}
              className={cn(
                "rounded-lg border px-2.5 py-1 text-xs font-semibold capitalize transition-all",
                severity === s
                  ? "border-amber-400/50 bg-amber-400/15 text-amber-400"
                  : "border-white/[0.06] bg-secondary/40 text-muted-foreground hover:text-foreground"
              )}>
              {s}
            </button>
          ))}
        </div>

        {/* Status chips */}
        <div className="flex flex-wrap gap-1.5">
          {FILTERS_STAT.map((s) => (
            <button key={s} onClick={() => { setStatus(s); setPage(1); }}
              className={cn(
                "rounded-lg border px-2.5 py-1 text-xs font-semibold capitalize transition-all",
                status === s
                  ? "border-blue-400/50 bg-blue-400/15 text-blue-400"
                  : "border-white/[0.06] bg-secondary/40 text-muted-foreground hover:text-foreground"
              )}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Incident list */}
      <div className="space-y-2">
        {paged.length === 0 && (
          <div className="rounded-2xl border border-white/[0.06] bg-card py-16 text-center">
            <Filter className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" aria-hidden="true" />
            <p className="text-sm font-medium text-muted-foreground">No incidents match your filters</p>
          </div>
        )}

        {paged.map((incident, idx) => {
          const { icon: StatusIcon, color } = STATUS_ICON[incident.status];
          return (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Link href={`/incidents/${incident.id}`}
                className={cn(
                  "group flex items-start gap-4 rounded-2xl border-l-2 border border-white/[0.06] bg-card p-4 transition-all hover:border-white/[0.12] hover:bg-white/[0.02] hover:shadow-xl",
                  SEVERITY_BORDER[incident.severity]
                )}>
                {/* Severity dot */}
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-secondary/40">
                  <span className={cn("h-2.5 w-2.5 rounded-full",
                    incident.severity === "critical" ? "bg-red-500 shadow-[0_0_8px_2px_hsl(0_84%_52%/0.6)]" :
                    incident.severity === "high"     ? "bg-orange-500" :
                    incident.severity === "moderate" ? "bg-amber-500" : "bg-green-500"
                  )} aria-hidden="true" />
                </div>

                {/* Main content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono-id text-xs text-muted-foreground/60">{incident.id}</span>
                    <span className={cn("rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase", SEVERITY_BADGE[incident.severity])}>
                      {incident.severity}
                    </span>
                    <span className={cn("flex items-center gap-1 text-xs font-semibold capitalize", color)}>
                      <StatusIcon className="h-3 w-3" aria-hidden="true" /> {incident.status}
                    </span>
                  </div>
                  <p className="font-semibold text-foreground truncate">{incident.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {incident.department} · {incident.location}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground/60 line-clamp-1">{incident.description}</p>
                </div>

                {/* Right */}
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <p className="text-xs text-muted-foreground">
                    {new Date(incident.reportedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                  <p className="text-[10px] text-muted-foreground/60">
                    {incident.responders.length} responder{incident.responders.length !== 1 ? "s" : ""}
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-400" aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg border border-white/[0.06] bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:text-foreground disabled:opacity-40"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)}
              className={cn(
                "h-8 w-8 rounded-lg text-xs font-bold transition-all",
                page === p ? "bg-amber-400 text-background" : "border border-white/[0.06] bg-card text-muted-foreground hover:text-foreground"
              )}>
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg border border-white/[0.06] bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:text-foreground disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
