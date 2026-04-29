import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const CAPESYSTEM_KNOWLEDGE = `
DESPRE CAPESYSTEM (azisunt.net):
Agenție de Web Systems & Performance Marketing din România. Nu facem site-uri clasice — construim sisteme digitale care generează vânzări. Lucrăm cu MAXIM 2 clienți noi pe lună.

SERVICII:
1. WEB SYSTEMS (Next.js 14/15): Site-uri custom de la zero, fără template-uri. PageSpeed 100/100, timpi sub 1 secundă, design psihologic de conversie.
2. SEO & GEO (Generative Engine Optimization): Optimizare pentru Google clasic ȘI pentru AI (ChatGPT, Perplexity, Gemini). Structură JSON-LD, autoritate topică, Featured Snippets.
3. AEO (Answer Engine Optimization): Răspunsuri directe pentru Google AI Overview și motoare de răspuns vocal.
4. MARKETING AUTOMATION: Funnel-uri email, retargeting automat, A/B testing, tracking granular cu heatmaps.
5. SOCIAL MEDIA & ADS: Campanii Facebook, Instagram, TikTok, LinkedIn axate pe ROAS și vânzări directe, nu like-uri. Content cinematic (Reels, TikTok). Retargeting cross-platform.
6. INFRASTRUCTURĂ CLOUD: Vercel + Cloudflare, scalabilitate și securitate enterprise.

PROCESUL CapeSystem (3 etape):
01. DEEP AUDIT & STRATEGIE: Analiză competitivă completă, identificare ICP, blueprint de execuție personalizat.
02. FULL BUILD & HARD MARKETING: Design psihologic, copywriting persuasiv, SEO tehnic agresiv, funnel-uri de conversie.
03. DOMINANȚĂ & SCALARE: Monitorizare 24/7, rapoarte lunare KPI, optimizare continuă bazată pe date reale.

PORTOFOLIU REAL:
- napoletano.ro: +312% trafic organic în 6 luni. Sistem web complet cu meniu dinamic Supabase, rezervări online, SEO local #1.
- azisunt.com (StartFIRMĂ): Automatizare completă înființare firme. 5.500+ dosare ONRC procesate, 5 minute per dosar, 0 intervenții manuale.
- azisunt.biz: Infrastructură marketing B2B, funnel-uri conversie, landing pages cu A/B testing, automatizări email.
- Restaurant Cluj: +40% rezervări online în prima lună.
- Freelancer design București: 3 contracte noi în 2 luni.
- Salon beauty: Poziție #1 Google local în 90 de zile.
- Medic stomatolog: #1 Google local — clienții o găsesc fără reclame plătite.

REZULTATE REALE:
- +312% trafic organic (napoletano.ro, 6 luni)
- +40% rezervări online (prima lună)
- #1 Google local în 90 de zile
- PageSpeed 100/100 pe toate proiectele

LINKURI IMPORTANTE:
- Audit gratuit (4 întrebări, 60 secunde, raport AI instant): https://azisunt.net/audit
- Blog / Knowledge Hub (SEO, GEO, AEO, AI): https://azisunt.net/blog
- Shop: https://azisunt.shop
- WhatsApp direct: https://wa.me/40733874143
- Email: harapalb923@gmail.com
- Telefon: +40 733 874 143

DISPONIBILITATE: Maxim 2 clienți noi pe lună. Locurile se ocupă rapid.
`;

const BRAND_VOICE = `Esti asistentul AI al CapeSystem, o agentie de web systems de top din Romania.
Ton: direct, confident, nu corporate, nu robotic. Vorbesti in romana.
Reguli:
1. Raspunsuri scurte (2-4 fraze max). Niciodata liste lungi.
2. Folosesti "noi" si "CapeSystem" - esti parte din echipa.
3. Nu inventa preturi sau termene exacte - trimite la audit: [Audit gratuit](https://azisunt.net/audit)
4. Nu spune niciodata ca esti Gemini sau AI - esti "Asistentul CapeSystem".
5. Cand trimiti spre contact, foloseste linkuri Markdown: [WhatsApp](https://wa.me/40733874143) sau [Audit gratuit](https://azisunt.net/audit)
6. Daca cineva intreaba de portofoliu, blog sau shop, trimite linkuri directe.
7. Subliniaza mereu ca avem MAXIM 2 locuri pe luna - creeaza urgenta.`;

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
      systemInstruction: {          // ← FIX: era system_instruction (snake_case invalid)
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