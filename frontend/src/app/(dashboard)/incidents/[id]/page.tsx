"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, MapPin, Brain, Users, AlertTriangle, Radio,
  Camera, Video, Mic, FileText, Download, Check, Clock,
  Volume2, Image as ImageIcon
} from "lucide-react";
import { MOCK_INCIDENTS } from "@/lib/mock-data";
import { useIncidents, type StoredIncident } from "@/hooks/use-incidents";
import { cn } from "@/lib/utils";

// ── Static seeded data (mirrors incidents list page) ─────────────────────────
function toStored(m: typeof MOCK_INCIDENTS[0], idx: number): StoredIncident {
  const statusMap: Record<string, StoredIncident["status"]> = {
    active: "pending", dispatched: "dispatched", resolved: "resolved", pending: "pending",
  };
  return {
    id: m.id, title: m.title,
    severity: m.severity as StoredIncident["severity"],
    status:   statusMap[m.status] ?? "pending",
    location: m.location,
    description: m.description,
    aiSummary:   m.aiSummary,
    recommendation: "Follow standard safety procedures.",
    hazards: [],
    teams:   m.responders ?? [],
    confidence: m.safetyScore ?? 88,
    reportedAt: m.reportedAt,
    method: "text",
  };
}

const SEVERITY_COLOR: Record<StoredIncident["severity"], string> = {
  critical: "bg-red-600",
  high:     "bg-orange-500",
  moderate: "bg-amber-500",
  low:      "bg-emerald-600",
};

const LIFECYCLE_STEPS = ["Reported", "AI Analysed", "Assigned", "In Progress", "Resolved"];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ── Download helper ─────────────────────────────────────────────────────────
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a   = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function IncidentDetailPage() {
  const params     = useParams();
  const incidentId = (params?.["id"] as string) ?? "";
  const { incidents: live } = useIncidents();

  // Merge live + seeded
  const all = useMemo<StoredIncident[]>(() => {
    const liveIds = new Set(live.map(l => l.id));
    return [...live, ...MOCK_INCIDENTS.map((m, i) => toStored(m, i)).filter(s => !liveIds.has(s.id))];
  }, [live]);

  const incident = all.find(i => i.id === incidentId) ?? all[0];
  const isLive   = live.some(l => l.id === incident?.id);

  // Derive media object URL for the blob (must be done client-side)
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  useEffect(() => {
    let url: string | null = null;
    if (incident?.mediaBlob) {
      url = URL.createObjectURL(incident.mediaBlob);
      setMediaUrl(url);
    } else {
      setMediaUrl(null);
    }
    return () => { if (url) URL.revokeObjectURL(url); };
  }, [incident?.id, incident?.mediaBlob]);

  if (!incident) return null;

  const currentStep =
    incident.status === "resolved"    ? 5 :
    incident.status === "dispatched"  ? 4 :
    incident.status === "ai_processing" ? 2 : 1;

  const mediaMime  = incident.mediaBlob?.type ?? "";
  const isImage    = mediaMime.startsWith("image/");
  const isVideo    = mediaMime.startsWith("video/");
  const isAudio    = mediaMime.startsWith("audio/");

  function handleDownload() {
    if (!incident.mediaBlob) return;
    const ext  = mediaMime.split("/")[1] || "bin";
    downloadBlob(incident.mediaBlob, `evidence_${incident.id}.${ext}`);
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/incidents"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-slate-400">{incident.id}</span>
              <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-black uppercase text-white", SEVERITY_COLOR[incident.severity])}>
                {incident.severity}
              </span>
              {isLive && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-black text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" /> Live
                </span>
              )}
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">{incident.title}</h1>
          </div>
        </div>

        <Link href="/dispatch"
          className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-all shadow-xs">
          <Radio className="h-3.5 w-3.5" />
          <span>Manage Response</span>
        </Link>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── LEFT: Evidence + AI Analysis ── */}
        <div className="lg:col-span-7 space-y-6">

          {/* Evidence Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Uploaded Evidence</h3>
              {incident.mediaBlob && (
                <button onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-700 transition-all">
                  <Download className="h-3.5 w-3.5" />
                  Download Proof
                </button>
              )}
            </div>

            {/* ── Real media from IDB ── */}
            {mediaUrl && isImage && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Camera className="h-4 w-4 text-amber-500" /> Photo Evidence
                </div>
                <img src={mediaUrl} alt="Incident evidence" className="w-full rounded-xl border border-slate-200 object-cover max-h-64" />
              </div>
            )}

            {mediaUrl && isVideo && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Video className="h-4 w-4 text-blue-500" /> Video Evidence
                </div>
                <video src={mediaUrl} controls className="w-full rounded-xl border border-slate-200 max-h-64 bg-black" />
              </div>
            )}

            {mediaUrl && isAudio && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Mic className="h-4 w-4 text-red-500" /> Voice Recording
                </div>
                <audio src={mediaUrl} controls className="w-full rounded-xl" />
              </div>
            )}

            {/* ── Fallback for seeded / text incidents ── */}
            {!mediaUrl && (
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center space-y-2">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-amber-500 shadow-xs">
                    <Camera className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">Photo Evidence</p>
                  <p className="text-[10px] text-slate-400 italic">Not available for historical records</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center space-y-2">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-blue-600 shadow-xs">
                    <Video className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">Video Evidence</p>
                  <p className="text-[10px] text-slate-400 italic">Not available for historical records</p>
                </div>
              </div>
            )}

            {/* Reporter Description */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700 block">Reporter Description</span>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                {incident.description}
              </p>
            </div>

            {/* Method badge */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Reported via:</span>
              <span className="font-bold text-slate-800 capitalize flex items-center gap-1">
                {incident.method === "photo" && <Camera className="h-3.5 w-3.5 text-amber-500" />}
                {incident.method === "video" && <Video className="h-3.5 w-3.5 text-blue-500" />}
                {incident.method === "voice" && <Mic className="h-3.5 w-3.5 text-red-500" />}
                {incident.method === "text"  && <FileText className="h-3.5 w-3.5 text-slate-400" />}
                {incident.method}
              </span>
            </div>
          </div>

          {/* AI Analysis Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-blue-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Gemini AI Analysis</h3>
              </div>
              <span className="text-xs font-bold text-blue-600">{incident.confidence}% Confidence</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-slate-500 block font-medium">Severity</span>
                <span className={cn("font-bold capitalize", {
                  "text-red-600":    incident.severity === "critical",
                  "text-orange-600": incident.severity === "high",
                  "text-amber-600":  incident.severity === "moderate",
                  "text-emerald-600":incident.severity === "low",
                })}>{incident.severity}</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-slate-500 block font-medium">Status</span>
                <span className="font-bold text-slate-900 capitalize">{incident.status.replace("_", " ")}</span>
              </div>
            </div>

            <div className="rounded-xl bg-blue-50/70 border border-blue-200/70 p-3.5 space-y-1">
              <span className="text-xs font-bold text-blue-900 block">AI Summary</span>
              <p className="text-xs text-blue-950 leading-relaxed">{incident.aiSummary}</p>
            </div>

            {incident.recommendation && (
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5 space-y-1">
                <span className="text-xs font-bold text-amber-900 block uppercase">Recommendation</span>
                <p className="text-xs text-amber-950 leading-relaxed">{incident.recommendation}</p>
              </div>
            )}

            {incident.hazards?.length > 0 && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1.5">
                  <span className="font-bold text-slate-700 block">Identified Hazards</span>
                  <ul className="space-y-1 text-slate-600">
                    {incident.hazards.map(h => (
                      <li key={h} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />{h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-orange-50 border border-orange-200 p-2.5 text-center">
                  <span className="text-base font-extrabold text-orange-700">3 Workers</span>
                  <span className="block text-[10px] text-orange-600">Immediate Evacuation Needed</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Response + Info ── */}
        <div className="lg:col-span-5 space-y-6">

          {/* Response Status */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">Response Status</h3>

            {incident.teams?.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Assigned Teams</span>
                <div className="space-y-1.5">
                  {incident.teams.map(team => (
                    <div key={team} className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 border border-slate-200/80 text-xs font-semibold text-slate-800">
                      <div className="flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 text-amber-500" />{team}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Dispatched
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

          {/* Incident Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">Incident Information</h3>
            <div className="space-y-2 text-slate-700 font-medium">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Location</span>
                <span className="font-bold text-slate-900">{incident.location}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Date</span>
                <span className="font-bold text-slate-900">{fmtDate(incident.reportedAt)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Time</span>
                <span className="font-bold text-slate-900">{fmtTime(incident.reportedAt)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Method</span>
                <span className="font-bold text-slate-900 capitalize">{incident.method}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">AI Confidence</span>
                <span className="font-bold text-blue-600">{incident.confidence}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lifecycle */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Incident Lifecycle</h3>
        <div className="flex items-center justify-between">
          {LIFECYCLE_STEPS.map((title, idx) => {
            const step = idx + 1;
            const isDone    = currentStep > step;
            const isCurrent = currentStep === step;
            return (
              <React.Fragment key={title}>
                <div className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold transition-all",
                    isDone    ? "bg-emerald-600 text-white" :
                    isCurrent ? "bg-amber-500 text-slate-950 ring-4 ring-amber-100" :
                                "bg-slate-100 text-slate-400 border border-slate-200"
                  )}>
                    {isDone ? <Check className="h-4 w-4 stroke-[3]" /> : step}
                  </div>
                  <span className={cn("text-xs font-bold",
                    isDone ? "text-emerald-700" : isCurrent ? "text-amber-600" : "text-slate-400"
                  )}>{title}</span>
                </div>
                {idx < LIFECYCLE_STEPS.length - 1 && (
                  <div className={cn("h-1 flex-1 mx-3 rounded-full transition-all",
                    currentStep > idx + 1 ? "bg-emerald-500" : "bg-slate-100"
                  )} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
