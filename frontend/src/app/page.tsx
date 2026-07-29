"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity, Shield, Brain, BarChart2, Radio, Map,
  ArrowRight, CheckCircle2, Star, Building2, ChevronRight,
  AlertTriangle, ShieldCheck, Clock, Zap, Users2, Award, Sparkles
} from "lucide-react";
import { QuickReportModal } from "@/components/incident-reporting/quick-report-modal";

/* ── Data ───────────────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: AlertTriangle, color: "text-red-400    bg-red-400/10",    title: "Real-Time Incident Detection",  desc: "AI-powered sensors and camera integrations detect incidents the moment they occur — before they escalate." },
  { icon: Radio,         color: "text-amber-400  bg-amber-400/10",  title: "Instant Dispatch & Coordination", desc: "One-tap dispatch of HazMat, medical, and fire teams with live location tracking and status updates." },
  { icon: Brain,         color: "text-blue-400   bg-blue-400/10",   title: "Gemini AI Analysis",             desc: "Each incident receives an AI-generated report with risk classification, OSHA compliance flags, and protocol recommendations." },
  { icon: BarChart2,     color: "text-green-400  bg-green-400/10",  title: "Safety Analytics Dashboard",    desc: "Track safety KPIs, department performance, incident trends, and predict risk areas before accidents happen." },
  { icon: Map,           color: "text-purple-400 bg-purple-400/10", title: "Live Site Map",                 desc: "Geo-locate every incident, responder, and risk zone on an interactive plant map with real-time overlays." },
  { icon: Shield,        color: "text-orange-400 bg-orange-400/10", title: "OSHA & ISO 45001 Compliance",   desc: "Auto-generate OSHA 300/300A logs, ISO 45001 audit trails, and regulatory reports with a single click." },
];

const STATS = [
  { value: "94%",  label: "Average Safety Score Improvement"  },
  { value: "8.4m", label: "Average Emergency Response Time"   },
  { value: "500+", label: "Enterprise Sites Protected"         },
  { value: "99.9%",label: "Platform Uptime SLA"               },
];

const TESTIMONIALS = [
  {
    name: "Vikram Singh", role: "HSE Director, Tata Steel", avatar: "VS",
    quote: "RescueFlowAI cut our average incident response time by 40%. The AI analysis feature alone has prevented three major accidents this year.",
    stars: 5,
  },
  {
    name: "Priya Mehta", role: "Safety Manager, Siemens India", avatar: "PM",
    quote: "Finally, a platform that speaks the language of industrial safety. The OSHA compliance automation saves our team 20+ hours a month.",
    stars: 5,
  },
  {
    name: "Rajan Kumar", role: "Operations Head, Bharat Steel", avatar: "RK",
    quote: "The live heatmap and department scoring system has transformed how we approach proactive safety — from reactive to truly preventive.",
    stars: 5,
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "₹8,999",
    per: "/month",
    desc: "For small sites and contractors",
    features: ["Up to 50 workers", "Basic incident reporting", "Email notifications", "7-day history", "OSHA report generation"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "₹29,999",
    per: "/month",
    desc: "For manufacturing plants & mines",
    features: ["Unlimited workers", "AI-powered analysis", "Live dispatch & radio", "Unlimited history", "ISO 45001 audit trails", "Department analytics", "Priority support"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Custom",
    price: "Contact us",
    per: "",
    desc: "For enterprise & government",
    features: ["Multi-site management", "Custom integrations", "On-premise option", "SLA guarantee", "Dedicated account manager", "White-label option"],
    cta: "Talk to Sales",
    highlight: false,
  },
];

const CLIENTS = ["Tata Steel", "Siemens", "Bharat Steel", "NTPC", "L&T Construction", "Coal India"];

/* ── Floating stat badge ─────────────────────────────────────────────────── */
function FloatBadge({ icon: Icon, label, value, color, className, style }: {
  icon: typeof AlertTriangle; label: string; value: string; color: string; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div className={`absolute hidden lg:flex items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-card/90 p-3 shadow-2xl shadow-black/40 backdrop-blur-md ${className}`} style={style}>
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-black text-foreground">{value}</p>
        <p className="text-[10px] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      {/* 🚨 Quick Emergency Report Modal */}
      <QuickReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* ── Navigation ──────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-2xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-400/10 ring-1 ring-amber-400/20">
              <Activity className="h-4 w-4 text-amber-400" aria-hidden="true" />
            </div>
            <span className="text-lg font-black"><span className="gradient-text">Rescue</span>FlowAI</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {["Features", "Analytics", "Pricing", "Customers"].map((label) => (
              <Link key={label} href={`#${label.toLowerCase()}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Header Fast Emergency Button */}
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-gradient-to-r from-red-500/20 to-amber-500/20 px-3 py-1.5 text-xs font-black text-red-400 transition-all hover:bg-red-500/30 hover:shadow-lg hover:shadow-red-500/20 active:scale-95"
            >
              <span className="text-sm">🚨</span>
              <span>Report Incident</span>
            </button>

            <Link href="/login" className="hidden sm:block text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
              Sign In
            </Link>

            <Link href="/register"
              className="flex items-center gap-1.5 rounded-xl bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-background transition-all hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20">
              Get Started <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-16 lg:pt-24 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/5 blur-[160px]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center text-center">
            {/* Emergency Alert Header Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" aria-hidden="true" />
              <span className="text-xs font-black uppercase tracking-wider text-red-400">
                Fast Emergency Protocol &bull; Under 30 Seconds
              </span>
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Industrial Safety,
              <span className="block gradient-text">Powered by AI</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              RescueFlowAI unifies incident reporting, AI analysis, real-time dispatch, and OSHA compliance into one command center — built for construction, manufacturing, mining, and factories.
            </p>

            {/* 🚨 PROMINENT PRIMARY CALL-TO-ACTION BUTTON (HUGE, GLOVE-FRIENDLY, TOP VISIBILITY) */}
            <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-md">
              <button
                id="hero-report-incident-btn"
                onClick={() => setIsReportModalOpen(true)}
                className="group relative w-full flex items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 p-5 sm:p-6 text-xl sm:text-2xl font-black text-white shadow-2xl shadow-red-600/40 ring-4 ring-red-500/20 hover:ring-red-500/50 hover:shadow-red-600/60 active:scale-[0.98] transition-all duration-200"
              >
                <span className="text-2xl sm:text-3xl animate-bounce">🚨</span>
                <span className="tracking-tight">Report Incident</span>
                <Sparkles className="h-6 w-6 text-amber-200 opacity-90 group-hover:rotate-12 transition-transform" />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
                <span>⚡ &lt; 30 Seconds</span>
                <span>•</span>
                <span>🧤 Glove-Friendly</span>
                <span>•</span>
                <span>🤖 AI Analysis</span>
              </div>

              {/* Secondary Actions */}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Link href="/register"
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-card px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-white/20 hover:bg-white/5">
                  Start Free Trial <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/dashboard"
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-card px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-white/20 hover:bg-white/5">
                  View Command Center <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {["OSHA Compliant", "ISO 45001", "SOC 2 Type II", "GDPR Ready", "99.9% Uptime"].map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-400" aria-hidden="true" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Hero dashboard image + floating badges */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-2xl shadow-black/60">
              {/* Dashboard preview mock */}
              <div className="grid-pattern-fine h-[320px] w-full opacity-30 bg-card" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Activity className="mx-auto h-16 w-16 text-amber-400/30" aria-hidden="true" />
                  <p className="mt-2 text-sm text-muted-foreground/60">Dashboard Preview</p>
                  <Link href="/dashboard"
                    className="mt-3 inline-flex items-center gap-2 rounded-xl bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-400 transition-all hover:bg-amber-400/15">
                    Open Live Dashboard <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <FloatBadge icon={AlertTriangle} label="Critical Alerts" value="2 Active" color="text-red-400 bg-red-400/10" className="-top-4 -left-8 animate-float" />
            <FloatBadge icon={ShieldCheck}   label="Safety Score"   value="94%"      color="text-green-400 bg-green-400/10" className="-bottom-4 -left-4" style={{ animationDelay: "1s" }} />
            <FloatBadge icon={Clock}         label="Avg Response"   value="8.4 min"  color="text-blue-400 bg-blue-400/10" className="-top-4 -right-6 animate-float" style={{ animationDelay: "0.5s" }} />
            <FloatBadge icon={Users2}        label="Responders"     value="6 On-Site" color="text-purple-400 bg-purple-400/10" className="-bottom-4 -right-4" />
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-4xl font-black gradient-text">{value}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client logos ────────────────────────────────────────────────── */}
      <section className="py-12 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50">
            Trusted by leading industrial companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {CLIENTS.map((name) => (
              <div key={name} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground/50 transition-colors hover:text-muted-foreground">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-400">Platform Features</p>
            <h2 className="text-4xl font-black text-foreground">Everything your safety team needs</h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed text-muted-foreground">
              Built for industrial environments, compliant with OSHA and ISO 45001, and powered by Google Gemini AI.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <div key={title}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-2xl hover:shadow-black/30">
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-base font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      <section id="customers" className="py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-400">Customer Stories</p>
            <h2 className="text-4xl font-black text-foreground">Trusted by safety professionals</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map(({ name, role, avatar, quote, stars }) => (
              <div key={name}
                className="flex flex-col gap-5 rounded-2xl border border-white/[0.06] bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="flex gap-0.5" aria-label={`${stars} stars`}>
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 text-xs font-bold text-amber-400">
                    {avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{name}</p>
                    <p className="text-[11px] text-muted-foreground">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-400">Pricing</p>
            <h2 className="text-4xl font-black text-foreground">Simple, transparent pricing</h2>
            <p className="mt-4 text-sm text-muted-foreground">30-day free trial on all plans. No credit card required.</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {PRICING.map(({ name, price, per, desc, features, cta, highlight }) => (
              <div key={name} className={`relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-all hover:shadow-2xl ${
                highlight
                  ? "border-amber-400/30 bg-gradient-to-b from-amber-400/5 to-card shadow-xl shadow-amber-400/10"
                  : "border-white/[0.06] bg-card"
              }`}>
                {highlight && (
                  <div className="absolute -top-px left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                )}
                {highlight && (
                  <span className="absolute right-4 top-4 rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-black text-background">
                    POPULAR
                  </span>
                )}
                <h3 className="text-base font-bold text-foreground">{name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
                <div className="my-5">
                  <span className="text-4xl font-black text-foreground">{price}</span>
                  <span className="text-sm text-muted-foreground">{per}</span>
                </div>
                <ul className="mb-6 flex-1 space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register"
                  className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
                    highlight
                      ? "bg-amber-400 text-background hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/25"
                      : "border border-white/10 bg-card text-foreground hover:border-white/20 hover:bg-white/5"
                  }`}>
                  {cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-400/5 to-transparent" aria-hidden="true" />
          <div className="relative">
            <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/10 ring-1 ring-amber-400/20">
              <Shield className="h-8 w-8 text-amber-400" aria-hidden="true" />
            </div>
            <h2 className="text-4xl font-black text-foreground lg:text-5xl">
              Ready to protect your workforce?
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Join 500+ industrial sites using RescueFlowAI to prevent accidents, ensure compliance, and save lives.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 px-8 py-4 text-base font-black text-white shadow-xl shadow-red-600/30 transition-all hover:opacity-95 active:scale-95"
              >
                🚨 Fast Report Incident
              </button>
              <Link href="/dashboard"
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-card px-8 py-4 text-base font-semibold transition-all hover:border-white/20">
                Explore Command Center <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-amber-400" aria-hidden="true" />
              <span className="font-bold"><span className="gradient-text">Rescue</span>FlowAI</span>
            </Link>
            <p className="text-xs text-muted-foreground/50">© 2024 RescueFlowAI · OSHA-Compliant · ISO 45001 · Made in India 🇮🇳</p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Contact"].map((l) => (
                <Link key={l} href="#" className="text-xs text-muted-foreground/60 hover:text-muted-foreground">{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
