"use client";

import { motion } from "framer-motion";
import { RingProgress } from "@/components/ui/ring-progress";
import { cn } from "@/lib/utils";
import type { MOCK_DEPARTMENTS } from "@/lib/mock-data";

type Department = (typeof MOCK_DEPARTMENTS)[number];

interface DepartmentStatusProps {
  departments: Department[];
}

const STATUS_COLOR: Record<string, string> = {
  critical: "critical",
  high:     "high",
  moderate: "moderate",
  low:      "success",
};

const STATUS_BADGE: Record<string, string> = {
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  high:     "bg-orange-500/10 text-orange-400 border-orange-500/20",
  moderate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  low:      "bg-green-500/10 text-green-400 border-green-500/20",
};

export function DepartmentStatus({ departments }: DepartmentStatusProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-card">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-5 py-4">
        <h2 className="text-sm font-bold text-foreground">Department Status</h2>
        <p className="text-[11px] text-muted-foreground">Safety scores by department</p>
      </div>

      {/* Department list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {departments.map((dept, idx) => {
          const color = STATUS_COLOR[dept.status] ?? "info";
          return (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
              className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-secondary/20 p-3 transition-all hover:bg-white/[0.02] hover:border-white/[0.08]"
            >
              {/* Ring progress */}
              <RingProgress
                value={dept.score}
                size={48}
                strokeWidth={4}
                color={color}
                label={
                  <span className="text-[10px] font-bold text-foreground">
                    {dept.score}
                  </span>
                }
              />

              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-foreground">{dept.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {dept.incidents} incident{dept.incidents !== 1 ? "s" : ""} · 7 days
                </p>
              </div>

              {/* Status badge */}
              <span className={cn(
                "shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase",
                STATUS_BADGE[dept.status]
              )}>
                {dept.status}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
