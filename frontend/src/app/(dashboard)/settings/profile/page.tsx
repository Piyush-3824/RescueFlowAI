"use client";

import { useState } from "react";
import { User, Mail, Phone, Building2, MapPin, Shield, Camera, Save, Award, Activity, CheckCircle2 } from "lucide-react";
import { MOCK_USER } from "@/lib/mock-data";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name:       MOCK_USER.name,
    email:      MOCK_USER.email,
    phone:      MOCK_USER.phone,
    company:    MOCK_USER.company,
    department: MOCK_USER.department,
    location:   MOCK_USER.location,
    role:       MOCK_USER.role,
  });
  const [saved, setSaved] = useState(false);

  const initials = form.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">User Profile</h1>
        <p className="text-xs text-slate-500">Manage your account information and professional safety credentials.</p>
      </div>

      {/* Profile Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900 text-amber-400 font-extrabold text-2xl shadow-md">
            {initials}
          </div>
          <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-slate-950 shadow-xs hover:bg-amber-400">
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">{form.name}</h2>
            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
              Verified Safety Officer
            </span>
          </div>
          <p className="text-xs text-slate-500">{form.role} • {form.department}</p>
          <p className="text-xs font-semibold text-slate-700">📍 {form.company} — {form.location}</p>
        </div>
      </div>

      {/* Information Form Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
          Personal Information
        </h3>

        <form onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Full Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-bold text-slate-900 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Work Email</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-bold text-slate-900 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Phone Number</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-bold text-slate-900 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Department</label>
              <input
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-bold text-slate-900 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-all shadow-xs"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Save Changes</span>
            </button>
            {saved && <span className="text-xs font-bold text-emerald-600">Saved successfully!</span>}
          </div>
        </form>
      </div>

    </div>
  );
}
