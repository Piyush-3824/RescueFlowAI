"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const DEMO_ZONES = [
  { id: "ZONE-A", name: "Welding Zone B", status: "HIGH RISK", riskColor: "bg-orange-500", workers: 14, temp: "42°C", hazard: "Thermal Anomaly" },
  { id: "ZONE-B", name: "Chemical Bay 4", status: "CRITICAL",  riskColor: "bg-red-600",    workers: 8,  temp: "28°C", hazard: "Pressure Leak" },
  { id: "ZONE-C", name: "Machine Area C", status: "MODERATE", riskColor: "bg-amber-500",  workers: 22, temp: "31°C", hazard: "Vibration" },
  { id: "ZONE-D", name: "Assembly Line 1", status: "NORMAL",   riskColor: "bg-emerald-600",workers: 35, temp: "24°C", hazard: "None" },
];

export function IncidentHeatmap() {
  const [selectedZone, setSelectedZone] = useState(DEMO_ZONES[0]);

  return (
    <div className="p-4 space-y-4">
      {/* Visual Plant Schematic Layout */}
      <div className="relative h-[220px] w-full rounded-xl border border-slate-200 bg-slate-100 p-3 grid grid-cols-2 gap-3">
        {DEMO_ZONES.map((zone) => {
          const isSelected = selectedZone.id === zone.id;
          return (
            <div
              key={zone.id}
              onClick={() => setSelectedZone(zone)}
              className={`relative rounded-xl border p-3 flex flex-col justify-between cursor-pointer transition-all ${
                isSelected
                  ? "bg-white border-amber-500 shadow-md ring-2 ring-amber-500/20"
                  : "bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{zone.name}</span>
                <span className={`rounded px-1.5 py-0.5 text-[9px] font-black text-white ${zone.riskColor}`}>
                  {zone.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>{zone.workers} Workers</span>
                <span className="font-mono">{zone.temp}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Zone Quick Telemetry Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-amber-500" />
          <span className="font-bold text-slate-900">{selectedZone.name}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 font-medium">Hazard: <strong className="text-slate-900">{selectedZone.hazard}</strong></span>
        </div>
        <span className="font-bold text-blue-600">Telemetry Syncing Live</span>
      </div>
    </div>
  );
}
