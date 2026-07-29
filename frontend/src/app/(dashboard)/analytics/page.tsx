"use client";

import React from "react";
import {
  TrendingUp, BarChart2, ShieldCheck, Timer, Award, Calendar, Download,
  AlertTriangle, MapPin, CheckCircle2
} from "lucide-react";
import { DonutChart } from "@/components/ui/donut-chart";
import { LineChart } from "@/components/ui/line-chart";
import { MOCK_STATS, MOCK_ANALYTICS_MONTHLY } from "@/lib/mock-data";

const HIGH_RISK_AREAS = [
  { area: "Welding Zone B", risk: "CRITICAL", incidents: 5, department: "Welding", trend: "+12%" },
  { area: "Machine Area C", risk: "HIGH",     incidents: 3, department: "Machining", trend: "-5%" },
  { area: "Chemical Storage Zone", risk: "HIGH", incidents: 3, department: "Chemicals", trend: "0%" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 pb-10">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white/90">Safety Analytics</h1>
          <p className="text-xs text-white/40">Executive safety metrics, risk trends and department compliance logs.</p>
        </div>

        <button className="flex items-center gap-1.5 rounded-xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] px-3.5 py-2 text-xs font-bold text-white/70 shadow-xs transition-colors">
          <Download className="h-4 w-4 text-white/40" />
          <span>Export OSHA Log</span>
        </button>
      </div>

      {/* Top Cards (4 Key Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Safety Score",          value: "87/100",  sub: "+3 pts vs last month", icon: ShieldCheck, color: "text-emerald-400 bg-emerald-500/10 shadow-[0_0_12px_rgba(52,211,153,0.2)]" },
          { label: "Total Incidents",       value: "142",     sub: "YTD total recorded",   icon: AlertTriangle, color: "text-amber-400 bg-amber-400/10 shadow-[0_0_12px_rgba(245,158,11,0.2)]" },
          { label: "Average Response Time", value: "4m 12s",  sub: "Target: < 5m 00s",     icon: Timer,         color: "text-blue-400 bg-blue-500/10 shadow-[0_0_12px_rgba(59,130,246,0.2)]" },
          { label: "Resolved Incidents",    value: "130",     sub: "91.5% resolution rate",icon: CheckCircle2,  color: "text-emerald-400 bg-emerald-500/10 shadow-[0_0_12px_rgba(52,211,153,0.2)]" },
        ].map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="glass-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/40 uppercase tracking-wider">{label}</span>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white/90 tracking-tight">{value}</span>
              <p className="text-[11px] text-white/40 mt-1">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 4 Important Charts (2x2 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Incident Trend (Line Chart) */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-extrabold text-white/90">1. Incident Trend</h3>
            <span className="text-xs font-semibold text-white/30">Monthly Logins &amp; Events</span>
          </div>
          <div className="h-[220px]">
            <LineChart
              data={[14, 18, 12, 22, 16, 10, 142]}
              labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
              height={200}
              color="#F59E0B"
            />
          </div>
        </div>

        {/* 2. Incident Type Distribution (Donut Chart) */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-extrabold text-white/90">2. Incident Type Distribution</h3>
            <span className="text-xs font-semibold text-white/30">By Classification</span>
          </div>
          <DonutChart
            data={[
              { label: "Chemical Spills", value: 35, color: "#DC2626" },
              { label: "Equipment Faults", value: 40, color: "#F97316" },
              { label: "Fire / Thermal",   value: 25, color: "#F59E0B" },
              { label: "PPE Violation",    value: 42, color: "#2563EB" },
            ]}
            size={170}
          />
        </div>

        {/* 3. Department Risk */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-extrabold text-white/90">3. Department Risk</h3>
            <span className="text-xs font-semibold text-white/30">Incidents by Unit</span>
          </div>

          <div className="space-y-3">
            {[
              { dept: "Welding & Fabrication", count: 48, pct: "75%", color: "bg-red-500" },
              { dept: "Chemical Processing",   count: 36, pct: "60%", color: "bg-orange-500" },
              { dept: "Assembly Line B",        count: 28, pct: "45%", color: "bg-amber-500" },
              { dept: "Warehousing",           count: 18, pct: "25%", color: "bg-blue-500" },
            ].map((item) => (
              <div key={item.dept} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-white/80">
                  <span>{item.dept}</span>
                  <span>{item.count} incidents</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/[0.08] overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: item.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Severity Distribution */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-extrabold text-white/90">4. Severity Distribution</h3>
            <span className="text-xs font-semibold text-white/30">OSHA Tier Breakdown</span>
          </div>

          <DonutChart
            data={[
              { label: "Critical Risk",  value: 12, color: "#DC2626" },
              { label: "High Risk",      value: 28, color: "#F97316" },
              { label: "Moderate Risk",  value: 54, color: "#F59E0B" },
              { label: "Low Risk",       value: 48, color: "#16A34A" },
            ]}
            size={170}
          />
        </div>

      </div>

      {/* High-Risk Areas Table */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-red-400" />
            <h3 className="text-sm font-extrabold text-white/90">High-Risk Areas</h3>
          </div>
          <span className="text-xs font-semibold text-white/30">Priority Inspection Focus</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-white/30 uppercase tracking-wider font-bold">
                <th className="py-2.5 px-3">Area Name</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Active Incidents</th>
                <th className="py-2.5 px-3 text-right">30-Day Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08] font-semibold text-white/80">
              {HIGH_RISK_AREAS.map((row) => (
                <tr key={row.area} className="hover:bg-white/[0.08]">
                  <td className="py-3 px-3 font-bold text-white/90">{row.area}</td>
                  <td className="py-3 px-3">
                    <span className={`rounded-md px-2 py-0.5 text-[9px] font-black uppercase ${
                      row.risk === "CRITICAL" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    }`}>
                      {row.risk}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-white/60">{row.department}</td>
                  <td className="py-3 px-3 font-mono font-bold text-amber-400">{row.incidents}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-white/90">{row.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
