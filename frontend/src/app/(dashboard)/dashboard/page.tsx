import type { Metadata } from "next";
import { MOCK_STATS, MOCK_TIMELINE, MOCK_DEPARTMENTS, MOCK_HEATMAP_DATA } from "@/lib/mock-data";
import { StatsGrid }          from "@/components/dashboard/stats-grid";
import { IncidentTimeline }   from "@/components/dashboard/incident-timeline";
import { DepartmentStatus }   from "@/components/dashboard/department-status";
import { IncidentHeatmap }    from "@/components/dashboard/incident-heatmap";
import { QuickReportButton }  from "@/components/dashboard/quick-report-button";
import { ActiveResponders }   from "@/components/dashboard/active-responders";
import { AiInsightCard }      from "@/components/dashboard/ai-insight-card";

export const metadata: Metadata = { title: "Command Center | RescueFlowAI" };

export default function DashboardPage() {
  const now = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">Command Center</h1>
          <p className="text-sm text-muted-foreground">{now}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/8 px-3 py-1.5">
            <span className="dot-critical animate-heartbeat" aria-hidden="true" />
            <span className="text-xs font-semibold text-red-400">
              {MOCK_STATS.criticalIncidents} Critical Active
            </span>
          </div>
        </div>
      </div>

      {/* Row 1 — stat cards */}
      <StatsGrid stats={MOCK_STATS} />

      {/* Row 2 — timeline + department status */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="min-h-80 lg:col-span-2">
          <IncidentTimeline items={MOCK_TIMELINE} />
        </div>
        <div className="min-h-80">
          <DepartmentStatus departments={MOCK_DEPARTMENTS} />
        </div>
      </div>

      {/* Row 3 — heatmap + quick report */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <IncidentHeatmap data={MOCK_HEATMAP_DATA} />
        </div>
        <div className="min-h-60">
          <QuickReportButton />
        </div>
      </div>

      {/* Row 4 — AI insights + Active responders */}
      <div className="grid gap-5 lg:grid-cols-2">
        <AiInsightCard />
        <ActiveResponders />
      </div>
    </div>
  );
}
