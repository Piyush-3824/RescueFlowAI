"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, MapPin, User, Clock, Shield, Brain, Phone, Users,
  AlertTriangle, CheckCircle2, Radio, ChevronRight, FileText,
  Volume2, Video, Camera, Calendar, Building2, Check
} from "lucide-react";
import { MOCK_INCIDENTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const LIFECYCLE_STEPS = [
  { id: 1, title: "Reported" },
  { id: 2, title: "AI Analysed" },
  { id: 3, title: "Assigned" },
  { id: 4, title: "In Progress" },
  { id: 5, title: "Resolved" },
];

export default function IncidentDetailPage() {
  const params = useParams();
  const incidentId = (params?.["id"] as string) ?? "INC-2024-001";
  const incident = MOCK_INCIDENTS.find((i) => i.id === incidentId) ?? MOCK_INCIDENTS[0];
  const [currentStep, setCurrentStep] = useState(4); // "In Progress"

  return (
    <div className="space-y-6 pb-10">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/incidents"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-400">{incident.id}</span>
              <span className="rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase text-white">
                {incident.severity}
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">{incident.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dispatch"
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-all shadow-xs"
          >
            <Radio className="h-3.5 w-3.5" />
            <span>Manage Response</span>
          </Link>
        </div>
      </div>

      {/* Clean Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* =================================================================== */}
        {/* LEFT COLUMN (7 Cols): Uploaded Evidence & AI Analysis              */}
        {/* =================================================================== */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Uploaded Evidence Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
              Uploaded Evidence
            </h3>

            <div className="space-y-4">
              {/* Media Preview (Photo / Video) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center space-y-2">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-amber-500 shadow-xs">
                    <Camera className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">Photo Evidence</p>
                  <p className="text-[10px] text-slate-500">site_capture_00912.jpg (3.4 MB)</p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center space-y-2">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-blue-600 shadow-xs">
                    <Video className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">Video Evidence</p>
                  <p className="text-[10px] text-slate-500">clip_zone_b.mp4 (14.2 MB)</p>
                </div>
              </div>

              {/* Voice Transcript */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Volume2 className="h-4 w-4 text-amber-500" />
                  <span>Voice Transcript</span>
                </div>
                <p className="text-xs text-slate-600 italic">
                  &ldquo;Heavy smoke detected near welding rig B. Combustible chemical canisters located within 3 meters.&rdquo;
                </p>
              </div>

              {/* Reporter Description */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 block">Reporter Description</span>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {incident.description}
                </p>
              </div>
            </div>
          </div>

          {/* AI Analysis Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-blue-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Gemini AI Analysis</h3>
              </div>
              <span className="text-xs font-bold text-blue-600">94% Confidence</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-slate-500 block font-medium">Incident Type</span>
                <span className="font-bold text-slate-900">{incident.type}</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-slate-500 block font-medium">Severity</span>
                <span className="font-bold text-red-600">{incident.severity}</span>
              </div>
            </div>

            {/* AI Summary */}
            <div className="rounded-xl bg-blue-50/70 border border-blue-200/70 p-3.5 space-y-1">
              <span className="text-xs font-bold text-blue-900 block">AI Summary</span>
              <p className="text-xs text-blue-950 leading-relaxed">
                Critical thermal anomaly and chemical hazard identified. High probability of secondary pressure reaction if containment is delayed.
              </p>
            </div>

            {/* Hazards & Workers at Risk */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 block">Identified Hazards</span>
                <ul className="space-y-1 text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    Open Flame &amp; Thermal Risk
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    Vapor Dispersion
                  </li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 block">Workers at Risk</span>
                <div className="rounded-xl bg-orange-50 border border-orange-200 p-2.5 text-center">
                  <span className="text-base font-extrabold text-orange-700">3 Workers</span>
                  <span className="block text-[10px] text-orange-600">Immediate Evacuation Needed</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN (5 Cols): Response Status & Incident Information       */}
        {/* =================================================================== */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Response Status Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
              Response Status
            </h3>

            {/* Assigned Teams */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Assigned Teams</span>
              <div className="space-y-1.5">
                {["Safety Officer", "Fire Safety Team", "Supervisor"].map((team) => (
                  <div key={team} className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 border border-slate-200/80 text-xs font-semibold text-slate-800">
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-amber-500" />
                      <span>{team}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Dispatched
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Alert & Notification Status */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/80">
                <span className="text-slate-500 block font-medium text-[10px]">Voice Alert</span>
                <span className="font-bold text-emerald-600">Broadcast Sent</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/80">
                <span className="text-slate-500 block font-medium text-[10px]">Notifications</span>
                <span className="font-bold text-blue-600">SMS &amp; Push Active</span>
              </div>
            </div>
          </div>

          {/* Incident Information Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
              Incident Information
            </h3>

            <div className="space-y-2 text-slate-700 font-medium">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Site</span>
                <span className="font-bold text-slate-900">Manufacturing Plant 01</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Department</span>
                <span className="font-bold text-slate-900">{incident.department}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Location</span>
                <span className="font-bold text-slate-900">{incident.location}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Date</span>
                <span className="font-bold text-slate-900">Jul 29, 2026</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Time</span>
                <span className="font-bold text-slate-900">12:05 PM</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Reporter</span>
                <span className="font-bold text-slate-900">{incident.reportedBy}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM: Visual Incident Lifecycle */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Incident Lifecycle</h3>
        
        <div className="flex items-center justify-between">
          {LIFECYCLE_STEPS.map((s, idx) => {
            const isDone = currentStep > s.id;
            const isCurrent = currentStep === s.id;
            return (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold transition-all",
                      isDone
                        ? "bg-emerald-600 text-white"
                        : isCurrent
                        ? "bg-amber-500 text-slate-950 ring-4 ring-amber-100"
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                    )}
                  >
                    {isDone ? <Check className="h-4 w-4 stroke-[3]" /> : s.id}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-bold",
                      isDone ? "text-emerald-700" : isCurrent ? "text-amber-600" : "text-slate-400"
                    )}
                  >
                    {s.title}
                  </span>
                </div>

                {idx < LIFECYCLE_STEPS.length - 1 && (
                  <div
                    className={cn(
                      "h-1 flex-1 mx-3 rounded-full transition-all",
                      currentStep > idx + 1 ? "bg-emerald-500" : "bg-slate-100"
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
