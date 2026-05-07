from pathlib import Path
import csv, re
from difflib import SequenceMatcher
from collections import defaultdict

ROOT = Path("/home/alexei4studio/azisunt-net")
BLOG = ROOT / "content" / "blog"
AUDIT = ROOT / "audit"

BAD_TERMS = [
    "gogle", "crezi", "omnichanel", "ofline", "scri",
    "strategi", "locaala", "clients"
]

DELETE_PATTERNS = ["test-", "p1", "p2"]

def clean(s):
    s = s.lower()
    s = re.sub(r"[^a-z0-9ăâîșț]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()

def read_article(path):
    text = path.read_text(encoding="utf-8", errors="ignore")
    title = ""
    m = re.search(r"^#\s+(.+)$", text, re.M)
    if m:
        title = m.group(1).strip()
    words = re.findall(r"\b[\wăâîșțĂÂÎȘȚ-]+\b", text)
    headings = re.findall(r"^#{2,3}\s+(.+)$", text, re.M)
    flags = [b for b in BAD_TERMS if b in path.stem.lower() or b in text.lower()]
    return {
        "file": str(path.relative_to(ROOT)),
        "slug": path.stem,
        "title": title,
        "word_count": len(words),
        "headings_count": len(headings),
        "typo_flags": ", ".join(flags),
        "text_key": clean(path.stem + " " + title),
    }

def action_for(r):
    slug = r["slug"]
    wc = r["word_count"]

    if slug in ["p1", "p2"] or slug.startswith("test-"):
        return "DELETE", "test/placeholder content"

    reasons = []
    action = "REVIEW"

    if r["typo_flags"]:
        action = "REWRITE"
        reasons.append("typo slug/content")

    if wc < 250:
        action = "MERGE" if action == "REVIEW" else action
        reasons.append("thin content under 250 words")
    elif wc < 350 and action == "REVIEW":
        action = "REWRITE"
        reasons.append("weak content under 350 words")

    return action, " + ".join(reasons) if reasons else "needs semantic review"

def similarity(a, b):
    base = SequenceMatcher(None, a["text_key"], b["text_key"]).ratio()
    shared = set(a["text_key"].split()) & set(b["text_key"].split())
    useful = [w for w in shared if len(w) > 4]
    bonus = min(len(useful) * 0.03, 0.18)
    return round(base + bonus, 3), useful

def main():
    AUDIT.mkdir(exist_ok=True)

    articles = [read_article(p) for p in sorted(BLOG.glob("*.md"))]

    inventory_path = AUDIT / "agent-blog-inventory.csv"
    with inventory_path.open("w", newline="", encoding="utf-8") as f:
        keys = ["file", "slug", "title", "word_count", "headings_count", "typo_flags"]
        w = csv.DictWriter(f, fieldnames=keys)
        w.writeheader()
        for r in articles:
            w.writerow({k: r[k] for k in keys})

    triage = []
    for r in articles:
        action, reason = action_for(r)
        triage.append({
            "slug": r["slug"],
            "title": r["title"],
            "word_count": r["word_count"],
            "typo_flags": r["typo_flags"],
            "suspected_action": action,
            "reason": reason,
        })

    triage_path = AUDIT / "agent-triage.csv"
    with triage_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(triage[0].keys()))
        w.writeheader()
        w.writerows(triage)

    pairs = []
    for i in range(len(articles)):
        for j in range(i + 1, len(articles)):
            score, shared = similarity(articles[i], articles[j])
            if score >= 0.58:
                pairs.append({
                    "score": score,
                    "slug_a": articles[i]["slug"],
                    "slug_b": articles[j]["slug"],
                    "shared_terms": ", ".join(sorted(shared)[:12]),
                })

    pairs.sort(key=lambda x: x["score"], reverse=True)

    dup_path = AUDIT / "agent-duplicate-candidates.csv"
    with dup_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["score", "slug_a", "slug_b", "shared_terms"])
        w.writeheader()
        w.writerows(pairs)

    md = []
    md.append("# AZISUNT.NET Content Triage Agent Report")
    md.append("")
    md.append(f"Articles scanned: {len(articles)}")
    md.append("")
    md.append("## DELETE candidates")
    md.append("")
    for r in triage:
        if r["suspected_action"] == "DELETE":
            md.append(f"- `{r['slug']}` — {r['reason']}")
    md.append("")
    md.append("## Strong duplicate candidates")
    md.append("")
    for p in pairs[:30]:
        md.append(f"- `{p['slug_a']}` ↔ `{p['slug_b']}` — score {p['score']} — shared: {p['shared_terms']}")
    md.append("")
    md.append("## Thin / rewrite candidates")
    md.append("")
    for r in triage:
        if r["suspected_action"] in ["MERGE", "REWRITE"]:
            md.append(f"- **{r['suspected_action']}** `{r['slug']}` — {r['word_count']} words — {r['reason']}")

    report_path = AUDIT / "agent-content-triage-report.md"
    report_path.write_text("\n".join(md), encoding="utf-8")

    print("DONE")
    print(f"Inventory: {inventory_path}")
    print(f"Triage CSV: {triage_path}")
    print(f"Duplicates CSV: {dup_path}")
    print(f"Report: {report_path}")
    print("")
    print(report_path.read_text(encoding="utf-8")[:6000])

if __name__ == "__main__":
    main()
