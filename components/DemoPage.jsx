"use client";

import { useState } from "react";

/**
 * DemoPage — reusable sales demo template.
 *
 * Config shape (current):
 * {
 *   businessName,
 *   hero:    { tagline, headline, subheadline, badge },
 *   colors:  { primary, accent },
 *   cta,
 *   contact: { phone, whatsapp, address, mapUrl },
 *   services: [{ icon, name, price }],
 *   gallery:  [{ src, alt }],    // empty = colored placeholders
 *   reviews:  [{ name, text, stars }],
 *   sections: ["services","gallery","reviews","contact"],  // optional ordering/filtering
 * }
 *
 * Legacy flat config (name/primaryColor/phone etc.) is auto-normalized.
 */

function normalizeConfig(raw) {
  // Already new nested shape
  if (raw.businessName !== undefined) return raw;
  // Convert legacy flat shape
  return {
    businessName: raw.name,
    hero: {
      tagline: raw.tagline || null,
      headline: raw.headline || raw.name,
      subheadline: raw.subheadline || null,
      badge: raw.badge || null,
    },
    colors: {
      primary: raw.primaryColor || "#2563eb",
      accent: raw.accentColor || "#1d4ed8",
    },
    cta: raw.cta || "Programează-te acum",
    contact: {
      phone: raw.phone || null,
      whatsapp: raw.whatsapp || null,
      address: raw.address || null,
      mapUrl: raw.mapUrl || null,
    },
    services: raw.services || [],
    gallery: raw.gallery || [],
    reviews: raw.reviews || [],
    sections: null,
  };
}

const DEFAULT_SECTIONS = ["services", "gallery", "reviews", "contact"];

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.399 5.609L0 24l6.545-1.379A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.49-5.19-1.348l-.37-.22-3.885.818.822-3.786-.242-.39A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

export default function DemoPage({ config: rawConfig }) {
  const config = normalizeConfig(rawConfig);
  const { businessName, hero, colors, cta, contact, services, gallery, reviews } = config;
  const activeSections = config.sections || DEFAULT_SECTIONS;

  const primaryColor = colors.primary;
  const accentColor = colors.accent;
  const accentBg = { backgroundColor: primaryColor };
  const accent = { color: primaryColor };

  const waLink = contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : null;
  const telLink = contact.phone ? `tel:${contact.phone}` : null;

  return (
    <div className="min-h-screen bg-[#080810] text-white font-body antialiased">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#080810]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-display text-lg font-bold tracking-tight">{businessName}</span>
          {telLink && (
            <a
              href={telLink}
              className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full text-white"
              style={accentBg}
            >
              Sună acum
            </a>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="px-4 pt-12 pb-10 max-w-lg mx-auto text-center">
        {hero.badge && (
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4"
            style={{ backgroundColor: `${primaryColor}20`, ...accent }}
          >
            {hero.badge}
          </div>
        )}
        {hero.tagline && (
          <p className="text-xs font-black uppercase tracking-[0.18em] mb-4" style={accent}>
            {hero.tagline}
          </p>
        )}
        <h1 className="font-display text-4xl font-bold leading-[1.1] mb-4 whitespace-pre-line">
          {hero.headline}
        </h1>
        {hero.subheadline && (
          <p className="text-[#94a3b8] text-[15px] leading-relaxed mb-8 max-w-sm mx-auto">
            {hero.subheadline}
          </p>
        )}
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white shadow-lg active:scale-95 transition-transform"
              style={accentBg}
            >
              <WaIcon />
              {cta}
            </a>
          )}
          {telLink && (
            <a
              href={telLink}
              className="py-3 rounded-2xl text-sm font-bold text-white/70 bg-white/5 active:scale-95 transition-transform text-center"
            >
              {contact.phone}
            </a>
          )}
        </div>
      </section>

      {/* SERVICES */}
      {activeSections.includes("services") && services.length > 0 && (
        <section className="px-4 pb-12 max-w-lg mx-auto">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-white/40 mb-5">
            Servicii
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4 flex flex-col gap-2"
              >
                {s.icon && <span className="text-2xl">{s.icon}</span>}
                <p className="text-sm font-bold leading-tight">{s.name}</p>
                {s.price && (
                  <p className="text-xs font-medium" style={accent}>{s.price}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GALLERY */}
      {activeSections.includes("gallery") && (
        <section className="px-4 pb-12 max-w-lg mx-auto">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-white/40 mb-5">
            Galerie
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {gallery.length > 0
              ? gallery.map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-white/5">
                    <img src={img.src} alt={img.alt || ""} className="w-full h-full object-cover" />
                  </div>
                ))
              : [0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-2xl flex items-center justify-center text-xs text-white/20 font-medium"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}18, ${accentColor}10)`,
                      border: `1px solid ${primaryColor}25`,
                    }}
                  >
                    Foto {i + 1}
                  </div>
                ))}
          </div>
        </section>
      )}

      {/* REVIEWS */}
      {activeSections.includes("reviews") && reviews.length > 0 && (
        <section className="px-4 pb-12 max-w-lg mx-auto">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-white/40 mb-5">
            Recenzii
          </h2>
          <div className="flex flex-col gap-3">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold">{r.name}</p>
                  <span className="text-xs text-yellow-400">{"★".repeat(r.stars ?? 5)}</span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT */}
      {activeSections.includes("contact") && (contact.phone || contact.address) && (
        <section className="px-4 pb-28 max-w-lg mx-auto">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-white/40 mb-5">
            Contact
          </h2>
          <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-3">
            {telLink && (
              <a href={telLink} className="flex items-center gap-3 text-sm font-medium">
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ ...accentBg, opacity: 0.9 }}
                >
                  📞
                </span>
                {contact.phone}
              </a>
            )}
            {contact.address && (
              <div className="flex items-center gap-3 text-sm font-medium text-white/60">
                <span className="w-8 h-8 rounded-xl bg-white/[0.06] flex items-center justify-center text-base flex-shrink-0">
                  📍
                </span>
                {contact.address}
              </div>
            )}
            {contact.mapUrl && (
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-medium text-white/40"
              >
                <span className="w-8 h-8 rounded-xl bg-white/[0.06] flex items-center justify-center text-base flex-shrink-0">
                  🗺️
                </span>
                Deschide în Maps
              </a>
            )}
          </div>
        </section>
      )}

      {/* STICKY WA BAR */}
      {waLink && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-[#080810] to-transparent pointer-events-none">
          <div className="max-w-lg mx-auto pointer-events-auto">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white shadow-2xl active:scale-95 transition-transform"
              style={accentBg}
            >
              <WaIcon />
              WhatsApp — scrie acum
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
