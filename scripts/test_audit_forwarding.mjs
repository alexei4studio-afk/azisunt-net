#!/usr/bin/env node
/**
 * End-to-end audit lead forwarding verification.
 * Tests: (1) direct POST to app backend, (2) POST to public audit API (which should forward internally).
 * Usage: AZISUNT_INBOUND_SECRET=<secret> node scripts/test_audit_forwarding.mjs
 */

const secret = process.env.AZISUNT_INBOUND_SECRET;
if (!secret) {
  console.error("ERROR: AZISUNT_INBOUND_SECRET is not set.");
  process.exit(1);
}

const appBackendUrl =
  process.env.AZISUNT_APP_INBOUND_URL ||
  "https://app.azisunt.net/api/inbound/audit-lead";

const publicAuditUrl =
  process.env.AZISUNT_PUBLIC_AUDIT_API_URL ||
  "http://localhost:3000/api/audit-lead";

const sampleLead = {
  businessName: "Test Business SRL",
  websiteUrl:   "https://testbusiness.ro",
  city:         "București",
  industry:     "Restaurante",
  mainGoal:     "Clienți noi",
  email:        "test@testbusiness.ro",
  score:        45,
  scores: {
    trust:        40,
    localSeo:     35,
    aiVisibility: 50,
    conversion:   60,
    technical:    55,
  },
  recommendations: ["Optimizare GBP", "Îmbunătățire titluri"],
  source: "test:audit-forwarding",
};

async function postJson(url, body, headers = {}) {
  const res = await fetch(url, {
    method:  "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body:    JSON.stringify(body),
    signal:  AbortSignal.timeout(10000),
  });
  let json = null;
  try { json = await res.json(); } catch { /* non-JSON body */ }
  return { status: res.status, ok: res.ok, json };
}

let exitCode = 0;

// --- 1. Direct app backend ---
console.log(`\n[1] Direct → ${appBackendUrl}`);
try {
  const { status, ok, json } = await postJson(
    appBackendUrl,
    sampleLead,
    { "X-AZISUNT-INBOUND-SECRET": secret }
  );
  const label = ok ? "PASS" : "FAIL";
  console.log(`    Status : ${status}  ${label}`);
  if (json) {
    const safe = { ...json };
    console.log(`    Body   : ${JSON.stringify(safe)}`);
  }
  if (!ok) exitCode = 1;
} catch (err) {
  console.log(`    ERROR  : ${err.message}`);
  exitCode = 1;
}

// --- 2. Public audit API ---
console.log(`\n[2] Public → ${publicAuditUrl}`);
try {
  const { status, ok, json } = await postJson(publicAuditUrl, sampleLead);
  const label = ok ? "PASS" : "FAIL";
  console.log(`    Status    : ${status}  ${label}`);
  if (json) {
    const safe = { ...json };
    console.log(`    Body      : ${JSON.stringify(safe)}`);
    if (json.forwarded !== undefined) {
      console.log(`    Forwarded : ${json.forwarded}`);
    }
  }
  if (!ok) exitCode = 1;
} catch (err) {
  console.log(`    ERROR     : ${err.message}`);
  exitCode = 1;
}

console.log(exitCode === 0 ? "\nAll checks passed." : "\nSome checks FAILED.");
process.exit(exitCode);
