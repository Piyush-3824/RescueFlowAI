"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

const DEMO_ZONES = [
  { id: "ZONE-A", name: "Welding Zone B", status: "HIGH RISK", riskColor: "bg-orange-500/20 text-orange-400 border border-orange-500/30", workers: 14, temp: "42°C", hazard: "Thermal Anomaly" },
  { id: "ZONE-B", name: "Chemical Bay 4", status: "CRITICAL",  riskColor: "bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.2)]",    workers: 8,  temp: "28°C", hazard: "Pressure Leak" },
  { id: "ZONE-C", name: "Machine Area C", status: "MODERATE", riskColor: "bg-amber-500/20 text-amber-400 border border-amber-500/30",  workers: 22, temp: "31°C", hazard: "Vibration" },
  { id: "ZONE-D", name: "Assembly Line 1", status: "NORMAL",   riskColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",workers: 35, temp: "24°C", hazard: "None" },
];

export function IncidentHeatmap() {
  const [selectedZone, setSelectedZone] = useState(DEMO_ZONES[0]);

  return (
    <div className="p-4 space-y-4">
      {/* Visual Plant Schematic Layout */}
      <div className="relative h-[220px] w-full rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 grid grid-cols-2 gap-3">
        {DEMO_ZONES.map((zone) => {
          const isSelected = selectedZone.id === zone.id;
          return (
            <div
              key={zone.id}
              onClick={() => setSelectedZone(zone)}
              className={`relative rounded-xl border p-3 flex flex-col justify-between cursor-pointer transition-all ${
                isSelected
                  ? "bg-white/[0.08] border-amber-500/50 shadow-[0_0_16px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/30"
                  : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white/90">{zone.name}</span>
                <span className={`rounded px-1.5 py-0.5 text-[9px] font-black uppercase ${zone.riskColor}`}>
                  {zone.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-white/40 font-medium">
                <span>{zone.workers} Workers</span>
                <span className="font-mono">{zone.temp}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Zone Quick Telemetry Banner */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-amber-400" />
          <span className="font-bold text-white/90">{selectedZone.name}</span>
          <span className="text-white/30">•</span>
          <span className="text-white/50 font-medium">Hazard: <strong className="text-white/90">{selectedZone.hazard}</strong></span>
        </div>
        <span className="font-bold text-blue-400 tracking-wide">Telemetry Syncing Live</span>
      </div>
    </div>
  );
}
