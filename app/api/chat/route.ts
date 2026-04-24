import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// INLOCUIEȘTE CHEIA HARDCODED CU ASTA:
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const CAPESYSTEM_KNOWLEDGE = `
BRAND: CapeSystem (azisunt.net) - Agenție de Web Systems & Performance Marketing.

MISIUNE: Nu facem doar site-uri, construim sisteme care generează bani prin viteză (100/100 PageSpeed) și psihologie de vânzare.

MARKETING & E-COMMERCE (Ce nu vedeai):
1. AUTOMATIZARE MARKETING: Creăm funnel-uri care preiau vizitatorul și îl transformă în lead prin email marketing și retargeting automat.
2. SEO & GEO (Generative Engine Optimization): Optimizăm site-ul pentru a fi recomandat de AI (ChatGPT, Perplexity, Gemini), nu doar pentru Google clasic.
3. AEO (Answer Engine Optimization): Strategii pentru a apărea în "Featured Snippets" și răspunsuri vocale.
4. ANALYTICS AVANSAT: Monitorizăm comportamentul utilizatorului (Heatmaps) pentru a optimiza rata de conversie (CRO).

SERVICII TEHNICE:
- Dezvoltare Next.js 14/15: Arhitectură de ultimă generație, fără erori, timpi de încărcare sub 1 secundă.
- Infrastructură Cloud: Scalabilitate pe Vercel și securitate prin Cloudflare.

// ADAUGĂ ASTA ÎN VARIABILA CAPESYSTEM_KNOWLEDGE:

 SOCIAL MEDIA MARKETING (SMM) & ADVERTISING:
   - Strategie Multi-Platform: Facebook, Instagram, TikTok și LinkedIn.
   - Ads de Conversie: Nu facem campanii de "Like-uri", facem campanii de vânzare directă (ROAS orientat).
   - Content Cinematic: Reels și TikTok-uri care opresc scroll-ul și construiesc autoritate.
   - Management Comunitate: Transformăm comentariile în lead-uri calificate.
   - Retargeting Cross-Platform: Dacă cineva intră pe site, îl "urmărim" pe Social Media cu oferte specifice până convertește.

PORTOFOLIU RELEVANT:
- napoletano.ro: Creștere de 312% în trafic organic prin SEO Local.
- startfirma.ro (azisunt.com): Sistem automatizat care a procesat peste 5.500 de firme.

CONTACT DIRECT:
- WhatsApp: https://wa.me/40733874143
- Audit Gratuit în 24h: azisunt.net/audit
`;

const BRAND_VOICE = `Esti asistentul AI al CapeSystem, o agentie de web systems de top din Romania.
Ton: direct, confident, nu corporate, nu robotic. Vorbesti in romana.
Reguli:
1. Raspunsuri scurte (2-4 fraze max). Niciodata liste lungi.
2. Folosesti "noi" si "CapeSystem" - esti parte din echipa.
3. Nu inventa preturi sau termene exacte - trimite la audit.
4. Nu spune niciodata ca esti Gemini sau AI - esti "Asistentul CapeSystem".
5. Daca cineva intreaba ceva tehnic complex, spune ca e mai bine sa discutati direct.`;

function buildSystemText(knowledge: string, messageCount: number): string {
  const cta =
    messageCount >= 2
      ? '\n\nIMPORTANT: La finalul acestui raspuns incearca natural sa directionezi spre audit sau WhatsApp. Ex: "Vrei un audit gratuit? Dureaza 5 minute." sau "Cel mai bine e sa vorbim direct — [WhatsApp](https://wa.me/40733874143)"'
      : "";
  return `${BRAND_VOICE}\n\nBaza de cunostinte:\n${knowledge}${cta}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages = [], knowledge, messageCount = 0 } = body;

    const contextKnowledge = knowledge || CAPESYSTEM_KNOWLEDGE;
    const systemText = buildSystemText(contextKnowledge, messageCount);

    const validMessages = (messages as Array<{ role: string; content: string }>).filter(
      (m) => m && typeof m.content === "string" && m.content.trim() !== ""
    );

    let geminiContents = validMessages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    if (geminiContents.length === 0 || geminiContents[0].role !== "user") {
      geminiContents = [
        { role: "user", parts: [{ text: "Buna ziua!" }] },
        ...geminiContents,
      ];
    }

    const payload = {
      system_instruction: {
        parts: [{ text: systemText }],
      },
      contents: geminiContents,
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
        topP: 0.9,
      },
    };

    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[chat/route] Gemini API ${response.status}:`, errText);
      throw new Error(`Gemini ${response.status}: ${errText}`);
    }

    const data = await response.json();

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error("[chat/route] Unexpected Gemini response shape:", JSON.stringify(data));
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Imi pare rau, am intampinat o eroare. Te rog sa ma contactezi direct.";

    return NextResponse.json({ text });
  } catch (err) {
    console.error("[chat/route] Error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { text: "Momentan am o problema tehnica. Scrie-ne pe [WhatsApp](https://wa.me/40733874143) si iti raspundem in cateva minute." },
      { status: 200 }
    );
  }
}