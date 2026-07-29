"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, BarChart2, ShieldCheck, Timer, Award, Calendar, Download } from "lucide-react";
import { StatCard }   from "@/components/ui/stat-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { DonutChart }  from "@/components/ui/donut-chart";
import { LineChart }   from "@/components/ui/line-chart";
import { MOCK_STATS, MOCK_DEPARTMENTS, MOCK_ANALYTICS_MONTHLY, MOCK_SAFETY_TREND, MOCK_SAFETY_TREND_LABELS } from "@/lib/mock-data";

/* ── Animated Bar Chart ───────────────────────────────────────────────────── */
function AnimatedBarChart({ data }: { data: typeof MOCK_ANALYTICS_MONTHLY }) {
  const max  = Math.max(...data.map((d) => d.incidents));
  const H    = 150;
  const barW = 26;
  const gap  = 14;
  const totalW = data.length * (barW + gap) - gap + 16;

  return (
    <svg viewBox={`0 0 ${totalW} ${H + 40}`} className="w-full overflow-visible" aria-label="Monthly incidents bar chart">
      {data.map((d, i) => {
        const x      = i * (barW + gap) + 8;
        const barH   = (d.incidents / max) * H;
        const barH2  = (d.resolved  / max) * H;
        const isCurr = i === data.length - 1;
        return (
          <g key={d.month}>
            {/* Gradient definition */}
            <defs>
              <linearGradient id={`bar-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={isCurr ? "hsl(43 96% 56%)" : "hsl(217 91% 60%)"} stopOpacity={0.9} />
                <stop offset="100%" stopColor={isCurr ? "hsl(43 96% 56%)" : "hsl(217 91% 60%)"} stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id={`bar-grad-res-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={isCurr ? "hsl(43 96% 56%)" : "hsl(217 91% 60%)"} stopOpacity={0.25} />
                <stop offset="100%" stopColor={isCurr ? "hsl(43 96% 56%)" : "hsl(217 91% 60%)"} stopOpacity={0.08} />
              </linearGradient>
            </defs>

            {/* Resolved bar (background) */}
            <rect x={x} y={H - barH2} width={barW} height={barH2} rx={5}
              fill={`url(#bar-grad-res-${i})`} />
            {/* Incidents bar */}
            <rect x={x} y={H - barH} width={barW} height={barH} rx={5}
              fill={`url(#bar-grad-${i})`}
              style={{ animation: `bar-rise 0.7s ease-out ${i * 0.08}s both` }} />

            {/* Value label */}
            <text x={x + barW / 2} y={H - barH - 7} textAnchor="middle" fontSize={9}
              fill={isCurr ? "hsl(43 96% 56%)" : "hsl(217 91% 60%)"} fontWeight="bold">
              {d.incidents}
            </text>
            {/* Month label */}
            <text x={x + barW / 2} y={H + 18} textAnchor="middle" fontSize={9}
              fill="hsl(215 16% 45%)">
              {d.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Donut chart data ─────────────────────────────────────────────────────── */
const INCIDENT_TYPES = [
  { label: "Machinery",  value: 24, color: "#3B82F6" },
  { label: "Fall",       value: 22, color: "#EF4444" },
  { label: "Chemical",   value: 18, color: "#F97316" },
  { label: "Electrical", value: 16, color: "#F59E0B" },
  { label: "Medical",    value: 12, color: "#A855F7" },
  { label: "Other",      value: 8,  color: "#64748B" },
];

const DATE_RANGES = ["7 Days", "30 Days", "90 Days", "1 Year"] as const;

export default function AnalyticsPage() {
  const [range, setRange] = useState<typeof DATE_RANGES[number]>("30 Days");

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">Safety performance &amp; incident intelligence</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Date range selector */}
          <div className="flex rounded-xl border border-white/[0.06] bg-card p-1">
            {DATE_RANGES.map((r) => (
              <button key={r} onClick={() => setRange(r)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  range === r
                    ? "bg-amber-400 text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}>
                {r}
              </button>
            ))}
          </div>
          {/* Export */}
          <button className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-card px-3 py-2 text-xs font-semibold text-muted-foreground transition-all hover:border-amber-400/30 hover:text-amber-400">
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Incidents" value={MOCK_STATS.totalIncidents} subtitle="this month"
          icon={BarChart2} variant="warning" trend="down" trendLabel="12% vs last month" delay={0} />
        <StatCard title="Avg. Response" value={MOCK_STATS.avgResponseMin} subtitle="minutes to dispatch"
          icon={Timer} variant="info" trend="down" trendLabel="2.1m faster" delay={0.08} />
        <StatCard title="Safety Score" value={MOCK_STATS.safetyScore} subtitle="plant average"
          icon={ShieldCheck} variant="success" trend="up" trendLabel="+2.4% this week" delay={0.16} />
        <StatCard title="Compliance Rate" value={MOCK_STATS.complianceRate} subtitle="OSHA standard"
          icon={Award} variant="success" trend="up" trendLabel="+1.1% this week" delay={0.24} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Monthly bar chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-white/[0.06] bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-foreground">Monthly Incidents</h2>
              <p className="text-xs text-muted-foreground">Reported vs resolved</p>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-blue-500/50" />
                Resolved
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-400/90" />
                Reported
              </span>
            </div>
          </div>
          <AnimatedBarChart data={MOCK_ANALYTICS_MONTHLY} />
        </motion.div>

        {/* Donut chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl border border-white/[0.06] bg-card p-5">
          <h2 className="mb-4 text-sm font-bold text-foreground">Incident Type Breakdown</h2>
          <DonutChart data={INCIDENT_TYPES} size={170} strokeWidth={26} showLegend />
        </motion.div>
      </div>

      {/* Safety score trend */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-white/[0.06] bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-foreground">Safety Score Trend</h2>
            <p className="text-xs text-muted-foreground">12-month rolling average</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-green-500/10 px-2.5 py-1">
            <TrendingUp className="h-3.5 w-3.5 text-green-400" aria-hidden="true" />
            <span className="text-xs font-semibold text-green-400">+8.2% YTD</span>
          </div>
        </div>
        <LineChart
          data={MOCK_SAFETY_TREND}
          labels={MOCK_SAFETY_TREND_LABELS}
          color="hsl(43 96% 56%)"
          height={130}
          showDots
          showArea
          showLabels
        />
      </motion.div>

      {/* Department table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
        className="rounded-2xl border border-white/[0.06] bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Department Performance</h2>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Department safety performance">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Department", "Safety Score", "Incidents", "Status", "Trend"].map((h) => (
                  <th key={h} className="pb-3 text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_DEPARTMENTS.map((dept) => (
                <tr key={dept.name} className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]">
                  <td className="py-3 font-medium text-foreground">{dept.name}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <ProgressBar
                        value={dept.score}
                        variant={dept.score >= 90 ? "success" : dept.score >= 80 ? "info" : dept.score >= 70 ? "warning" : "critical"}
                        height="sm" className="w-24"
                      />
                      <span className="font-bold text-foreground">{dept.score}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground">{dept.incidents}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${
                      dept.status === "critical" ? "bg-red-500/10 text-red-400" :
                      dept.status === "high"     ? "bg-orange-500/10 text-orange-400" :
                      dept.status === "moderate" ? "bg-amber-500/10 text-amber-400" :
                                                   "bg-green-500/10 text-green-400"
                    }`}>{dept.status}</span>
                  </td>
                  <td className="py-3">
                    {dept.score >= 80
                      ? <TrendingUp className="h-4 w-4 text-green-400" />
                      : <TrendingDown className="h-4 w-4 text-red-400" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
