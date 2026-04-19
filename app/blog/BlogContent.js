"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, BookOpen, Zap, Brain,
  TrendingUp, Search, Globe, Star, Clock, Tag,
  ChevronRight, Rss, Mail, Phone, Sparkles
} from "lucide-react";

/* ─── UTILS & ANIMATIONS ─── */
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
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <div className="inline-flex items-center mb-7" style={{ background: "linear-gradient(90deg, #89AACC33, #4E85BF22)", borderRadius: 999, padding: "1px" }}>
      <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[hsl(var(--bg))]/80 backdrop-blur-sm text-[11px] font-display tracking-[0.2em] uppercase font-bold" style={{ color: "#89AACC" }}>
        <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)", boxShadow: "0 0 8px #89AACC80" }} />
        {children}
      </span>
    </div>
  );
}

/* ─── CONSTANTS ─── */
const CATEGORIES = ["Toate", "Studii de Caz", "SEO & GEO", "AI & Automatizare", "Web Systems", "AEO"];
const TAG_COLORS = {
  "Studii de Caz": { bg: "rgba(137,170,204,0.12)", color: "#89AACC", border: "rgba(137,170,204,0.25)" },
  "SEO & GEO":     { bg: "rgba(78,133,191,0.12)",  color: "#6FA3D8", border: "rgba(78,133,191,0.25)" },
  "AI & Automatizare": { bg: "rgba(99,102,241,0.12)", color: "#8B8FEF", border: "rgba(99,102,241,0.25)" },
  "Web Systems":   { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "rgba(255,255,255,0.12)" },
  "AEO":           { bg: "rgba(232,196,71,0.10)",  color: "#D4AF37", border: "rgba(232,196,71,0.25)" },
};

/* ─── SMALL COMPONENTS ─── */
function TagPill({ tag }) {
  const c = TAG_COLORS[tag] || TAG_COLORS["Web Systems"];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-body font-bold uppercase tracking-widest"
      style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
      {tag}
    </span>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <div className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-[hsl(var(--surface))]/80 px-4 py-2 transition-all duration-300 ${scrolled ? "shadow-lg shadow-black/40" : ""}`}>
        <div className="flex items-center gap-5">
          <a href="/" className="accent-gradient p-[1px] rounded-full">
            <div className="bg-[hsl(var(--bg))] rounded-full px-2 py-1 text-[11px] font-display italic font-bold text-white">CS</div>
          </a>
          <div className="hidden sm:flex gap-5 items-center text-[10px] uppercase tracking-widest text-[hsl(var(--muted))]">
            <a href="/#problema" className="hover:text-white transition-colors">Problema</a>
            <a href="/#work" className="hover:text-white transition-colors">Work</a>
            <a href="/blog" className="text-white border-b border-[#89AACC]/60 pb-0.5">Knowledge Hub</a>
          </div>
          <a href="/#contact" className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:scale-105 transition-transform">Vorbim? ↗</a>
        </div>
      </div>
    </nav>
  );
}

function BlogHero({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }) {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden border-b border-white/5 text-center sm:text-left">
      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal><Badge>Knowledge Hub · CapeSystem</Badge></Reveal>
        <motion.h1 className="font-display italic text-6xl md:text-8xl text-white mb-6 tracking-tighter leading-[0.9]">
          Authority <span className="text-[#89AACC]">Engine.</span>
        </motion.h1>
        <div className="relative max-w-md mb-10 mx-auto sm:mx-0">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input  
            type="text" placeholder="Caută articol..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-5 py-3 text-sm text-white outline-none focus:border-[#89AACC]/40 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-[#89AACC] text-black' : 'bg-white/5 text-white/50 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ article }) {
  return (
    <a href={`/blog/${article.slug}`} className="group relative block p-10 bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden hover:border-[#89AACC]/40 transition-all duration-300">
      <div className="flex gap-3 mb-6"><TagPill tag={article.tag} /></div>
      <h2 className="font-display italic text-3xl md:text-5xl text-white mb-4 leading-tight">{article.title}</h2>
      <p className="text-[hsl(var(--muted))] text-sm mb-8 max-w-2xl">{article.excerpt}</p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3 text-[10px] text-[hsl(var(--muted))] uppercase tracking-widest">
          <Clock size={12} /> {article.readTime} • {article.date}
        </div>
        <div className="text-[#89AACC] text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">Citește <ArrowUpRight size={14}/></div>
      </div>
    </a>
  );
}

function ArticleCard({ article, delay }) {
  return (
    <Reveal delay={delay}>
      <a href={`/blog/${article.slug}`} className="group block p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:border-white/20 transition-all duration-300 h-full flex flex-col">
        <div className="mb-4"><TagPill tag={article.tag} /></div>
        <h3 className="font-display italic text-xl text-white mb-3 flex-1">{article.title}</h3>
        <p className="text-[hsl(var(--muted))] text-sm mb-6 line-clamp-3">{article.excerpt}</p>
        <div className="flex items-center justify-between text-[10px] text-[hsl(var(--muted))] uppercase tracking-widest">
          <span>{article.readTime}</span>
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </a>
    </Reveal>
  );
}

function VisibilityStack() {
  return (
    <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem]">
      <p className="text-[10px] font-bold text-[#89AACC] uppercase tracking-[0.2em] mb-6">Trifecta Vizibilitate</p>
      <div className="space-y-4">
        {[
          { label: "SEO", title: "Search Engine Optimization", color: "#89AACC" },
          { label: "GEO", title: "Generative Engine Optimization", color: "#6FA3D8" },
          { label: "AEO", title: "Answer Engine Optimization", color: "#8B8FEF" }
        ].map(item => (
          <div key={item.label} className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">{item.label}</span>
            <span className="text-[11px] text-[hsl(var(--muted))] leading-tight">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIReadinessQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(null);
  const steps = [
    { q: "În ce domeniu activezi?", options: ["E-commerce", "Servicii/B2B", "Imobiliare", "Altele"] },
    { q: "Blocaj principal?", options: ["Task-uri Manuale", "Puține Lead-uri", "Viteză Mică", "Costuri Mari"] }
  ];
  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else { setScore(Math.floor(Math.random() * (98 - 85 + 1) + 85)); setStep(3); }
  };
  return (
    <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#89AACC]/10 to-transparent border border-[#89AACC]/20 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6 text-[#89AACC]">
          <Brain size={16} /> <span className="text-[9px] font-bold uppercase tracking-widest">AI Audit Rapid</span>
        </div>
        <AnimatePresence mode="wait">
          {step < 2 ? (
            <motion.div key={step} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
              <p className="font-display italic text-lg text-white mb-5">{steps[step].q}</p>
              <div className="grid gap-2">
                {steps[step].options.map(opt => (
                  <button key={opt} onClick={handleNext} className="text-left px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/70 hover:bg-[#89AACC]/10 hover:text-white transition-all">{opt}</button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <Sparkles className="text-[#89AACC] mx-auto mb-3" size={24} />
              <p className="font-display italic text-xl text-white mb-1">Scor: {score}%</p>
              <p className="text-[9px] text-white/50 uppercase tracking-widest mb-5">Ești gata pentru automatizare</p>
              <a href="/#contact" className="inline-block bg-[#89AACC] text-black px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest hover:scale-105 transition-all">Vezi Strategia ↗</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <Badge>AEO · FAQ</Badge>
        <h2 className="font-display italic text-4xl text-white mb-6">Întrebări frecvente</h2>
        <p className="text-[hsl(var(--muted))] text-sm max-w-lg mb-10">Structură optimizată pentru Google Featured Snippets și instruirea modelelor LLM.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5 text-center text-[9px] text-[hsl(var(--muted))] uppercase tracking-[0.3em] font-bold">
      © {new Date().getFullYear()} CapeSystem · Authority Engine · Azisunt.net
    </footer>
  );
}

/* ─── MAIN EXPORT ─── */
export default function BlogContent({ initialArticles }) {
  const [activeCategory, setActiveCategory] = useState("Toate");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = initialArticles.filter((a) => {
    const matchCat = activeCategory === "Toate" || a.category === activeCategory || a.tag === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden selection:bg-[#89AACC] selection:text-black">
      <Navbar />
      <BlogHero 
        activeCategory={activeCategory} setActiveCategory={setActiveCategory} 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
      />
      
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Articles */}
            <div className="lg:col-span-8 space-y-8">
              {featured && <FeaturedCard article={featured} />}
              {rest.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {rest.map((a, i) => <ArticleCard key={a.slug} article={a} delay={i * 80} />)}
                </div>
              ) : !featured && (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-[3rem]">
                  <p className="font-display italic text-2xl text-white/20">Niciun articol găsit.</p>
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <VisibilityStack />
              <AIReadinessQuiz />
              <div className="p-8 bg-[#89AACC]/10 border border-[#89AACC]/20 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#89AACC]/5 blur-3xl -mr-12 -mt-12 group-hover:bg-[#89AACC]/10 transition-colors" />
                <p className="text-white font-display italic text-xl mb-2 relative z-10">Fii primul care citește.</p>
                <p className="text-[9px] text-[hsl(var(--muted))] uppercase tracking-widest mb-6 relative z-10 leading-relaxed">Studii de caz și tactici noi, direct în inbox.</p>
                <a href="/#contact" className="inline-block text-[10px] font-bold text-[#89AACC] uppercase tracking-[0.2em] hover:underline relative z-10 transition-all">Mă abonez ↗</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </main>
  );
}