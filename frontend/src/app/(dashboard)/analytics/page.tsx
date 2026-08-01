"use client";

import React, { useMemo } from "react";
import {
  ShieldCheck, Timer, Download,
  AlertTriangle, MapPin, CheckCircle2
} from "lucide-react";
import { DonutChart } from "@/components/ui/donut-chart";
import { LineChart } from "@/components/ui/line-chart";
import { useIncidents } from "@/hooks/use-incidents";

export default function AnalyticsPage() {
  const { incidents } = useIncidents();

  const {
    totalIncidents,
    resolvedIncidents,
    safetyScore,
    severityData,
    trendData,
    trendLabels,
    typeData,
    deptData,
    highRiskAreas
  } = useMemo(() => {
    const total = incidents.length;
    const resolved = incidents.filter(i => i.status === "resolved").length;
    
    // Safety score calculation
    let penalty = 0;
    incidents.forEach(inc => {
      if (inc.status !== "resolved") {
        if (inc.severity === "critical") penalty += 10;
        else if (inc.severity === "high") penalty += 5;
        else if (inc.severity === "moderate") penalty += 2;
      }
    });
    const score = Math.max(0, 100 - penalty);

    // Severity Data
    const criticalCount = incidents.filter(i => i.severity === "critical").length;
    const highCount = incidents.filter(i => i.severity === "high").length;
    const moderateCount = incidents.filter(i => i.severity === "moderate").length;
    const lowCount = incidents.filter(i => i.severity === "low").length;
    let sData = [
      { label: "Critical Risk", value: criticalCount, color: "#DC2626" },
      { label: "High Risk", value: highCount, color: "#F97316" },
      { label: "Moderate Risk", value: moderateCount, color: "#F59E0B" },
      { label: "Low Risk", value: lowCount, color: "#16A34A" },
    ].filter(d => d.value > 0);
    if (sData.length === 0) sData = [{ label: "No Incidents", value: 1, color: "#333" }];

    // Trend Data (last 7 days based on reportedAt)
    const tLabels: string[] = [];
    const tData: number[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      tLabels.push(dateStr);
      
      const countForDay = incidents.filter(inc => {
        const incDate = new Date(inc.reportedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        return incDate === dateStr;
      }).length;
      tData.push(countForDay);
    }

    // Type / Hazards Data
    const hazardCounts: Record<string, number> = {};
    incidents.forEach(inc => {
      if (inc.hazards && inc.hazards.length > 0) {
        inc.hazards.forEach(h => {
          hazardCounts[h] = (hazardCounts[h] || 0) + 1;
        });
      } else {
        hazardCounts["Uncategorized"] = (hazardCounts["Uncategorized"] || 0) + 1;
      }
    });
    const typeColors = ["#DC2626", "#F97316", "#F59E0B", "#2563EB", "#8B5CF6", "#EC4899"];
    let tyData = Object.entries(hazardCounts)
      .map(([label, value], i) => ({ label, value, color: typeColors[i % typeColors.length] }))
      .sort((a,b) => b.value - a.value).slice(0, 5);
    if (tyData.length === 0) tyData = [{ label: "No Incidents", value: 1, color: "#333" }];

    // Dept Data
    const teamCounts: Record<string, number> = {};
    incidents.forEach(inc => {
      if (inc.teams && inc.teams.length > 0) {
        inc.teams.forEach(t => teamCounts[t] = (teamCounts[t] || 0) + 1);
      }
    });
    const totalTeamsAssigned = Object.values(teamCounts).reduce((a,b) => a+b, 0);
    const bgColors = ["bg-red-500", "bg-orange-500", "bg-amber-500", "bg-blue-500", "bg-purple-500"];
    const dpData = Object.entries(teamCounts)
      .map(([dept, count], i) => ({
        dept, count, 
        pct: totalTeamsAssigned ? Math.round((count / totalTeamsAssigned) * 100) + "%" : "0%",
        color: bgColors[i % bgColors.length]
      }))
      .sort((a,b) => b.count - a.count)
      .slice(0, 4);

    // High Risk Areas
    const locStats: Record<string, { count: number, critical: number, high: number }> = {};
    incidents.forEach(inc => {
      const loc = inc.location || "Unknown Area";
      if (!locStats[loc]) locStats[loc] = { count: 0, critical: 0, high: 0 };
      locStats[loc].count += 1;
      if (inc.severity === "critical") locStats[loc].critical += 1;
      if (inc.severity === "high") locStats[loc].high += 1;
    });
    const areas = Object.entries(locStats).map(([area, stats]) => {
      let risk = "LOW";
      if (stats.critical > 0) risk = "CRITICAL";
      else if (stats.high > 0 || stats.count >= 3) risk = "HIGH";
      else if (stats.count >= 2) risk = "MODERATE";

      return {
        area,
        risk,
        incidents: stats.count,
        department: "Multiple",
        trend: "Recent"
      };
    }).sort((a,b) => {
      const riskScore = { "CRITICAL": 4, "HIGH": 3, "MODERATE": 2, "LOW": 1 };
      return (riskScore[b.risk as keyof typeof riskScore] || 0) - (riskScore[a.risk as keyof typeof riskScore] || 0) || b.incidents - a.incidents;
    }).slice(0, 5);

    return {
      totalIncidents: total,
      resolvedIncidents: resolved,
      safetyScore: score,
      severityData: sData,
      trendData: tData,
      trendLabels: tLabels,
      typeData: tyData,
      deptData: dpData,
      highRiskAreas: areas
    };
  }, [incidents]);

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
          { label: "Safety Score",          value: `${safetyScore}/100`,  sub: "Based on active risks", icon: ShieldCheck, color: "text-emerald-400 bg-emerald-500/10 shadow-[0_0_12px_rgba(52,211,153,0.2)]" },
          { label: "Total Incidents",       value: totalIncidents.toString(), sub: "Total recorded", icon: AlertTriangle, color: "text-amber-400 bg-amber-400/10 shadow-[0_0_12px_rgba(245,158,11,0.2)]" },
          { label: "Average Response Time", value: "Real-time",  sub: "System avg.", icon: Timer, color: "text-blue-400 bg-blue-500/10 shadow-[0_0_12px_rgba(59,130,246,0.2)]" },
          { label: "Resolved Incidents",    value: resolvedIncidents.toString(), sub: totalIncidents ? `${Math.round((resolvedIncidents/totalIncidents)*100)}% resolution rate` : "0% resolution rate",icon: CheckCircle2,  color: "text-emerald-400 bg-emerald-500/10 shadow-[0_0_12px_rgba(52,211,153,0.2)]" },
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
            <span className="text-xs font-semibold text-white/30">Past 7 Days</span>
          </div>
          <div className="h-[220px]">
            <LineChart
              data={trendData}
              labels={trendLabels}
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
            data={typeData}
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
            {deptData.length > 0 ? deptData.map((item) => (
              <div key={item.dept} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-white/80">
                  <span>{item.dept}</span>
                  <span>{item.count} incidents</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/[0.08] overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: item.pct }} />
                </div>
              </div>
            )) : (
              <div className="text-xs text-white/40 text-center py-4">No department data available.</div>
            )}
          </div>
        </div>

        {/* 4. Severity Distribution */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-extrabold text-white/90">4. Severity Distribution</h3>
            <span className="text-xs font-semibold text-white/30">OSHA Tier Breakdown</span>
          </div>

          <DonutChart
            data={severityData}
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
          {highRiskAreas.length > 0 ? (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-white/30 uppercase tracking-wider font-bold">
                  <th className="py-2.5 px-3">Area Name</th>
                  <th className="py-2.5 px-3">Risk Level</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Active Incidents</th>
                  <th className="py-2.5 px-3 text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.08] font-semibold text-white/80">
                {highRiskAreas.map((row) => (
                  <tr key={row.area} className="hover:bg-white/[0.08]">
                    <td className="py-3 px-3 font-bold text-white/90">{row.area}</td>
                    <td className="py-3 px-3">
                      <span className={`rounded-md px-2 py-0.5 text-[9px] font-black uppercase ${
                        row.risk === "CRITICAL" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                        row.risk === "HIGH" ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" :
                        row.risk === "MODERATE" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                        "bg-green-500/20 text-green-400 border border-green-500/30"
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
          ) : (
             <div className="text-xs text-white/40 text-center py-6">No high risk areas identified.</div>
          )}
        </div>
      </div>

    </div>
  );
}
