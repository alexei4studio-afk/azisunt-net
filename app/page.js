"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Eye, TrendingDown, ShieldAlert, CheckCircle } from "lucide-react"; 
import HeroVideo from "../components/HeroVideo";

// 1. NAVBAR - Stil Pill
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
            <a href="#problema" className="text-[10px] uppercase tracking-widest text-muted hover:text-white transition-colors">Problema</a>
            <a href="#contact" className="text-[10px] uppercase tracking-widest text-muted hover:text-white transition-colors">Contact</a>
          </div>
          <a href="#contact" className="bg-text-primary text-bg px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:scale-105 transition-transform">
            Vorbim? ↗
          </a>
        </div>
      </div>
    </nav>
  );
}

export default function Page() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Web Systems", "Digital Marketing", "SEO Automation", "Lead Gen"];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-bg min-h-screen text-text-primary">
      <Navbar />
      
      {/* 2. HERO - Personalizat CapeSystem */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <HeroVideo src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8" />
        
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] md:text-xs text-muted uppercase tracking-[0.4em] mb-6"
          >
            CapeSystem · Collection '26
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display italic text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter mb-8"
          >
            CapeSystem
          </motion.h1>

          <div className="h-8 mb-12">
            <AnimatePresence mode="wait">
              <motion.p
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-lg md:text-xl font-body"
              >
                High Performance <span className="font-display italic text-accent">{roles[roleIndex]}</span>.
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4"
          >
            <a href="#work" className="px-8 py-3.5 rounded-full bg-text-primary text-bg text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">
              Vezi Portofoliu
            </a>
            <a href="#contact" className="px-8 py-3.5 rounded-full border border-stroke text-text-primary text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
              Vreau un sistem
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.3em] text-muted uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-stroke relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full accent-gradient animate-scroll-down" />
          </div>
        </div>
      </section>

      {/* 3. PROBLEMA */}
      <section id="problema" className="py-28 bg-bg relative px-6 border-b border-stroke/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-3">
               <div className="w-8 h-[1px] bg-stroke" />
               <span className="text-[10px] text-muted uppercase tracking-[0.3em]">Costul Inacțiunii</span>
            </div>
            <h2 className="font-display italic text-4xl md:text-5xl text-text-primary leading-tight">
              Sistemul tău web lucrează pentru tine <br/> 
              <span className="text-muted">sau împotriva ta?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-surface border border-stroke rounded-[2rem] hover:border-white/20 transition-all">
              <Eye className="text-accent mb-6" size={32} />
              <h3 className="font-display italic text-xl mb-3">Ești invizibil online</h3>
              <p className="text-sm text-muted leading-relaxed font-body">Competitorii tăi apar primii în Google. Tu nu exiști. Clienții potențiali nici nu știu că ești acolo.</p>
            </div>
            <div className="p-8 bg-surface border border-stroke rounded-[2rem] hover:border-white/20 transition-all">
              <TrendingDown className="text-accent mb-6" size={32} />
              <h3 className="font-display italic text-xl mb-3">Site-ul nu convinge</h3>
              <p className="text-sm text-muted leading-relaxed font-body">Un site lent trimite oamenii direct la concurență. Prima impresie durează 3 secunde.</p>
            </div>
            <div className="p-8 bg-surface border border-stroke rounded-[2rem] hover:border-white/20 transition-all">
              <ShieldAlert className="text-accent mb-6" size={32} />
              <h3 className="font-display italic text-xl mb-3">Reclame fără ROI</h3>
              <p className="text-sm text-muted leading-relaxed font-body">Bagi bani în Meta Ads fără să știi ce funcționează. Bugetul dispare, conversiile nu apar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUCCES - Rezultate Concrete */}
      <section id="succes" className="py-24 bg-bg px-6">
        <div className="max-w-6xl mx-auto border-t border-stroke pt-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display italic text-5xl md:text-6xl text-text-primary mb-8 leading-tight">
                De la haos <br/> la <span className="text-accent">performanță.</span>
              </h2>
              <p className="text-muted font-body text-lg mb-12 max-w-md">
                Nu construim doar site-uri, construim motoare de vânzări care rulează 24/7 fără supraveghere.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-stroke">
                    <CheckCircle className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Napoletano.ro</p>
                    <p className="text-xs text-muted italic">Primul loc în Google pe nișa de pizza artizanală.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-stroke">
                    <CheckCircle className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Samsung Odyssey G9</p>
                    <p className="text-xs text-muted italic">Sistem de afiliere optimizat pentru conversie maximă.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div id="work" className="grid grid-cols-1 gap-6">
              <a href="https://napoletano.ro" target="_blank" className="group relative bg-surface border border-stroke rounded-[2rem] p-8 overflow-hidden transition-all hover:border-white/20">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" 
                     style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '10px 10px' }} />
                <div className="relative z-10">
                  <span className="text-[10px] text-accent uppercase tracking-widest mb-4 block">E-commerce / SEO</span>
                  <h3 className="text-2xl font-display italic mb-2">Napoletano.ro</h3>
                  <p className="text-xs text-muted max-w-xs">Scalare de la zero la autoritate locală prin SEO și UX.</p>
                  <ArrowUpRight className="absolute top-8 right-8 text-muted group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={20} />
                </div>
              </a>

              <div className="group relative bg-surface border border-stroke rounded-[2rem] p-8 overflow-hidden transition-all hover:border-white/20">
                <div className="relative z-10">
                  <span className="text-[10px] text-accent uppercase tracking-widest mb-4 block">Affiliate Marketing</span>
                  <h3 className="text-2xl font-display italic mb-2">Tech Setup: G9</h3>
                  <p className="text-xs text-muted max-w-xs">Arhitectură de link-uri și funnel de vânzare asistată.</p>
                  <ArrowUpRight className="absolute top-8 right-8 text-muted group-hover:text-white" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT - Final */}
      <section id="contact" className="py-32 bg-bg px-6">
        <div className="max-w-4xl mx-auto text-center border border-stroke rounded-[3rem] py-20 px-10 accent-gradient p-[1px]">
          <div className="bg-bg rounded-[3rem] w-full h-full py-16">
            <h2 className="text-4xl md:text-6xl font-display italic mb-8">Ești gata să scalăm?</h2>
            <p className="text-muted mb-12 max-w-md mx-auto font-body text-sm uppercase tracking-widest">
              Dacă vrei un sistem, nu doar un design, scrie-ne acum.
            </p>
            <a href="mailto:contact@azisunt.net" className="inline-block px-12 py-5 rounded-full bg-text-primary text-bg font-bold uppercase tracking-[0.2em] text-xs hover:scale-105 transition-transform">
              Start Project
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}