"use client";

import React from "react";
import { Users, Phone, Radio, ShieldAlert, CheckCircle2, AlertTriangle } from "lucide-react";

const RESPONSE_TEAMS = [
  { id: "TEAM-1", name: "Fire Safety Unit", lead: "Captain R. Sharma", members: 6, status: "DISPATCHED", zone: "Welding Zone B", phone: "+91 98765 43210" },
  { id: "TEAM-2", name: "HazMat Control Team", lead: "Dr. A. Verma", members: 4, status: "DISPATCHED", zone: "Zone C Chemical Bay", phone: "+91 98765 43211" },
  { id: "TEAM-3", name: "First Aid & Medical Unit", lead: "Nurse K. Patel", members: 5, status: "STANDBY", zone: "Medical Station 1", phone: "+91 98765 43212" },
  { id: "TEAM-4", name: "Site Security & Patrol", lead: "Officer S. Kumar", members: 8, status: "ON PATROL", zone: "Perimeter Sector D", phone: "+91 98765 43213" },
];

export default function DispatchPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white/90">Response Teams</h1>
          <p className="text-xs text-white/40">Live deployment, status tracking and radio dispatch for emergency units.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RESPONSE_TEAMS.map((t) => (
          <div key={t.id} className="glass-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white/90">{t.name}</h3>
                  <p className="text-xs text-white/40">Lead: {t.lead}</p>
                </div>
              </div>

              <span className={`rounded-md px-2.5 py-0.5 text-[9px] font-black uppercase ${
                t.status === "DISPATCHED" ? "bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.2)]" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              }`}>
                {t.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-white/70">
              <div className="bg-white/[0.04] border border-white/[0.08] p-2.5 rounded-xl">
                <span className="text-[10px] text-white/30 block uppercase">Assigned Zone</span>
                <span className="text-white/90">{t.zone}</span>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.08] p-2.5 rounded-xl">
                <span className="text-[10px] text-white/30 block uppercase">Personnel</span>
                <span className="text-white/90">{t.members} Responders</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-mono font-bold text-white/40">{t.phone}</span>
              <button className="flex items-center gap-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white/90 border border-white/[0.1] px-3 py-1.5 text-xs font-bold transition-colors">
                <Radio className="h-3.5 w-3.5 text-amber-400" />
                <span>Radio Connect</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
