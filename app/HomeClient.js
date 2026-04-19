"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Eye, TrendingDown,
  ShieldAlert, CheckCircle, Star, Users,
  Zap, Phone, Layers, BarChart3, Clock, AlertTriangle,
  Globe, Server, Monitor, Mail, XCircle, Trophy,
} from "lucide-react";
import HeroVideo from "../components/HeroVideo";

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

/* ─── Badge ─── */
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

/* ─── STICKY BAR ─── */
function StickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
      <div className="bg-bg/95 backdrop-blur-md border-t border-white/8 px-6 py-3 flex items-center justify-between max-w-5xl mx-auto gap-4">
        <p className="font-display italic text-sm hidden sm:block text-white/70">
          Fiecare zi fără sistem = clienți la concurență.
        </p>
        <a
          href="#contact"
          className="ml-auto inline-flex items-center gap-2 accent-gradient text-bg font-bold text-xs px-6 py-2.5 rounded-full hover:scale-105 transition-transform whitespace-nowrap"
        >
          Vorbim acum <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

 const links = [
    { href: "#problema", label: "Problema" },
    { href: "#work",     label: "Work" },
    { href: "/blog",     label: "Blog" }, 
    { href: "#plan",     label: "Plan" },
    { href: "#incredere",label: "Clienți" },
    { href: "#contact",  label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <div className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-4 py-2 transition-all duration-300 ${scrolled ? "shadow-lg shadow-black/40" : ""}`}>
        <div className="flex items-center gap-6">
          <div className="accent-gradient p-[1px] rounded-full">
            <div className="bg-bg rounded-full px-2 py-1 text-[11px] font-display italic font-bold text-white">CS</div>
          </div>
          <div className="hidden sm:flex gap-5">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-[10px] uppercase tracking-widest text-muted hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="/blog"
            className="relative px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #89AACC 0%, #6A99C0 40%, #4E85BF 100%)",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "#ffffff",
              textShadow: "0 1px 3px rgba(0,0,0,0.4)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.15) inset, 0 4px 14px rgba(78,133,191,0.35)",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.15) inset, 0 0 18px rgba(137,170,204,0.55), 0 4px 14px rgba(78,133,191,0.45)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.15) inset, 0 4px 14px rgba(78,133,191,0.35)"}
          >
            Blog Hub ↗
          </a>
          <button onClick={() => setOpen(!open)} className="sm:hidden flex flex-col gap-1 p-1" aria-label="Menu">
            <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="absolute top-full mt-2 w-[calc(100%-2rem)] max-w-sm bg-surface/95 backdrop-blur-md border border-white/10 rounded-3xl px-6 py-5 flex flex-col gap-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-white/70 hover:text-white font-display italic">
              {l.label}
            </a>
          ))}
          <a 
            href="/blog" 
            onClick={() => setOpen(false)} 
            className="mt-2 font-bold text-xs px-5 py-4 rounded-full text-center uppercase tracking-widest transition-all duration-300 block w-full"
            style={{ 
              background: "linear-gradient(135deg, #89AACC 0%, #6A99C0 40%, #4E85BF 100%)",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "#ffffff",
              textShadow: "0 1px 3px rgba(0,0,0,0.4)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.15) inset, 0 4px 20px rgba(78,133,191,0.4)",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.15) inset, 0 0 22px rgba(137,170,204,0.6), 0 4px 20px rgba(78,133,191,0.5)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.15) inset, 0 4px 20px rgba(78,133,191,0.4)"}
          >
            Blog Hub ↗
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── 1. HERO ─── */
function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Web Systems", "Digital Marketing", "SEO Automation", "Lead Gen"];
  useEffect(() => {
    const t = setInterval(() => setRoleIndex((p) => (p + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <HeroVideo src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Badge>CapeSystem · azisunt.net</Badge>
        </motion.div>

        <motion.h1
          className="font-display italic text-5xl sm:text-7xl md:text-9xl leading-[0.88] tracking-tighter mb-4"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
        >
          Sisteme digitale
          <br />
          <span className="bg-clip-text text-transparent" style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>care vând.</span>
        </motion.h1>

        <motion.div
          className="h-7 mb-10 overflow-hidden"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="text-muted text-xs uppercase tracking-[0.35em] font-body"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
          className="mb-10 w-full max-w-[300px] sm:w-72 animate-float"
        >
          <div className="group/card p-5 sm:p-6 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl hover:border-[#89AACC]/40 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)" }}>
                  <BarChart3 size={13} className="text-white" />
                </div>
                <span className="text-[9px] uppercase tracking-widest text-muted font-bold">Organic Growth</span>
              </div>
              <ArrowUpRight size={14} className="text-white/20 group-hover/card:text-[#89AACC] transition-colors duration-300" />
            </div>
            <p className="text-5xl font-display font-black italic mb-3" style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              +312%
            </p>
            <div className="flex items-end gap-1 h-10 mb-3">
              {[22, 35, 28, 48, 42, 60, 55, 75, 100].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm overflow-hidden transition-opacity duration-300 group-hover/card:opacity-90"
                  style={{ height: `${h}%`, minHeight: 4, background: i === 8 ? "linear-gradient(180deg, #89AACC, #4E85BF)" : "rgba(255,255,255,0.08)" }}
                  initial={{ scaleY: 0, originY: "bottom" }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.45, delay: 0.85 + i * 0.06, ease: "easeOut" }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-white/5 pt-2.5">
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 group-hover/card:text-[#89AACC]/60 italic font-body transition-colors duration-300">napoletano.ro</p>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={8} className="fill-accent text-accent" />)}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 w-full justify-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        >
          <a href="#work" className="px-8 py-4 rounded-full bg-text-primary text-bg text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform text-center">
            Vezi Portofoliu
          </a>
          <a href="#contact" className="px-8 py-4 rounded-full border border-white/15 text-text-primary text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-center">
            Vreau un sistem →
          </a>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        >
          <div className="w-[1px] h-10 relative overflow-hidden">
            <div className="w-full h-1/2 bg-white/40 animate-scroll-down" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 2. PROBLEMA, 3. SUCCES, 4. PORTOFOLIU (Rămân neschimbate) ─── */
function Problema() {
  const problems = [
    { icon: <Eye size={36} />, title: "Ești invizibil online", desc: "Competitorii tăi apar primii în Google. Tu nu exiști pentru 90% din potențialii clienți — și nici nu vor ști vreodată că ești acolo." },
    { icon: <TrendingDown size={36} />, title: "Site-ul nu convinge", desc: "Un site lent sau amator trimite oamenii direct la concurență. Prima impresie durează 3 secunde — a ta ce spune?" },
    { icon: <ShieldAlert size={36} />, title: "Reclame fără ROI real", desc: "Bagi bani în Meta Ads sau Google Ads fără să știi ce funcționează. Bugetul dispare, conversiile nu apar." },
  ];
  return (
    <section id="problema" className="py-28 bg-bg relative px-6 border-y border-stroke/20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-red-900/8 blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <Reveal className="text-center mb-20">
          <Badge>Problema Reală</Badge>
          <h2 className="font-display italic text-4xl md:text-6xl text-text-primary tracking-tight mb-5">Ce pierzi în fiecare zi.</h2>
          <p className="text-muted font-body text-base max-w-lg mx-auto">Nu e vorba de un site „de prezentare". E vorba de clienți care ajung la concurență în loc să ajungă la tine.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="group h-full p-12 bg-surface border border-stroke rounded-[2.5rem] hover:border-red-500/40 hover:-translate-y-2 hover:bg-surface/80 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400/80 mb-8 group-hover:bg-red-500/20 group-hover:text-red-400 transition-all duration-300">{p.icon}</div>
                <h3 className="font-display italic text-3xl mb-4 text-white leading-tight">{p.title}</h3>
                <p className="text-muted leading-relaxed font-body text-base">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Succes() {
  const outcomes = [
    { icon: <BarChart3 size={20} />, metric: "+312%", label: "Trafic organic", context: "Napoletano.ro · 6 luni" },
    { icon: <Users size={20} />, metric: "+40%", label: "Rezervări online", context: "Restaurant Cluj · prima lună" },
    { icon: <Trophy size={20} />, metric: "3 contracte", label: "Noi în 2 luni", context: "Freelancer design, BUC" },
    { icon: <Zap size={20} />, metric: "#1 Google", label: "Poziție locală", context: "Salon beauty · 90 zile" },
  ];
  return (
    <section className="py-28 bg-bg px-6 border-t border-stroke/20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <Badge>Rezultate Reale</Badge>
          <h2 className="font-display italic text-4xl md:text-6xl tracking-tight mb-5">Nu promitem vise. <span className="bg-clip-text text-transparent" style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Arătăm cifre.</span></h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {outcomes.map((o, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group h-full p-7 bg-surface border border-stroke rounded-[2rem] text-center hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 text-accent flex items-center justify-center mb-4 mx-auto group-hover:bg-white/10 transition-colors">{o.icon}</div>
                <p className="font-display italic text-4xl text-white mb-1">{o.metric}</p>
                <p className="font-display italic text-sm text-white/70 mb-1">{o.label}</p>
                <p className="font-body text-[10px] text-muted">{o.context}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. PORTOFOLIU ─── */
function Portofoliu() {
  return (
    <section id="work" className="py-28 bg-bg px-6 border-t border-stroke/20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Badge>Portofoliu Activ</Badge>
              <h2 className="font-display italic text-4xl md:text-7xl text-white">
                Sisteme <span className="bg-clip-text text-transparent" style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Live.</span>
              </h2>
            </div>
            <p className="text-muted font-body text-sm max-w-xs md:text-right leading-relaxed">
              Fiecare proiect e construit de la zero — zero template-uri, zero compromisuri.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 1. NAPOLETANO */}
          <Reveal className="md:col-span-7">
            <a href="https://napoletano.ro" target="_blank" rel="noopener noreferrer"
              className="group relative flex flex-col h-full p-10 bg-surface border border-stroke rounded-[3rem] overflow-hidden hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <Globe className="text-accent mb-6 relative z-10" size={32} />
              <span className="inline-flex items-center gap-1.5 w-fit rounded-full px-2.5 py-1 text-[9px] font-body font-bold uppercase tracking-widest text-white/60 border border-white/10 bg-white/5 mb-4 relative z-10">
                #1 Google Local · SEO
              </span>
              <h3 className="text-3xl font-display italic mb-3 relative z-10">Napoletano.ro</h3>
              <p className="text-muted text-sm max-w-sm mb-8 leading-relaxed relative z-10">
                Sistem web complet — meniu dinamic prin Supabase, rezervări online, SEO local de top. Trafic organic +312% în 6 luni.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-accent group-hover:gap-4 transition-all uppercase tracking-widest relative z-10 mt-auto">
                Vizitează site-ul <ArrowUpRight size={14} />
              </div>
            </a>
          </Reveal>

          {/* 2. SAMSUNG G9 */}
          <Reveal className="md:col-span-5" delay={100}>
            <a href="https://l.profitshare.ro/l/15727779?hash=Samsung%20Odyssey%20G9" target="_blank" rel="noopener noreferrer"
              className="group flex flex-col h-full p-10 bg-surface border border-stroke rounded-[3rem] hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              <Monitor className="text-accent mb-6" size={32} />
              <span className="inline-flex items-center gap-1.5 w-fit rounded-full px-2.5 py-1 text-[9px] font-body font-bold uppercase tracking-widest text-white/60 border border-white/10 bg-white/5 mb-4">
                Hardware Recomandat
              </span>
              <h3 className="text-3xl font-display italic mb-3">Samsung G9</h3>
              <p className="text-muted text-sm mb-8 leading-relaxed">
                Setup productivitate ultra-wide. Sistem afiliere optimizat pentru conversii maxime.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-accent group-hover:gap-4 transition-all uppercase tracking-widest mt-auto">
                Vezi Detalii <ArrowUpRight size={14} />
              </div>
            </a>
          </Reveal>

          {/* 3. AZISUNT.BIZ */}
          <Reveal className="md:col-span-12" delay={150}>
            <a href="https://azisunt.biz" target="_blank" rel="noopener noreferrer"
              className="group relative flex flex-col md:flex-row md:items-center justify-between h-full p-10 bg-surface border border-stroke rounded-[3rem] hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="max-w-xl">
                <Server className="text-accent mb-6" size={32} />
                <span className="inline-flex items-center gap-1.5 w-fit rounded-full px-2.5 py-1 text-[9px] font-body font-bold uppercase tracking-widest text-white/60 border border-white/10 bg-white/5 mb-4">
                  Marketing Infrastructure
                </span>
                <h3 className="text-3xl font-display italic mb-3">azisunt.biz</h3>
                <p className="text-muted text-sm md:mb-0 mb-8 leading-relaxed">
                  Infrastructură marketing, funnel conversie B2B. Landing pages cu A/B testing, automatizări email și tracking avansat.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-accent group-hover:gap-4 transition-all uppercase tracking-widest whitespace-nowrap mt-auto md:mt-0 md:ml-10">
                Vezi Infrastructura <ArrowUpRight size={14} />
              </div>
            </a>
          </Reveal>

          {/* 4. AZISUNT.COM (StartFIRMĂ) */}
          <Reveal className="md:col-span-12" delay={200}>
            <a href="https://azisunt.com" target="_blank" rel="noopener noreferrer"
              className="group relative flex flex-col md:flex-row md:items-center justify-between h-full p-10 bg-surface border border-[#89AACC]/20 rounded-[3rem] hover:border-[#89AACC]/60 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="max-w-2xl">
                <Layers className="text-[#89AACC] mb-6" size={32} />
                <span className="inline-flex items-center gap-1.5 w-fit rounded-full px-2.5 py-1 text-[9px] font-body font-bold uppercase tracking-widest text-white/60 border border-white/10 bg-white/5 mb-4">
                  SaaS / Fintech
                </span>
                <h3 className="text-3xl font-display italic mb-3 text-white">azisunt.com (StartFIRMĂ)</h3>
                <p className="text-muted text-sm mb-0 leading-relaxed">
                  Automatizare completă pentru înființare firme. Procesăm 5.500+ dosare ONRC, generare automată de documente și proces 100% digital în 5 minute.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#89AACC] group-hover:gap-4 transition-all uppercase tracking-widest whitespace-nowrap mt-6 md:mt-0 md:ml-10">
                Vizitează Platforma <ArrowUpRight size={14} />
              </div>
            </a>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ─── 5. PLAN, 6. INCREDERE, 7. COST, 8. CONTACT (Rămân neschimbate) ─── */
function Plan() {
  const steps = [
    { nr: "01", icon: <Phone size={20} />, title: "Discutăm", desc: "Analizăm afacerea, obiectivele și clienții tăi ideali." },
    { nr: "02", icon: <Layers size={20} />, title: "Construim", desc: "Design custom, copywriting, SEO și setup complet." },
    { nr: "03", icon: <BarChart3 size={20} />, title: "Scalăm", desc: "Rapoarte lunare clare și optimizare continuă." },
  ];
  return (
    <section id="plan" className="py-28 bg-bg px-6 border-t border-stroke/20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16"><Badge>Procesul CapeSystem</Badge><h2 className="font-display italic text-4xl md:text-6xl tracking-tight mb-5">De neratat.</h2></Reveal>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="group relative h-full p-8 bg-surface border border-stroke rounded-[2rem] hover:border-white/20 transition-all">
                <div className="flex justify-between mb-6 text-accent">{s.icon}<span className="text-white/5 text-5xl">{s.nr}</span></div>
                <h3 className="font-display italic text-xl mb-3 text-white">{s.title}</h3>
                <p className="text-muted font-body text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Incredere() {
  return (
    <section id="incredere" className="py-28 bg-bg px-6 border-t border-stroke/20 text-center">
      <Badge>Clienți Fericiți</Badge>
      <h2 className="font-display italic text-4xl mb-12">Suntem prima care livrează.</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
         <div className="p-8 bg-surface border border-stroke rounded-3xl italic text-sm">"Rezervări online cu 40% mai multe față de anul trecut." - Andrei M.</div>
         <div className="p-8 bg-surface border border-stroke rounded-3xl italic text-sm">"Apar prima pe Google pentru orașul meu." - Ioana P.</div>
      </div>
    </section>
  );
}

function CostulInactiunii() {
  return (
    <section className="py-28 bg-bg border-t border-stroke/20">
      <div className="max-w-4xl mx-auto px-6 bg-red-950/10 border border-red-500/20 p-10 rounded-[3rem] text-center">
        <AlertTriangle className="mx-auto text-red-500 mb-6" size={40} />
        <h2 className="font-display italic text-3xl mb-4 text-white">Fiecare zi de amânare costă bani reali.</h2>
        <p className="text-muted text-sm mb-8">Competitorul tău citește aceeași pagină. CapeSystem lucrează cu max 2 clienți noi pe lună.</p>
        <a href="#contact" className="accent-gradient text-bg font-bold px-8 py-4 rounded-full uppercase text-xs inline-block">Rezerv un loc ↗</a>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-32 bg-bg px-6 border-t border-stroke/20">
      <div className="max-w-xl mx-auto text-center">
        <Badge>Contact</Badge>
        <h2 className="font-display italic text-4xl mb-12">Hai să construim.</h2>
        <form action="https://formspree.io/f/xqewbwgj" method="POST" className="space-y-4 text-left">
          <input type="text" name="name" placeholder="Nume" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-accent" />
          <input type="email" name="email" placeholder="Email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-accent" />
          <textarea name="message" placeholder="Mesaj..." rows={3} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-accent" />
          <button type="submit" className="w-full accent-gradient text-bg font-bold py-4 rounded-xl uppercase text-xs tracking-widest">Trimite ↗</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t border-stroke/20 text-center text-[10px] text-muted uppercase tracking-widest">
      © {new Date().getFullYear()} CapeSystem · azisunt.net · High Performance Systems
    </footer>
  )
}

/* ─── COMPONENTA FINALĂ ─── */
export default function HomeClient({ latestPosts }) {
  return (
    <main className="bg-bg min-h-screen text-text-primary overflow-x-hidden">
      <Navbar />
      <StickyBar />
      <Hero />
      <Problema />
      <Succes />
      <Portofoliu />

      {/* --- KNOWLEDGE HUB AUTOMATIZAT --- */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display italic text-4xl text-white mb-2">
              Knowledge <span className="text-[#89AACC]">Hub.</span>
            </h2>
            <p className="text-[#89AACC] text-[10px] font-bold uppercase tracking-[0.2em]">Strategii SEO, GEO & AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts && latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <a 
                  key={post.slug} 
                  href={`/blog/${post.slug}`} 
                  className="group p-8 bg-surface border border-white/5 rounded-[2.5rem] hover:border-[#89AACC]/40 transition-all flex flex-col h-full text-left"
                >
                  <span className="text-[10px] text-white/40 mb-4">{post.date}</span>
                  <h3 className="font-display italic text-2xl text-white mb-4 group-hover:text-[#89AACC] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted text-sm line-clamp-3 mb-8">
                    {post.excerpt || "Descoperă cele mai noi strategii digitale pentru afacerea ta."}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#89AACC]">
                    Citește <ArrowRight size={12} />
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-full p-10 bg-surface border border-dashed border-white/10 rounded-3xl text-muted italic text-sm">
                Se încarcă articolele...
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
             <a href="/blog" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors underline">Vezi tot blogul</a>
          </div>
        </div>
      </section>

      <Plan />
      <Incredere />
      <CostulInactiunii />
      <Contact />
      <Footer />
    </main>
  );
}