"use client";

import { motion } from "framer-motion";
import { Brain, TrendingUp, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_AI_INSIGHTS } from "@/lib/mock-data";
import { useState } from "react";

const TYPE_CONFIG = {
  warning: { icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" },
  info:    { icon: TrendingUp,    color: "text-blue-400",   bg: "bg-blue-400/10",   border: "border-blue-400/20"   },
  success: { icon: CheckCircle2,  color: "text-green-400",  bg: "bg-green-400/10",  border: "border-green-400/20"  },
} as const;

export function AiInsightCard() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-card">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400/20 to-blue-400/10">
          <Brain className="h-4 w-4 text-purple-400" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-foreground">AI Safety Insights</h2>
          <p className="text-[11px] text-muted-foreground">Gemini AI · updated 5 min ago</p>
        </div>
        <div className="ml-auto flex items-center gap-1 rounded-lg bg-purple-400/10 px-2 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" aria-hidden="true" />
          <span className="text-[10px] font-semibold text-purple-400">AI Active</span>
        </div>
      </div>

      {/* Insights */}
      <div className="divide-y divide-white/[0.04] p-3 space-y-1">
        {MOCK_AI_INSIGHTS.map((insight, idx) => {
          const cfg = TYPE_CONFIG[insight.type];
          const Icon = cfg.icon;
          const isExpanded = expanded === idx;

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "rounded-xl border p-3 transition-all cursor-pointer",
                cfg.border, cfg.bg,
                isExpanded ? "shadow-md" : "hover:bg-white/[0.02]"
              )}
              onClick={() => setExpanded(isExpanded ? null : idx)}
            >
              <div className="flex items-start gap-2.5">
                <div className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md", cfg.bg)}>
                  <Icon className={cn("h-3.5 w-3.5", cfg.color)} aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-foreground">{insight.title}</p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9px] font-bold text-muted-foreground/60">
                        {insight.confidence}% conf.
                      </span>
                      {isExpanded
                        ? <ChevronUp className="h-3 w-3 text-muted-foreground/60" />
                        : <ChevronDown className="h-3 w-3 text-muted-foreground/60" />
                      }
                    </div>
                  </div>
                  {isExpanded && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground"
                    >
                      {insight.body}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
