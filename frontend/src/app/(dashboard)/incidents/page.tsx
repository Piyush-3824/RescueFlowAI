"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, AlertTriangle, Clock, CheckCircle2, Download, PlusCircle } from "lucide-react";
import { MOCK_INCIDENTS, type IncidentSeverity, type IncidentStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const SEVERITY_BADGE: Record<IncidentSeverity, string> = {
  critical: "bg-red-600 text-white",
  high:     "bg-orange-500 text-white",
  moderate: "bg-amber-500 text-slate-950",
  low:      "bg-emerald-600 text-white",
};

const SEVERITY_BORDER: Record<IncidentSeverity, string> = {
  critical: "border-l-red-600",
  high:     "border-l-orange-500",
  moderate: "border-l-amber-500",
  low:      "border-l-emerald-600",
};

const FILTERS_SEV:  (IncidentSeverity | "all")[] = ["all", "critical", "high", "moderate", "low"];

export default function IncidentsPage() {
  const [query,    setQuery]    = useState("");
  const [severity, setSeverity] = useState<IncidentSeverity | "all">("all");
  const [page,     setPage]     = useState(1);
  const PER_PAGE = 6;

  const filtered = useMemo(() => MOCK_INCIDENTS.filter((i) => {
    if (severity !== "all" && i.severity !== severity) return false;
    if (query && !`${i.title} ${i.location} ${i.department} ${i.id}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  }), [query, severity]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged      = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-6 pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Incident Management</h1>
          <p className="text-xs text-slate-500">Track, review and manage industrial safety reports.</p>
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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by ID, title, zone or department..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-3 py-2 text-xs text-slate-900 focus:border-amber-500 focus:bg-white outline-none"
          />
        </div>

        {/* Severity Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {FILTERS_SEV.map((s) => (
            <button
              key={s}
              onClick={() => { setSeverity(s); setPage(1); }}
              className={cn(
                "rounded-xl px-3 py-1.5 text-xs font-bold capitalize transition-all",
                severity === s
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Incidents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paged.map((inc) => (
          <Link
            key={inc.id}
            href={`/incidents/${inc.id}`}
            className={cn(
              "group rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition-all border-l-4",
              SEVERITY_BORDER[inc.severity]
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[11px] font-bold text-slate-400">{inc.id}</span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors mt-0.5">
                  {inc.title}
                </h3>
              </div>
              <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-black uppercase", SEVERITY_BADGE[inc.severity])}>
                {inc.severity}
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
              {inc.description}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-500">
              <span>📍 {inc.location}</span>
              <span>🏭 {inc.department}</span>
              <span className="font-mono text-slate-400">Jul 29, 2026</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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
        </div>
      )}
    </div>
  );
}
