"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle, Camera, Video, Mic, FileText, MapPin, Calendar, Clock,
  Building2, ArrowRight, CheckCircle2, X, Sparkles, Shield, Loader2,
  Volume2, Check, RefreshCw, Radio, Flame, ShieldAlert, Cpu
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface QuickReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ReportMethod = "image" | "video" | "voice" | "type" | null;

const DEPARTMENTS = [
  "Chemical Processing",
  "Assembly Line B",
  "Heavy Foundry",
  "Warehousing & Logistics",
  "Structural Welding",
  "Other Site Area"
];

const PRESET_DESCRIPTIONS = [
  "Chemical leak observed in Sector D, pipe fitting failure.",
  "Overheated motor causing heavy smoke in Bay 14.",
  "Worker fallen from scaffolding on Level 2 structural rig.",
  "Electrical short circuit with active sparking near panel B3."
];

export function QuickReportModal({ isOpen, onClose }: QuickReportModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [method, setMethod] = useState<ReportMethod>(null);
  
  // Form State
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceDuration, setVoiceDuration] = useState(0);
  const [descriptionText, setDescriptionText] = useState("");
  const [selectedDept, setSelectedDept] = useState("Chemical Processing");
  
  // Auto-captured data
  const [gpsLocation, setGpsLocation] = useState("22.8046° N, 86.2029° E (Sector D, Bay 14)");
  const [isLocating, setIsLocating] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const siteName = "Tata Steel — Jamshedpur Works";

  // AI Submission State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState("Initiating AI Pipeline...");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Set fresh timestamp
      const now = new Date();
      setTimestamp(now.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }));
    } else {
      // Reset state when closed
      setTimeout(() => {
        setStep(1);
        setMethod(null);
        setSelectedFile(null);
        setIsRecordingVoice(false);
        setVoiceDuration(0);
        setDescriptionText("");
        setIsAnalyzing(false);
        setAnalysisProgress(0);
        setIsSubmitted(false);
      }, 300);
    }
  }, [isOpen]);

  // Voice recording counter effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecordingVoice) {
      interval = setInterval(() => {
        setVoiceDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecordingVoice]);

  const handleRefreshGps = () => {
    setIsLocating(true);
    setTimeout(() => {
      setGpsLocation("22.8049° N, 86.2033° E (Sector D - Bay 14, Unit 2)");
      setIsLocating(false);
    }, 800);
  };

  const handleSelectMethod = (m: ReportMethod) => {
    setMethod(m);
    if (m === "image") {
      setSelectedFile("camera_capture_00912.jpg (High Res - 3.4 MB)");
    } else if (m === "video") {
      setSelectedFile("hazard_recording_004.mp4 (1080p 60fps - 14.2 MB)");
    } else if (m === "voice") {
      setIsRecordingVoice(true);
      setVoiceDuration(0);
    } else if (m === "type") {
      if (!descriptionText) {
        setDescriptionText(PRESET_DESCRIPTIONS[0]);
      }
    }
  };

  const handleAnalyzeAndSubmit = () => {
    setStep(3);
    setIsAnalyzing(true);
    setAnalysisProgress(15);
    setAnalysisStage("Uploading media payload to Secure Storage...");

    setTimeout(() => {
      setAnalysisProgress(45);
      setAnalysisStage("Gemini Vision AI analyzing hazards & severity...");
    }, 700);

    setTimeout(() => {
      setAnalysisProgress(80);
      setAnalysisStage("Matching OSHA compliance rules & response protocols...");
    }, 1400);

    setTimeout(() => {
      setAnalysisProgress(100);
      setAnalysisStage("Dispatching alerts & updating Live Dashboard!");
      setIsAnalyzing(false);
      setIsSubmitted(true);
    }, 2100);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          aria-hidden="true"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-500/30 bg-card shadow-2xl shadow-red-950/40 my-auto"
        >
          {/* Top OSHA Emergency Header */}
          <div className="flex items-center justify-between border-b border-amber-500/20 bg-gradient-to-r from-red-500/20 via-amber-500/15 to-transparent px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 shadow-inner">
                <AlertTriangle className="h-5 w-5 animate-pulse" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-red-500 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                    EMERGENCY MODE
                  </span>
                  <span className="text-xs font-mono font-semibold text-amber-400">
                    &lt; 30s Fast Report
                  </span>
                </div>
                <h2 className="text-lg font-black text-foreground sm:text-xl">
                  Workplace Incident Reporting
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-secondary/40 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
              aria-label="Close reporting modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Bar (Step 1 -> Step 2 -> Step 3) */}
          <div className="border-b border-white/[0.06] bg-secondary/20 px-5 py-3 sm:px-6">
            <div className="flex items-center justify-between">
              {[
                { number: 1, title: "Report Method" },
                { number: 2, title: "Auto Context" },
                { number: 3, title: "AI Analysis" },
              ].map((s, idx) => {
                const isActive = step === s.number;
                const isDone = step > s.number || isSubmitted;
                return (
                  <React.Fragment key={s.number}>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-black transition-all",
                          isDone
                            ? "bg-green-500 text-white shadow-md shadow-green-500/30"
                            : isActive
                            ? "bg-amber-400 text-background ring-4 ring-amber-400/20"
                            : "border border-white/10 bg-secondary text-muted-foreground"
                        )}
                      >
                        {isDone ? <Check className="h-4 w-4 stroke-[3]" /> : s.number}
                      </div>
                      <span
                        className={cn(
                          "text-xs font-bold sm:inline-block",
                          isActive
                            ? "text-amber-400"
                            : isDone
                            ? "text-green-400"
                            : "text-muted-foreground"
                        )}
                      >
                        {s.title}
                      </span>
                    </div>
                    {idx < 2 && (
                      <div
                        className={cn(
                          "h-0.5 flex-1 mx-2 transition-all duration-300",
                          step > idx + 1 ? "bg-green-500" : "bg-white/10"
                        )}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-5 sm:p-6 space-y-6">
            {/* ================= STEP 1: CHOOSE METHOD ================= */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-muted-foreground">
                    Step 1: How would you like to report?
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Large touch buttons designed for fast gloved-hand interaction.
                  </p>
                </div>

                {/* Large Touch Grid (Glove Friendly) */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    {
                      id: "image",
                      label: "Upload Image",
                      sub: "Take photo or upload",
                      icon: Camera,
                      color: "text-amber-400",
                      bg: "bg-amber-400/10 border-amber-400/30 hover:bg-amber-400/20",
                    },
                    {
                      id: "video",
                      label: "Upload Video",
                      sub: "Record video evidence",
                      icon: Video,
                      color: "text-orange-400",
                      bg: "bg-orange-400/10 border-orange-400/30 hover:bg-orange-400/20",
                    },
                    {
                      id: "voice",
                      label: "Record Voice",
                      sub: "Hands-free audio report",
                      icon: Mic,
                      color: "text-red-400",
                      bg: "bg-red-400/10 border-red-400/30 hover:bg-red-400/20",
                    },
                    {
                      id: "type",
                      label: "Type Description",
                      sub: "Quick text presets",
                      icon: FileText,
                      color: "text-blue-400",
                      bg: "bg-blue-400/10 border-blue-400/30 hover:bg-blue-400/20",
                    },
                  ].map((item) => {
                    const isSelected = method === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectMethod(item.id as ReportMethod)}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 rounded-2xl border p-5 text-center transition-all duration-200 min-h-[110px] active:scale-95 shadow-md",
                          isSelected
                            ? "border-amber-400 bg-amber-400/20 text-foreground ring-2 ring-amber-400/50 shadow-amber-400/10"
                            : `${item.bg} text-foreground`
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-secondary/80",
                            item.color
                          )}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold leading-tight">{item.label}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{item.sub}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Method Detail / Input Area */}
                {method && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-3"
                  >
                    {/* Image / Video Selected */}
                    {(method === "image" || method === "video") && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/20 text-amber-400">
                            {method === "image" ? <Camera className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-foreground">Media Selected</p>
                            <p className="text-[11px] text-muted-foreground">{selectedFile}</p>
                          </div>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold text-green-400">
                          <CheckCircle2 className="h-4 w-4" /> Ready
                        </span>
                      </div>
                    )}

                    {/* Voice Recording Selected */}
                    {method === "voice" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                              {isRecordingVoice ? "Recording Audio..." : "Audio Recorded"}
                            </span>
                          </div>
                          <span className="font-mono text-xs font-bold text-foreground">
                            00:{voiceDuration < 10 ? `0${voiceDuration}` : voiceDuration}
                          </span>
                        </div>

                        {/* Waveform graphic */}
                        <div className="flex items-center justify-center gap-1 h-8 px-2 bg-secondary/50 rounded-xl overflow-hidden">
                          {[40, 70, 30, 90, 60, 100, 45, 80, 65, 30, 85, 95, 50, 70, 40, 80, 60].map((h, i) => (
                            <div
                              key={i}
                              className={cn(
                                "w-1 rounded-full transition-all duration-200",
                                isRecordingVoice ? "bg-red-400 animate-pulse" : "bg-amber-400"
                              )}
                              style={{ height: `${isRecordingVoice ? Math.max(15, (h * Math.random()) | 0) : h}%` }}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => setIsRecordingVoice(!isRecordingVoice)}
                          className="w-full py-2 rounded-xl border border-white/10 bg-secondary/60 text-xs font-bold text-foreground hover:bg-secondary"
                        >
                          {isRecordingVoice ? "Stop Recording" : "Re-record Voice Note"}
                        </button>
                      </div>
                    )}

                    {/* Text Presets & Input */}
                    {method === "type" && (
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-foreground block">
                          Tap a quick preset or type detail:
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {PRESET_DESCRIPTIONS.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setDescriptionText(preset)}
                              className="text-[11px] text-left px-2.5 py-1.5 rounded-lg border border-white/10 bg-secondary/60 text-muted-foreground hover:text-foreground hover:border-amber-400/40 transition-all"
                            >
                              "{preset.slice(0, 35)}..."
                            </button>
                          ))}
                        </div>
                        <textarea
                          rows={2}
                          value={descriptionText}
                          onChange={(e) => setDescriptionText(e.target.value)}
                          placeholder="Describe hazard or incident briefly..."
                          className="w-full rounded-xl border border-white/10 bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-amber-400 outline-none"
                        />
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Continue to Step 2 Button */}
                <div className="pt-2">
                  <button
                    disabled={!method}
                    onClick={() => setStep(2)}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-400 py-4 text-base font-black text-background shadow-lg shadow-amber-400/20 hover:bg-amber-300 disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-[0.99]"
                  >
                    <span>Proceed to Auto Context</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 2: AUTO CONTEXT ================= */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-muted-foreground">
                    Step 2: Auto-Captured Incident Context
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Location, time, and site details automatically detected to save critical seconds.
                  </p>
                </div>

                {/* Context Cards */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* GPS Location */}
                  <div className="rounded-2xl border border-white/10 bg-secondary/30 p-3.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-amber-400">
                        <MapPin className="h-4 w-4" />
                        <span className="text-xs font-bold">GPS Location</span>
                      </div>
                      <button
                        onClick={handleRefreshGps}
                        disabled={isLocating}
                        className="text-[10px] font-semibold text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <RefreshCw className={cn("h-3 w-3", isLocating && "animate-spin")} />
                        Refresh
                      </button>
                    </div>
                    <p className="text-xs font-bold text-foreground font-mono">{gpsLocation}</p>
                    <p className="text-[10px] text-muted-foreground">Accuracy: ±2 meters (High precision)</p>
                  </div>

                  {/* Date & Time */}
                  <div className="rounded-2xl border border-white/10 bg-secondary/30 p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-blue-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs font-bold">Timestamp</span>
                    </div>
                    <p className="text-xs font-bold text-foreground font-mono">{timestamp}</p>
                    <p className="text-[10px] text-muted-foreground">Auto-synced with server clock</p>
                  </div>

                  {/* Site Name */}
                  <div className="rounded-2xl border border-white/10 bg-secondary/30 p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-orange-400">
                      <Building2 className="h-4 w-4" />
                      <span className="text-xs font-bold">Plant / Facility</span>
                    </div>
                    <p className="text-xs font-bold text-foreground">{siteName}</p>
                    <p className="text-[10px] text-muted-foreground">ID: FAC-IND-7009</p>
                  </div>

                  {/* Department Picker */}
                  <div className="rounded-2xl border border-white/10 bg-secondary/30 p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-400">
                      <Shield className="h-4 w-4" />
                      <span className="text-xs font-bold">Department (Optional)</span>
                    </div>
                    <select
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                      className="w-full bg-background/80 border border-white/10 rounded-xl text-xs font-bold text-foreground p-1.5 outline-none focus:border-amber-400"
                    >
                      {DEPARTMENTS.map((d) => (
                        <option key={d} value={d} className="bg-card text-foreground">
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Fast Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 rounded-2xl border border-white/10 bg-secondary/60 text-xs font-bold text-foreground hover:bg-secondary"
                  >
                    Back to Method
                  </button>

                  <button
                    onClick={handleAnalyzeAndSubmit}
                    className="flex-[2] flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-amber-500 py-4 text-base font-black text-white shadow-xl shadow-red-500/20 hover:opacity-95 active:scale-[0.99] transition-all"
                  >
                    <Sparkles className="h-5 w-5 text-amber-200 animate-spin" />
                    <span>Analyze &amp; Submit</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 3: AI ANALYSIS & RESULT ================= */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5"
              >
                {/* Processing State */}
                {isAnalyzing && (
                  <div className="py-8 text-center space-y-5">
                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-400/10 border-2 border-amber-400/30">
                      <Cpu className="h-10 w-10 text-amber-400 animate-pulse" />
                      <div className="absolute inset-0 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-black text-foreground">
                        Gemini Safety AI Processing
                      </h3>
                      <p className="text-xs text-muted-foreground font-mono">
                        {analysisStage}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mx-auto max-w-sm w-full bg-secondary/60 rounded-full h-2 overflow-hidden border border-white/5">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-red-500 h-full transition-all duration-300"
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Submitted & Result Display */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5"
                  >
                    {/* Success Banner */}
                    <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/20 text-green-400">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-foreground">
                          Incident Reported &amp; Dispatched!
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Reference ID: <span className="font-mono font-bold text-amber-400">INC-2026-EMG09</span> • Processed in 1.8s
                        </p>
                      </div>
                    </div>

                    {/* AI Analysis Findings */}
                    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-blue-500/10 pb-2">
                        <div className="flex items-center gap-2">
                          <Cpu className="h-4 w-4 text-blue-400" />
                          <span className="text-xs font-bold text-foreground">Gemini AI Hazard Analysis</span>
                        </div>
                        <span className="rounded bg-red-500/20 px-2 py-0.5 text-[10px] font-black text-red-400">
                          CRITICAL RISK
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">Detected Hazard:</strong> Chemical vapor dispersion risk identified from visual payload &amp; telemetry at {selectedDept}. High likelihood of pressure valve fault.
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="rounded-xl border border-white/5 bg-secondary/30 p-2">
                          <span className="text-muted-foreground block">OSHA Status:</span>
                          <span className="font-bold text-amber-400">OSHA 300 Recordable</span>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-secondary/30 p-2">
                          <span className="text-muted-foreground block">Recommended Team:</span>
                          <span className="font-bold text-green-400">HazMat Unit A + First Aid</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/dashboard"
                        onClick={onClose}
                        className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-amber-400 py-3.5 text-xs font-bold text-background hover:bg-amber-300 transition-all"
                      >
                        <span>View Live Incident Command</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>

                      <button
                        onClick={onClose}
                        className="flex-1 py-3.5 rounded-2xl border border-white/10 bg-secondary/60 text-xs font-bold text-foreground hover:bg-secondary"
                      >
                        Close &amp; Return to Home
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
