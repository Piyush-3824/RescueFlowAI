"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IncidentHeatmapProps {
  data: number[][];
}

const DAYS  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const HOURS_DISPLAY = HOURS.filter((h) => h % 4 === 0);

function getColor(value: number, max: number): string {
  if (value === 0) return "hsl(220 22% 10%)";
  const t = value / max;
  if (t < 0.2) return "hsl(217 91% 60% / 0.25)";
  if (t < 0.4) return "hsl(217 91% 60% / 0.55)";
  if (t < 0.6) return "hsl(43 96% 56% / 0.65)";
  if (t < 0.8) return "hsl(25 95% 53% / 0.80)";
  return "hsl(0 84% 52% / 0.90)";
}

export function IncidentHeatmap({ data }: IncidentHeatmapProps) {
  const [tooltip, setTooltip] = useState<{ day: string; hour: number; value: number } | null>(null);
  const max = Math.max(...data.flat());

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-card p-5">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-bold text-foreground">Incident Heatmap</h2>
          <p className="text-[11px] text-muted-foreground">Incidents by day & hour (last 30 days)</p>
        </div>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg border border-white/10 bg-secondary/80 px-2.5 py-1.5 text-right backdrop-blur-sm"
          >
            <p className="text-xs font-semibold text-foreground">{tooltip.value} incident{tooltip.value !== 1 ? "s" : ""}</p>
            <p className="text-[10px] text-muted-foreground">{tooltip.day}, {tooltip.hour.toString().padStart(2, "0")}:00</p>
          </motion.div>
        )}
      </div>

      {/* Hour axis labels */}
      <div className="mb-1 flex">
        <div className="w-8 shrink-0" />
        <div className="relative flex-1">
          {HOURS_DISPLAY.map((h) => (
            <span
              key={h}
              className="absolute text-[9px] text-muted-foreground/60 -translate-x-1/2"
              style={{ left: `${(h / 23) * 100}%` }}
            >
              {h.toString().padStart(2, "0")}h
            </span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-3 space-y-1">
        {data.map((row, dayIdx) => (
          <div key={DAYS[dayIdx]} className="flex items-center gap-1">
            {/* Day label */}
            <span className="w-7 shrink-0 text-[9px] font-medium text-muted-foreground/60">
              {DAYS[dayIdx]}
            </span>

            {/* Cells */}
            <div className="flex flex-1 gap-[2px]">
              {row.map((val, hourIdx) => (
                <motion.div
                  key={hourIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (dayIdx * 24 + hourIdx) * 0.001 }}
                  className="relative flex-1 cursor-pointer rounded-sm"
                  style={{
                    height: 18,
                    backgroundColor: getColor(val, max),
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  }}
                  onMouseEnter={() => setTooltip({ day: DAYS[dayIdx], hour: hourIdx, value: val })}
                  onMouseLeave={() => setTooltip(null)}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  aria-label={`${DAYS[dayIdx]} ${hourIdx}:00 — ${val} incidents`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground/60">Less</span>
        <div className="flex gap-1">
          {["hsl(220 22% 10%)", "hsl(217 91% 60% / 0.3)", "hsl(43 96% 56% / 0.65)", "hsl(25 95% 53% / 0.80)", "hsl(0 84% 52% / 0.90)"].map((c, i) => (
            <div key={i} className="h-3 w-5 rounded-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground/60">More</span>
      </div>
    </div>
  );
}
