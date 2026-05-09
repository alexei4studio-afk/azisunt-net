# Technical Authority Audit — CapeSystem (azisunt.net)

Generated: 2026-05-09

---

## 1. App Routes Found

- `/audit`  →  `app/audit/page.js`
- `/blog/[slug]`  →  `app/blog/[slug]/page.js`
- `/blog`  →  `app/blog/page.js`
- `/`  →  `app/page.js`
- `/webagency`  →  `app/webagency/page.js`

**Total pages:** 5

---

## 2–5. Per-Page Authority Signals

| Route | Metadata | JSON-LD | /webagency link | CTA | Warnings |
|-------|----------|---------|-----------------|-----|----------|
| `/audit` | ✓ | ✓ | ✓ | ✓ | — |
| `/blog/[slug]` | ✗ | ✗ | ✗ | ✓ | no metadata export, no JSON-LD, no /webagency link |
| `/blog` | ✓ | ✓ | ✗ | ✗ | no /webagency link, no CTA link |
| `/` | ✓ | ✓ | ✓ | ✓ | — |
| `/webagency` | ✓ | ✓ | ✓ | ✓ | — |

---

## 6. next.config.js Redirects

- Redirects present: **Yes** (33 rules found)

---

## 7. robots.txt / Sitemap

| File | Present |
|------|---------|
| robots.txt | ✗ |
| sitemap.xml / sitemap.js | ✗ |

**Warning:** No robots.txt found. Add `public/robots.txt` or `app/robots.js`.
**Warning:** No sitemap found. Add `public/sitemap.xml` or `app/sitemap.js`.

---

## 8. Blog Canonical Articles

- Directory: `content/blog/`
- Canonical article count: **6**

Articles:
- automatizare-ai-afaceri-locale.md
- cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala.md
- importanta-certificatelor-de-siguranta-pentru-site-urile-web-ale-afacerilor-locale.md
- strategii-de-marketing-pentru-afaceri-locale-in-orase-mici.md
- structura-site-afacere-locala.md
- transforma-vizitatori-in-clienti.md

---

## 9. Warnings — Pages with Weak Authority/Funnel Signals

### `/blog/[slug]`
- File: `app/blog/[slug]/page.js`
- Missing: no metadata export, no JSON-LD, no /webagency link

---

## Summary

| Check | Result |
|-------|--------|
| Total routes | 5 |
| Pages with metadata | 4 / 5 |
| Pages with JSON-LD | 4 / 5 |
| Pages linking /webagency | 3 / 5 |
| Pages with CTA | 4 / 5 |
| Redirects in next.config.js | 33 |
| robots.txt present | No |
| sitemap present | No |
| Blog canonical articles | 6 |
| Pages with weak signals (≥3 missing) | 1 |
