"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Shield, Wifi, Moon, Globe, ChevronRight, Key, Database, Trash2, AlertOctagon, User, Settings as SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Toggle switch ───────────────────────────────────────────────────────── */
function Toggle({ id, checked, onChange }: { id: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 focus-visible:outline-none",
        checked ? "bg-amber-400" : "bg-secondary"
      )}
    >
      <span className={cn(
        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-background shadow-lg ring-0 transition duration-200",
        checked ? "translate-x-4" : "translate-x-0"
      )} />
    </button>
  );
}

/* ── Setting row ─────────────────────────────────────────────────────────── */
function SettingRow({ id, label, description, checked, onChange }: {
  id: string; label: string; description: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Toggle id={id} checked={checked} onChange={onChange} />
    </div>
  );
}

/* ── Section card ────────────────────────────────────────────────────────── */
function Section({ id, icon: Icon, title, children, delay = 0 }: {
  id: string; icon: React.ElementType; title: string; children: React.ReactNode; delay?: number;
}) {
  return (
    <motion.div id={id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-white/[0.06] bg-card p-5"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/10">
          <Icon className="h-4 w-4 text-amber-400" aria-hidden="true" />
        </div>
        <h2 className="text-sm font-bold text-foreground">{title}</h2>
      </div>
      <div className="divide-y divide-white/[0.05]">{children}</div>
    </motion.div>
  );
}

const INTEGRATIONS = [
  { name: "Supabase Database",        status: "connected",       color: "text-green-400 bg-green-400/10 border-green-400/20" },
  { name: "Google Gemini AI",         status: "connected",       color: "text-green-400 bg-green-400/10 border-green-400/20" },
  { name: "Firebase Cloud Messaging", status: "connected",       color: "text-green-400 bg-green-400/10 border-green-400/20" },
  { name: "Twilio Voice API",         status: "demo mode",       color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  { name: "Google Maps",              status: "connected",       color: "text-green-400 bg-green-400/10 border-green-400/20" },
  { name: "OpenAI Whisper",           status: "not configured",  color: "text-red-400 bg-red-400/10 border-red-400/20"       },
];

const SETTING_TABS = [
  { id: "notifications", label: "Notifications", icon: Bell     },
  { id: "security",      label: "Security",      icon: Shield   },
  { id: "appearance",    label: "Appearance",    icon: Moon     },
  { id: "integrations",  label: "Integrations",  icon: Wifi     },
  { id: "danger",        label: "Danger Zone",   icon: AlertOctagon },
] as const;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<typeof SETTING_TABS[number]["id"]>("notifications");
  const [notifs, setNotifs] = useState({
    critical:  true,  high: true, resolved: false,
    email:     true,  sms:  false, push:   true,
  });
  const [sec, setSec] = useState({
    twoFactor: false, sessionLog: true, apiAccess: true,
  });
  const [pref, setPref] = useState({
    darkMode: true, compactView: false, autoRefresh: true,
  });

  const togN = (k: keyof typeof notifs) => (v: boolean) => setNotifs((p) => ({ ...p, [k]: v }));
  const togS = (k: keyof typeof sec)    => (v: boolean) => setSec((p)    => ({ ...p, [k]: v }));
  const togP = (k: keyof typeof pref)   => (v: boolean) => setPref((p)   => ({ ...p, [k]: v }));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure your workspace and preferences</p>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Settings sidebar nav */}
        <nav className="flex shrink-0 flex-row gap-1 overflow-x-auto lg:w-48 lg:flex-col" aria-label="Settings sections">
          {SETTING_TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all whitespace-nowrap",
                activeTab === id
                  ? id === "danger"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-amber-400/10 text-amber-400"
                  : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>

        {/* Settings content */}
        <div className="min-w-0 flex-1 space-y-5">
          {/* Notifications */}
          {activeTab === "notifications" && (
            <Section id="section-notifications" icon={Bell} title="Notification Preferences" delay={0}>
              <SettingRow id="notif-critical"  label="Critical Incidents"        description="Immediate alert for severity: critical"         checked={notifs.critical}  onChange={togN("critical")}  />
              <SettingRow id="notif-high"      label="High Priority Incidents"   description="Alert for severity: high"                       checked={notifs.high}      onChange={togN("high")}      />
              <SettingRow id="notif-resolved"  label="Resolved Notifications"    description="Notify when incidents are marked resolved"      checked={notifs.resolved}  onChange={togN("resolved")}  />
              <SettingRow id="notif-email"     label="Email Notifications"       description="Receive alerts via work email"                  checked={notifs.email}     onChange={togN("email")}     />
              <SettingRow id="notif-sms"       label="SMS Alerts"                description="Critical alerts via SMS (charges may apply)"    checked={notifs.sms}       onChange={togN("sms")}       />
              <SettingRow id="notif-push"      label="Push Notifications"        description="Browser / mobile push notifications"            checked={notifs.push}      onChange={togN("push")}      />
            </Section>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <Section id="section-security" icon={Shield} title="Security" delay={0}>
              <SettingRow id="sec-2fa"     label="Two-Factor Authentication" description="Add an extra layer of account security"        checked={sec.twoFactor}  onChange={togS("twoFactor")}  />
              <SettingRow id="sec-session" label="Session Activity Logging"   description="Track all login sessions and API calls"        checked={sec.sessionLog} onChange={togS("sessionLog")} />
              <SettingRow id="sec-api"     label="API Access"                 description="Allow external systems to connect via API key" checked={sec.apiAccess}  onChange={togS("apiAccess")}  />
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Change Password</p>
                  <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                </div>
                <button className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:underline">
                  Update <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Active Sessions</p>
                  <p className="text-xs text-muted-foreground">2 devices currently signed in</p>
                </div>
                <button className="text-xs font-semibold text-red-400 hover:underline">Revoke All</button>
              </div>
              {/* API Key section */}
              <div className="py-3">
                <p className="mb-2 text-sm font-medium text-foreground">API Key</p>
                <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-secondary/30 px-3 py-2">
                  <Key className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="flex-1 font-mono-id text-xs text-muted-foreground tracking-widest">rfa_sk_•••••••••••••••••••••••••</span>
                  <button className="text-[10px] font-semibold text-amber-400 hover:underline">Reveal</button>
                  <button className="text-[10px] font-semibold text-muted-foreground hover:text-foreground">Copy</button>
                </div>
              </div>
            </Section>
          )}

          {/* Appearance */}
          {activeTab === "appearance" && (
            <Section id="section-appearance" icon={Moon} title="Appearance & Preferences" delay={0}>
              <SettingRow id="pref-dark"    label="Dark Mode"         description="Use dark interface (recommended for control rooms)" checked={pref.darkMode}    onChange={togP("darkMode")}    />
              <SettingRow id="pref-compact" label="Compact View"      description="Reduce spacing for high-density dashboards"        checked={pref.compactView} onChange={togP("compactView")} />
              <SettingRow id="pref-refresh" label="Auto-Refresh Data" description="Refresh dashboard every 30 seconds"               checked={pref.autoRefresh} onChange={togP("autoRefresh")} />
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Language</p>
                  <p className="text-xs text-muted-foreground">Interface language</p>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Globe className="h-3.5 w-3.5" aria-hidden="true" /> English (India)
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Date Format</p>
                  <p className="text-xs text-muted-foreground">How dates are displayed</p>
                </div>
                <span className="text-xs text-muted-foreground">DD/MM/YYYY</span>
              </div>
            </Section>
          )}

          {/* Integrations */}
          {activeTab === "integrations" && (
            <Section id="section-integrations" icon={Wifi} title="Integrations" delay={0}>
              {INTEGRATIONS.map(({ name, status, color }) => (
                <div key={name} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2.5">
                    <Database className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("rounded-full border px-2.5 py-0.5 text-[10px] font-semibold capitalize", color)}>
                      {status}
                    </span>
                    {status !== "connected" && (
                      <button className="text-[10px] font-semibold text-amber-400 hover:underline">Configure</button>
                    )}
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* Danger Zone */}
          {activeTab === "danger" && (
            <motion.div id="section-danger" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-400/10">
                  <AlertOctagon className="h-4 w-4 text-red-400" aria-hidden="true" />
                </div>
                <h2 className="text-sm font-bold text-red-400">Danger Zone</h2>
              </div>
              <div className="divide-y divide-white/[0.05]">
                {[
                  { label: "Export All Data",  desc: "Download all your incident reports and data as a CSV archive", action: "Export",         style: "text-blue-400 border-blue-400/30 hover:bg-blue-400/5"  },
                  { label: "Reset Dashboard",  desc: "Reset all dashboard widgets and layout to factory defaults",   action: "Reset",          style: "text-amber-400 border-amber-400/30 hover:bg-amber-400/5" },
                  { label: "Delete Account",   desc: "Permanently delete your account and all associated data",      action: "Delete Account", style: "text-red-400 border-red-400/30 hover:bg-red-400/5"       },
                ].map(({ label, desc, action, style }) => (
                  <div key={label} className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <button className={cn("shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold transition-all", style)}>
                      {action}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
