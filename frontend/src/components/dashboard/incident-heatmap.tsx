"use client";

import { useState } from "react";
import { MapPin, AlertTriangle } from "lucide-react";
import { useIncidents } from "@/hooks/use-incidents";
import Link from "next/link";

export function IncidentHeatmap() {
  const { incidents } = useIncidents();

  // Group active incidents by location (take up to 4 unique locations)
  const activeIncidents = incidents.filter(i => i.status !== "resolved");

  // Build location groups
  const locationMap = new Map<string, typeof incidents>();
  for (const inc of activeIncidents) {
    const parts = inc.location.split(",");
    const key = (parts[0] ?? inc.location).trim() || "Unknown Location";
    if (!locationMap.has(key)) locationMap.set(key, []);
    const existing = locationMap.get(key);
    if (existing) existing.push(inc);
  }

  const zones = Array.from(locationMap.entries())
    .slice(0, 4)
    .map(([location, incs]) => {
      const hasCritical = incs.some(i => i.severity === "critical");
      const hasHigh     = incs.some(i => i.severity === "high");
      const status      = hasCritical ? "CRITICAL" : hasHigh ? "HIGH RISK" : "ACTIVE";
      const riskColor   = hasCritical
        ? "bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.2)]"
        : hasHigh
          ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
          : "bg-amber-500/20 text-amber-400 border border-amber-500/30";
      return { location, incs, status, riskColor, count: incs.length };
    });

  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = zones[selectedIdx] ?? null;

  if (zones.length === 0) {
    return (
      <div className="p-4">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] py-12 text-center">
          <MapPin className="h-8 w-8 text-white/15" />
          <div>
            <p className="text-xs font-bold text-white/35">No active incident zones</p>
            <p className="text-[11px] text-white/20 mt-0.5">
              <Link href="/report" className="text-amber-400 hover:underline">Report an incident</Link> to see zone telemetry
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Zone Grid */}
      <div className={`relative h-[220px] w-full rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 grid gap-3 ${
        zones.length === 1 ? "grid-cols-1" :
        zones.length === 2 ? "grid-cols-2" :
        zones.length === 3 ? "grid-cols-3" : "grid-cols-2"
      }`}>
        {zones.map((zone, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <div
              key={zone.location}
              onClick={() => setSelectedIdx(idx)}
              className={`relative rounded-xl border p-3 flex flex-col justify-between cursor-pointer transition-all ${
                isSelected
                  ? "bg-white/[0.08] border-amber-500/50 shadow-[0_0_16px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/30"
                  : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-bold text-white/90 truncate">{zone.location.split(",")[0]}</span>
                <span className={`rounded px-1.5 py-0.5 text-[9px] font-black uppercase shrink-0 ${zone.riskColor}`}>
                  {zone.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-white/40 font-medium">
                <span className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {zone.count} incident{zone.count !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Zone Quick Info Banner */}
      {selected && (
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
            <span className="font-bold text-white/90 truncate">{selected.location.split(",")[0]}</span>
            <span className="text-white/30 shrink-0">•</span>
            <span className="text-white/50 font-medium shrink-0">
              Latest: <strong className="text-white/90">{selected.incs[0]?.title ?? "—"}</strong>
            </span>
          </div>
          <span className="font-bold text-amber-400 tracking-wide shrink-0 ml-2">
            {selected.count} Active
          </span>
        </div>
      )}
    </div>
  );
}
