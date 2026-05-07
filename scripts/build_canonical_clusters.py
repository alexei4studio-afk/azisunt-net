from pathlib import Path
import re
from collections import defaultdict

ROOT = Path("/home/alexei4studio/azisunt-net")
BLOG = ROOT / "content" / "blog"
OUT = ROOT / "audit" / "canonical-clusters.md"

def read_frontmatter(text):
    if not text.startswith("---"):
        return {}, text
    end = text.find("---", 3)
    if end == -1:
        return {}, text
    raw = text[3:end].strip()
    body = text[end+3:].strip()
    data = {}
    for line in raw.splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            data[k.strip()] = v.strip().strip('"').strip("'")
    return data, body

def classify(title, desc, slug, body):
    s = " ".join([title, desc, slug, body[:1200]]).lower()

    rules = [
        ("local-seo-geo", ["local", "google maps", "harta", "hartă", "geo", "oras", "oraș", "judet", "județ", "locatie", "locație"]),
        ("site-afaceri-mici", ["site", "website", "afacere mica", "afaceri mici", "structura site", "greseli site"]),
        ("seo-aeo", ["seo", "aeo", "answer engine", "google", "cautare", "căutare", "vizibilitate"]),
        ("strategie-digitala", ["strategie", "digital", "marketing", "plan", "sistem"]),
        ("clienti-vanzari", ["clienti", "clienți", "vanzari", "vânzări", "lead", "conversie", "programari", "programări"]),
        ("ai-business", ["ai", "inteligen", "automatizare", "chatbot", "asistent"]),
        ("brand-incredere", ["brand", "incredere", "încredere", "autoritate", "reputatie", "reputație"]),
    ]

    scores = []
    for cluster, words in rules:
        score = sum(1 for w in words if w in s)
        if score:
            scores.append((score, cluster))
    if not scores:
        return "misc-review"
    return sorted(scores, reverse=True)[0][1]

articles = []

for p in sorted(BLOG.glob("*.md")):
    text = p.read_text(encoding="utf-8")
    fm, body = read_frontmatter(text)
    title = fm.get("title", p.stem)
    desc = fm.get("description", "")
    slug = p.stem
    cluster = classify(title, desc, slug, body)

    articles.append({
        "file": str(p.relative_to(ROOT)),
        "slug": slug,
        "title": title,
        "description": desc,
        "cluster": cluster,
        "words": len(re.findall(r"\w+", body)),
    })

clusters = defaultdict(list)
for a in articles:
    clusters[a["cluster"]].append(a)

lines = []
lines.append("# AZISUNT canonical clusters / merge map")
lines.append("")
lines.append(f"Total articole analizate: **{len(articles)}**")
lines.append("")
lines.append("Scop: reducere canibalizare, alegere articole canonice, pregătire MERGE/REDIRECT fără modificare de conținut.")
lines.append("")
lines.append("Legendă:")
lines.append("- **KEEP / CANONICAL** = articol principal de păstrat și întărit")
lines.append("- **MERGE** = conținut ce trebuie absorbit în canonical")
lines.append("- **REDIRECT** = slug ce va trebui redirecționat după merge")
lines.append("- **REWRITE** = intenție bună, execuție slabă / prea generică")
lines.append("- **REVIEW** = decizie manuală necesară")
lines.append("")

for cluster in sorted(clusters):
    items = sorted(clusters[cluster], key=lambda x: x["words"], reverse=True)
    canonical = items[0] if items else None

    lines.append(f"## Cluster: {cluster}")
    lines.append("")
    if canonical:
        lines.append(f"### Propus KEEP / CANONICAL")
        lines.append(f"- `{canonical['slug']}` — **{canonical['title']}** ({canonical['words']} words)")
        if canonical["description"]:
            lines.append(f"  - Description: {canonical['description']}")
        lines.append("")

    if len(items) > 1:
        lines.append("### Propus MERGE / REDIRECT")
        for a in items[1:]:
            lines.append(f"- `{a['slug']}` → merge în `{canonical['slug']}`")
            lines.append(f"  - Titlu: {a['title']}")
            lines.append(f"  - Words: {a['words']}")
            lines.append(f"  - File: `{a['file']}`")
        lines.append("")
    else:
        lines.append("### Fără duplicate evidente în acest cluster")
        lines.append("")

    lines.append("### Articole în cluster")
    for a in items:
        lines.append(f"- `{a['slug']}` — {a['title']} — `{a['file']}`")
    lines.append("")

OUT.write_text("\n".join(lines), encoding="utf-8")

print(f"OK: generated {OUT}")
print(f"Articles: {len(articles)}")
print("Clusters:")
for cluster in sorted(clusters):
    print(f"- {cluster}: {len(clusters[cluster])}")
