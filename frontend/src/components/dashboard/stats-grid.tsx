"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Zap, ClipboardList, ShieldCheck } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import type { MOCK_STATS } from "@/lib/mock-data";

interface StatsGridProps {
  stats: typeof MOCK_STATS;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Active Incidents"
        value={stats.activeIncidents}
        subtitle="across all sites"
        icon={AlertTriangle}
        variant="warning"
        trend="down"
        trendLabel="2 from yesterday"
        delay={0}
        glowing
      />
      <StatCard
        title="Critical Incidents"
        value={stats.criticalIncidents}
        subtitle="require immediate action"
        icon={Zap}
        variant="critical"
        trend="neutral"
        trendLabel="no change"
        delay={0.1}
        glowing={stats.criticalIncidents > 0}
      />
      <StatCard
        title="Open Tasks"
        value={stats.openTasks}
        subtitle="pending assignments"
        icon={ClipboardList}
        variant="info"
        trend="up"
        trendLabel="3 new today"
        delay={0.2}
      />
      <StatCard
        title="Safety Score"
        value={`${stats.safetyScore}%`}
        subtitle="plant-wide average"
        icon={ShieldCheck}
        variant={stats.safetyScore >= 90 ? "success" : stats.safetyScore >= 75 ? "info" : "warning"}
        trend={stats.safetyScore >= 80 ? "up" : "down"}
        trendLabel={`${stats.safetyScore >= 80 ? "+" : "-"}2.4% this week`}
        delay={0.3}
      />
    </div>
  );
}
