import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
// Use the unified alias to avoid hitting quota restrictions on pinned legacy versions
const GEMINI_MODEL   = "gemini-flash-lite-latest";
const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export interface AnalyzeRequest {
  description: string;
  location:    string;
  method:      "photo" | "video" | "voice" | "text";
  imageBase64?: string;   // only for photo
  imageMime?:   string;   // e.g. "image/jpeg"
}

export interface AIResult {
  title:          string;
  severity:       "critical" | "high" | "moderate" | "low";
  severityColor:  string;
  confidence:     number;
  workersAtRisk:  number;
  hazards:        string[];
  summary:        string;
  recommendation: string;
  teams:          string[];
}

const SEVERITY_COLORS: Record<string, string> = {
  critical: "bg-red-600",
  high:     "bg-orange-500",
  moderate: "bg-amber-500",
  low:      "bg-emerald-600",
};

export async function POST(req: NextRequest) {
  try {
    const body: AnalyzeRequest = await req.json();
    const { description, location, method, imageBase64, imageMime } = body;

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "No Gemini API key configured." }, { status: 500 });
    }

    // ── Build prompt ──────────────────────────────────────────────────────────
    const systemPrompt = `You are RescueFlowAI — an industrial safety incident analysis engine.
Analyse the incident report below and respond ONLY with valid JSON matching this exact schema:
{
  "title": "short incident title (max 6 words)",
  "severity": "critical" | "high" | "moderate" | "low",
  "confidence": <integer 60-99>,
  "workersAtRisk": <integer>,
  "hazards": ["hazard 1", "hazard 2", "hazard 3"],
  "summary": "1–2 sentence AI summary of the hazard",
  "recommendation": "Immediate action sentence for responders.",
  "teams": ["Team 1", "Team 2", "Team 3"]
}

CRITICAL RULES for "workersAtRisk":
- If an IMAGE is provided: carefully and accurately COUNT the exact number of visible human workers/people present in the image. Do NOT guess or estimate — look at every person in the frame.
- If NO image is provided: estimate a reasonable number based on the text description (e.g. "a worker" = 1, "several workers" = 3-5). If completely unclear, use 1.
- NEVER return a random number. The value must reflect the actual count from the image or a grounded estimate from the description.

Do not add any markdown, explanation or extra keys.`;

    const userText = `Incident Report
Location: ${location}
Report Method: ${method}
Description: ${description || "(no text description provided — analyse image if attached)"}
${imageBase64 ? "NOTE: An image has been attached. Count ALL visible workers/people in it accurately for the workersAtRisk field." : "NOTE: No image attached. Estimate workersAtRisk from the description above."}`;

    // ── Build Gemini parts ────────────────────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parts: any[] = [{ text: userText }];

    if (imageBase64 && imageMime) {
      parts.unshift({
        inline_data: { mime_type: imageMime, data: imageBase64 },
      });
    }

    const geminiBody = {
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents:           [{ role: "user", parts }],
      generationConfig:   { responseMimeType: "application/json", temperature: 0.3 },
    };

    const geminiRes = await fetch(GEMINI_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(geminiBody),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini error:", errText);
      return NextResponse.json({ error: `Gemini API error: ${geminiRes.status}` }, { status: 502 });
    }

    const geminiData = await geminiRes.json();
    const rawText    = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

    // Strip markdown fences if present
    const clean = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const parsed = JSON.parse(clean) as Partial<AIResult>;

    const severity = (parsed.severity ?? "high") as AIResult["severity"];
    const result: AIResult = {
      title:          parsed.title          ?? "Industrial Incident Detected",
      severity,
      severityColor:  SEVERITY_COLORS[severity] ?? "bg-orange-500",
      confidence:     parsed.confidence     ?? 88,
      workersAtRisk:  parsed.workersAtRisk  ?? 3,
      hazards:        parsed.hazards        ?? [],
      summary:        parsed.summary        ?? "",
      recommendation: parsed.recommendation ?? "",
      teams:          parsed.teams          ?? [],
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("analyze route error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
