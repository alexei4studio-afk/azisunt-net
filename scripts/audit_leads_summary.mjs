import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "..", "data", "audit-leads.json");

if (!fs.existsSync(DATA_FILE)) {
  console.log("[leads:summary] No leads file found — data/audit-leads.json does not exist yet.");
  process.exit(0);
}

let leads;
try {
  leads = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
} catch {
  console.error("[leads:summary] Could not parse data/audit-leads.json.");
  process.exit(1);
}

if (!Array.isArray(leads) || leads.length === 0) {
  console.log("[leads:summary] No leads recorded yet.");
  process.exit(0);
}

const total = leads.length;

const withScore = leads.filter((l) => l.score !== null && l.score !== undefined && !isNaN(Number(l.score)));
const avgScore = withScore.length > 0
  ? Math.round(withScore.reduce((sum, l) => sum + Number(l.score), 0) / withScore.length)
  : null;

// temperature counts
const tempCounts = { hot: 0, warm: 0, cold: 0 };
for (const l of leads) {
  const t = l.leadTemperature;
  if (t === "hot" || t === "warm" || t === "cold") tempCounts[t]++;
}

const cityCounts = {};
for (const l of leads) {
  const c = (l.city || "Unknown").trim();
  cityCounts[c] = (cityCounts[c] || 0) + 1;
}

const industryCounts = {};
for (const l of leads) {
  const ind = (l.industry || "Unknown").trim();
  industryCounts[ind] = (industryCounts[ind] || 0) + 1;
}

// top pain points across all leads
const painPointCounts = {};
for (const l of leads) {
  if (Array.isArray(l.painPoints)) {
    for (const p of l.painPoints) {
      painPointCounts[p] = (painPointCounts[p] || 0) + 1;
    }
  }
}

// suggested offer breakdown
const offerCounts = {};
for (const l of leads) {
  const o = l.suggestedOffer || "unknown";
  offerCounts[o] = (offerCounts[o] || 0) + 1;
}

const latest5 = [...leads]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 5);

console.log("\n[leads:summary] ─── Audit Leads Summary ───\n");
console.log(`Total leads:   ${total}`);
console.log(`Avg score:     ${avgScore !== null ? `${avgScore}/100` : "N/A"}`);

console.log("\nTemperature:");
console.log(`  hot:  ${tempCounts.hot}`);
console.log(`  warm: ${tempCounts.warm}`);
console.log(`  cold: ${tempCounts.cold}`);

console.log("\nCities:");
for (const [city, count] of Object.entries(cityCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${city}: ${count}`);
}

console.log("\nIndustries:");
for (const [ind, count] of Object.entries(industryCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${ind}: ${count}`);
}

console.log("\nTop pain points:");
if (Object.keys(painPointCounts).length === 0) {
  console.log("  (none recorded)");
} else {
  for (const [p, count] of Object.entries(painPointCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${p}: ${count}`);
  }
}

console.log("\nSuggested offers:");
for (const [offer, count] of Object.entries(offerCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${offer}: ${count}`);
}

console.log("\nLatest 5 leads:");
for (const l of latest5) {
  const date = l.createdAt ? l.createdAt.slice(0, 10) : "?";
  const score = l.score !== null && l.score !== undefined ? `${l.score}/100` : "N/A";
  const temp = l.leadTemperature || "?";
  console.log(`  [${date}] ${l.businessName || "?"} — ${l.city || "?"} — ${l.industry || "?"} — score: ${score} — ${temp}`);
}
console.log("");
