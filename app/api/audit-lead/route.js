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

  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    businessName: String(businessName).trim(),
    websiteUrl: websiteUrl ? String(websiteUrl).trim() : "",
    city: String(city).trim(),
    industry: String(industry).trim(),
    mainGoal: mainGoal ? String(mainGoal).trim() : "",
    email: email ? String(email).trim() : "",
    score: score !== undefined && score !== null ? Number(score) : null,
    scores: scores || null,
    recommendations: recommendations || null,
    source: source ? String(source).trim() : "audit",
    userAgent: request.headers.get("user-agent") || "",
    referer: request.headers.get("referer") || "",
  };

  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  let leads = [];
  try {
    leads = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    if (!Array.isArray(leads)) leads = [];
  } catch {
    leads = [];
  }

  leads.push(lead);
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf8");

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}
