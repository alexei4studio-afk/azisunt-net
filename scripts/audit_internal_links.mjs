import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── Helpers ──────────────────────────────────────────────────────────────────

function readFile(f) {
  try { return fs.readFileSync(f, "utf8"); } catch { return null; }
}

const IGNORE_PATHS = ["archive/merged-content", "node_modules", ".next"];

function findFiles(dir, predicate) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (IGNORE_PATHS.some((ig) => full.includes(ig))) continue;
    if (entry.isDirectory()) results.push(...findFiles(full, predicate));
    else if (predicate(entry.name)) results.push(full);
  }
  return results;
}

// ── 1. Discover sources ───────────────────────────────────────────────────────

// App pages: page.js + all sibling JS/TS files in the same directory
const pageFiles = findFiles(
  path.join(ROOT, "app"),
  (n) => /^page\.(js|ts|tsx)$/.test(n)
);

const sources = [];

for (const pf of pageFiles) {
  const relDir = path.relative(path.join(ROOT, "app"), path.dirname(pf));
  const route = "/" + (relDir === "." ? "" : relDir);
  const dir = path.dirname(pf);
  const siblings = fs.readdirSync(dir)
    .filter((n) => /\.(js|ts|tsx)$/.test(n))
    .map((n) => path.join(dir, n));
  const content = siblings.map((f) => readFile(f) ?? "").join("\n");
  sources.push({ route, files: siblings.map((f) => path.relative(ROOT, f)), content, type: "page" });
}

// Blog markdown files
const blogDir = path.join(ROOT, "content", "blog");
const blogMds = fs.existsSync(blogDir)
  ? fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"))
  : [];

for (const md of blogMds) {
  const slug = md.replace(/\.md$/, "");
  const route = "/blog/" + slug;
  const file = path.join(blogDir, md);
  const content = readFile(file) ?? "";
  sources.push({ route, files: ["content/blog/" + md], content, type: "blog" });
}

// ── 2. Extract internal links ─────────────────────────────────────────────────

const AZISUNT_PREFIX = /^https?:\/\/azisunt\.net/;

function extractInternalLinks(content) {
  const links = new Set();

  // href="/path" or href='/path'
  for (const m of content.matchAll(/href=["'](\/[^"'#?\s]*)/g)) {
    links.add(normalizeHref(m[1]));
  }
  // href={"/path"} href={'/path'}
  for (const m of content.matchAll(/href=\{["'](\/[^"'#?\s]*)["']\}/g)) {
    links.add(normalizeHref(m[1]));
  }
  // href={`/path`} — template literal without interpolation
  for (const m of content.matchAll(/href=\{`(\/[^`#?\s$]*)`\}/g)) {
    links.add(normalizeHref(m[1]));
  }
  // Markdown relative: [text](/path)
  for (const m of content.matchAll(/\]\((\/[^)#?\s]*)/g)) {
    links.add(normalizeHref(m[1]));
  }
  // Markdown absolute same-domain: [text](https://azisunt.net/path)
  for (const m of content.matchAll(/\]\(https?:\/\/azisunt\.net(\/[^)#?\s]*)/g)) {
    links.add(normalizeHref(m[1]));
  }

  return [...links].filter(Boolean);
}

function normalizeHref(href) {
  // Strip trailing slash (except root)
  if (href !== "/" && href.endsWith("/")) href = href.slice(0, -1);
  return href;
}

// ── 3. Build link graph ───────────────────────────────────────────────────────

const allKnownRoutes = new Set(sources.map((s) => s.route));

// Per-source outbound links
const graph = sources.map((src) => {
  const raw = extractInternalLinks(src.content);
  // Separate links pointing to known routes vs broken/external
  const outboundKnown = raw.filter((l) => allKnownRoutes.has(l) && l !== src.route);
  const outboundUnknown = raw.filter((l) => !allKnownRoutes.has(l) && l !== src.route);
  return { ...src, outbound: raw, outboundKnown, outboundUnknown };
});

// Inbound link map: route -> list of routes that link to it
const inboundMap = {};
for (const r of allKnownRoutes) inboundMap[r] = [];

for (const src of graph) {
  for (const link of src.outboundKnown) {
    if (!inboundMap[link]) inboundMap[link] = [];
    if (!inboundMap[link].includes(src.route)) {
      inboundMap[link].push(src.route);
    }
  }
}

// ── 4. Derived sets ───────────────────────────────────────────────────────────

const linkingToWebagency = graph.filter((s) => s.outbound.some((l) => l === "/webagency"));
const linkingToAudit     = graph.filter((s) => s.outbound.some((l) => l === "/audit"));
const noOutbound         = graph.filter((s) => s.outbound.length === 0);
const orphanLike         = graph.filter((s) => (inboundMap[s.route] ?? []).length === 0);

// ── 5. Build report ───────────────────────────────────────────────────────────

const now = new Date().toISOString().slice(0, 10);

function routeTable() {
  const header = "| Route | Type | Outbound Links | Inbound Count |";
  const sep    = "|-------|------|---------------|---------------|";
  const rows = graph.map(({ route, type, outbound }) => {
    const inCount = (inboundMap[route] ?? []).length;
    const outList = outbound.length > 0 ? outbound.map((l) => `\`${l}\``).join(", ") : "—";
    return `| \`${route}\` | ${type} | ${outList} | ${inCount} |`;
  });
  return [header, sep, ...rows].join("\n");
}

function inboundTable() {
  const header = "| Route | Inbound From |";
  const sep    = "|-------|-------------|";
  const rows = [...allKnownRoutes].sort().map((route) => {
    const sources = inboundMap[route] ?? [];
    return `| \`${route}\` | ${sources.length ? sources.map((r) => `\`${r}\``).join(", ") : "—"} |`;
  });
  return [header, sep, ...rows].join("\n");
}

const report = `# Internal Linking Audit — CapeSystem (azisunt.net)

Generated: ${now}

---

## 1. All Routes & Their Outbound Internal Links

${routeTable()}

---

## 2. Inbound Links Per Route

${inboundTable()}

---

## 3. Pages Linking to \`/webagency\`

${linkingToWebagency.length === 0
  ? "_None_"
  : linkingToWebagency.map((s) => `- \`${s.route}\` (${s.files.join(", ")})`).join("\n")}

**Total:** ${linkingToWebagency.length} / ${graph.length} sources

---

## 4. Pages Linking to \`/audit\`

${linkingToAudit.length === 0
  ? "_None_"
  : linkingToAudit.map((s) => `- \`${s.route}\` (${s.files.join(", ")})`).join("\n")}

**Total:** ${linkingToAudit.length} / ${graph.length} sources

---

## 5. Pages with No Outbound Internal Links

${noOutbound.length === 0
  ? "_All pages have at least one outbound internal link._"
  : noOutbound.map((s) => `- \`${s.route}\` (${s.files.join(", ")})`).join("\n")}

**Total:** ${noOutbound.length} sources with zero outbound links

---

## 6. Orphan-Like Routes (zero inbound links)

> Routes that no other tracked page or blog post links to. Nav-only links count — if a route appears here it is only reachable via dynamic/variable hrefs or is genuinely unreferenced.

${orphanLike.length === 0
  ? "_No orphan-like routes detected._"
  : orphanLike.map((s) => `- \`${s.route}\` (${s.type}) — ${s.files.join(", ")}`).join("\n")}

**Total:** ${orphanLike.length} orphan-like route(s)

---

## Summary

| Metric | Value |
|--------|-------|
| Total sources scanned | ${graph.length} |
| App routes | ${graph.filter((s) => s.type === "page").length} |
| Blog articles | ${graph.filter((s) => s.type === "blog").length} |
| Sources linking to \`/webagency\` | ${linkingToWebagency.length} |
| Sources linking to \`/audit\` | ${linkingToAudit.length} |
| Sources with no outbound internal links | ${noOutbound.length} |
| Orphan-like routes (0 inbound) | ${orphanLike.length} |
`;

const outPath = path.join(ROOT, "audit", "internal-linking-report.md");
fs.writeFileSync(outPath, report, "utf8");
console.log(`[audit:links] Report written → ${path.relative(process.cwd(), outPath)}`);
console.log(`[audit:links] Sources scanned: ${graph.length} (${graph.filter((s) => s.type === "page").length} pages, ${graph.filter((s) => s.type === "blog").length} blog posts)`);
console.log(`[audit:links] → /webagency: ${linkingToWebagency.length} source(s)`);
console.log(`[audit:links] → /audit: ${linkingToAudit.length} source(s)`);
console.log(`[audit:links] No outbound: ${noOutbound.length} source(s)`);
console.log(`[audit:links] Orphan-like: ${orphanLike.length} route(s)`);
if (orphanLike.length > 0) {
  console.log(`[audit:links] Orphans: ${orphanLike.map((s) => s.route).join(", ")}`);
}
