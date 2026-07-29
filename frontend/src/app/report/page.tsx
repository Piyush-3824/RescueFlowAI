"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle, Flame, Zap, Wrench, FlaskConical, Stethoscope, HardHat,
  Wind, MapPin, Camera, Mic, Upload, ArrowLeft, ArrowRight,
  CheckCircle2, Loader2, Brain, Shield, Navigation,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INCIDENT_TYPES = [
  { id: "fall",       label: "Fall / Trip",           icon: HardHat,      color: "text-red-400",    bg: "bg-red-400/10",    border: "border-red-400/30",    activeBg: "bg-red-400/15"    },
  { id: "fire",       label: "Fire / Explosion",      icon: Flame,        color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30", activeBg: "bg-orange-400/15" },
  { id: "electrical", label: "Electrical Fault",      icon: Zap,          color: "text-amber-400",  bg: "bg-amber-400/10",  border: "border-amber-400/30",  activeBg: "bg-amber-400/15"  },
  { id: "chemical",   label: "Chemical Spill",        icon: FlaskConical, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30", activeBg: "bg-purple-400/15" },
  { id: "machinery",  label: "Machinery / Equipment", icon: Wrench,       color: "text-blue-400",   bg: "bg-blue-400/10",   border: "border-blue-400/30",   activeBg: "bg-blue-400/15"   },
  { id: "medical",    label: "Medical Emergency",     icon: Stethoscope,  color: "text-cyan-400",   bg: "bg-cyan-400/10",   border: "border-cyan-400/30",   activeBg: "bg-cyan-400/15"   },
  { id: "gas",        label: "Gas Leak",              icon: Wind,         color: "text-green-400",  bg: "bg-green-400/10",  border: "border-green-400/30",  activeBg: "bg-green-400/15"  },
  { id: "other",      label: "Other",                 icon: AlertTriangle,color: "text-slate-400",  bg: "bg-slate-400/10",  border: "border-slate-400/30",  activeBg: "bg-slate-400/15"  },
] as const;

const SEVERITIES = [
  { id: "critical", label: "Critical",  desc: "Life-threatening, immediate danger",  color: "border-red-500/50    bg-red-500/10",    text: "text-red-400",    icon: "🚨" },
  { id: "high",     label: "High",      desc: "Serious injury risk, urgent action",  color: "border-orange-500/50 bg-orange-500/10", text: "text-orange-400", icon: "⚠️" },
  { id: "moderate", label: "Moderate",  desc: "Injury possible, action required",    color: "border-amber-500/50  bg-amber-500/10",  text: "text-amber-400",  icon: "🔶" },
  { id: "low",      label: "Low",       desc: "Minor concern, routine handling",     color: "border-green-500/50  bg-green-500/10",  text: "text-green-400",  icon: "🟢" },
] as const;

const STEPS = ["Incident Type", "Severity & Details", "Media & Submit"] as const;
type Step = 1 | 2 | 3;

export default function ReportPage() {
  const [step,      setStep]      = useState<Step>(1);
  const [incType,   setIncType]   = useState<string | null>(null);
  const [severity,  setSeverity]  = useState<string | null>(null);
  const [form,      setForm]      = useState({ location: "", department: "", description: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [locating,  setLocating]  = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const set    = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>)    => setForm((p) => ({ ...p, [k]: e.target.value }));
  const setTA  = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLTextAreaElement>) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const canNext1 = incType !== null;
  const canNext2 = severity !== null && form.location && form.description;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setSubmitted(true);
  }

  async function detectLocation() {
    setLocating(true);
    await new Promise((r) => setTimeout(r, 1200));
    setForm((p) => ({ ...p, location: "Sector D, Bay 14 — GPS: 22.8046°N, 86.2029°E" }));
    setLocating(false);
  }

  const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

  /* ── Success screen ─────────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md rounded-2xl border border-green-500/20 bg-card p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10"
          >
            <CheckCircle2 className="h-10 w-10 text-green-400" aria-hidden="true" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h1 className="mb-2 text-2xl font-black text-foreground">Incident Reported!</h1>
            <p className="mb-1 text-sm text-muted-foreground">
              Reference ID: <span className="font-mono-id font-bold text-amber-400">INC-2024-009</span>
            </p>
            <p className="mb-6 text-sm text-muted-foreground">
              AI is analyzing your report. Dispatch team has been notified.
            </p>
            {/* AI analyzing animation */}
            <div className="mb-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-blue-400" aria-hidden="true" />
                <span className="text-xs font-semibold text-blue-400">AI Analysis in Progress</span>
                <span className="ml-auto flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </span>
              </div>
              <div className="space-y-1.5">
                {["Classifying incident type…", "Estimating severity level…", "Identifying required responders…"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-400" aria-hidden="true" />
                    <span className="text-[11px] text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Link href="/incidents/INC-2024-009"
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-background hover:bg-amber-300">
                View Incident <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/dashboard"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-foreground hover:bg-white/5">
                Back to Dashboard
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/incidents" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Link>
        <div>
          <h1 className="text-2xl font-black text-foreground">Report Workplace Incident</h1>
          <p className="text-sm text-muted-foreground">AI will analyze and classify your report automatically</p>
        </div>
      </div>

      {/* Step progress bar */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          {STEPS.map((label, idx) => {
            const n = (idx + 1) as Step;
            const done   = step > n;
            const active = step === n;
            return (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-black transition-all duration-300",
                    done   ? "bg-green-500 text-white shadow-md shadow-green-500/30" :
                    active ? "bg-amber-400 text-background shadow-md shadow-amber-400/30" :
                             "border border-white/10 bg-secondary text-muted-foreground"
                  )}>
                    {done ? <CheckCircle2 className="h-4 w-4" /> : n}
                  </div>
                  <span className={cn("hidden text-[10px] font-semibold sm:block",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}>{label}</span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="relative mx-2 flex-1 h-1 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-amber-400"
                      animate={{ width: step > (idx + 1) ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <AnimatePresence mode="wait">

          {/* ── Step 1: Incident Type ─────────────────────────────────────── */}
          {step === 1 && (
            <motion.div key="step1"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}>
              <p className="mb-4 text-sm font-semibold text-muted-foreground">Select the type of incident:</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {INCIDENT_TYPES.map(({ id, label, icon: Icon, color, bg, border, activeBg }) => (
                  <button key={id} id={`type-${id}`}
                    onClick={() => setIncType(id)}
                    className={cn(
                      "flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition-all duration-200",
                      incType === id
                        ? `${activeBg} ${border} ${color} scale-[1.02] shadow-lg`
                        : "border-white/[0.06] bg-card text-muted-foreground hover:border-white/10 hover:bg-white/[0.02] hover:text-foreground"
                    )}>
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl transition-all", incType === id ? bg : "bg-secondary/40")}>
                      <Icon className={cn("h-5 w-5", incType === id ? color : "")} aria-hidden="true" />
                    </div>
                    <span className="text-xs font-semibold leading-tight">{label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button id="step1-next" disabled={!canNext1} onClick={() => setStep(2)}>
                  Next Step <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Severity + Details ────────────────────────────────── */}
          {step === 2 && (
            <motion.div key="step2"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="space-y-6">
              {/* Severity */}
              <div>
                <p className="mb-3 text-sm font-semibold text-muted-foreground">How severe is the incident?</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {SEVERITIES.map(({ id, label, desc, color, text, icon }) => (
                    <button key={id} id={`severity-${id}`}
                      onClick={() => setSeverity(id)}
                      className={cn(
                        "rounded-xl border p-4 text-left transition-all",
                        severity === id ? color : "border-white/[0.06] bg-card hover:border-white/10"
                      )}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{icon}</span>
                        <p className={cn("font-bold", severity === id ? text : "text-foreground")}>{label}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location with GPS detect */}
              <div className="space-y-4">
                <div className="relative">
                  <Input id="report-location" label="Exact Location" placeholder="e.g. Sector D, Bay 14"
                    value={form.location} onChange={set("location")} required />
                  <button
                    type="button"
                    onClick={detectLocation}
                    disabled={locating}
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-amber-400/10 px-2 py-1 text-[10px] font-semibold text-amber-400 transition-all hover:bg-amber-400/20 disabled:opacity-60"
                  >
                    {locating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Navigation className="h-3 w-3" />}
                    {locating ? "Detecting…" : "Auto-detect GPS"}
                  </button>
                </div>
                <Input id="report-department" label="Department" placeholder="e.g. Chemical Processing"
                  value={form.department} onChange={set("department")} />
                <div className="space-y-1.5">
                  <label htmlFor="report-description" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea id="report-description" rows={4} required
                    placeholder="Describe what happened in detail — what you saw, heard, or discovered…"
                    value={form.description} onChange={setTA("description")}
                    className="w-full resize-none rounded-xl border border-input bg-secondary/40 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                </Button>
                <Button id="step2-next" disabled={!canNext2} onClick={() => setStep(3)}>
                  Next Step <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Media + Submit ────────────────────────────────────── */}
          {step === 3 && (
            <motion.div key="step3"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="space-y-5">
              {/* Summary */}
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-amber-400">Report Summary</p>
                <div className="grid gap-1 text-sm text-muted-foreground">
                  <p>Type: <span className="text-foreground capitalize font-semibold">{incType?.replace("-", " ") ?? "—"}</span></p>
                  <p>Severity: <span className="text-foreground capitalize font-semibold">{severity ?? "—"}</span></p>
                  <p>Location: <span className="text-foreground font-semibold">{form.location || "—"}</span></p>
                </div>
              </div>

              {/* Drag & drop media upload */}
              <div>
                <p className="mb-3 text-sm font-semibold text-muted-foreground">Attach evidence (optional but recommended):</p>
                {/* Drop zone */}
                <div className="rounded-2xl border-2 border-dashed border-white/10 bg-card p-8 text-center transition-all hover:border-amber-400/30 hover:bg-amber-400/[0.02]">
                  <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" aria-hidden="true" />
                  <p className="text-sm font-semibold text-foreground">Drop files here or click to upload</p>
                  <p className="mt-1 text-xs text-muted-foreground">Photos, videos, voice recordings, documents</p>
                  <div className="mt-3 flex justify-center gap-2">
                    {[
                      { icon: Camera, label: "Photo / Video", id: "upload-photo" },
                      { icon: Mic,    label: "Voice Note",    id: "upload-voice" },
                    ].map(({ icon: Icon, label, id }) => (
                      <button key={id} id={id}
                        className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:border-amber-400/30 hover:text-amber-400">
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI notice */}
              <div className="flex gap-3 rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-3.5">
                <Brain className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                <p className="text-xs text-blue-300 leading-relaxed">
                  <span className="font-semibold">Gemini AI</span> will automatically analyze your report, classify the incident type, estimate severity, and recommend response protocols — all within seconds of submission.
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                </Button>
                <Button id="report-submit-btn" type="button" variant="emergency" isLoading={loading} onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}>
                  {loading
                    ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Submitting…</>
                    : <><Shield className="h-4 w-4" aria-hidden="true" />Submit Report</>
                  }
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
