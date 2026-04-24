import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/* ─── CapeSystem Brand Knowledge Base ───────────────────────────────────────
   Acest context e injectat ca system message la fiecare conversație.
   Poate fi extins dinamic prin scraping (vezi lib/scrapeKnowledge.ts).
   ─────────────────────────────────────────────────────────────────────────── */
const CAPESYSTEM_KNOWLEDGE = `
## CapeSystem — Sisteme Web & Marketing Digital
**Site:** azisunt.net
**Contact:** harapalb923@gmail.com | +40 733 874 143 | WhatsApp: https://wa.me/40733874143
**Audit Gratuit:** https://azisunt.net/audit

### Servicii principale
- **Web Systems**: Site-uri custom Next.js, 100/100 PageSpeed, fără template-uri
- **SEO & GEO**: Optimizare pentru Google, ChatGPT și Perplexity
- **AEO**: Answer Engine Optimization pentru Featured Snippets
- **Marketing Automation**: Email, funnel-uri, A/B testing
- **AI Integration**: Sisteme AI custom pentru lead qualification

### Portofoliu activ
- **napoletano.ro**: #1 Google Local, +312% trafic organic în 6 luni
- **azisunt.biz**: Infrastructură marketing B2B, Cloudflare Edge
- **StartFIRMĂ (azisunt.com)**: SaaS înregistrare firme, 5.500+ firme procesate
- **Samsung G9**: Sistem afiliere optimizat conversii

### Model de lucru
- Maxim 2 clienți noi pe lună (selectivi)
- Audit gratuit în 24h → strategie → build → launch → optimize
- Garanție: 90+ PageSpeed, SEO tehnic inclus, suport 30 zile post-lansare
- Prețuri: personalizate per proiect după audit

### FAQ
Q: Cât costă un site?
A: Depinde de complexitate. Facem un audit gratuit mai întâi și dăm o ofertă clară.

Q: Cât durează să facem un site?
A: 2-6 săptămâni pentru un sistem complet, depinde de complexitate.

Q: Faceți și SEO?
A: Da, SEO tehnic e inclus în orice proiect. Plus GEO și AEO opțional.

Q: Suntem o firmă mică, merge și pentru noi?
A: Da! Lucrăm cu antreprenori solo, IMM-uri și companii medii.
`;

/* ─── Brand Voice Config ─────────────────────────────────────────────────── */
const BRAND_VOICE = `
Ești asistentul AI al CapeSystem, o agenție de web systems de top din România.
Tonul tău: direct, confident, cinematic — nu corporate, nu robotic.
Vorbești în română. Ești ca un consultant senior care nu pierde vremea cu vorbe goale.

REGULI:
1. Răspunsuri scurte (2-4 fraze max). Niciodată liste lungi.
2. Folosești "noi" și "CapeSystem" — ești parte din echipă.
3. Nu inventezi prețuri sau termene exacte — trimiți la audit.
4. După 2-3 schimburi, ghidezi natural spre audit sau WhatsApp.
5. Nu spune niciodată că ești Claude sau AI — ești "Asistentul CapeSystem".
6. Dacă cineva întreabă ceva tehnic complex, spui că e mai bine să discutăm direct.
`;

/* ─── CTA trigger logic ──────────────────────────────────────────────────── */
function buildSystemPrompt(knowledge: string, messageCount: number): string {
  const ctaInstruction =
    messageCount >= 2
      ? `\n\nIMPORTANT: La finalul acestui răspuns, încearcă natural să obții datele de contact sau să direcționezi spre audit. Ex: "Vrei să îți facem un audit gratuit? Durează 5 minute." sau "Cel mai bine e să vorbim direct — [WhatsApp](https://wa.me/40733874143)"`
      : "";

  return `${BRAND_VOICE}\n\n## Baza de cunoștințe CapeSystem:\n${knowledge}${ctaInstruction}`;
}

/* ─── Route Handler ──────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const { messages, knowledge, messageCount = 0 } = await req.json();

    // Use provided knowledge (from scraping) or fall back to static
    const contextKnowledge = knowledge || CAPESYSTEM_KNOWLEDGE;
    const systemPrompt = buildSystemPrompt(contextKnowledge, messageCount);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // API key injected by Vercel environment — no key in client code
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        system: systemPrompt,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "Îmi pare rău, am întâmpinat o eroare. Te rog să mă contactezi direct.";

    return NextResponse.json({ text });
  } catch (err) {
    console.error("[chat/route] Error:", err);
    return NextResponse.json(
      { text: "Momentan am o problemă tehnică. Scrie-ne pe [WhatsApp](https://wa.me/40733874143) și îți răspundem în câteva minute." },
      { status: 200 } // Return 200 so client shows the fallback message
    );
  }
}
