import type { Metadata } from "next";
import Link from "next/link";
import { Activity, ShieldCheck, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import { MOCK_INCIDENTS, MOCK_STATS } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Sign In | RescueFlowAI" };

const LIVE_INCIDENTS = MOCK_INCIDENTS.slice(0, 4);
const SEV_DOT: Record<string, string> = {
  critical: "bg-red-500 shadow-[0_0_6px_2px_hsl(0_84%_52%/0.5)]",
  high:     "bg-orange-500",
  moderate: "bg-amber-500",
  low:      "bg-green-500",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* ── Left panel: Industrial visualisation ──────────────────────────── */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-[52%] xl:w-[55%] flex-col">
        {/* Layered backgrounds */}
        <div className="absolute inset-0 grid-pattern opacity-25" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-background" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-32 top-1/3 h-[600px] w-[600px] rounded-full bg-amber-400/5 blur-[140px]" aria-hidden="true" />
        <div className="pointer-events-none absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/4 blur-[100px]" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" aria-label="RescueFlowAI home">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-400/10 ring-1 ring-amber-400/20">
              <Activity className="h-5 w-5 text-amber-400" aria-hidden="true" />
            </div>
            <span className="text-xl font-black">
              <span className="gradient-text">Rescue</span>FlowAI
            </span>
          </Link>

          {/* Hero text */}
          <div className="mt-16 max-w-md">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/8 px-3 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
              <span className="text-xs font-semibold text-amber-400">OSHA-Compliant AI Safety Platform</span>
            </div>
            <h1 className="text-4xl font-black leading-tight text-foreground">
              Industrial Safety
              <span className="block gradient-text">Powered by AI</span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Monitor incidents, dispatch responders, and protect your workforce across every site — all from one command center.
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { value: `${MOCK_STATS.activeIncidents}`, label: "Active Incidents", color: "text-amber-400" },
              { value: `${MOCK_STATS.safetyScore}%`,    label: "Safety Score",      color: "text-green-400"  },
              { value: `${MOCK_STATS.avgResponseMin}m`, label: "Avg Response",      color: "text-blue-400"   },
            ].map(({ value, label, color }) => (
              <div key={label} className="rounded-2xl border border-white/[0.06] bg-card/60 p-4 backdrop-blur-sm">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-[11px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          {/* Live incidents feed */}
          <div className="mt-8 flex-1">
            <div className="mb-3 flex items-center gap-2">
              <span className="dot-critical animate-pulse" aria-hidden="true" />
              <span className="text-xs font-semibold text-muted-foreground">Live Incident Feed</span>
            </div>
            <div className="space-y-2">
              {LIVE_INCIDENTS.map((incident) => (
                <div key={incident.id}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-card/50 p-3 backdrop-blur-sm">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${SEV_DOT[incident.severity]}`} aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-foreground">{incident.title}</p>
                    <p className="text-[10px] text-muted-foreground">{incident.department} · {incident.status}</p>
                  </div>
                  <span className="shrink-0 font-mono-id text-[9px] text-muted-foreground/60">{incident.id}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap gap-3">
            {["OSHA Compliant", "ISO 45001", "SOC 2 Type II", "GDPR Ready"].map((b) => (
              <span key={b} className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-card/40 px-2.5 py-1 text-[10px] text-muted-foreground backdrop-blur-sm">
                <CheckCircle2 className="h-3 w-3 text-green-400" aria-hidden="true" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel: Auth form ──────────────────────────────────────── */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-6 lg:p-12">
        <div className="pointer-events-none absolute inset-0 grid-pattern-fine opacity-20" aria-hidden="true" />

        {/* Mobile logo */}
        <Link href="/" className="relative mb-8 flex items-center gap-2.5 lg:hidden" aria-label="RescueFlowAI home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10">
            <Activity className="h-5 w-5 text-amber-400" aria-hidden="true" />
          </div>
          <span className="text-xl font-black">
            <span className="gradient-text">Rescue</span>FlowAI
          </span>
        </Link>

        <div className="relative z-10 w-full max-w-[400px]">{children}</div>

        <p className="relative mt-8 text-center text-xs text-muted-foreground/40">
          © 2024 RescueFlowAI · OSHA-Compliant · ISO 45001
        </p>
      </div>
    </div>
  );
}
