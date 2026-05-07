from pathlib import Path
import shutil

ROOT = Path("/home/alexei4studio/azisunt-net")
BLOG = ROOT / "content" / "blog"
ARCHIVE = ROOT / "archive" / "merged-content"

merge_slugs = [
    # Cluster 1
    "structura-site-afacere-mica",
    "de-ce-un-site-simplu-aduce-mai-multi-clienti",
    "site-simplu-vinde-mai-bine",
    "afaceri-mici-si-site-web",
    "de-ce-afacerile-mici-au-nevoie-de-un-site",
    "pagina-principala-afaceri-mici",
    "greseli-site-afaceri-mici",
    "tendinte-in-designul-site-urilor-web-pentru-afaceri-locale-in-2026",

    # Cluster 2
    "efectul-recenzilor-online-asupra-afacerilor-locale-cum-sa-incurajezi-clienti-sa-lase-recenzi-pozitive",
    "optimizarea-continutului-pentru-afaceri-locale-cum-sa-scrii-titluri-si-descrieri-meta-eficiente",
    "geo-chatgpt-perplexity",
    "ai-seo-pentru-afaceri-locale-2026",
    "ai-seo-marketing-2026-1777803585",
    "seo-ai-hijacking",

    # Cluster 3
    "cum-sa-utilizezi-platformele-de-publicitate-online-pentru-a-ti-creste-vanzarile-in-randul-clientilor-locali",
    "cum-sa-creezi-o-experienta-de-cumparare-omnichannel-pentru-clientii-tai",
    "cum-sa-creezi-un-program-de-fidelitate-pentru-clientii-tai-online-si-offline",
    "cum-sa-folosesti-retelele-sociale-pentru-a-promova-afacerile-locale-si-a-atrage-clienti-noi",
    "cum-sa-folosesti-influenceri-locali-pentru-a-promova-afacerile-tale",

    # Cluster 4
    "p1",
    "ai-si-timpul-pierdut-cu-taskuri-repetitive",
    "automatizare-startfirma",
    "sistemul-de-autoritate",
    "2026-04-19-meta-agenti-ai-automatizare-infrastructura",

    # Cluster 5
    "metode-de-promovare-a-afacerilor-locale-prin-intermediul-evenimentelor-comunitare",
    "cum-sa-imbunatatesti-strategia-ta-de-marketing-cu-ajutorul-datelor",
    "p2",
]

moved = []
missing = []

for slug in merge_slugs:
    src = BLOG / f"{slug}.md"

    if not src.exists():
        missing.append(slug)
        continue

    dst = ARCHIVE / src.name
    shutil.move(str(src), str(dst))
    moved.append(slug)

print("\n=== MOVED ===")
for x in moved:
    print(x)

print(f"\nMoved total: {len(moved)}")

if missing:
    print("\n=== MISSING ===")
    for x in missing:
        print(x)
