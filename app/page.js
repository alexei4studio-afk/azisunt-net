"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowUpRight, Eye, TrendingDown, 
  ShieldAlert, CheckCircle, Star, Users, 
  Zap, Phone, Layers, BarChart3, Clock, AlertTriangle,
  Globe, Server, Monitor
} from "lucide-react"; 
import HeroVideo from "../components/HeroVideo";

// --- COMPONENTA: BADGE CU PULS ---
function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-display tracking-widest uppercase text-white/60 mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
      {children}
    </span>
  );
}

// --- NAVBAR ---
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <div className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-4 py-2 transition-all duration-300 ${scrolled ? "shadow-lg shadow-black/40" : ""}`}>
        <div className="flex items-center gap-6">
          <div className="accent-gradient p-[1px] rounded-full">
            <div className="bg-bg rounded-full px-2 py-1 text-[11px] font-display italic font-bold text-white">CS</div>
          </div>
          <div className="hidden sm:flex gap-4">
            <a href="#work" className="text-[10px] uppercase tracking-widest text-muted hover:text-white transition-colors">Work</a>
            <a href="#plan" className="text-[10px] uppercase tracking-widest text-muted hover:text-white transition-colors">Plan</a>
            <a href="#contact" className="text-[10px] uppercase tracking-widest text-muted hover:text-white transition-colors">Contact</a>
          </div>
          <a href="#contact" className="bg-text-primary text-bg px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Vorbim? ↗</a>
        </div>
      </div>
    </nav>
  );
}

export default function Page() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Web Systems", "Digital Marketing", "SEO Automation", "Lead Gen"];

  useEffect(() => {
    const timer = setInterval(() => setRoleIndex((prev) => (prev + 1) % roles.length), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-bg min-h-screen text-text-primary overflow-x-hidden">
      <Navbar />
      
      {/* 1. HERO COMPLET + STATS CARD */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <HeroVideo src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8" />
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl">
          <Badge>CapeSystem · Collection '26</Badge>
          <motion.h1 className="font-display italic text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter mb-8">
            CapeSystem
          </motion.h1>
          <div className="h-8 mb-12">
            <AnimatePresence mode="wait">
              <motion.p key={roles[roleIndex]} className="text-lg md:text-xl font-body">
                High Performance <span className="font-display italic text-accent">{roles[roleIndex]}</span>.
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#work" className="px-8 py-4 rounded-full bg-text-primary text-bg text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">Vezi Portofoliu</a>
            <a href="#contact" className="px-8 py-4 rounded-full border border-stroke text-text-primary text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">Vreau un sistem</a>
          </div>

          {/* Floating Stats Card (Recuperat) */}
          <div className="hidden lg:block absolute right-20 bottom-20 animate-bounce transition-all duration-1000">
            <div className="w-64 bg-surface/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 size={18} className="text-accent" />
                <p className="font-display font-bold text-sm">Trafic organic</p>
              </div>
              <p className="font-display font-extrabold text-4xl text-white">+312%</p>
              <p className="text-[10px] text-muted font-body mt-2 italic">Client: Napoletano.ro · 6 luni</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEMA */}
      <section id="problema" className="py-28 bg-bg relative px-6 border-y border-stroke/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <Badge>Problema Reală</Badge>
            <h2 className="font-display italic text-4xl md:text-6xl text-text-primary tracking-tight">Ce pierzi în fiecare zi.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-10 bg-surface border border-stroke rounded-[2.5rem] group hover:border-accent/20 transition-all">
              <Eye className="text-accent mb-6" size={40} />
              <h3 className="font-display italic text-2xl mb-4">Ești invizibil online</h3>
              <p className="text-muted leading-relaxed font-body text-sm">Competitorii tăi apar primii în Google. Tu nu exiști pentru clienți.</p>
            </div>
            <div className="p-10 bg-surface border border-stroke rounded-[2.5rem] group hover:border-accent/20 transition-all">
              <TrendingDown className="text-accent mb-6" size={40} />
              <h3 className="font-display italic text-2xl mb-4">Site-ul nu convinge</h3>
              <p className="text-muted leading-relaxed font-body text-sm">Un site lent trimite oamenii direct la concurență.</p>
            </div>
            <div className="p-10 bg-surface border border-stroke rounded-[2.5rem] group hover:border-accent/20 transition-all">
              <ShieldAlert className="text-accent mb-6" size={40} />
              <h3 className="font-display italic text-2xl mb-4">Reclame fără ROI</h3>
              <p className="text-muted leading-relaxed font-body text-sm">Bagi bani în Meta Ads fără să știi ce funcționează.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PORTOFOLIU COMPLET (TOATE CELE 3 SITE-URI) */}
      <section id="work" className="py-28 bg-bg px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <Badge>Portofoliu Activ</Badge>
            <h2 className="font-display italic text-4xl md:text-7xl mb-6 text-white">Sisteme <span className="text-accent">Live.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* 1. Napoletano */}
            <a href="https://napoletano.ro" target="_blank" className="md:col-span-7 group relative p-10 bg-surface border border-stroke rounded-[3rem] overflow-hidden transition-all hover:border-accent/30">
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <Globe className="text-accent mb-6" size={32} />
              <h3 className="text-3xl font-display italic mb-4">Napoletano.ro</h3>
              <p className="text-muted text-sm max-w-sm mb-8">Management complet menu & galerie prin Supabase. SEO local de top.</p>
              <div className="flex items-center gap-2 text-xs font-bold text-accent group-hover:gap-4 transition-all uppercase tracking-widest">
                Vizitează site-ul <ArrowUpRight size={14} />
              </div>
            </a>

            {/* 2. Samsung G9 */}
            <a href="https://l.profitshare.ro/l/15727779?hash=Samsung%20Odyssey%20G9" target="_blank" className="md:col-span-5 group relative p-10 bg-surface border border-stroke rounded-[3rem] transition-all hover:border-accent/30">
              <Monitor className="text-accent mb-6" size={32} />
              <h3 className="text-3xl font-display italic mb-4">Samsung G9</h3>
              <p className="text-muted text-sm mb-8">Sistem afiliere optimizat. Setup productivitate hardware.</p>
              <div className="flex items-center gap-2 text-xs font-bold text-accent group-hover:gap-4 transition-all uppercase tracking-widest">
                Vezi Detalii <ArrowUpRight size={14} />
              </div>
            </a>

            {/* 3. Azisunt.biz */}
            <a href="https://azisunt.biz" target="_blank" className="md:col-span-12 group relative p-10 bg-surface border border-stroke rounded-[3rem] transition-all hover:border-accent/30 flex flex-col md:flex-row md:items-center justify-between">
              <div className="max-w-xl">
                <Server className="text-accent mb-6" size={32} />
                <h3 className="text-3xl font-display italic mb-4">azisunt.biz</h3>
                <p className="text-muted text-sm mb-4 md:mb-0">Infrastructură securizată prin Cloudflare. Performanță DNS și securitate Edge pentru tot ecosistemul.</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-accent group-hover:gap-4 transition-all uppercase tracking-widest whitespace-nowrap">
                Vezi Infrastructura <ArrowUpRight size={14} />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 4. PLANUL ÎN 3 PAȘI */}
      <section id="plan" className="py-28 bg-bg px-6 border-t border-stroke/20">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <Badge>Procesul CapeSystem</Badge>
          <h2 className="font-display italic text-4xl md:text-6xl mb-6">De la invizibil la <span className="text-accent">de neratat.</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          <div className="p-8 bg-surface border border-stroke rounded-3xl">
            <Phone className="text-accent mb-4" />
            <h4 className="font-display text-xl mb-2 italic">01. Discutăm</h4>
            <p className="text-muted text-sm">Analizăm afacerea și setăm obiectivele de vânzări.</p>
          </div>
          <div className="p-8 bg-surface border border-stroke rounded-3xl">
            <Layers className="text-accent mb-4" />
            <h4 className="font-display text-xl mb-2 italic">02. Construim</h4>
            <p className="text-muted text-sm">Design custom, SEO on-page și integrare marketing.</p>
          </div>
          <div className="p-8 bg-surface border border-stroke rounded-3xl">
            <BarChart3 className="text-accent mb-4" />
            <h4 className="font-display text-xl mb-2 italic">03. Scalăm</h4>
            <p className="text-muted text-sm">Rapoarte lunare și optimizare pe baza datelor reale.</p>
          </div>
        </div>
      </section>

      {/* 5. COSTUL INACȚIUNII */}
      <section className="py-28 bg-bg px-6">
        <div className="max-w-4xl mx-auto bg-red-500/5 border border-red-500/20 rounded-[3rem] p-12 text-center">
          <AlertTriangle className="text-red-500 mx-auto mb-6" size={48} />
          <h2 className="font-display italic text-3xl md:text-5xl mb-6">Concurența nu stă pe loc.</h2>
          <p className="text-muted font-body mb-8 italic text-sm md:text-base">Fiecare zi de amânare este un client care ajunge la ei. CapeSystem acceptă doar 2 clienți noi pe lună pentru a garanta rezultatele.</p>
          <a href="mailto:contact@azisunt.net" className="inline-flex items-center gap-2 text-red-400 font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all">Vreau să fiu primul ↗</a>
        </div>
      </section>

      {/* 6. CONTACT FINAL */}
      <section id="contact" className="py-32 bg-bg px-6 text-center">
        <div className="max-w-3xl mx-auto accent-gradient p-[1px] rounded-[3rem]">
          <div className="bg-bg rounded-[3rem] py-24 px-10">
            <h2 className="text-5xl md:text-8xl font-display italic mb-10">CapeSystem</h2>
            <p className="text-muted mb-12 font-body text-xs uppercase tracking-[0.4em]">High-Performance Web Systems</p>
            <a href="mailto:contact@azisunt.net" className="px-12 py-5 rounded-full bg-text-primary text-bg font-bold uppercase tracking-widest text-xs hover:scale-110 transition-transform inline-block">Start Project</a>
          </div>
        </div>
      </section>
    </main>
  );
}