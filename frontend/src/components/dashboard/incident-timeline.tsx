"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import Link from "next/link";

const MOCK_EVENTS = [
  { id: "EVT-101", title: "Chemical Leak Reported in Zone C", time: "10:14 AM", severity: "CRITICAL", team: "HazMat Team A", status: "Active" },
  { id: "EVT-102", title: "Thermal Anomaly in Welding Zone B", time: "09:48 AM", severity: "HIGH",     team: "Fire Safety Unit", status: "Dispatched" },
  { id: "EVT-103", title: "Safety Inspection Clearance - Bay 2", time: "09:12 AM", severity: "SAFE",     team: "Safety Officer", status: "Resolved" },
  { id: "EVT-104", title: "PPE Warning Dispatched - Machine Area C", time: "08:30 AM", severity: "MEDIUM", team: "Supervisor", status: "Resolved" },
];

export function IncidentTimeline() {
  return (
    <div className="space-y-3">
      {MOCK_EVENTS.map((evt, idx) => (
        <div
          key={evt.id}
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 hover:bg-slate-100/70 transition-all text-xs"
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              evt.severity === "CRITICAL" ? "bg-red-100 text-red-600" :
              evt.severity === "HIGH" ? "bg-orange-100 text-orange-600" :
              evt.severity === "MEDIUM" ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
            }`}>
              {evt.severity === "CRITICAL" ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            </div>

            <div>
              <p className="font-bold text-slate-900">{evt.title}</p>
              <p className="text-[11px] text-slate-500 font-medium">Assigned to: <strong className="text-slate-700">{evt.team}</strong></p>
            </div>
          </div>

          <div className="text-right">
            <span className="font-mono text-[11px] font-bold text-slate-500 block">{evt.time}</span>
            <span className={`inline-block mt-0.5 rounded px-2 py-0.5 text-[9px] font-black uppercase ${
              evt.status === "Active" ? "bg-red-600 text-white" :
              evt.status === "Dispatched" ? "bg-amber-500 text-slate-950" : "bg-emerald-100 text-emerald-800"
            }`}>
              {evt.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
