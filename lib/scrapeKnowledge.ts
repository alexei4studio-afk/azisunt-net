/**
 * lib/scrapeKnowledge.ts
 *
 * Extrage conținut din orice URL și construiește o bază de cunoștințe
 * pentru chatbot. Rulează la build time sau la prima cerere (ISR).
 *
 * Usage:
 *   const knowledge = await scrapeKnowledge("https://azisunt.net")
 *   // → string cu servicii, FAQ, tonul brandului, etc.
 */

export interface BrandConfig {
  knowledge: string;
  brandVoice: string;
  primaryColor: string;
  accentColor: string;
  brandName: string;
  ctaLink: string;
  phone?: string;
  email?: string;
}

/* ─── Simple text extractor (no cheerio needed — uses fetch + regex) ─── */
function extractText(html: string): string {
  return html
    // Remove scripts, styles, nav, footer noise
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    // Extract meaningful tags
    .replace(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi, "\n## $2\n")
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n")
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n")
    // Strip remaining tags
    .replace(/<[^>]+>/g, " ")
    // Clean up entities and whitespace
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s{3,}/g, "\n\n")
    .trim()
    .slice(0, 8000); // Keep within context window limits
}

/* ─── Brand voice detector ─── */
function detectBrandVoice(text: string, url: string): string {
  const lower = text.toLowerCase();

  if (lower.includes("luxury") || lower.includes("premium") || lower.includes("exclusiv")) {
    return "Ești un asistent rafinat și exclusivist. Răspunzi politicos, folosești un limbaj elevat, niciodată informal.";
  }
  if (lower.includes("startup") || lower.includes("tech") || lower.includes("saas")) {
    return "Ești un asistent tech-savvy și direct. Fără corporate speak. Mergi la subiect rapid.";
  }
  if (lower.includes("medical") || lower.includes("sănătate") || lower.includes("clinică")) {
    return "Ești un asistent profesionist și empatic. Răspunzi clar și uman, fără jargon medical excesiv.";
  }
  if (lower.includes("restaurant") || lower.includes("menu") || lower.includes("meniu")) {
    return "Ești un asistent cald și ospitalier. Faci oamenii să se simtă bineveniți, ca la o masă bună.";
  }

  // Default: CapeSystem tone
  return "Ești un asistent competent și direct. Răspunzi concis, ești helpful și profesionist.";
}

/* ─── CSS color extractor ─── */
function extractColors(html: string): { primary: string; accent: string } {
  // Try to find CSS variables or common color patterns
  const cssVarMatch = html.match(/--primary[^:]*:\s*([#\w()%,\s]+)/i);
  const accentMatch = html.match(/--accent[^:]*:\s*([#\w()%,\s]+)/i);

  // Fallback: look for hex colors in style tags
  const hexMatches = html.match(/#[0-9A-Fa-f]{6}/g) || [];
  const uniqueColors = Array.from(new Set(hexMatches)).filter(
    (c) => c !== "#ffffff" && c !== "#000000" && c !== "#FFFFFF" && c !== "#000000"
  );

  return {
    primary: cssVarMatch?.[1]?.trim() || uniqueColors[0] || "#89AACC",
    accent: accentMatch?.[1]?.trim() || uniqueColors[1] || "#4E85BF",
  };
}

/* ─── Contact extractor ─── */
function extractContact(text: string): { phone?: string; email?: string; ctaLink: string } {
  const phoneMatch = text.match(/(\+?40\s?7\d{2}\s?\d{3}\s?\d{3})/);
  const emailMatch = text.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);

  return {
    phone: phoneMatch?.[1],
    email: emailMatch?.[1],
    ctaLink: "/#contact",
  };
}

/* ─── Main scraper ─── */
export async function scrapeKnowledge(url: string): Promise<BrandConfig> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "CapeSystem-ChatBot/1.0 (knowledge indexer)" },
      next: { revalidate: 3600 }, // Cache 1h in Next.js
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const text = extractText(html);
    const colors = extractColors(html);
    const contact = extractContact(text);

    // Extract brand name from title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const brandName = titleMatch?.[1]?.split("|")[0]?.trim() || new URL(url).hostname;

    const brandVoice = detectBrandVoice(text, url);

    const knowledge = `
## Brand: ${brandName}
## URL: ${url}
${contact.phone ? `## Telefon: ${contact.phone}` : ""}
${contact.email ? `## Email: ${contact.email}` : ""}

## Conținut extras:
${text}
    `.trim();

    return {
      knowledge,
      brandVoice,
      primaryColor: colors.primary,
      accentColor: colors.accent,
      brandName,
      ctaLink: contact.ctaLink,
      phone: contact.phone,
      email: contact.email,
    };
  } catch (err) {
    console.warn("[scrapeKnowledge] Failed to scrape, using defaults:", err);

    // Graceful fallback — chatbot still works
    return {
      knowledge: `Brand la ${url}. Nu am putut extrage conținutul automat.`,
      brandVoice: "Ești un asistent helpful și profesionist.",
      primaryColor: "#89AACC",
      accentColor: "#4E85BF",
      brandName: new URL(url).hostname,
      ctaLink: "/#contact",
    };
  }
}

/* ─── CapeSystem static config (no scraping needed for own site) ─── */
export const CAPESYSTEM_CONFIG: BrandConfig = {
  brandName: "CapeSystem",
  primaryColor: "#89AACC",
  accentColor: "#4E85BF",
  ctaLink: "/audit",
  phone: "+40 733 874 143",
  email: "harapalb923@gmail.com",
  brandVoice: `Ești asistentul AI al CapeSystem. Direct, confident, cinematic — nu corporate.
Vorbești în română. După 2-3 schimburi, ghidezi natural spre audit sau WhatsApp.
Nu inventezi prețuri exacte. Nu spui că ești Claude sau AI.`,
  knowledge: `
CapeSystem face sisteme web custom (Next.js, 100/100 PageSpeed), SEO/GEO/AEO,
marketing automation și integrări AI. Maxim 2 clienți noi/lună.
Portofoliu: napoletano.ro (+312% trafic), azisunt.biz, StartFIRMĂ (5500+ firme).
Audit gratuit la https://azisunt.net/audit. WhatsApp: https://wa.me/40733874143.
  `.trim(),
};
