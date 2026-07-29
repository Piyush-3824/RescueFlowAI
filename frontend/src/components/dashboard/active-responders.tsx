"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MOCK_RESPONDERS } from "@/lib/mock-data";
import { Radio, MapPin } from "lucide-react";

const STATUS_CONFIG = {
  "on-site":  { label: "On Site",  color: "text-green-400",  dot: "dot-online",   bg: "bg-green-500/10"  },
  "en-route": { label: "En Route", color: "text-amber-400",  dot: "dot-moderate",  bg: "bg-amber-500/10"  },
  "standby":  { label: "Standby",  color: "text-blue-400",   dot: "dot-low",       bg: "bg-blue-500/10"   },
} as const;

export function ActiveResponders() {
  const onSite  = MOCK_RESPONDERS.filter((r) => r.status === "on-site").length;
  const enRoute = MOCK_RESPONDERS.filter((r) => r.status === "en-route").length;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div>
          <h2 className="text-sm font-bold text-foreground">Active Responders</h2>
          <p className="text-[11px] text-muted-foreground">{onSite} on-site · {enRoute} en route</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-2.5 py-1">
          <Radio className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
          <span className="text-[10px] font-semibold text-blue-400">{MOCK_RESPONDERS.length} Active</span>
        </div>
      </div>

      {/* Responder list */}
      <div className="divide-y divide-white/[0.04]">
        {MOCK_RESPONDERS.map((responder, idx) => {
          const cfg = STATUS_CONFIG[responder.status];
          return (
            <motion.div
              key={responder.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02]"
            >
              {/* Avatar */}
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-blue-400/15 to-cyan-400/10 text-xs font-bold text-blue-300">
                  {responder.avatar}
                </div>
                <span
                  className={cn("absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card",
                    responder.status === "on-site"  ? "bg-green-400" :
                    responder.status === "en-route" ? "bg-amber-400" : "bg-blue-400"
                  )}
                  aria-hidden="true"
                />
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-foreground">{responder.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{responder.role}</p>
              </div>

              {/* Status & assignment */}
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold uppercase", cfg.bg, cfg.color)}>
                  {cfg.label}
                </span>
                {responder.incidentId && (
                  <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground/60">
                    <MapPin className="h-2 w-2" aria-hidden="true" />
                    {responder.incidentId}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
