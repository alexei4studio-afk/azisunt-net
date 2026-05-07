from pathlib import Path

ROOT = Path("/home/alexei4studio/azisunt-net")
OUT = ROOT / "audit" / "redirect-map.md"

redirects = {
    # Cluster 1
    "structura-site-afacere-mica":
        "structura-site-afacere-locala",

    "de-ce-un-site-simplu-aduce-mai-multi-clienti":
        "structura-site-afacere-locala",

    "site-simplu-vinde-mai-bine":
        "structura-site-afacere-locala",

    "afaceri-mici-si-site-web":
        "structura-site-afacere-locala",

    "de-ce-afacerile-mici-au-nevoie-de-un-site":
        "structura-site-afacere-locala",

    "pagina-principala-afaceri-mici":
        "structura-site-afacere-locala",

    "greseli-site-afaceri-mici":
        "structura-site-afacere-locala",

    "tendinte-in-designul-site-urilor-web-pentru-afaceri-locale-in-2026":
        "structura-site-afacere-locala",

    # Cluster 2
    "efectul-recenzilor-online-asupra-afacerilor-locale-cum-sa-incurajezi-clienti-sa-lase-recenzi-pozitive":
        "cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala",

    "optimizarea-continutului-pentru-afaceri-locale-cum-sa-scrii-titluri-si-descrieri-meta-eficiente":
        "cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala",

    "geo-chatgpt-perplexity":
        "cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala",

    "ai-seo-pentru-afaceri-locale-2026":
        "cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala",

    "ai-seo-marketing-2026-1777803585":
        "cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala",

    "seo-ai-hijacking":
        "cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala",

    # Cluster 3
    "cum-sa-utilizezi-platformele-de-publicitate-online-pentru-a-ti-creste-vanzarile-in-randul-clientilor-locali":
        "transforma-vizitatori-in-clienti",

    "cum-sa-creezi-o-experienta-de-cumparare-omnichannel-pentru-clientii-tai":
        "transforma-vizitatori-in-clienti",

    "cum-sa-creezi-un-program-de-fidelitate-pentru-clientii-tai-online-si-offline":
        "transforma-vizitatori-in-clienti",

    "cum-sa-folosesti-retelele-sociale-pentru-a-promova-afacerile-locale-si-a-atrage-clienti-noi":
        "transforma-vizitatori-in-clienti",

    "cum-sa-folosesti-influenceri-locali-pentru-a-promova-afacerile-tale":
        "transforma-vizitatori-in-clienti",

    # Cluster 4
    "p1":
        "automatizare-ai-afaceri-locale",

    "ai-si-timpul-pierdut-cu-taskuri-repetitive":
        "automatizare-ai-afaceri-locale",

    "automatizare-startfirma":
        "automatizare-ai-afaceri-locale",

    "sistemul-de-autoritate":
        "automatizare-ai-afaceri-locale",

    "2026-04-19-meta-agenti-ai-automatizare-infrastructura":
        "automatizare-ai-afaceri-locale",

    # Cluster 5
    "metode-de-promovare-a-afacerilor-locale-prin-intermediul-evenimentelor-comunitare":
        "strategii-de-marketing-pentru-afaceri-locale-in-orase-mici",

    "cum-sa-imbunatatesti-strategia-ta-de-marketing-cu-ajutorul-datelor":
        "strategii-de-marketing-pentru-afaceri-locale-in-orase-mici",

    "p2":
        "strategii-de-marketing-pentru-afaceri-locale-in-orase-mici",
}

lines = []

lines.append("# Redirect map")
lines.append("")
lines.append("Pregătire redirecturi 301 pentru cleanup semantic AZISUNT.")
lines.append("")
lines.append("| OLD SLUG | NEW CANONICAL |")
lines.append("|---|---|")

for old_slug, new_slug in redirects.items():
    lines.append(
        f"| `/blog/{old_slug}` | `/blog/{new_slug}` |"
    )

lines.append("")
lines.append(f"Total redirects: {len(redirects)}")

OUT.write_text("\n".join(lines), encoding="utf-8")

print(f"OK: {OUT}")
print(f"Redirects generated: {len(redirects)}")
