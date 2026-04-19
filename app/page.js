"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, Monitor, Server, ArrowUpRight } from "lucide-react";
import HeroVideo from "@/components/HeroVideo";

/* --- Navbar-ul Pill (Floating) --- */
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
          <div className="accent-gradient p-[1px] rounded-full group transition-transform hover:scale-110">
            <div className="bg-bg rounded-full px-2 py-1 text-[11px] font-display italic font-bold">CS</div>
          </div>
          <div className="hidden sm:flex gap-4">
            {["Home", "Work", "Journal"].map((item) => (
              <a key={item} href="#" className="text-xs uppercase tracking-widest text-muted hover:text-text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>
          <button className="bg-text-primary text-bg px-4 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform">
            Say hi ↗
          </button>
        </div>
      </div>
    </nav>
  );
}

/* --- Hero Section Cinematic --- */
function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Creative", "Fullstack", "Founder", "Scholar"];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <HeroVideo src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.span 
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] md:text-xs text-muted uppercase tracking-[0.4em] mb-6"
        >
          Collection '26
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display italic text-6xl md:text-8xl lg:text-9xl text-text-primary leading-[0.85] tracking-tighter mb-8"
        >
          Michael Smith
        </motion.h1>

        <div className="h-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={roles[roleIndex]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg md:text-xl font-body text-text-primary/90"
            >
              A <span className="font-display italic">{roles[roleIndex]}</span> lives in Chicago.
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4"
        >
          <button className="px-8 py-3.5 rounded-full bg-text-primary text-bg text-sm font-bold hover:scale-105 transition-transform">
            See Works
          </button>
          <button className="px-8 py-3.5 rounded-full border border-stroke text-text-primary text-sm font-bold hover:bg-white/5 transition-all">
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
  );
}

export default function Page() {
  return (
    <main className="bg-bg min-h-screen">
      <Navbar />
      <Hero />
      {/* Restul secțiunilor tale (Problema, Succes, Portofoliu) vor fi actualizate în pasul următor */}
      <div className="py-20 text-center text-muted text-xs tracking-widest uppercase">
        More modules coming in next sprint...
      </div>
    </main>
  );
}