"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, Video, Mic, FileText, MapPin, Clock, Building2,
  CheckCircle2, ArrowRight, ShieldAlert, AlertTriangle, Users,
  ChevronLeft, Sparkles, RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

type MethodType = "photo" | "video" | "voice" | "text" | null;

export default function ReportIncidentPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [method, setMethod] = useState<MethodType>(null);
  
  // Auto-detected metadata
  const [location, setLocation] = useState("Welding Zone B");
  const [site, setSite] = useState("Manufacturing Plant 01");
  const [department, setDepartment] = useState("Welding");
  const [detectedTime, setDetectedTime] = useState("");
  const [textDescription, setTextDescription] = useState("");
  
  // AI analysis state
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  useEffect(() => {
    const now = new Date();
    setDetectedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  }, []);

  const handleSelectMethod = (m: MethodType) => {
    setMethod(m);
    setStep(2);
  };

  const handleStartAnalysis = () => {
    setStep(3);
    setAnalyzing(true);
    setAnalysisStep(1);

    const t1 = setTimeout(() => setAnalysisStep(2), 600);
    const t2 = setTimeout(() => setAnalysisStep(3), 1200);
    const t3 = setTimeout(() => setAnalysisStep(4), 1800);
    const t4 = setTimeout(() => {
      setAnalysisStep(5);
      setAnalyzing(false);
    }, 2400);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 antialiased p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        
        {/* Header navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <span className="text-xs font-mono font-bold text-slate-400">Step {step} of 3</span>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: SELECT REPORT METHOD                                               */}
        {/* ========================================================================= */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-slate-900">Report an Incident</h1>
              <p className="text-sm text-slate-500 mt-1">Tell us what happened. AI will handle the rest.</p>
            </div>

            {/* 4 Large Touch-Friendly Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: "photo", label: "Upload Photo", icon: Camera, emoji: "📷", desc: "Take or select photo" },
                { id: "video", label: "Upload Video", icon: Video,  emoji: "🎥", desc: "Record or attach clip" },
                { id: "voice", label: "Record Voice", icon: Mic,    emoji: "🎤", desc: "Hands-free audio report" },
                { id: "text",  label: "Describe Incident", icon: FileText, emoji: "✏️", desc: "Type quick description" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectMethod(item.id as MethodType)}
                  className="flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-amber-400 hover:shadow-md transition-all text-center min-h-[160px] active:scale-98"
                >
                  <span className="text-4xl mb-3">{item.emoji}</span>
                  <h3 className="text-lg font-bold text-slate-900">{item.label}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: AUTO CONTEXT & SUBMIT                                              */}
        {/* ========================================================================= */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Incident Details</h1>
                <p className="text-xs text-slate-500">Auto-detected context. Verify or adjust if needed.</p>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900"
              >
                Change Method
              </button>
            </div>

            {/* Media Selected Preview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {method === "photo" && "📷"}
                  {method === "video" && "🎥"}
                  {method === "voice" && "🎤"}
                  {method === "text"  && "✏️"}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900 uppercase">Input Payload</p>
                  <p className="text-xs text-slate-500">
                    {method === "photo" && "Photo captured • Ready for vision AI"}
                    {method === "video" && "Video attached • 1080p clip ready"}
                    {method === "voice" && "Audio note recorded • 12 seconds"}
                    {method === "text"  && "Text note created"}
                  </p>
                </div>
              </div>
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>

            {/* Text description input if text method chosen */}
            {method === "text" && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Incident Description</label>
                <textarea
                  rows={3}
                  value={textDescription}
                  onChange={(e) => setTextDescription(e.target.value)}
                  placeholder="e.g. Fire hazard identified near welding area with sparks near combustible material."
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 outline-none"
                />
              </div>
            )}

            {/* Auto-detected metadata card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Detected Context</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Location */}
                <div className="space-y-1">
                  <span className="text-slate-500 block font-medium">Location</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-500" />
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 w-full text-xs"
                    />
                  </div>
                </div>

                {/* Site */}
                <div className="space-y-1">
                  <span className="text-slate-500 block font-medium">Site</span>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-600" />
                    <input
                      value={site}
                      onChange={(e) => setSite(e.target.value)}
                      className="font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 w-full text-xs"
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="space-y-1">
                  <span className="text-slate-500 block font-medium">Department</span>
                  <input
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 w-full text-xs"
                  />
                </div>

                {/* Time */}
                <div className="space-y-1">
                  <span className="text-slate-500 block font-medium">Time (Auto Detected)</span>
                  <div className="flex items-center gap-2 font-mono font-bold text-slate-900 pt-1">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>{detectedTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* One Large Primary Button: "Analyse & Submit" in Safety Amber */}
            <button
              onClick={handleStartAnalysis}
              className="w-full flex items-center justify-center gap-3 rounded-2xl bg-amber-500 py-4 text-lg font-extrabold text-slate-950 shadow-md hover:bg-amber-400 transition-all active:scale-98"
            >
              <Sparkles className="h-5 w-5" />
              <span>Analyse &amp; Submit</span>
            </button>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: PAGE 3 — AI ANALYSIS & RESULT                                     */}
        {/* ========================================================================= */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            
            {/* Analyzing Processing Animation */}
            {analyzing ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center space-y-6 shadow-xs">
                <div className="flex justify-center">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 border border-amber-200">
                    <RefreshCw className="h-8 w-8 text-amber-500 animate-spin" />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">RescueFlow AI is analysing the incident</h2>
                  <p className="text-xs text-slate-500 mt-1 font-mono">Running hazard classification engine...</p>
                </div>

                {/* Checklist */}
                <div className="max-w-xs mx-auto text-left space-y-2 text-xs font-semibold">
                  {[
                    "Media analysed",
                    "Hazard identified",
                    "Severity calculated",
                    "Response team determined",
                    "Incident report generated",
                  ].map((task, idx) => (
                    <div key={task} className="flex items-center gap-2.5">
                      {analysisStep > idx ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-slate-300 shrink-0" />
                      )}
                      <span className={analysisStep > idx ? "text-slate-900 font-bold" : "text-slate-400"}>
                        {task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Display Result inside One Clean Card */
              <div className="space-y-6">
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="h-3.5 w-3.5" /> AI Analysis Complete
                  </span>
                </div>

                {/* Clean Result Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                  {/* Header Row */}
                  <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900">Welding Fire Hazard</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Location: <strong className="text-slate-900">{location}</strong></p>
                    </div>
                    <span className="rounded-xl bg-orange-500 px-3 py-1 text-xs font-black text-white uppercase tracking-wider shadow-xs">
                      HIGH
                    </span>
                  </div>

                  {/* Key Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 text-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-semibold">Location</span>
                      <span className="text-xs font-bold text-slate-900">{location}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-semibold">Workers at Risk</span>
                      <span className="text-xs font-bold text-orange-600">3 Workers</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-semibold">AI Confidence</span>
                      <span className="text-xs font-bold text-blue-600">94%</span>
                    </div>
                  </div>

                  {/* Potential Hazards */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Potential Hazards</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {["Open flame", "Flammable material nearby", "Smoke exposure"].map((h) => (
                        <li key={h} className="rounded-lg bg-orange-50 border border-orange-200/60 px-2.5 py-1.5 text-xs font-semibold text-orange-900 flex items-center gap-1.5">
                          <AlertTriangle className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* AI Summary */}
                  <div className="rounded-xl bg-blue-50/60 border border-blue-200/60 p-3.5 space-y-1">
                    <span className="text-xs font-bold text-blue-900 block">AI Summary</span>
                    <p className="text-xs text-blue-950 leading-relaxed italic">
                      &ldquo;A fire hazard has been identified near the welding area with combustible material nearby.&rdquo;
                    </p>
                  </div>

                  {/* Immediate Recommendation */}
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5 space-y-1">
                    <span className="text-xs font-bold text-amber-900 block uppercase">Immediate Recommendation</span>
                    <p className="text-xs font-semibold text-amber-950">
                      Stop welding operations and isolate the affected zone.
                    </p>
                  </div>

                  {/* Recommended Teams */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Recommended Teams</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Fire Safety Team", "Safety Officer", "Site Supervisor"].map((team) => (
                        <span key={team} className="rounded-lg bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-slate-500" />
                          {team}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary button: "Start Response Workflow" */}
                <Link
                  href="/dispatch"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-500 py-4 text-base font-extrabold text-slate-950 shadow-md hover:bg-amber-400 transition-all active:scale-98"
                >
                  <span>Start Response Workflow</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
}
