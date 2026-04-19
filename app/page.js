"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowUpRight, Eye, TrendingDown, 
  ShieldAlert, CheckCircle, Star, Users, 
  Zap, Phone, Layers, BarChart3, Clock, AlertTriangle 
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
      
      {/* 1. HERO COMPLET */}
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
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#work" className="px-8 py-4 rounded-full bg-text-primary text-bg text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">Vezi Portofoliu</a>
            <a href="#contact" className="px-8 py-4 rounded-full border border-stroke text-text-primary text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">Vreau un sistem</a>
          </div>
        </div>
      </section>

      {/* 2. PROBLEMA */}
      <section id="problema" className="py-28 bg-bg relative px-6 border-y border-stroke/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <Badge>Problema Reală</Badge>
            <h2 className="font-display italic text-4xl md:text-6xl text-text-primary">Ce pierzi în fiecare zi.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-10 bg-surface border border-stroke rounded-[2.5rem] group hover:border-accent/20 transition-all">
              <Eye className="text-accent mb-6 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="font-display italic text-2xl mb-4">Ești invizibil online</h3>
              <p className="text-muted leading-relaxed font-body text-sm italic">Competitorii tăi apar primii în Google. Tu nu exiști pentru 90% din clienți.</p>
            </div>
            <div className="p-10 bg-surface border border-stroke rounded-[2.5rem] group hover:border-accent/20 transition-all">
              <TrendingDown className="text-accent mb-6 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="font-display italic text-2xl mb-4">Site-ul nu convinge</h3>
              <p className="text-muted leading-relaxed font-body text-sm italic">Un site lent trimite oamenii direct la concurență. Prima impresie durează 3 secunde.</p>
            </div>
            <div className="p-10 bg-surface border border-stroke rounded-[2.5rem] group hover:border-accent/20 transition-all">
              <ShieldAlert className="text-accent mb-6 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="font-display italic text-2xl mb-4">Reclame fără ROI</h3>
              <p className="text-muted leading-relaxed font-body text-sm italic">Bagi bani în Meta Ads fără să știi ce funcționează. Bugetul dispare, conversiile nu apar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PLAN ÎN 3 PAȘI */}
      <section id="plan" className="py-28 bg-bg px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <Badge>Cum funcționează</Badge>
          <h2 className="font-display italic text-4xl md:text-6xl mb-6">3 pași spre <span className="text-accent">succes.</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {[
            { nr: "01", icon: <Phone />, title: "Discutăm gratuit", desc: "Aflăm obiectivele tale și cine sunt clienții tăi ideali." },
            { nr: "02", icon: <Layers />, title: "Construim & Lansăm", desc: "Design custom, SEO on-page și setup complet de marketing." },
            { nr: "03", icon: <BarChart3 />, title: "Crești cu date", desc: "Rapoarte lunare clare. Optimizăm pe baza cifrelor reale." }
          ].map((s, i) => (
            <div key={i} className="relative text-left p-8 bg-surface border border-stroke rounded-3xl">
              <span className="text-5xl font-display italic text-white/5 absolute top-4 right-4">{s.nr}</span>
              <div className="text-accent mb-4">{s.icon}</div>
              <h4 className="font-display text-xl mb-2">{s.title}</h4>
              <p className="text-muted text-sm font-body">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PORTOFOLIU */}
      <section id="work" className="py-28 bg-bg px-6 border-t border-stroke/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display italic text-4xl md:text-6xl mb-16">Rezultate <span className="text-accent">Măsurabile.</span></h2>
          <div className="grid md:grid-cols-2 gap-8">
            <a href="https://napoletano.ro" target="_blank" className="group p-10 bg-surface border border-stroke rounded-[3rem] overflow-hidden relative">
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
              <Badge>SEO & Web</Badge>
              <h3 className="text-3xl font-display italic mb-4">Napoletano.ro</h3>
              <p className="text-muted text-sm max-w-xs mb-8">#1 Google local. Trafic organic crescut cu 312% în 6 luni.</p>
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <div className="p-10 bg-surface border border-stroke rounded-[3rem] relative">
              <Badge>Affiliate System</Badge>
              <h3 className="text-3xl font-display italic mb-4">Samsung G9 Setup</h3>
              <p className="text-muted text-sm max-w-xs mb-8">Arhitectură de vânzare automatizată prin funnel-uri de conversie.</p>
              <BarChart3 className="text-accent" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. COSTUL INACȚIUNII (Urgență) */}
      <section className="py-28 bg-bg px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto bg-red-500/5 border border-red-500/20 rounded-[3rem] p-12 text-center relative z-10">
          <AlertTriangle className="text-red-500 mx-auto mb-6" size={48} />
          <h2 className="font-display italic text-3xl md:text-5xl mb-6 text-white">Competitorul tău citește asta acum.</h2>
          <p className="text-muted font-body mb-8 italic text-sm md:text-base">Fiecare zi de amânare este un client pierdut în favoarea concurenței. CapeSystem lucrează cu doar 2 clienți noi pe lună.</p>
          <a href="#contact" className="inline-flex items-center gap-2 text-red-400 font-bold uppercase tracking-widest text-xs hover:text-red-300 transition-colors">Vreau să fiu primul ↗</a>
        </div>
      </section>

      {/* 6. CONTACT FINAL */}
      <section id="contact" className="py-32 bg-bg px-6 text-center">
        <div className="max-w-3xl mx-auto accent-gradient p-[1px] rounded-[3rem]">
          <div className="bg-bg rounded-[3rem] py-20">
            <h2 className="text-4xl md:text-7xl font-display italic mb-10">Ești gata?</h2>
            <a href="mailto:contact@azisunt.net" className="px-12 py-5 rounded-full bg-text-primary text-bg font-bold uppercase tracking-widest text-xs">Începe Acum</a>
          </div>
        </div>
      </section>
    </main>
  );
}