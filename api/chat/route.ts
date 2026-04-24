import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const GEMINI_API_KEY = "AIzaSyAzPiqq7e5Ax-rh07thIeBzSD1UNrZ_dfA";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const CAPESYSTEM_KNOWLEDGE = `
CapeSystem — Sisteme Web & Marketing Digital
Site: azisunt.net | Contact: harapalb923@gmail.com | +40 733 874 143 | WhatsApp: https://wa.me/40733874143
Audit Gratuit: https://azisunt.net/audit

Servicii: Web Systems (Next.js, 100/100 PageSpeed), SEO & GEO, AEO, Marketing Automation, AI Integration.
Portofoliu: napoletano.ro (#1 Google Local, +312% trafic), azisunt.biz (B2B infra), StartFIRMA/azisunt.com (5.500+ firme).
Model: max 2 clienti noi/luna, audit gratuit -> strategie -> build -> launch -> optimize.
FAQ:
- Cost site? -> Audit gratuit mai intai, oferta clara dupa.
- Durata? -> 2-6 saptamani depinde de complexitate.
- SEO? -> Inclus in orice proiect. GEO si AEO optional.
- Firma mica? -> Da, lucram cu antreprenori solo si IMM-uri.
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