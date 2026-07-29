"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MOCK_TIMELINE } from "@/lib/mock-data";
import type { IncidentSeverity, IncidentStatus } from "@/lib/mock-data";
import Link from "next/link";

type TimelineItem = (typeof MOCK_TIMELINE)[number];

interface IncidentTimelineProps {
  items: TimelineItem[];
}

const SEV_CONFIG: Record<IncidentSeverity, {
  dot: string; border: string; bg: string; label: string;
}> = {
  critical: { dot: "bg-red-500 shadow-[0_0_8px_2px_hsl(0_84%_52%/0.5)]", border: "border-l-red-500",    bg: "bg-red-500/5",    label: "text-red-400"    },
  high:     { dot: "bg-orange-500",                                         border: "border-l-orange-500", bg: "bg-orange-500/5", label: "text-orange-400" },
  moderate: { dot: "bg-amber-500",                                          border: "border-l-amber-500",  bg: "bg-amber-500/5",  label: "text-amber-400"  },
  low:      { dot: "bg-green-500",                                          border: "border-l-green-500",  bg: "bg-green-500/5",  label: "text-green-400"  },
};

const STATUS_ICON: Record<IncidentStatus, { icon: typeof AlertTriangle; color: string }> = {
  active:     { icon: AlertTriangle, color: "text-red-400"    },
  dispatched: { icon: Clock,         color: "text-amber-400"  },
  resolved:   { icon: CheckCircle2,  color: "text-green-400"  },
  pending:    { icon: Zap,           color: "text-blue-400"   },
};

export function IncidentTimeline({ items }: IncidentTimelineProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div>
          <h2 className="text-sm font-bold text-foreground">Incident Timeline</h2>
          <p className="text-[11px] text-muted-foreground">Today&apos;s activity — real-time</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-red-500/10 px-2.5 py-1">
          <span className="dot-critical animate-pulse" aria-hidden="true" />
          <span className="text-[10px] font-semibold text-red-400">Live</span>
        </div>
      </div>

      {/* Timeline list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {items.map((item, idx) => {
          const sev = SEV_CONFIG[item.severity];
          const stat = STATUS_ICON[item.status];
          const StatusIcon = stat.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
            >
              <div className={cn(
                "flex items-start gap-3 rounded-xl border-l-2 p-3 transition-all hover:bg-white/[0.02]",
                sev.border, sev.bg
              )}>
                {/* Time */}
                <div className="shrink-0 pt-0.5">
                  <span className="font-mono-id text-[11px] font-semibold text-muted-foreground">{item.time}</span>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{item.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">{item.dept}</span>
                    <span className={cn("flex items-center gap-1 text-[10px] font-semibold capitalize", stat.color)}>
                      <StatusIcon className="h-2.5 w-2.5" aria-hidden="true" />
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Severity badge */}
                <span className={cn("shrink-0 rounded-md px-2 py-0.5 text-[9px] font-bold uppercase", sev.label,
                  "border border-current/20 bg-current/5")}>
                  {item.severity}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.06] px-5 py-3">
        <Link
          href="/incidents"
          className="flex items-center justify-center text-xs font-semibold text-amber-400 transition-colors hover:text-amber-300"
        >
          View full incident history →
        </Link>
      </div>
    </div>
  );
}
