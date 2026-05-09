"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, Zap, Globe, BarChart3,
  MapPin, Search, Brain, Clock, Target, TrendingUp,
  ChevronDown, Phone,
} from "lucide-react";

const WA_LINK = "https://wa.me/40733874143";

/* ─── useInView ─── */
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
      <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-bg/80 backdrop-blur-sm text-[11px] font-display tracking-[0.2em] uppercase font-bold" style={{ color: "#89AACC" }}>
        <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)", boxShadow: "0 0 8px #89AACC80" }} />
        {children}
      </span>
    </div>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 transition-all duration-200 hover:border-[#89AACC]/50 hover:text-[#89AACC] hover:bg-white/5">
      {children}
    </a>
  );
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4">
      <div className={`inline-flex items-center rounded-full backdrop-blur-xl border border-white/10 bg-[hsl(var(--surface))]/90 px-4 h-[45px] transition-all duration-300 gap-4 ${scrolled ? "shadow-2xl shadow-black/30" : ""}`}>
        <a href="/" className="flex items-center -my-2 hover:scale-105 transition-transform">
          <img src="/logo.png" alt="CapeSystem" className="h-[52px] w-auto object-contain"
            style={{ filter: "drop-shadow(0 0 8px rgba(137,170,204,0.3))" }} />
        </a>

        <div className="hidden md:flex items-center gap-5">
          <a href="/#work" className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted))] hover:text-white transition-colors">Work</a>
          <a href="/blog"   className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted))] hover:text-white transition-colors">Blog</a>
          <a href="/webagency" className="text-[10px] uppercase tracking-widest font-black text-white">Plan Pro</a>
          <a href="/audit" className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-black" style={{ color: "#89AACC" }}>
            <Zap size={11} /> AI Audit
          </a>
        </div>

        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 font-black text-[10px] px-4 py-1.5 rounded-full uppercase tracking-wider hover:scale-105 transition-transform"
          style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)", color: "#080810" }}>
          Vorbim
        </a>

        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
          className="md:hidden inline-flex items-center gap-1 font-black text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider"
          style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)", color: "#080810" }}>
          Vorbim
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-1" aria-label="Meniu">
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="absolute top-full mt-3 w-[calc(100%-2rem)] max-w-sm bg-[hsl(var(--surface))]/98 backdrop-blur-2xl border border-white/10 rounded-[2rem] px-6 py-6 flex flex-col gap-4 shadow-2xl">
          <a href="/#work" onClick={() => setOpen(false)} className="text-base text-white/80 hover:text-white font-display italic border-b border-white/5 pb-3">Work</a>
          <a href="/blog"  onClick={() => setOpen(false)} className="text-base text-white/80 hover:text-white font-display italic border-b border-white/5 pb-3">Blog</a>
          <a href="/webagency" onClick={() => setOpen(false)} className="text-base text-white font-display italic font-black border-b border-white/5 pb-3">Plan Pro</a>
          <a href="/audit" onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-base font-black uppercase tracking-widest pb-3 border-b border-white/5"
            style={{ color: "#89AACC" }}>
            <Zap size={13} /> AI Audit
          </a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 font-black text-sm px-6 py-3 rounded-2xl text-white uppercase tracking-widest"
            style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)" }}>
            Vorbim pe WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--stroke))]/20 pt-10 pb-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center hover:scale-105 transition-transform">
            <img src="/logo.png" alt="CapeSystem" className="h-[44px] w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 8px rgba(137,170,204,0.3))" }} />
          </a>
          <div>
            <p className="font-display italic text-sm text-white">CapeSystem</p>
            <p className="text-[9px] text-[hsl(var(--muted))] font-body uppercase tracking-widest">azisunt.net</p>
          </div>
        </div>
        <p className="text-[10px] text-[hsl(var(--muted))] font-body text-center order-last md:order-none">
          © {new Date().getFullYear()} CapeSystem · High-Performance Web Systems & Digital Marketing
        </p>
        <div className="flex items-center gap-2.5">
          <SocialLink href="https://www.tiktok.com/@capesystempower" label="TikTok">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg>
          </SocialLink>
          <SocialLink href="https://www.facebook.com/CSLEGION" label="Facebook">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </SocialLink>
          <SocialLink href="https://instagram.com/capesystemdesign" label="Instagram">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
          </SocialLink>
          <div className="w-px h-4 bg-white/8 mx-1" />
          <SocialLink href="mailto:harapalb923@gmail.com" label="Email">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </SocialLink>
          <SocialLink href="tel:+40733874143" label="Telefon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </SocialLink>
        </div>
      </div>
    </footer>
  );
}

/* ─── 1. HERO ─── */
function Hero() {
  return (
    <section className="relative pt-36 pb-24 px-6 border-b border-[hsl(var(--stroke))]/20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(137,170,204,0.07) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="max-w-4xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Badge>CapeSystem · Plan Pro · Webagency AI-First</Badge>
        </motion.div>

        <motion.h1
          className="font-display italic text-5xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tighter mb-6"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
        >
          Un site care aduce
          <br />
          <span className="bg-clip-text text-transparent"
            style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            clienți din Google.
          </span>
        </motion.h1>

        <motion.p
          className="text-[hsl(var(--muted))] font-body text-base sm:text-lg max-w-xl mb-10 leading-relaxed"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        >
          Webagency AI-first pentru afaceri locale care vor clienți din Google Search, Google Maps și recomandări AI. Nu o broșură online — un canal de achiziție.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 mb-16"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        >
          <a href="/audit"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)", color: "#080810" }}>
            Solicită audit gratuit <ArrowRight size={14} />
          </a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
            Vorbim pe WhatsApp
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-3 gap-4 max-w-lg"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        >
          {[
            { value: "+312%", label: "Trafic organic · napoletano.ro" },
            { value: "2/lună", label: "Clienți noi maxim" },
            { value: "100/100", label: "PageSpeed score" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display italic text-2xl text-white mb-0.5">{s.value}</p>
              <p className="text-[hsl(var(--muted))] font-body text-[9px] uppercase tracking-wider leading-tight">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 2. PENTRU CINE ─── */
function PentruCine() {
  const cards = [
    {
      icon: <Globe size={28} />,
      title: "Afaceri locale cu servicii clare",
      desc: "Cabinet stomatologic, service auto, salon, restaurant, firmă de construcții, avocat, psiholog. Dacă ai un serviciu real și o zonă geografică definită, asta e pentru tine.",
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Proprietari care pierd clienți la concurență",
      desc: "Concurența ta apare pe Google Maps, tu nu. Sau apari la pagina 2. Clienții ajung la ei, nu la tine — și de cele mai multe ori nici nu știi că s-a întâmplat.",
    },
    {
      icon: <Target size={28} />,
      title: "Afaceri care vor trafic calificat, nu vanitate",
      desc: "Nu vrei 5.000 de vizitatori care nu sună. Vrei 200 de oameni care caută exact serviciul tău, în orașul tău, și contactează.",
    },
    {
      icon: <Brain size={28} />,
      title: "Afaceri care vor să fie recomandate de AI",
      desc: "ChatGPT, Google AI Overview și Perplexity încep să recomande afaceri locale. Vrei să fii pe lista scurtă a AI-ului când cineva din zona ta întreabă.",
    },
  ];

  return (
    <section className="py-24 px-6 border-b border-[hsl(var(--stroke))]/20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <Badge>Pentru cine</Badge>
          <h2 className="font-display italic text-4xl md:text-6xl tracking-tight mb-4">
            Plan Pro este pentru afaceri locale
            <br />
            <span style={{ background: "linear-gradient(90deg, #89AACC, #4E85BF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              care vor clienți reali.
            </span>
          </h2>
          <p className="text-[hsl(var(--muted))] font-body text-base max-w-lg mx-auto">
            Nu pentru oricine. Lucrăm cu afaceri care înțeleg că un site este o investiție, nu o cheltuială.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="group h-full p-10 bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-[2.5rem] hover:border-[#89AACC]/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-[#89AACC]"
                  style={{ background: "rgba(137,170,204,0.1)", border: "1px solid rgba(137,170,204,0.2)" }}>
                  {c.icon}
                </div>
                <h3 className="font-display italic text-2xl text-white mb-3">{c.title}</h3>
                <p className="text-[hsl(var(--muted))] font-body text-sm leading-relaxed">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3. PROBLEMA ─── */
function Problema() {
  const problems = [
    { title: "Fără pagini separate pe servicii", desc: "Dacă toate serviciile sunt pe o pagină, Google nu știe ce oferi exact. Nu poate clasifica bine nicio cerere." },
    { title: "Fără pagini de locație", desc: "Nu apari pe căutări locale specifice. Cineva care caută dentist Cluj-Napoca nu te găsește dacă nu ai o pagină dedicată." },
    { title: "Google Maps neintegrat strategic", desc: "Profilul Google Business există, dar nu este conectat cu site-ul și nu primește semnalele care contează pentru ranking local." },
    { title: "Conținut necitabil de AI", desc: "ChatGPT și Google AI Overview ignoră site-urile cu text vag. Structura trebuie construită explicit pentru extragere automată." },
    { title: "Nu convertește pe mobil", desc: "Fără buton WhatsApp, fără CTA clar, fără formular scurt. 70%+ din căutările locale se fac pe telefon." },
    { title: "Viteză slabă", desc: "Un site care se încarcă în 5 secunde pierde jumătate din vizitatorii de pe mobil înainte ca aceștia să vadă prima pagină." },
  ];

  return (
    <section className="py-24 px-6 border-b border-[hsl(var(--stroke))]/20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-16">
          <Badge>Problema</Badge>
          <h2 className="font-display italic text-4xl md:text-6xl tracking-tight mb-4">
            De ce site-ul tău nu aduce clienți.
          </h2>
          <p className="text-[hsl(var(--muted))] font-body text-base max-w-lg">
            Un site de prezentare obișnuit este construit pentru a arăta bine, nu pentru a aduce clienți. Sunt două lucruri diferite.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="h-full p-8 bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-[2rem] hover:border-red-500/25 transition-all duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-red-500/60 mt-2" />
                  <h3 className="font-display italic text-lg text-white leading-tight">{p.title}</h3>
                </div>
                <p className="text-[hsl(var(--muted))] font-body text-sm leading-relaxed pl-4">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. CE INCLUDE ─── */
function CeInclude() {
  const groups = [
    {
      label: "Site",
      items: [
        "Next.js — performanță maximă, 100/100 PageSpeed",
        "Responsive — optimizat complet pentru mobil",
        "Homepage clar cu mesaj de achiziție",
        "Pagini separate pentru fiecare serviciu principal",
        "Pagini de locație pentru fiecare oraș sau zonă",
      ],
    },
    {
      label: "SEO local & Google Maps",
      items: [
        "Structura meta: titluri, descrieri, canonical",
        "Schema markup: LocalBusiness, Service, FAQ",
        "Sitemap XML + robots.txt",
        "Google Business Profile — setup și optimizare",
        "Consistența datelor pe platformele externe",
      ],
    },
    {
      label: "Vizibilitate AI (AEO)",
      items: [
        "Pagini FAQ structurate pentru extragere automată",
        "Conținut cu răspunsuri directe la întrebări reale",
        "Entități clare: nume, serviciu, locație, program",
        "2–3 articole pillar pentru topicuri de achiziție",
      ],
    },
    {
      label: "Conversie & tracking",
      items: [
        "Buton WhatsApp vizibil pe mobil",
        "Formular de contact scurt (3 câmpuri max)",
        "Număr telefon click-to-call",
        "CTA clar pe fiecare pagină importantă",
        "Google Analytics 4 + Search Console + GBP Insights",
      ],
    },
  ];

  return (
    <section className="py-24 px-6 border-b border-[hsl(var(--stroke))]/20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <Badge>Ce primești</Badge>
          <h2 className="font-display italic text-4xl md:text-6xl tracking-tight mb-4">
            Ce include{" "}
            <span style={{ background: "linear-gradient(90deg, #89AACC, #4E85BF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Plan Pro.
            </span>
          </h2>
          <p className="text-[hsl(var(--muted))] font-body text-base max-w-lg mx-auto">
            Nu o listă de funcții. Un sistem complet de achiziție construit pentru afacerea ta locală.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((g, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="h-full p-10 bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-[2.5rem] hover:border-[#89AACC]/25 transition-all duration-300">
                <div className="inline-flex items-center gap-1.5 mb-6 px-3 py-1 rounded-full border border-[#89AACC]/30 bg-[#89AACC]/8">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#89AACC" }}>{g.label}</span>
                </div>
                <ul className="space-y-3">
                  {g.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#89AACC" }} />
                      <span className="text-[hsl(var(--muted))] font-body text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. TREI STRATURI ─── */
function TreiStraturi() {
  const layers = [
    {
      nr: "01",
      icon: <Globe size={22} />,
      label: "Site",
      title: "Fundația",
      desc: "Un site clar, rapid și bine structurat. Explică ce faci, unde lucrezi, cum poate omul să te contacteze. Funcționează pe orice telefon în sub 2 secunde.",
      bullets: ["Homepage cu mesaj clar de achiziție", "Pagini de servicii separate", "Mobile-first, viteza maximă"],
    },
    {
      nr: "02",
      icon: <Search size={22} />,
      label: "SEO + GEO + AEO",
      title: "Vizibilitatea",
      desc: "Ești găsit în Google Search (SEO local), pe Google Maps (GEO) și în răspunsurile AI (AEO). Trei canale, o singură arhitectură.",
      bullets: ["Google Search — pagini de servicii și locații", "Google Maps — profil Business optimizat", "AI engines — conținut citabil și structurat"],
    },
    {
      nr: "03",
      icon: <Phone size={22} />,
      label: "Conversie",
      title: "Contactul",
      desc: "Traficul fără conversie este cheltuială fără rezultat. Fiecare pagină are un CTA clar. Omul sună, scrie pe WhatsApp sau completează un formular.",
      bullets: ["WhatsApp + formular scurt", "Click-to-call pe mobil", "Tracking complet al surselor"],
    },
  ];

  return (
    <section className="py-24 px-6 border-b border-[hsl(var(--stroke))]/20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <Badge>Cum funcționează</Badge>
          <h2 className="font-display italic text-4xl md:text-6xl tracking-tight mb-4">
            Trei straturi. Un singur rezultat.
          </h2>
          <p className="text-[hsl(var(--muted))] font-body text-base max-w-lg mx-auto">
            Site, vizibilitate și conversie trebuie construite împreună. Fiecare strat îl susține pe celelalalt.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {layers.map((l, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="group relative h-full p-10 bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-[3rem] hover:border-[#89AACC]/40 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <span style={{ color: "#89AACC" }}>{l.icon}</span>
                  <span className="text-white/5 font-display italic text-5xl leading-none select-none">{l.nr}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 mb-5 px-3 py-1 rounded-full border border-[#89AACC]/30 bg-[#89AACC]/8">
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#89AACC" }}>{l.label}</span>
                </div>
                <h3 className="font-display italic text-2xl text-white mb-3 group-hover:text-[#89AACC] transition-colors duration-300">{l.title}</h3>
                <p className="text-[hsl(var(--muted))] font-body text-sm leading-relaxed mb-6">{l.desc}</p>
                <ul className="space-y-2">
                  {l.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-white/50">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#89AACC" }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. AI VISIBILITY ─── */
function AIVisibility() {
  return (
    <section className="py-24 px-6 border-b border-[hsl(var(--stroke))]/20">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="relative p-10 md:p-16 rounded-[3rem] overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(137,170,204,0.08) 0%, rgba(78,133,191,0.04) 100%)", border: "1px solid rgba(137,170,204,0.2)" }}>
            <div className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none opacity-30"
              style={{ background: "radial-gradient(circle, rgba(137,170,204,0.15) 0%, transparent 70%)" }} />

            <div className="relative">
              <Badge>AEO · Answer Engine Optimization</Badge>
              <h2 className="font-display italic text-3xl md:text-5xl tracking-tight mb-5">
                Afacerea ta apare în răspunsurile AI.
              </h2>
              <p className="text-[hsl(var(--muted))] font-body text-base max-w-2xl mb-10 leading-relaxed">
                ChatGPT, Perplexity, Google AI Overview și Gemini încep să răspundă la întrebări locale: „Care e cel mai bun dentist din Cluj?" sau „Recomandă-mi un service auto în București sector 3."
              </p>
              <p className="text-[hsl(var(--muted))] font-body text-base max-w-2xl mb-10 leading-relaxed">
                Afacerile citate sunt cele cu site clar, entități precise și răspunsuri directe. Nu cele cu cele mai multe cuvinte cheie.
              </p>

              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { label: "Entități clare", desc: "Nume afacere, serviciu, locație, program — exact, consistent, fără ambiguitate." },
                  { label: "Răspunsuri directe", desc: "Pagini FAQ și secțiuni structurate care pot fi extrase fără context suplimentar." },
                  { label: "Consistență cross-platform", desc: "Aceleași date pe site, Google Business, directoare — AI verifică toate sursele." },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--bg))]/60 border border-white/8">
                    <p className="font-display italic text-base text-white mb-2">{item.label}</p>
                    <p className="text-[hsl(var(--muted))] font-body text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 7. PROCES ─── */
function Proces() {
  const steps = [
    {
      nr: "01",
      icon: <BarChart3 size={20} />,
      badge: "1–2 zile",
      title: "Audit & strategie",
      desc: "Analizăm afacerea, zona geografică, concurența și situația actuală pe Google Maps. Identificăm cuvintele cheie cu intenție comercială reală și stabilim structura site-ului.",
      bullets: ["Analiză concurență locală", "Identificare cuvinte cheie de achiziție", "Structura paginilor și arhitectura conținutului"],
    },
    {
      nr: "02",
      icon: <Target size={20} />,
      badge: "2–4 săptămâni",
      title: "Build & optimizare",
      desc: "Construim site-ul, scriem conținutul paginilor de servicii și locații, setăm schema markup, optimizăm Google Business și configurăm tracking-ul complet.",
      bullets: ["Site Next.js complet", "Conținut SEO + AEO pentru toate paginile", "Schema markup, sitemap, redirecturi"],
    },
    {
      nr: "03",
      icon: <Clock size={20} />,
      badge: "Ongoing",
      title: "Lansare & monitorizare",
      desc: "Site live, Search Console activ, Google Business verificat. Raport de performanță la 30, 60 și 90 de zile cu date reale: trafic, poziții, contacte.",
      bullets: ["Raport la 30/60/90 zile", "Ajustări post-lansare incluse", "Suport pentru primele 3 luni"],
    },
  ];

  return (
    <section className="py-24 px-6 border-b border-[hsl(var(--stroke))]/20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <Badge>Procesul</Badge>
          <h2 className="font-display italic text-4xl md:text-6xl tracking-tight mb-4">
            Cum lucrăm.
          </h2>
          <p className="text-[hsl(var(--muted))] font-body text-base max-w-lg mx-auto">
            Trei etape clare. Fără surprize. Fără livrabile vagi.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="group relative h-full p-10 bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-[3rem] hover:border-[#89AACC]/40 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <span style={{ color: "#89AACC" }}>{s.icon}</span>
                  <span className="text-white/5 font-display italic text-5xl leading-none select-none">{s.nr}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 mb-5 px-3 py-1 rounded-full border border-[#89AACC]/30 bg-[#89AACC]/8">
                  <Zap size={9} style={{ color: "#89AACC" }} />
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#89AACC" }}>{s.badge}</span>
                </div>
                <h3 className="font-display italic text-xl text-white mb-3 group-hover:text-[#89AACC] transition-colors duration-300">{s.title}</h3>
                <p className="text-[hsl(var(--muted))] font-body text-sm leading-relaxed mb-6">{s.desc}</p>
                <ul className="space-y-2">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-white/50">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#89AACC" }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 8. PREȚ & CTA ─── */
function PretCTA() {
  return (
    <section className="py-24 px-6 border-b border-[hsl(var(--stroke))]/20">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-12">
          <Badge>Investiție</Badge>
          <h2 className="font-display italic text-4xl md:text-6xl tracking-tight mb-4">
            Preț personalizat.
            <br />
            <span className="text-[hsl(var(--muted))]">Locuri limitate.</span>
          </h2>
          <p className="text-[hsl(var(--muted))] font-body text-base max-w-lg mx-auto">
            Nu avem pachete standard. Fiecare afacere are complexitate diferită — număr de servicii, zone geografice, situație actuală pe Google.
          </p>
        </Reveal>

        <Reveal>
          <div className="p-10 md:p-14 bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-[3rem] text-center">
            {/* Urgency */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/8 mb-8">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              <span className="text-red-400 text-[11px] font-bold uppercase tracking-widest font-body">
                Maxim 2 clienți noi pe lună
              </span>
            </div>

            <h3 className="font-display italic text-3xl text-white mb-4">Primul pas este gratuit.</h3>
            <p className="text-[hsl(var(--muted))] font-body text-sm max-w-md mx-auto mb-10 leading-relaxed">
              Înainte să discutăm buget, facem un audit rapid: ce ai acum, ce lipsește, ce ar trebui construit. Fără obligații.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/audit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)", color: "#080810" }}>
                Solicită audit gratuit <ArrowRight size={14} />
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
                Discuție pe WhatsApp
              </a>
            </div>

            <p className="text-[hsl(var(--muted))] font-body text-[10px] mt-6 uppercase tracking-widest">
              Fără spam · Fără obligații · Răspuns în 24h
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 9. FAQ ─── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[hsl(var(--stroke))]/40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left gap-4 group"
      >
        <span className="font-display italic text-lg text-white group-hover:text-[#89AACC] transition-colors">{q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: "#89AACC" }}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-64 pb-6" : "max-h-0"}`}>
        <p className="text-[hsl(var(--muted))] font-body text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const items = [
    {
      q: "Ce diferență face față de o agenție obișnuită?",
      a: "Agențiile obișnuite construiesc site-uri. Noi construim sisteme de achiziție. Diferența este că fiecare decizie de design, content și structură este luată în funcție de impactul ei asupra vizibilității locale și a conversiei — nu în funcție de preferințe estetice.",
    },
    {
      q: "Cât durează să apar în Google după lansare?",
      a: "Pentru rezultatele organice (Google Search), estimează 2–4 luni pentru un site nou, mai puțin pentru un domeniu existent. Google Maps poate arăta îmbunătățiri mai rapid, uneori în câteva săptămâni, dacă profilul Google Business este complet și corect optimizat.",
    },
    {
      q: "Am deja un site. Trebuie să îl refac complet?",
      a: "Nu neapărat. Depinde de starea actuală. Unele site-uri au nevoie de refacere completă, altele pot fi îmbunătățite. Auditul gratuit ne ajută să înțelegem situația reală și să recomandăm abordarea corectă — nu cea mai costisitoare.",
    },
    {
      q: "Ce înseamnă AEO și de ce e important?",
      a: "AEO (Answer Engine Optimization) este practica de a construi conținut astfel încât ChatGPT, Perplexity, Google AI Overview și alte sisteme AI să poată cita afacerea ta în răspunsurile lor. Pe măsură ce mai mulți oameni pun întrebări direct AI-ului în loc să caute pe Google, prezența în aceste răspunsuri devine un canal de achiziție important.",
    },
    {
      q: "Câți clienți noi acceptați pe lună?",
      a: "Maxim 2. Nu este un truc de marketing — este o limitare reală. Fiecare proiect primește atenție directă și nu delegăm la echipe junior. Această limită menține calitatea și ne permite să urmărim rezultatele pentru fiecare client.",
    },
    {
      q: "Care este pasul următor dacă vreau să încep?",
      a: "Solicită un audit gratuit la /audit sau scrie-ne pe WhatsApp. Primul pas este o discuție de 20–30 minute despre afacere, obiective și situația actuală. Pe baza acesteia facem o propunere concretă.",
    },
  ];

  return (
    <section className="py-24 px-6 border-b border-[hsl(var(--stroke))]/20">
      <div className="max-w-3xl mx-auto">
        <Reveal className="mb-12">
          <Badge>Întrebări frecvente</Badge>
          <h2 className="font-display italic text-4xl md:text-5xl tracking-tight">
            Răspunsuri directe.
          </h2>
        </Reveal>

        <Reveal>
          <div>
            {items.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-12 text-center">
          <p className="text-[hsl(var(--muted))] font-body text-sm mb-6">
            Ai altă întrebare? Scrie-ne direct.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity"
            style={{ color: "#89AACC" }}>
            WhatsApp <ArrowRight size={13} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── MAIN EXPORT ─── */
export default function WebagencyClient() {
  return (
    <main className="bg-[hsl(var(--bg))] min-h-screen text-[hsl(var(--text))] overflow-x-hidden">
      <Navbar />
      <Hero />
      <PentruCine />
      <Problema />
      <CeInclude />
      <TreiStraturi />
      <AIVisibility />
      <Proces />
      <PretCTA />
      <FAQ />
      <Footer />
    </main>
  );
}
