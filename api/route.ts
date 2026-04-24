import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const GEMINI_API_KEY = "AIzaSyAzPiqq7e5Ax-rh07thIeBzSD1UNrZ_dfA";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/* ─── CapeSystem Brand Knowledge Base ─── */
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

/* ─── Brand Voice Config ─── */
const BRAND_VOICE = `
Ești asistentul AI al CapeSystem, o agenție de web systems de top din România.
Tonul tău: direct, confident, cinematic — nu corporate, nu robotic.
Vorbești în română. Ești ca un consultant senior care nu pierde vremea cu vorbe goale.

REGULI:
1. Răspunsuri scurte (2-4 fraze max). Niciodată liste lungi.
2. Folosești "noi" și "CapeSystem" — ești parte din echipă.
3. Nu inventezi prețuri sau termene exacte — trimiți la audit.
4. După 2-3 schimburi, ghidezi natural spre audit sau WhatsApp.
5. Nu spune niciodată că ești Gemini sau AI — ești "Asistentul CapeSystem".
6. Dacă cineva întreabă ceva tehnic complex, spui că e mai bine să discutăm direct.
`;

/* ─── CTA trigger logic ─── */
function buildSystemPrefix(knowledge: string, messageCount: number): string {
  const ctaInstruction =
    messageCount >= 2
      ? `\n\nIMPORTANT: La finalul acestui răspuns, încearcă natural să obții datele de contact sau să direcționezi spre audit. Ex: "Vrei să îți facem un audit gratuit? Durează 5 minute." sau "Cel mai bine e să vorbim direct — [WhatsApp](https://wa.me/40733874143)"`
      : "";

  return `${BRAND_VOICE}\n\n## Baza de cunoștințe CapeSystem:\n${knowledge}${ctaInstruction}\n\n---\nConversație:\n`;
}

/* ─── Map roles: "assistant" → "model" for Gemini ─── */
function toGeminiRole(role: string): "user" | "model" {
  return role === "assistant" ? "model" : "user";
}

/* ─── Route Handler ─── */
export async function POST(req: NextRequest) {
  try {
    const { messages, knowledge, messageCount = 0 } = await req.json();

    const contextKnowledge = knowledge || CAPESYSTEM_KNOWLEDGE;
    const systemPrefix = buildSystemPrefix(contextKnowledge, messageCount);

    // Gemini requires alternating user/model turns.
    // Inject system prompt as a prefix on the FIRST user message.
    const geminiContents = messages.map(
      (m: { role: string; content: string }, idx: number) => ({
        role: toGeminiRole(m.role),
        parts: [
          {
            text: idx === 0 && m.role === "user"
              ? `${systemPrefix}${m.content}`
              : m.content,
          },
        ],
      })
    );

    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: geminiContents,
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7,
          topP: 0.9,
        },
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Gemini API error ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Îmi pare rău, am întâmpinat o eroare. Te rog să mă contactezi direct.";

    return NextResponse.json({ text });
  } catch (err) {
    console.error("[chat/route] Error:", err);
    return NextResponse.json(
      {
        text: "Momentan am o problemă tehnică. Scrie-ne pe [WhatsApp](https://wa.me/40733874143) și îți răspundem în câteva minute.",
      },
      { status: 200 }
    );
  }
}
