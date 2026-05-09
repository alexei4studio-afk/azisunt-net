import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_FILE = path.join(process.cwd(), "data", "audit-leads.json");
const MAX_BODY_BYTES = 16 * 1024;

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function isValidUrl(v) {
  return /^https?:\/\/.+\..+/.test(v.trim());
}

const SCORE_LABELS = {
  trust:        "Website Trust",
  localSeo:     "SEO / GEO Local",
  aiVisibility: "AI Visibility / AEO",
  conversion:   "Conversie",
  technical:    "Fundație Tehnică",
};

function qualifyLead(numScore, scores, email) {
  const hasEmail = !!(email && String(email).trim());

  let leadTemperature;
  if (numScore !== null && numScore <= 50 && hasEmail) {
    leadTemperature = "hot";
  } else if (
    (numScore !== null && numScore <= 70 && hasEmail) ||
    (numScore !== null && numScore <= 50 && !hasEmail)
  ) {
    leadTemperature = "warm";
  } else {
    leadTemperature = "cold";
  }

  let painPoints = [];
  if (scores && typeof scores === "object") {
    painPoints = Object.entries(scores)
      .filter(([, v]) => Number(v) < 50)
      .sort(([, a], [, b]) => Number(a) - Number(b))
      .slice(0, 3)
      .map(([k]) => SCORE_LABELS[k] || k);
  }

  let suggestedOffer;
  if (numScore === null) {
    suggestedOffer = "audit call";
  } else if (numScore < 40) {
    suggestedOffer = "website rebuild";
  } else if (numScore < 60) {
    suggestedOffer = "Plan Pro";
  } else if (numScore < 75) {
    suggestedOffer = "audit call";
  } else {
    suggestedOffer = "SEO-GEO package";
  }

  const nextAction =
    leadTemperature === "hot"  ? "Contactează în 24h — lead calificat cu email" :
    leadTemperature === "warm" ? "Follow-up în 48h" :
                                  "Adaugă în nurturing";

  return { leadTemperature, painPoints, suggestedOffer, nextAction };
}

export async function POST(request) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  let body;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    businessName, websiteUrl, city, industry,
    mainGoal, email, score, scores, recommendations, source,
  } = body;

  const errors = {};
  if (!businessName || !String(businessName).trim()) errors.businessName = "Required";
  if (!city        || !String(city).trim())          errors.city = "Required";
  if (!industry    || !String(industry).trim())      errors.industry = "Required";

  if (score !== undefined && score !== null) {
    const n = Number(score);
    if (isNaN(n) || n < 0 || n > 100) errors.score = "Must be 0–100";
  }

  if (email && String(email).trim() && !isValidEmail(String(email))) {
    errors.email = "Invalid email";
  }

  if (websiteUrl && String(websiteUrl).trim() && !isValidUrl(String(websiteUrl))) {
    errors.websiteUrl = "Invalid URL";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed", details: errors }, { status: 422 });
  }

  const numScore = score !== null && score !== undefined ? Number(score) : null;
  const { leadTemperature, painPoints, suggestedOffer, nextAction } = qualifyLead(numScore, scores, email);

  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    businessName: String(businessName).trim(),
    websiteUrl: websiteUrl ? String(websiteUrl).trim() : "",
    city: String(city).trim(),
    industry: String(industry).trim(),
    mainGoal: mainGoal ? String(mainGoal).trim() : "",
    email: email ? String(email).trim() : "",
    score: numScore,
    scores: scores || null,
    recommendations: recommendations || null,
    source: source ? String(source).trim() : "audit",
    userAgent: request.headers.get("user-agent") || "",
    referer: request.headers.get("referer") || "",
    leadTemperature,
    painPoints,
    suggestedOffer,
    nextAction,
  };

  // best-effort JSON storage — silently skipped on Vercel read-only fs
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    let leads = [];
    try {
      leads = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
      if (!Array.isArray(leads)) leads = [];
    } catch { leads = []; }
    leads.push(lead);
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf8");
  } catch { /* read-only fs — skip */ }

  // optional webhook — fires only when AZISUNT_AUDIT_WEBHOOK_URL is set
  let notificationOk = null;
  const webhookUrl = process.env.AZISUNT_AUDIT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(5000),
      });
      notificationOk = res.ok;
    } catch {
      notificationOk = false;
    }
  }

  // forward to app backend — skipped silently if AZISUNT_INBOUND_SECRET is not set
  let forwarded = false;
  const inboundSecret = process.env.AZISUNT_INBOUND_SECRET;
  if (inboundSecret) {
    const inboundUrl =
      process.env.AZISUNT_APP_INBOUND_URL ||
      "https://app.azisunt.net/api/inbound/audit-lead";
    try {
      const fwd = await fetch(inboundUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AZISUNT-INBOUND-SECRET": inboundSecret,
        },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
      forwarded = fwd.ok;
    } catch {
      forwarded = false;
    }
  }

  const response = { ok: true, id: lead.id, forwarded };
  if (notificationOk !== null) response.notificationOk = notificationOk;
  return NextResponse.json(response, { status: 201 });
}
