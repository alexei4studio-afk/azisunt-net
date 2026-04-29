"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Brain, TrendingUp,
  Search, Globe, Star, Clock, ChevronRight, Rss,
} from "lucide-react";

const WA_LINK = "https://wa.me/40733874143";
const CATEGORIES = ["Toate", "Studii de Caz", "SEO & GEO", "AI & Automatizare", "Web Systems", "AEO"];

const TAG_COLORS = {
  "Studii de Caz":     { bg: "rgba(137,170,204,0.12)", color: "#89AACC",               border: "rgba(137,170,204,0.25)" },
  "SEO & GEO":         { bg: "rgba(78,133,191,0.12)",  color: "#6FA3D8",               border: "rgba(78,133,191,0.25)"  },
  "AI & Automatizare": { bg: "rgba(99,102,241,0.12)",  color: "#8B8FEF",               border: "rgba(99,102,241,0.25)"  },
  "Web Systems":       { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "rgba(255,255,255,0.12)" },
  "AEO":               { bg: "rgba(232,196,71,0.10)",  color: "#D4AF37",               border: "rgba(232,196,71,0.25)"  },
};

/* ─── AEO FAQ DATA ─── */
export const FAQS = [
  {
    q: "Ce este GEO (Generative Engine Optimization)?",
    a: "GEO este practica de a structura conținutul și datele unui site (prin JSON-LD, entități semantice și autoritate topică) astfel încât modelele AI precum ChatGPT sau Perplexity să poată identifica și recomanda brandul tău ca răspuns la întrebările utilizatorilor.",
  },
  {
    q: "Cât durează să apari în răspunsurile AI?",
    a: "Primele rezultate apar în 30–90 de zile de la implementarea corectă a structurii de date și publicarea consecventă a conținutului de autoritate. Viteza depinde de nișă și de volumul de conținut existent.",
  },
  {
    q: "AEO vs SEO — care e diferența principală?",
    a: "SEO optimizează pentru motoarele de căutare clasice (Google, Bing) prin cuvinte cheie și linkuri. AEO optimizează pentru motoarele de răspuns (Google Featured Snippets, SGE, AI Overview) prin structuri Q&A și răspunsuri directe, concise și factuale.",
  },
  {
    q: "Poate un site mic să domine căutările AI?",
    a: "Da. Autoritatea topică bătă dimensiunea site-ului. Un site cu 20 de articole profunde pe o nișă specifică va fi citat de AI mai des decât un site cu 500 de articole generice. Calitatea și structura primează.",
  },
];

/* ─── HELPERS ─── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`${className} transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function TagPill({ tag }) {
  const c = TAG_COLORS[tag] ?? TAG_COLORS["Web Systems"];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-body font-bold uppercase tracking-widest"
      style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
      {tag}
    </span>
  );
}

/* ─── FEATURED CARD ─── */
function FeaturedCard({ article }) {
  return (
    <a href={`/blog/${article.slug}`}
      className="group relative flex flex-col h-full p-10 bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-[3rem] overflow-hidden hover:border-[#89AACC]/40 hover:-translate-y-1 transition-all duration-300">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(circle at 20% 50%,rgba(137,170,204,0.07) 0%,transparent 65%)" }} />
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-body font-bold uppercase tracking-widest"
          style={{ background: "rgba(137,170,204,0.15)", color: "#89AACC", border: "1px solid rgba(137,170,204,0.3)" }}>
          <Star size={8} className="fill-current" /> Featured
        </span>
        <TagPill tag={article.tag} />
      </div>
      <h2 className="font-display italic text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-4 relative z-10">{article.title}</h2>
      <p className="text-[hsl(var(--muted))] font-body text-sm leading-relaxed mb-8 relative z-10 max-w-2xl">{article.excerpt}</p>
      {article.stats && (
        <div className="flex flex-wrap gap-4 mb-8 relative z-10">
          {article.stats.map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/8 rounded-2xl px-4 py-3 text-center min-w-[90px]">
              <p className="font-display italic text-xl text-white leading-none mb-0.5">{s.value}</p>
              <p className="font-body text-[9px] text-[hsl(var(--muted))] uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between mt-auto relative z-10">
        <div className="flex items-center gap-3 text-[hsl(var(--muted))] text-[10px] font-body">
          <Clock size={11} /><span>{article.readTime} citire</span>
          <span className="w-1 h-1 rounded-full bg-white/20" /><span>{article.date}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#89AACC] group-hover:gap-4 transition-all uppercase tracking-widest">
          Citește <ArrowUpRight size={13} />
        </div>
      </div>
    </a>
  );
}

/* ─── ARTICLE CARD ─── */
function ArticleCard({ article, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <a href={`/blog/${article.slug}`}
        className="group flex flex-col h-full p-8 bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-[2.5rem] hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-2 mb-5"><TagPill tag={article.tag} /></div>
        <h3 className="font-display italic text-xl text-white leading-snug mb-3 group-hover:text-white/90 transition-colors flex-1">{article.title}</h3>
        <p className="text-[hsl(var(--muted))] font-body text-sm leading-relaxed mb-6 line-clamp-3">{article.excerpt}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-[hsl(var(--muted))] text-[10px] font-body">
            <Clock size={10} /><span>{article.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" /><span>{article.date}</span>
          </div>
          <ChevronRight size={14} className="text-white/25 group-hover:text-[#89AACC] group-hover:translate-x-1 transition-all" />
        </div>
      </a>
    </Reveal>
  );
}

/* ─── SIDEBAR ─── */
function VisibilityStack() {
  const pillars = [
    { icon: <Search size={16} />, title: "Search Engine Optimization", desc: "Cuvinte cheie: «Web Systems Romania», «Automatizare Afaceri».", color: "#89AACC" },
    { icon: <Globe size={16} />,  title: "Generative Engine Optimization", desc: "JSON-LD și autoritate topică pentru ChatGPT, Perplexity, Gemini.", color: "#6FA3D8" },
    { icon: <Brain size={16} />,  title: "Answer Engine Optimization", desc: "Q&A structurat pentru Featured Snippets și AI Overview.", color: "#8B8FEF" },
  ];
  return (
    <div className="bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-[2.5rem] p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#89AACC22,#4E85BF11)", border: "1px solid rgba(137,170,204,0.2)" }}>
          <TrendingUp size={14} style={{ color: "#89AACC" }} />
        </div>
        <div>
          <p className="text-white text-sm font-display italic">Trifecta Vizibilitate</p>
          <p className="text-[hsl(var(--muted))] text-[9px] font-body uppercase tracking-widest">SEO · GEO · AEO</p>
        </div>
      </div>
      <div className="space-y-4">
        {pillars.map((p) => (
          <div key={p.title} className="flex gap-4 p-4 rounded-2xl bg-white/3 border border-white/6 hover:border-white/12 transition-colors">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `${p.color}18`, color: p.color }}>{p.icon}</div>
            <div>
              <p className="text-white text-xs font-display italic mb-1">{p.title}</p>
              <p className="text-[hsl(var(--muted))] text-[11px] font-body leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsletterCTA() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] p-8"
      style={{ background: "linear-gradient(135deg,rgba(137,170,204,0.1) 0%,rgba(78,133,191,0.05) 100%)", border: "1px solid rgba(137,170,204,0.2)" }}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(137,170,204,0.12) 0%,transparent 70%)" }} />
      <Rss size={20} className="mb-4 relative z-10" style={{ color: "#89AACC" }} />
      <p className="font-display italic text-xl text-white mb-2 relative z-10">Fii primul care citește.</p>
      <p className="text-[hsl(var(--muted))] font-body text-xs leading-relaxed mb-6 relative z-10">Studii de caz noi și sisteme AI — direct în inbox. Fără spam.</p>
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 accent-gradient text-[hsl(var(--bg))] font-bold text-xs px-6 py-3 rounded-full hover:scale-105 transition-transform uppercase tracking-widest relative z-10">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.849L.057 23.571a.75.75 0 0 0 .921.921l5.722-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.962-1.359l-.355-.212-3.695.953.977-3.58-.232-.368A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
        </svg>
        Contactează pe WhatsApp
        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}

/* ─── FAQ ACCORDION — active, with Schema.org markup ─── */
function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section
      className="py-24 px-6 border-t border-[hsl(var(--stroke))]/20"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-12">
          <div className="inline-flex items-center mb-7"
            style={{ background: "linear-gradient(90deg,#89AACC33,#4E85BF22)", borderRadius: 999, padding: "1px" }}>
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[hsl(var(--bg))]/80 backdrop-blur-sm text-[11px] font-display tracking-[0.2em] uppercase font-bold" style={{ color: "#89AACC" }}>
              <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: "linear-gradient(135deg,#89AACC,#4E85BF)" }} />
              AEO · Featured Snippets
            </span>
          </div>
          <h2 className="font-display italic text-4xl md:text-5xl text-white tracking-tight">Întrebări frecvente</h2>
          <p className="text-[hsl(var(--muted))] font-body text-sm mt-3 max-w-lg">
            Structurate pentru Google Featured Snippets și răspunsuri directe în ChatGPT.
          </p>
        </Reveal>

        <div className="space-y-3 max-w-3xl">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                className="bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition-all"
                onClick={() => setOpen(open === i ? null : i)}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <div className="flex items-center justify-between px-6 py-5 gap-4">
                  <p className="font-display italic text-white text-base" itemProp="name">{faq.q}</p>
                  <motion.div animate={{ rotate: open === i ? 90 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                    <ChevronRight size={16} className="text-white/40" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
                    >
                      <div className="px-6 pb-5 border-t border-white/5">
                        <p className="text-[hsl(var(--muted))] font-body text-sm leading-relaxed pt-4" itemProp="text">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HERO (search + filters live) ─── */
function BlogHero({ activeCategory, setActiveCategory, searchQuery, setSearchQuery, totalArticles }) {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden border-b border-[hsl(var(--stroke))]/20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse,rgba(137,170,204,0.06) 0%,transparent 70%)" }} />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center mb-7"
            style={{ background: "linear-gradient(90deg,#89AACC33,#4E85BF22)", borderRadius: 999, padding: "1px" }}>
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[hsl(var(--bg))]/80 backdrop-blur-sm text-[11px] font-display tracking-[0.2em] uppercase font-bold" style={{ color: "#89AACC" }}>
              <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: "linear-gradient(135deg,#89AACC,#4E85BF)", boxShadow: "0 0 8px #89AACC80" }} />
              Knowledge Hub · CapeSystem
            </span>
          </div>
        </motion.div>

        <motion.h1 className="font-display italic text-5xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tighter mb-6"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          Authority
          <br />
          <span className="bg-clip-text text-transparent"
            style={{ background: "linear-gradient(90deg,#89AACC 0%,#4E85BF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Engine.
          </span>
        </motion.h1>

        <motion.p className="text-[hsl(var(--muted))] font-body text-base max-w-xl mb-10 leading-relaxed"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          Studii de caz reale, tactici SEO/GEO/AEO și sisteme AI.{" "}
          <span className="text-white/30 text-[10px] font-body uppercase tracking-widest ml-1">
            {totalArticles} {totalArticles === 1 ? "articol" : "articole"}
          </span>
        </motion.p>

        {/* ── Search — ACTIVE ── */}
        <motion.div className="relative max-w-md mb-10"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
          <input
            type="text"
            placeholder="Caută articol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[hsl(var(--surface))] border border-white/10 rounded-full pl-10 pr-5 py-3 text-white text-sm placeholder:text-white/25 focus:border-[#89AACC]/40 outline-none transition-colors"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors text-xs">
              ✕
            </button>
          )}
        </motion.div>

        {/* ── Category filters ── */}
        <motion.div className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-body font-bold uppercase tracking-widest transition-all duration-200 ${
                activeCategory === cat
                  ? "text-[hsl(var(--bg))] scale-105"
                  : "bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/25"
              }`}
              style={activeCategory === cat ? { background: "linear-gradient(90deg,#89AACC,#4E85BF)" } : {}}>
              {cat}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4">
      <div className={`inline-flex items-center h-[45px] rounded-full backdrop-blur-md border border-white/10 bg-[hsl(var(--surface))]/80 px-4 transition-all duration-300 gap-4 ${scrolled ? "shadow-lg shadow-black/40" : ""}`}>

        {/* Logo — h-[52px] overflows pill via -my-2 */}
        <a href="/" className="flex items-center -my-2 hover:scale-105 transition-transform">
          <img
            src="/logo.png"
            alt="CapeSystem"
            className="h-[52px] w-auto object-contain"
            style={{ filter: "drop-shadow(0 0 8px rgba(137,170,204,0.3))" }}
          />
        </a>

        {/* Desktop links */}
        <div className="hidden sm:flex gap-5 items-center">
          <a href="/#problema" className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted))] hover:text-white transition-colors">Problema</a>
          <a href="/#work"     className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted))] hover:text-white transition-colors">Work</a>
          <a href="/blog"      className="text-[10px] uppercase tracking-widest text-white border-b border-[#89AACC]/60 pb-0.5">Knowledge Hub</a>
          <a href="https://azisunt.shop" target="_blank" rel="noopener noreferrer"
             className="text-[10px] uppercase tracking-widest font-bold transition-colors" style={{ color: "#89AACC" }}>
            Shop ↗
          </a>
          <a href="/audit"     className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold transition-colors" style={{ color: "#89AACC" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            AI Audit
          </a>
        </div>

        {/* AI Audit — always visible on mobile (outside hidden div) */}
        <a href="/audit"
          className="sm:hidden inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-black"
          style={{ color: "#89AACC" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
          Audit
        </a>

        <a href="/#contact" className="bg-white text-[hsl(var(--bg))] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:scale-105 transition-transform">
          Vorbim? ↗
        </a>
      </div>
    </nav>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--stroke))]/20 pt-10 pb-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="CapeSystem"
            className="h-[44px] w-auto object-contain"
            style={{ filter: "drop-shadow(0 0 8px rgba(137,170,204,0.3))" }}
          />
          <div>
            <p className="font-display italic text-sm text-white">CapeSystem</p>
            <p className="text-[9px] text-[hsl(var(--muted))] font-body uppercase tracking-widest">azisunt.net</p>
          </div>
        </div>
        <p className="text-[10px] font-body text-center order-last md:order-none" style={{ color: "#89AACC" }}>
          © {new Date().getFullYear()} CapeSystem · Authority Engine · SEO · GEO · AEO
        </p>
        <div className="flex items-center gap-3">
          <a href="mailto:harapalb923@gmail.com" className="text-[10px] font-body text-white/40 hover:text-white transition-colors">harapalb923@gmail.com</a>
          <span className="w-px h-3 bg-white/15" />
          <a href="https://azisunt.shop" target="_blank" rel="noopener noreferrer"
             className="text-[10px] font-body text-white/40 hover:text-white transition-colors uppercase tracking-widest">
            Shop ↗
          </a>
          <span className="w-px h-3 bg-white/15" />
          <a href="/" className="text-[10px] font-body text-white/40 hover:text-white transition-colors uppercase tracking-widest">← Înapoi la site</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN EXPORT ─── */
export default function BlogContent({ articles = [] }) {
  const [activeCategory, setActiveCategory] = useState("Toate");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  // Garantăm că e array valid chiar dacă props vine undefined
  const safeArticles = Array.isArray(articles) ? articles : [];

  // ── FILTER: uses ALL articles passed from Server Component (not sliced) ──
  const filtered = safeArticles.filter((a) => {
    const matchCat = activeCategory === "Toate" || a.category === activeCategory || a.tag === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || (a.tag ?? "").toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  // Reset pagination when filters change
  useEffect(() => { setVisibleCount(6); }, [activeCategory, searchQuery]);

  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);
  const visibleRest = rest.slice(0, visibleCount - 1);
  const hasMore = rest.length > visibleRest.length;

  return (
    <main className="bg-[hsl(var(--bg))] min-h-screen text-[hsl(var(--text))] overflow-x-hidden">
      <Navbar />
      <BlogHero
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalArticles={safeArticles.length}
      />

      {/* Articles grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <Reveal className="text-center py-24">
              <p className="font-display italic text-3xl text-white/30">Niciun articol găsit.</p>
              <button onClick={() => { setActiveCategory("Toate"); setSearchQuery(""); }}
                className="mt-6 text-xs font-body text-[#89AACC] hover:underline">
                Resetează filtrele
              </button>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                {featured && <Reveal><FeaturedCard article={featured} /></Reveal>}
                {rest.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-6">
                    {visibleRest.map((a, i) => <ArticleCard key={a.slug} article={a} delay={i * 80} />)}
                  </div>
                )}
                {hasMore && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setVisibleCount((v) => v + 6)}
                      className="px-8 py-3 rounded-full border border-[#89AACC]/40 text-[#89AACC] text-xs font-bold uppercase tracking-widest hover:bg-[#89AACC]/10 transition-all">
                      Încarcă mai multe →
                    </button>
                  </div>
                )}
              </div>
              <div className="lg:col-span-4 space-y-6">
                <Reveal delay={100}><VisibilityStack /></Reveal>
                <Reveal delay={200}><NewsletterCTA /></Reveal>
                <Reveal delay={300}>
                  <div className="bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-[2.5rem] p-8">
                    <p className="text-[hsl(var(--muted))] text-[9px] uppercase tracking-widest font-body mb-5">Impact Hub</p>
                    <div className="space-y-4">
                      {[
                        { value: String(safeArticles.length), label: "Articole publicate" },
                        { value: String(safeArticles.filter((a) => a.category === "Studii de Caz").length), label: "Studii de caz" },
                        { value: "SEO+GEO+AEO", label: "Acoperire vizibilitate" },
                      ].map((s) => (
                        <div key={s.label} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-none last:pb-0">
                          <p className="text-[hsl(var(--muted))] font-body text-xs">{s.label}</p>
                          <p className="font-display italic text-white text-sm">{s.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── AEO FAQ — ACTIVE ── */}
      <FAQSection />

      <Footer />
    </main>
  );
}