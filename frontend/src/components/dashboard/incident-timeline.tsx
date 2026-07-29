"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const MOCK_EVENTS = [
  { id: "EVT-101", title: "Chemical Leak Reported in Zone C", time: "10:14 AM", severity: "CRITICAL", team: "HazMat Team A", status: "Active" },
  { id: "EVT-102", title: "Thermal Anomaly in Welding Zone B", time: "09:48 AM", severity: "HIGH",     team: "Fire Safety Unit", status: "Dispatched" },
  { id: "EVT-103", title: "Safety Inspection Clearance - Bay 2", time: "09:12 AM", severity: "SAFE",     team: "Safety Officer", status: "Resolved" },
  { id: "EVT-104", title: "PPE Warning Dispatched - Machine Area C", time: "08:30 AM", severity: "MEDIUM", team: "Supervisor", status: "Resolved" },
];

export function IncidentTimeline() {
  return (
    <div className="space-y-3">
      {MOCK_EVENTS.map((evt) => (
        <div
          key={evt.id}
          className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all text-xs"
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
              evt.severity === "CRITICAL" ? "bg-red-500/10 border-red-500/20 text-red-400" :
              evt.severity === "HIGH" ? "bg-orange-500/10 border-orange-500/20 text-orange-400" :
              evt.severity === "MEDIUM" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            }`}>
              {evt.severity === "CRITICAL" ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            </div>

            <div>
              <p className="font-bold text-white/90">{evt.title}</p>
              <p className="text-[11px] text-white/40 font-medium">Assigned to: <strong className="text-white/70">{evt.team}</strong></p>
            </div>
          </div>

          <div className="text-right">
            <span className="font-mono text-[11px] font-bold text-white/40 block">{evt.time}</span>
            <span className={`inline-block mt-0.5 rounded px-2 py-0.5 text-[9px] font-black uppercase border ${
              evt.status === "Active" ? "bg-red-500/20 text-red-400 border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.15)]" :
              evt.status === "Dispatched" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
            }`}>
              {evt.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
