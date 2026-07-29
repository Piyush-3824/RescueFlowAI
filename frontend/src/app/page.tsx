"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity, Shield, Brain, Radio, Camera, Video, Mic, FileText,
  ArrowRight, CheckCircle2, Building2, ChevronRight, AlertTriangle, Users
} from "lucide-react";
import { QuickReportModal } from "@/components/incident-reporting/quick-report-modal";

const HOW_IT_WORKS = [
  {
    step: "1",
    icon: Camera,
    title: "Report",
    desc: "Worker reports an incident.",
    sub: "Upload photo, video, voice note or text in seconds."
  },
  {
    step: "2",
    icon: Brain,
    title: "AI Analyses",
    desc: "AI identifies hazard and severity.",
    sub: "Gemini AI calculates risk score & OSHA recordability."
  },
  {
    step: "3",
    icon: Users,
    title: "Respond",
    desc: "The correct safety team is notified.",
    sub: "Instant dispatch of HazMat, Fire or First Aid units."
  }
];

const CLIENTS = ["Tata Steel", "Siemens", "Bharat Steel", "NTPC", "L&T Construction", "Coal India"];

export default function LandingPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 antialiased">
      {/* Quick Report Modal */}
      <QuickReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-amber-400 font-bold shadow-xs">
              <Activity className="h-5 w-5 text-amber-400" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Rescue<span className="text-amber-500">FlowAI</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden items-center gap-8 md:flex text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <Link href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</Link>
            <Link href="/dashboard" className="hover:text-slate-900 transition-colors">Safety Dashboard</Link>
            <Link href="#about" className="hover:text-slate-900 transition-colors">About</Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors">
              Login
            </Link>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 shadow-sm hover:bg-amber-400 transition-all active:scale-95"
            >
              <span>🚨 Report Incident</span>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-20 lg:pt-28 lg:pb-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          
          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-tight">
            Safer Workplaces.<br />
            <span className="text-amber-500">Faster Response.</span>
          </h1>

          {/* Supporting text */}
          <p className="mt-6 mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed font-normal">
            AI-powered workplace incident reporting, analysis and response automation for modern industrial operations.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA (Most visually important) */}
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-amber-500 px-8 py-4 text-lg font-bold text-slate-950 shadow-md hover:bg-amber-400 transition-all active:scale-98"
            >
              <span className="text-xl">🚨</span>
              <span>Report an Incident</span>
            </button>

            {/* Secondary CTA */}
            <Link
              href="/dashboard"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all"
            >
              <span>View Safety Dashboard</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Report Incidents Using Strip */}
          <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Report incidents using
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Camera, label: "Photo" },
                { icon: Video,  label: "Video" },
                { icon: Mic,    label: "Voice" },
                { icon: FileText,label: "Text" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  onClick={() => setIsReportModalOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 border border-slate-200/80 py-3 px-4 font-semibold text-slate-700 text-sm hover:border-amber-400 hover:bg-amber-50/50 cursor-pointer transition-all"
                >
                  <Icon className="h-4 w-4 text-slate-500" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 3 Minimal How It Works Cards ─────────────────────────────────── */}
      <section id="how-it-works" className="py-20 border-t border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">Simple Workflow</p>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">How RescueFlowAI Works</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc, sub }) => (
              <div
                key={title}
                className="relative rounded-2xl border border-slate-200 bg-[#F8FAFC] p-8 transition-all hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-xs text-amber-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 font-mono">0{step}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1">{step}. {title}</h3>
                <p className="text-sm font-semibold text-slate-700 mb-2">{desc}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enterprise Trust Bar ────────────────────────────────────────── */}
      <section id="about" className="py-16 border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            Designed for enterprise industrial operations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm font-bold">
            {CLIENTS.map((name) => (
              <div key={name} className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-slate-400" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 py-10 bg-white">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Activity className="h-4 w-4 text-amber-500" />
            <span>RescueFlowAI</span>
          </div>
          <p>© 2026 RescueFlowAI · Enterprise Industrial Safety Platform</p>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-slate-900">Login</Link>
            <Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link>
            <Link href="/report" className="hover:text-slate-900">Report Incident</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
