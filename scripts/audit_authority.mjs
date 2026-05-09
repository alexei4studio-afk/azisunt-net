import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── Helpers ─────────────────────────────────────────────────────────────────

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function findFiles(dir, predicate) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findFiles(full, predicate));
    else if (predicate(entry.name)) results.push(full);
  }
  return results;
}

// ── 1. Pages/routes ──────────────────────────────────────────────────────────

const pageFiles = findFiles(
  path.join(ROOT, "app"),
  (n) => n === "page.js" || n === "page.ts" || n === "page.tsx"
);

const pages = pageFiles.map((f) => ({
  file: path.relative(ROOT, f),
  route: "/" + path.relative(path.join(ROOT, "app"), path.dirname(f)),
  content: readFile(f) ?? "",
}));

// ── 2–6. Per-page signals ────────────────────────────────────────────────────

const CTA_PATTERNS = [/href=["'](\/webagency|\/contact|\/audit)['"]/g, /mailto:/g];
const INTERNAL_LINK_WEBAGENCY = /href=["']\/webagency['"]/;
const METADATA_EXPORT = /export\s+(const\s+)?metadata\s*=/;
const DYNAMIC_METADATA = /export\s+(async\s+)?function\s+generateMetadata/;
const JSON_LD = /<script[^>]+type=["']application\/ld\+json["']|const\s+jsonLd\s*=\s*\{/;

const pageReports = pages.map(({ file, route, content }) => {
  const hasMetadata = METADATA_EXPORT.test(content) || DYNAMIC_METADATA.test(content);
  const hasJsonLd = JSON_LD.test(content);
  const hasWebagencyLink = INTERNAL_LINK_WEBAGENCY.test(content);
  const hasCtaLink = CTA_PATTERNS.some((p) => p.test(content));
  const warnings = [];
  if (!hasMetadata) warnings.push("no metadata export");
  if (!hasJsonLd) warnings.push("no JSON-LD");
  if (!hasWebagencyLink) warnings.push("no /webagency link");
  if (!hasCtaLink) warnings.push("no CTA link");
  return { file, route, hasMetadata, hasJsonLd, hasWebagencyLink, hasCtaLink, warnings };
});

// ── 7. next.config.js redirects ──────────────────────────────────────────────

const nextConfig = readFile(path.join(ROOT, "next.config.js")) ?? "";
const redirectMatches = nextConfig.match(/source:\s*["']/g) ?? [];
const redirectCount = redirectMatches.length;

// ── 8. robots.txt / sitemap ──────────────────────────────────────────────────

const robotsPresent =
  fs.existsSync(path.join(ROOT, "public", "robots.txt")) ||
  fs.existsSync(path.join(ROOT, "app", "robots.js")) ||
  fs.existsSync(path.join(ROOT, "app", "robots.ts"));

const sitemapPresent =
  fs.existsSync(path.join(ROOT, "public", "sitemap.xml")) ||
  fs.existsSync(path.join(ROOT, "app", "sitemap.js")) ||
  fs.existsSync(path.join(ROOT, "app", "sitemap.ts"));

// ── 9. Blog article count ─────────────────────────────────────────────────────

const blogDir = path.join(ROOT, "content", "blog");
const blogArticles = fs.existsSync(blogDir)
  ? fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"))
  : [];

// ── Build report ──────────────────────────────────────────────────────────────

const now = new Date().toISOString().slice(0, 10);

const tick = (v) => (v ? "✓" : "✗");

function pageTable() {
  const header = "| Route | Metadata | JSON-LD | /webagency link | CTA | Warnings |";
  const sep    = "|-------|----------|---------|-----------------|-----|----------|";
  const rows = pageReports.map(
    ({ route, hasMetadata, hasJsonLd, hasWebagencyLink, hasCtaLink, warnings }) =>
      `| \`${route}\` | ${tick(hasMetadata)} | ${tick(hasJsonLd)} | ${tick(hasWebagencyLink)} | ${tick(hasCtaLink)} | ${warnings.length ? warnings.join(", ") : "—"} |`
  );
  return [header, sep, ...rows].join("\n");
}

const weakPages = pageReports.filter((p) => p.warnings.length >= 3);

const report = `# Technical Authority Audit — CapeSystem (azisunt.net)

Generated: ${now}

---

## 1. App Routes Found

${pages.map((p) => `- \`${p.route}\`  →  \`${p.file}\``).join("\n")}

**Total pages:** ${pages.length}

---

## 2–5. Per-Page Authority Signals

${pageTable()}

---

## 6. next.config.js Redirects

- Redirects present: ${redirectCount > 0 ? `**Yes** (${redirectCount} rules found)` : "**No redirects detected**"}

---

## 7. robots.txt / Sitemap

| File | Present |
|------|---------|
| robots.txt | ${tick(robotsPresent)} |
| sitemap.xml / sitemap.js | ${tick(sitemapPresent)} |

${!robotsPresent ? "**Warning:** No robots.txt found. Add \`public/robots.txt\` or \`app/robots.js\`." : ""}
${!sitemapPresent ? "**Warning:** No sitemap found. Add \`public/sitemap.xml\` or \`app/sitemap.js\`." : ""}

---

## 8. Blog Canonical Articles

- Directory: \`content/blog/\`
- Canonical article count: **${blogArticles.length}**

Articles:
${blogArticles.map((f) => `- ${f}`).join("\n")}

---

## 9. Warnings — Pages with Weak Authority/Funnel Signals

${
  weakPages.length === 0
    ? "No pages flagged."
    : weakPages
        .map(
          (p) =>
            `### \`${p.route}\`\n- File: \`${p.file}\`\n- Missing: ${p.warnings.join(", ")}`
        )
        .join("\n\n")
}

---

## Summary

| Check | Result |
|-------|--------|
| Total routes | ${pages.length} |
| Pages with metadata | ${pageReports.filter((p) => p.hasMetadata).length} / ${pages.length} |
| Pages with JSON-LD | ${pageReports.filter((p) => p.hasJsonLd).length} / ${pages.length} |
| Pages linking /webagency | ${pageReports.filter((p) => p.hasWebagencyLink).length} / ${pages.length} |
| Pages with CTA | ${pageReports.filter((p) => p.hasCtaLink).length} / ${pages.length} |
| Redirects in next.config.js | ${redirectCount} |
| robots.txt present | ${robotsPresent ? "Yes" : "No"} |
| sitemap present | ${sitemapPresent ? "Yes" : "No"} |
| Blog canonical articles | ${blogArticles.length} |
| Pages with weak signals (≥3 missing) | ${weakPages.length} |
`;

const outPath = path.join(ROOT, "audit", "technical-authority-report.md");
fs.writeFileSync(outPath, report, "utf8");
console.log(`[audit] Report written to ${path.relative(process.cwd(), outPath)}`);
console.log(`[audit] Routes found: ${pages.length}`);
console.log(`[audit] Blog articles: ${blogArticles.length}`);
console.log(`[audit] Redirects: ${redirectCount}`);
console.log(`[audit] Weak pages: ${weakPages.length}`);
