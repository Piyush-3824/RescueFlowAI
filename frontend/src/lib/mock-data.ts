/**
 * Shared static mock data for RescueFlowAI UI development.
 * Replace with real API calls when backend is ready.
 */

export type IncidentSeverity = "critical" | "high" | "moderate" | "low";
export type IncidentStatus   = "active" | "dispatched" | "resolved" | "pending";
export type IncidentType     =
  | "fall" | "chemical" | "fire" | "electrical" | "machinery"
  | "medical" | "structural" | "environmental" | "gas";

export interface MockIncident {
  id:          string;
  title:       string;
  type:        IncidentType;
  severity:    IncidentSeverity;
  status:      IncidentStatus;
  location:    string;
  department:  string;
  reportedBy:  string;
  reportedAt:  string;
  resolvedAt:  string | null;
  description: string;
  aiSummary:   string;
  responders:  string[];
  safetyScore: number;
  media:       string[];
  coordinates: { lat: number; lng: number };
}

export const MOCK_INCIDENTS: MockIncident[] = [
  {
    id: "INC-2024-001",
    title: "Chemical Spill – Sector D Storage Bay",
    type: "chemical",
    severity: "critical",
    status: "active",
    location: "Sector D, Bay 14",
    department: "Chemical Processing",
    reportedBy: "Rahul Sharma",
    reportedAt: "2024-07-28T06:12:00Z",
    resolvedAt: null,
    description: "Worker reported leakage of corrosive solvent from storage drum. Estimated 50L spilled. Area evacuated immediately. Three workers showing signs of skin irritation.",
    aiSummary: "High-priority chemical spill. Recommended immediate containment, HazMat team dispatch, and respiratory PPE for all personnel within 100m. Classify as OSHA recordable — potential OSHA 300 log entry required within 8 hours.",
    responders: ["HazMat Team Alpha", "Plant Safety Officer", "Medical Unit 3"],
    safetyScore: 62,
    media: [],
    coordinates: { lat: 22.8046, lng: 86.2029 },
  },
  {
    id: "INC-2024-002",
    title: "Worker Fall – Scaffolding Level 3",
    type: "fall",
    severity: "high",
    status: "dispatched",
    location: "Block B, Scaffolding L3",
    department: "Construction",
    reportedBy: "Anil Kumar",
    reportedAt: "2024-07-28T07:45:00Z",
    resolvedAt: null,
    description: "Worker fell from scaffolding at approximately 5m height. Wearing harness but clip failure suspected. Worker is conscious but reporting back pain.",
    aiSummary: "Trauma risk high. Immediate medical response dispatched. Engineering inspection of scaffolding required before resuming work. Possible spinal precautions needed during transport.",
    responders: ["Emergency Medical Unit", "Site Engineer"],
    safetyScore: 71,
    media: [],
    coordinates: { lat: 22.8102, lng: 86.2011 },
  },
  {
    id: "INC-2024-003",
    title: "Electrical Panel Overload – Generator Room",
    type: "electrical",
    severity: "high",
    status: "dispatched",
    location: "Generator Room G1",
    department: "Electrical",
    reportedBy: "Priya Mehta",
    reportedAt: "2024-07-27T14:30:00Z",
    resolvedAt: null,
    description: "Circuit breaker tripped repeatedly. Smoke detected from panel. Area sealed off. Suspected overloaded circuit on primary generator bus.",
    aiSummary: "Electrical fault with fire risk. Disconnect mains, evacuate 50m radius, dispatch certified electrician and fire unit. Do not re-energize without full inspection.",
    responders: ["Electrical Safety Team", "Fire Safety Unit"],
    safetyScore: 78,
    media: [],
    coordinates: { lat: 22.8073, lng: 86.2044 },
  },
  {
    id: "INC-2024-004",
    title: "Machinery Entanglement – Assembly Line 7",
    type: "machinery",
    severity: "moderate",
    status: "resolved",
    location: "Assembly Line 7",
    department: "Manufacturing",
    reportedBy: "Vikram Singh",
    reportedAt: "2024-07-26T09:10:00Z",
    resolvedAt: "2024-07-26T10:45:00Z",
    description: "Worker's sleeve caught in conveyor belt. Machinery stopped immediately via emergency stop. Minor abrasion to forearm, no fracture.",
    aiSummary: "Lockout/Tagout procedure not followed. Worker safe. Recommend mandatory LOTO retraining for department. Update SOPs for sleeve/clothing requirements near rotating equipment.",
    responders: ["First Aid Team", "HSE Officer"],
    safetyScore: 84,
    media: [],
    coordinates: { lat: 22.8088, lng: 86.2037 },
  },
  {
    id: "INC-2024-005",
    title: "Heat Exhaustion – Open Yard Zone C",
    type: "medical",
    severity: "moderate",
    status: "resolved",
    location: "Open Yard Zone C",
    department: "Logistics",
    reportedBy: "Deepa Nair",
    reportedAt: "2024-07-25T13:20:00Z",
    resolvedAt: "2024-07-25T14:00:00Z",
    description: "Worker collapsed due to heat exposure. Temperature recorded at 42°C ambient. Prompt hydration and shade provided. Worker recovered after 30 minutes rest.",
    aiSummary: "Heat illness incident. Recommend mandatory heat safety protocol during peak hours (12-3pm). Increase hydration stations. Implement buddy system for outdoor workers during heat advisories.",
    responders: ["Medical Team", "HSE Manager"],
    safetyScore: 88,
    media: [],
    coordinates: { lat: 22.8059, lng: 86.2021 },
  },
  {
    id: "INC-2024-006",
    title: "Minor Fire – Paint Booth 2",
    type: "fire",
    severity: "low",
    status: "resolved",
    location: "Paint Booth 2",
    department: "Finishing",
    reportedBy: "Sanjay Gupta",
    reportedAt: "2024-07-24T16:05:00Z",
    resolvedAt: "2024-07-24T16:25:00Z",
    description: "Small fire ignited from paint fumes near exhaust fan. Extinguished with portable CO2 extinguisher within 3 minutes. No injuries. Fire suppression system activated.",
    aiSummary: "Fire risk from inadequate ventilation. Paint booth ventilation system requires immediate inspection. Fire extinguisher placement appropriate — recommend refresher training for all paint booth staff.",
    responders: ["Fire Warden", "Safety Officer"],
    safetyScore: 91,
    media: [],
    coordinates: { lat: 22.8065, lng: 86.2008 },
  },
  {
    id: "INC-2024-007",
    title: "Gas Leak – Pipeline Section 4B",
    type: "gas",
    severity: "critical",
    status: "pending",
    location: "Pipeline Section 4B",
    department: "Oil & Gas Processing",
    reportedBy: "Mohammed Al-Rashid",
    reportedAt: "2024-07-28T09:30:00Z",
    resolvedAt: null,
    description: "H2S gas detector alarm triggered in Pipeline Section 4B. Concentration measured at 15 ppm. Evacuation initiated. Wind direction favors eastern zones.",
    aiSummary: "H2S gas leak — highly toxic. Immediate evacuation of all personnel within 200m. Deploy SCBA-equipped response teams only. Notify emergency services and activate site emergency plan.",
    responders: ["Emergency Response Team", "HSE Director", "Local Fire Brigade"],
    safetyScore: 55,
    media: [],
    coordinates: { lat: 22.8091, lng: 86.2053 },
  },
  {
    id: "INC-2024-008",
    title: "Structural Crack – Warehouse Roof",
    type: "structural",
    severity: "high",
    status: "pending",
    location: "Warehouse B, North Section",
    department: "Maintenance",
    reportedBy: "Suresh Reddy",
    reportedAt: "2024-07-27T08:15:00Z",
    resolvedAt: null,
    description: "Maintenance team identified a 3-meter crack in the warehouse roof structure. Area immediately cordoned off. Approx 200 sq ft affected zone.",
    aiSummary: "Structural integrity risk. Do not allow personnel under affected area. Engage structural engineer for immediate assessment. Evacuate adjacent warehouse sections until cleared.",
    responders: ["Structural Engineering Team", "Facilities Manager"],
    safetyScore: 68,
    media: [],
    coordinates: { lat: 22.8079, lng: 86.2015 },
  },
];

export const MOCK_DEPARTMENTS = [
  { name: "Chemical Processing", score: 62, incidents: 3, status: "critical"  as const },
  { name: "Construction",        score: 75, incidents: 5, status: "high"      as const },
  { name: "Manufacturing",       score: 84, incidents: 2, status: "moderate"  as const },
  { name: "Electrical",          score: 79, incidents: 2, status: "high"      as const },
  { name: "Logistics",           score: 88, incidents: 1, status: "moderate"  as const },
  { name: "Finishing",           score: 92, incidents: 1, status: "low"       as const },
];

export const MOCK_STATS = {
  activeIncidents:   4,
  criticalIncidents: 2,
  openTasks:         11,
  safetyScore:       78,
  totalIncidents:    34,
  resolvedToday:     2,
  avgResponseMin:    8.4,
  complianceRate:    94,
};

export const MOCK_ANALYTICS_MONTHLY = [
  { month: "Jan", incidents: 12, resolved: 11 },
  { month: "Feb", incidents: 9,  resolved: 9  },
  { month: "Mar", incidents: 15, resolved: 14 },
  { month: "Apr", incidents: 11, resolved: 10 },
  { month: "May", incidents: 8,  resolved: 8  },
  { month: "Jun", incidents: 14, resolved: 13 },
  { month: "Jul", incidents: 10, resolved: 7  },
];

export const MOCK_SAFETY_TREND = [78, 76, 79, 81, 80, 83, 82, 85, 84, 86, 85, 78];
export const MOCK_SAFETY_TREND_LABELS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export const MOCK_HEATMAP_DATA: number[][] = [
  /* hour:  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 */
  /* Mon */ [0, 0, 0, 0, 0, 0, 1, 2, 4, 3, 5, 4, 3, 4, 5, 3, 4, 2, 1, 0, 0, 0, 0, 0],
  /* Tue */ [0, 0, 0, 0, 0, 0, 0, 3, 5, 6, 4, 3, 4, 5, 3, 6, 5, 3, 1, 0, 0, 0, 0, 0],
  /* Wed */ [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 3, 5, 4, 3, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0],
  /* Thu */ [0, 0, 0, 0, 0, 0, 0, 1, 6, 5, 4, 3, 5, 4, 6, 5, 4, 3, 2, 0, 0, 0, 0, 0],
  /* Fri */ [0, 0, 0, 0, 0, 0, 1, 3, 4, 5, 3, 4, 3, 5, 4, 3, 5, 4, 2, 1, 0, 0, 0, 0],
  /* Sat */ [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  /* Sun */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const MOCK_TIMELINE = [
  { id: 1, time: "09:30",  title: "Gas Leak Alert – Pipeline 4B",  severity: "critical" as IncidentSeverity, dept: "Oil & Gas Processing", status: "active" as IncidentStatus },
  { id: 2, time: "08:12",  title: "Chemical Spill – Sector D",     severity: "critical" as IncidentSeverity, dept: "Chemical Processing",  status: "active" as IncidentStatus },
  { id: 3, time: "07:45",  title: "Worker Fall – Scaffolding L3",  severity: "high"     as IncidentSeverity, dept: "Construction",         status: "dispatched" as IncidentStatus },
  { id: 4, time: "06:30",  title: "Electrical Fault – Gen Room",   severity: "high"     as IncidentSeverity, dept: "Electrical",           status: "dispatched" as IncidentStatus },
  { id: 5, time: "05:10",  title: "Safety Check Complete – L2",    severity: "low"      as IncidentSeverity, dept: "Manufacturing",        status: "resolved" as IncidentStatus },
  { id: 6, time: "04:55",  title: "Fire Drill Conducted",          severity: "low"      as IncidentSeverity, dept: "All Departments",      status: "resolved" as IncidentStatus },
];

export const MOCK_RESPONDERS = [
  { id: 1, name: "Rajan Kumar",    role: "HazMat Team Lead",      status: "on-site" as const,  avatar: "RK", incidentId: "INC-2024-001" },
  { id: 2, name: "Priya Mehta",    role: "Safety Officer",        status: "en-route" as const, avatar: "PM", incidentId: "INC-2024-002" },
  { id: 3, name: "Suresh Nair",    role: "Emergency Medic",       status: "on-site" as const,  avatar: "SN", incidentId: "INC-2024-001" },
  { id: 4, name: "Anita Singh",    role: "Fire Warden",           status: "standby" as const,  avatar: "AS", incidentId: null },
  { id: 5, name: "Dr. Vivek Rao",  role: "Plant Medical Officer", status: "on-site" as const,  avatar: "VR", incidentId: "INC-2024-002" },
  { id: 6, name: "Kiran Sharma",   role: "Structural Engineer",   status: "en-route" as const, avatar: "KS", incidentId: "INC-2024-008" },
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, type: "critical" as const, title: "Gas Leak Alert", message: "H2S detected at Pipeline 4B — evacuation initiated", time: "2 min ago", read: false },
  { id: 2, type: "critical" as const, title: "Chemical Spill Active", message: "INC-2024-001 still active — HazMat team on site", time: "28 min ago", read: false },
  { id: 3, type: "warning"  as const, title: "Worker Fall — Response Dispatched", message: "Emergency medical en route to Block B", time: "1 hr ago", read: false },
  { id: 4, type: "info"     as const, title: "Safety Score Updated", message: "Monthly safety score: 78% (+2.1% from last month)", time: "3 hr ago", read: true },
  { id: 5, type: "success"  as const, title: "Incident Resolved", message: "INC-2024-006 (Paint Booth Fire) has been resolved", time: "Yesterday", read: true },
  { id: 6, type: "info"     as const, title: "OSHA Report Ready", message: "Monthly OSHA 300 log export is ready for download", time: "Yesterday", read: true },
];

export const MOCK_AI_INSIGHTS = [
  {
    id: 1,
    type: "warning" as const,
    title: "Peak Risk Hours Detected",
    body: "Historical data shows 68% of critical incidents occur between 08:00–10:00. Consider enhanced supervisor presence during this window.",
    confidence: 91,
  },
  {
    id: 2,
    type: "info" as const,
    title: "Chemical Processing — Elevated Risk",
    body: "3 incidents in 7 days (dept avg: 0.8/week). Proactive audit recommended before shift begins.",
    confidence: 87,
  },
  {
    id: 3,
    type: "success" as const,
    title: "Manufacturing Trend Improving",
    body: "Safety score up 8.2% in last 30 days following LOTO retraining program. Continue current protocols.",
    confidence: 95,
  },
];

export const MOCK_USER = {
  name:       "Arjun Mehta",
  email:      "arjun.mehta@tatasteel.com",
  role:       "Safety Officer",
  company:    "Tata Steel",
  department: "HSE",
  phone:      "+91 98765 43210",
  location:   "Jamshedpur Plant, Jharkhand",
  avatar:     null as null,
  joinedAt:   "2022-03-15",
  incidentsReported: 24,
  tasksCompleted:    87,
  safetyScore:       92,
  certifications: [
    { name: "OSHA 30-Hour General Industry", issuer: "OSHA", year: 2023, status: "active" as const },
    { name: "ISO 45001 Lead Auditor",        issuer: "BSI",  year: 2022, status: "active" as const },
    { name: "First Aid & CPR",               issuer: "Red Cross", year: 2024, status: "active" as const },
    { name: "HazMat Operations",             issuer: "OSHA", year: 2021, status: "expiring" as const },
  ],
  activityFeed: [
    { action: "Reported incident",        detail: "INC-2024-001 Chemical Spill", time: "2 hr ago" },
    { action: "Completed safety audit",   detail: "Assembly Line 7 monthly check", time: "1 day ago" },
    { action: "Updated incident status",  detail: "INC-2024-006 marked Resolved", time: "2 days ago" },
    { action: "Completed training",       detail: "HazMat Refresher Course", time: "1 week ago" },
    { action: "Submitted OSHA report",    detail: "June 2024 OSHA 300 Log", time: "2 weeks ago" },
  ],
};
