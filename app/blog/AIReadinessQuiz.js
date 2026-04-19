"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AIReadinessQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(null);

  const steps = [
    {
      q: "În ce domeniu activezi?",
      options: ["E-commerce", "Servicii/B2B", "Imobiliare", "Altele"]
    },
    {
      q: "Care este blocajul principal?",
      options: ["Prea mult task manual", "Puține lead-uri", "Viteză site mică", "Costuri mari"]
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setScore(Math.floor(Math.random() * (98 - 85 + 1) + 85)); // Scor psihologic între 85-98%
      setStep(3);
    }
  };

  return (
    <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#89AACC]/20 to-transparent border border-[#89AACC]/30 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Brain size={18} className="text-[#89AACC]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#89AACC]">AI Audit Rapid</span>
        </div>

        <AnimatePresence mode="wait">
          {step < 2 ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h4 className="font-display italic text-xl text-white mb-6">{steps[step].q}</h4>
              <div className="grid grid-cols-1 gap-2">
                {steps[step].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={handleNext}
                    className="text-left px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70 hover:bg-[#89AACC]/10 hover:border-[#89AACC]/40 transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#89AACC]/20 mb-4">
                <Sparkles className="text-[#89AACC]" />
              </div>
              <h4 className="font-display italic text-2xl text-white mb-2">Scor: {score}%</h4>
              <p className="text-[10px] text-white/50 uppercase tracking-widest mb-6 leading-relaxed">
                Ești pregătit pentru automatizare. Sistemele CapeSystem pot prelua ~70% din task-urile tale.
              </p>
              <a 
                href="/#contact" 
                className="inline-flex items-center gap-2 bg-[#89AACC] text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Vezi strategia ↗
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}