"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroVideo from "@/components/HeroVideo";

// Navbar simplificat pentru stabilitate build
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <div className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-4 py-2 transition-all duration-300 ${scrolled ? "shadow-lg shadow-black/20" : ""}`}>
        <div className="flex items-center gap-6">
          <div className="accent-gradient p-[1px] rounded-full">
            <div className="bg-bg rounded-full px-2 py-1 text-[11px] font-display italic font-bold text-white">CS</div>
          </div>
          <div className="hidden sm:flex gap-4">
            <span className="text-[10px] uppercase tracking-widest text-muted">Home</span>
            <span className="text-[10px] uppercase tracking-widest text-muted">Work</span>
          </div>
          <button className="bg-text-primary text-bg px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Say hi ↗
          </button>
        </div>
      </div>
    </nav>
  );
}

export default function Page() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Creative", "Fullstack", "Founder", "Scholar"];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-bg min-h-screen text-text-primary">
      <Navbar />
      
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <HeroVideo src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8" />
        
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] md:text-xs text-muted uppercase tracking-[0.4em] mb-6"
          >
            Collection '26
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display italic text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter mb-8"
          >
            Michael Smith
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
                A <span className="font-display italic text-accent">{roles[roleIndex]}</span> lives in Chicago.
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4"
          >
            <button className="px-8 py-3.5 rounded-full bg-text-primary text-bg text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">
              See Works
            </button>
            <button className="px-8 py-3.5 rounded-full border border-stroke text-text-primary text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
              Reach out...
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.3em] text-muted uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-stroke relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full accent-gradient animate-scroll-down" />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="font-display italic text-4xl mb-4 text-muted">Building the future...</h2>
      </section>
	  {/* Section: Selected Works */}
<section className="py-24 px-6 md:px-10 lg:px-16 max-w-[1200px] mx-auto bg-bg">
  <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-[1px] bg-stroke" />
        <span className="text-[10px] text-muted uppercase tracking-[0.3em]">Selected Work</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-display italic text-text-primary">
        Featured <span className="text-muted">projects</span>
      </h2>
    </div>
    <button className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-text-primary group border border-stroke px-6 py-3 rounded-full hover:bg-white/5 transition-all">
      View all work <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  </div>

  {/* Bento Grid */}
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
    {/* Card 1: Napoletano */}
    <div className="md:col-span-7 group relative aspect-video md:aspect-auto md:h-[450px] bg-surface border border-stroke rounded-[2rem] overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none z-10" 
           style={{ backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`, backgroundSize: '4px 4px' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent z-20" />
      <div className="absolute bottom-8 left-8 z-30">
        <span className="text-[10px] text-muted uppercase tracking-widest mb-2 block">Full-Stack / SEO</span>
        <h3 className="text-2xl font-display italic text-text-primary">Napoletano.ro</h3>
      </div>
      {/* Imaginea va veni aici */}
      <div className="absolute inset-0 bg-white/5 group-hover:scale-105 transition-transform duration-700" />
    </div>

    {/* Card 2: Samsung G9 */}
    <div className="md:col-span-5 group relative aspect-square md:aspect-auto md:h-[450px] bg-surface border border-stroke rounded-[2rem] overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none z-10" 
           style={{ backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`, backgroundSize: '4px 4px' }} />
      <div className="absolute inset-0 bg-white/5 group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute bottom-8 left-8 z-30">
        <span className="text-[10px] text-muted uppercase tracking-widest mb-2 block">Affiliate / Setup</span>
        <h3 className="text-2xl font-display italic text-text-primary">Odyssey G9</h3>
      </div>
    </div>
  </div>
</section>
    </main>
  );
}