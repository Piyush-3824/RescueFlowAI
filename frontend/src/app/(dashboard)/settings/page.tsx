"use client";

import { useState } from "react";
import { Bell, Shield, Key, Database } from "lucide-react";

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts]     = useState(true);

  return (
    <div className="space-y-6 pb-10 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">System Settings</h1>
        <p className="text-xs text-slate-500">Configure notifications, security protocols and integration endpoints.</p>
      </div>

      {/* Notifications Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Bell className="h-4 w-4 text-amber-500" />
          <h2 className="text-sm font-extrabold text-slate-900">Notification Alerts</h2>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <p className="font-bold text-slate-900">Critical Incident SMS Dispatch</p>
              <p className="text-slate-500">Send high-priority SMS alerts to safety response leaders immediately.</p>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-bold text-slate-900">Daily OSHA Compliance Summary</p>
              <p className="text-slate-500">Receive an email digest of recorded workplace incidents every evening.</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Integrations Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Database className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-extrabold text-slate-900">AI &amp; System Integrations</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
            <span className="font-bold text-slate-900">Google Gemini AI Engine</span>
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">Connected</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
            <span className="font-bold text-slate-900">Supabase Security Log</span>
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">Connected</span>
          </div>
        </div>
      </div>

    </div>
  );
}
