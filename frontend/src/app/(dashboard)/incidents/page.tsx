"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search, AlertTriangle, Clock, CheckCircle2,
  PlusCircle, Camera, Video, Mic, FileText, CalendarDays, ChevronDown
} from "lucide-react";
import { useIncidents, type StoredIncident } from "@/hooks/use-incidents";
import { MOCK_INCIDENTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────
type Severity = StoredIncident["severity"];
type SortOption = "newest" | "oldest" | "severity";

const SEVERITY_BADGE: Record<Severity, string> = {
  critical: "bg-red-600 text-white",
  high:     "bg-orange-500 text-white",
  moderate: "bg-amber-500 text-slate-950",
  low:      "bg-emerald-600 text-white",
};

const SEVERITY_BORDER: Record<Severity, string> = {
  critical: "border-l-red-600",
  high:     "border-l-orange-500",
  moderate: "border-l-amber-500",
  low:      "border-l-emerald-600",
};

const SEVERITY_ORDER: Record<Severity, number> = {
  critical: 0, high: 1, moderate: 2, low: 3,
};

const METHOD_ICON: Record<StoredIncident["method"], React.ElementType> = {
  photo: Camera, video: Video, voice: Mic, text: FileText,
};

// Convert MOCK_INCIDENTS to StoredIncident shape so we can merge
const SEEDED: StoredIncident[] = MOCK_INCIDENTS.map((m, i) => {
  const statusMap: Record<string, StoredIncident["status"]> = {
    active: "pending", dispatched: "dispatched", resolved: "resolved", pending: "pending",
  };
  return {
    id:             m.id,
    title:          m.title,
    severity:       m.severity as Severity,
    status:         statusMap[m.status] ?? "pending",
    location:       m.location,
    description:    m.description,
    aiSummary:      m.aiSummary,
    recommendation: "Follow standard safety procedures.",
    hazards:        [],
    teams:          m.responders ?? [],
    confidence:     m.safetyScore ?? 88,
    reportedAt:     m.reportedAt,
    method:         "text" as const,
  };
});

// ── Helpers ────────────────────────────────────────────────────────────────
function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function dateOnly(iso: string) {
  return iso.slice(0, 10); // "YYYY-MM-DD"
}

export default function IncidentsPage() {
  const { incidents: live } = useIncidents();

  const [query,    setQuery]    = useState("");
  const [severity, setSeverity] = useState<Severity | "all">("all");
  const [sortBy,   setSortBy]   = useState<SortOption>("newest");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo,   setDateTo]   = useState("");
  const [page,     setPage]     = useState(1);
  const PER_PAGE = 8;

  // Merge: live IDB incidents first (they'll be newest), then seed data
  const all = useMemo<StoredIncident[]>(() => {
    const liveIds = new Set(live.map(l => l.id));
    return [...live, ...SEEDED.filter(s => !liveIds.has(s.id))];
  }, [live]);

  const filtered = useMemo(() => {
    let result = all.filter(inc => {
      // Severity filter
      if (severity !== "all" && inc.severity !== severity) return false;
      // Text search
      if (query) {
        const haystack = `${inc.id} ${inc.title} ${inc.location} ${inc.description}`.toLowerCase();
        if (!haystack.includes(query.toLowerCase())) return false;
      }
      // Date from
      if (dateFrom && dateOnly(inc.reportedAt) < dateFrom) return false;
      // Date to
      if (dateTo && dateOnly(inc.reportedAt) > dateTo) return false;
      return true;
    });

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "newest") return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
      if (sortBy === "oldest") return new Date(a.reportedAt).getTime() - new Date(b.reportedAt).getTime();
      if (sortBy === "severity") return SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
      return 0;
    });

    return result;
  }, [all, query, severity, sortBy, dateFrom, dateTo]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged      = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const liveCount = live.length;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Incident Management</h1>
          <p className="text-xs text-slate-500">
            {filtered.length} incident{filtered.length !== 1 ? "s" : ""} found
            {liveCount > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                {liveCount} reported by you
              </span>
            )}
          </p>
        </div>
        <Link
          href="/report"
          className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-xs hover:bg-amber-400 transition-all"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Report New Incident</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
        {/* Row 1: Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search by ID, title, location…"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-3 py-2 text-xs text-slate-900 focus:border-amber-500 focus:bg-white outline-none"
            />
          </div>
          {/* Sort */}
          <div className="relative">
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <select
              value={sortBy}
              onChange={e => { setSortBy(e.target.value as SortOption); setPage(1); }}
              className="appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 pr-8 text-xs font-semibold text-slate-700 focus:border-amber-500 outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="severity">By Severity</option>
            </select>
          </div>
        </div>

        {/* Row 2: Severity pills + Date range */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Severity Pills */}
          <div className="flex flex-wrap gap-1.5">
            {(["all", "critical", "high", "moderate", "low"] as const).map(s => (
              <button
                key={s}
                onClick={() => { setSeverity(s); setPage(1); }}
                className={cn(
                  "rounded-xl px-3 py-1 text-xs font-bold capitalize transition-all",
                  severity === s ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2 ml-auto">
            <CalendarDays className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="date"
              value={dateFrom}
              onChange={e => { setDateFrom(e.target.value); setPage(1); }}
              className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-semibold text-slate-700 focus:border-amber-500 outline-none"
            />
            <span className="text-xs text-slate-400 font-medium">to</span>
            <input
              type="date"
              value={dateTo}
              onChange={e => { setDateTo(e.target.value); setPage(1); }}
              className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-semibold text-slate-700 focus:border-amber-500 outline-none"
            />
            {(dateFrom || dateTo) && (
              <button
                onClick={() => { setDateFrom(""); setDateTo(""); setPage(1); }}
                className="text-xs font-bold text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Incidents Grid */}
      {paged.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <AlertTriangle className="mx-auto h-10 w-10 text-slate-300 mb-3" />
          <p className="text-sm font-bold text-slate-500">No incidents match your filters</p>
          <p className="text-xs text-slate-400 mt-1">Try adjusting the date range or search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paged.map(inc => {
            const MethodIcon = METHOD_ICON[inc.method] ?? FileText;
            const isLive = live.some(l => l.id === inc.id);
            return (
              <Link
                key={inc.id}
                href={`/incidents/${inc.id}`}
                className={cn(
                  "group block rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition-all border-l-4",
                  SEVERITY_BORDER[inc.severity]
                )}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[11px] font-bold text-slate-400">{inc.id}</span>
                      {isLive && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-black text-emerald-700 uppercase tracking-wide">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" /> Live
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors mt-0.5 truncate">
                      {inc.title}
                    </h3>
                  </div>
                  <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-black uppercase shrink-0", SEVERITY_BADGE[inc.severity])}>
                    {inc.severity}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {inc.description}
                </p>

                {/* AI Summary if available */}
                {inc.aiSummary && inc.aiSummary !== inc.description && (
                  <p className="text-xs text-blue-700 bg-blue-50 rounded-lg px-3 py-2 mt-2 line-clamp-2 italic border border-blue-100">
                    &ldquo;{inc.aiSummary}&rdquo;
                  </p>
                )}

                {/* Footer */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
                    <span className="flex items-center gap-1">
                      <MethodIcon className="h-3 w-3" />
                      {inc.method}
                    </span>
                    <span>📍 {inc.location}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[11px] font-bold text-slate-700">{fmtDate(inc.reportedAt)}</p>
                    <p className="font-mono text-[10px] text-slate-400">{fmtTime(inc.reportedAt)}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={cn(
                "h-8 w-8 rounded-lg text-xs font-bold transition-all",
                page === p ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              )}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
