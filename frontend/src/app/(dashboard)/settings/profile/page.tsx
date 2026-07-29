"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Building2, MapPin, Shield, Camera, Save, Award, Activity, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RingProgress } from "@/components/ui/ring-progress";
import { MOCK_USER } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const CERT_STATUS: Record<string, string> = {
  active:   "bg-green-500/10 text-green-400 border-green-500/20",
  expiring: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  expired:  "bg-red-500/10 text-red-400 border-red-500/20",
};

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
  const [saved,   setSaved]   = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const initials = form.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-foreground">My Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your account and professional details</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Incidents Reported", value: MOCK_USER.incidentsReported, icon: Activity, color: "text-amber-400 bg-amber-400/10" },
          { label: "Tasks Completed",    value: MOCK_USER.tasksCompleted,    icon: CheckCircle2, color: "text-green-400 bg-green-400/10" },
          { label: "Safety Score",       value: `${MOCK_USER.safetyScore}%`, icon: TrendingUp, color: "text-blue-400 bg-blue-400/10" },
        ].map(({ label, value, icon: Icon, color }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="rounded-2xl border border-white/[0.06] bg-card p-4 text-center"
          >
            <div className={cn("mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg", color)}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="text-2xl font-black text-foreground">{value}</p>
            <p className="text-[11px] text-muted-foreground">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Avatar / identity card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="flex flex-col items-center rounded-2xl border border-white/[0.06] bg-card p-6 text-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-amber-400/30 bg-gradient-to-br from-amber-400/15 to-orange-400/10 text-2xl font-black text-amber-400 shadow-lg shadow-amber-400/10">
              {initials}
            </div>
            <button
              aria-label="Upload avatar photo"
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-card text-muted-foreground shadow-lg transition-all hover:bg-secondary hover:text-foreground"
            >
              <Camera className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <h2 className="text-lg font-bold text-foreground">{form.name}</h2>
          <p className="text-sm text-muted-foreground">{form.role}</p>
          <p className="mt-0.5 text-xs text-muted-foreground/60">{form.company}</p>

          {/* Safety score ring */}
          <div className="my-4">
            <RingProgress
              value={MOCK_USER.safetyScore}
              size={72}
              strokeWidth={5}
              label={<span className="text-base font-black text-green-400">{MOCK_USER.safetyScore}</span>}
            />
            <p className="mt-1 text-[10px] text-muted-foreground">Safety Score</p>
          </div>

          <div className="w-full space-y-2">
            {[
              { label: "Department",  value: form.department },
              { label: "Member since", value: new Date(MOCK_USER.joinedAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between rounded-lg bg-secondary/30 px-3 py-2 text-xs">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-1.5 rounded-lg border border-amber-400/20 bg-amber-400/8 px-3 py-1.5">
            <Shield className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
            <span className="text-xs font-semibold text-amber-400">{form.role}</span>
          </div>
        </motion.div>

        {/* Edit form */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-white/[0.06] bg-card p-6 lg:col-span-2">
          <h2 className="mb-5 text-sm font-bold text-foreground">Personal Information</h2>
          <form onSubmit={handleSave} id="profile-form" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input id="profile-name"  label="Full Name"         value={form.name}  onChange={set("name")}
                leftIcon={<User className="h-4 w-4" />} required />
              <Input id="profile-email" type="email" label="Email Address" value={form.email} onChange={set("email")}
                leftIcon={<Mail className="h-4 w-4" />} required />
              <Input id="profile-phone" label="Phone Number" value={form.phone} onChange={set("phone")}
                leftIcon={<Phone className="h-4 w-4" />} />
              <Input id="profile-role"  label="Job Title / Role"  value={form.role}  onChange={set("role")}
                leftIcon={<Shield className="h-4 w-4" />} />
              <Input id="profile-company"    label="Company"    value={form.company}    onChange={set("company")}
                leftIcon={<Building2 className="h-4 w-4" />} />
              <Input id="profile-department" label="Department" value={form.department} onChange={set("department")}
                leftIcon={<Building2 className="h-4 w-4" />} />
            </div>
            <Input id="profile-location" label="Plant / Site Location" value={form.location} onChange={set("location")}
              leftIcon={<MapPin className="h-4 w-4" />} />

            <div className="flex items-center justify-between pt-2">
              {saved && (
                <p className="flex items-center gap-1.5 text-sm font-medium text-green-400">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Profile saved successfully
                </p>
              )}
              <div className="ml-auto">
                <Button id="profile-save-btn" type="submit" isLoading={loading}>
                  <Save className="h-4 w-4" aria-hidden="true" />
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Certifications */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-2xl border border-white/[0.06] bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Award className="h-4 w-4 text-amber-400" aria-hidden="true" />
          <h2 className="text-sm font-bold text-foreground">Certifications & Licenses</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_USER.certifications.map((cert) => (
            <div key={cert.name} className={cn(
              "rounded-xl border p-3 transition-colors hover:bg-white/[0.02]",
              CERT_STATUS[cert.status]
            )}>
              <p className="text-xs font-semibold text-foreground leading-tight">{cert.name}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">{cert.issuer} · {cert.year}</p>
              <span className={cn("mt-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase", CERT_STATUS[cert.status])}>
                {cert.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Activity feed */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="rounded-2xl border border-white/[0.06] bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-sm font-bold text-foreground">Recent Activity</h2>
        </div>
        <div className="space-y-0.5">
          {MOCK_USER.activityFeed.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.02]">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold text-foreground">{item.action} </span>
                <span className="text-xs text-muted-foreground">— {item.detail}</span>
              </div>
              <span className="shrink-0 text-[10px] text-muted-foreground/60">{item.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
