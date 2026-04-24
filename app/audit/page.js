"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, CheckCircle, ClipboardCheck,
  Sparkles, Loader2, Phone, Mail, AlertTriangle,
  ChevronRight, Globe, Zap, BarChart3, ShieldCheck,
} from "lucide-react";

/* ─── CONSTANTS ─── */
const WA_LINK = "https://wa.me/40733874143";

/* ─── SHARED NAV LOGO ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4">
      <div className={`inline-flex items-center rounded-full backdrop-blur-xl border border-white/10 bg-[hsl(var(--surface))]/90 px-4 h-[45px] transition-all duration-300 gap-6 ${scrolled ? "shadow-2xl shadow-black/30" : ""}`}>
        {/* Logo — h-[52px] overflows pill via -my-2 */}
        <a href="/" className="flex items-center -my-2 hover:scale-105 transition-transform">
          <img
            src="/logo.png"
            alt="CapeSystem"
            className="h-[52px] w-auto object-contain"
            style={{ filter: "drop-shadow(0 0 8px rgba(137,170,204,0.3))" }}
          />
        </a>

        <div className="hidden sm:flex items-center gap-5">
          <a href="/#work"    className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted))] hover:text-white transition-colors">Work</a>
          <a href="/blog"     className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted))] hover:text-white transition-colors">Blog</a>
          <a href="/audit"    className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-black" style={{ color: "#89AACC" }}>
            <Sparkles size={11} /> AI Audit
          </a>
        </div>

        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[hsl(var(--bg))] font-black text-[10px] px-4 py-1.5 rounded-full uppercase tracking-wider hover:scale-105 transition-transform"
          style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.849L.057 23.571a.75.75 0 0 0 .921.921l5.722-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.962-1.359l-.355-.212-3.695.953.977-3.58-.232-.368A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
          </svg>
          Vorbim
        </a>
      </div>
    </nav>
  );
}

/* ─── DOMAIN CARDS ─── */
const DOMAINS = [
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: <Globe size={22} />,
    desc: "Magazine online, dropshipping, produse fizice sau digitale",
    color: "#89AACC",
    questions: [
      { id: "platform", q: "Ce platformă folosești momentan?", options: ["Shopify", "WooCommerce", "Magento", "Custom / Alta", "Nu am încă"] },
      { id: "traffic",  q: "Câți vizitatori lunari ai pe site?", options: ["Sub 500", "500 – 5.000", "5.000 – 50.000", "Peste 50.000"] },
      { id: "conv",     q: "Care e rata ta de conversie estimată?", options: ["Nu știu", "Sub 1%", "1% – 3%", "Peste 3%"] },
      { id: "problem",  q: "Care e cea mai mare problemă acum?", options: ["Vizibilitate SEO slabă", "Coș abandonat", "Site lent", "Reclame fără ROI", "Altele"] },
    ],
  },
  {
    id: "b2b",
    label: "Servicii / B2B",
    icon: <BarChart3 size={22} />,
    desc: "Agenții, consultanță, SaaS, servicii profesionale",
    color: "#6FA3D8",
    questions: [
      { id: "size",     q: "Câți angajați are compania?", options: ["Freelancer / Solo", "2–10", "10–50", "Peste 50"] },
      { id: "leads",    q: "Cum generezi lead-uri acum?", options: ["Referral / Word of mouth", "LinkedIn / Social", "Google Ads", "SEO organic", "Nu generez activ"] },
      { id: "cycle",    q: "Cât durează un ciclu de vânzare?", options: ["Zile", "Săptămâni", "Luni", "Variabil"] },
      { id: "problem",  q: "Care e cea mai mare problemă acum?", options: ["Prea puțini lead-uri", "Lead-uri necalificate", "Site neconvingător", "Fără autoritate online", "Altele"] },
    ],
  },
  {
    id: "imobiliare",
    label: "Imobiliare",
    icon: <ShieldCheck size={22} />,
    desc: "Agenții imobiliare, dezvoltatori, property management",
    color: "#8B8FEF",
    questions: [
      { id: "type",     q: "Ce tip de proprietăți tranzacționezi?", options: ["Rezidențial", "Comercial", "Teren", "Mix"] },
      { id: "listings", q: "Câte anunțuri active ai?", options: ["Sub 10", "10–50", "50–200", "Peste 200"] },
      { id: "source",   q: "De unde vin clienții tăi acum?", options: ["OLX / Storia / imobiliare.ro", "Referral", "Social Media", "Google organic", "Altele"] },
      { id: "problem",  q: "Care e cea mai mare problemă acum?", options: ["Vizibilitate slabă", "Site vechi / lent", "Lipsa lead-uri calificate", "Fără diferențiere față de concurență", "Altele"] },
    ],
  },
  {
    id: "altele",
    label: "Altele",
    icon: <Zap size={22} />,
    desc: "Restaurant, turism, sănătate, educație, etc.",
    color: "#D4AF37",
    questions: [
      { id: "industry", q: "Ce industrie descrie cel mai bine afacerea ta?", options: ["HoReCa / Restaurant", "Sănătate / Medicină", "Educație / Coaching", "Producție / Industrie", "Altele"] },
      { id: "online",   q: "Cât de prezent ești online acum?", options: ["Deloc", "Doar social media", "Site + social media", "Sistem digital complet"] },
      { id: "goal",     q: "Ce vrei să rezolvi urgent?", options: ["Mai mulți clienți", "Reputație online mai bună", "Automatizare procese", "Toate cele de mai sus"] },
      { id: "problem",  q: "Care e cea mai mare problemă acum?", options: ["Nu știu de unde să încep", "Site inexistent sau depășit", "Reclame care nu aduc rezultate", "Concurența mă depășește", "Altele"] },
    ],
  },
];

/* ─── AI AUDIT GENERATOR ─── */
async function generateAuditReport(domain, answers, businessName) {
  const domainData = DOMAINS.find((d) => d.id === domain);
  const qaText = domainData.questions
    .map((q, i) => `Q: ${q.q}\nA: ${answers[q.id] || "Nespecificat"}`)
    .join("\n\n");

  const prompt = `Ești un expert senior în digital marketing și web systems pentru piața din România. Analizează următoarea afacere și generează un raport de audit digital CONCIS și ACȚIONABIL.

**Afacere:** ${businessName || "Nespecificat"}
**Domeniu:** ${domainData.label}

**Răspunsuri audit:**
${qaText}

Generează un raport structurat cu EXACT aceste secțiuni (folosește markdown):

## 🔍 Diagnostic Rapid
2-3 fraze despre situația actuală bazat pe răspunsuri. Fii specific și direct.

## 🚨 Probleme Critice (Top 3)
Lista cu cele mai urgente 3 probleme de rezolvat. Pentru fiecare: problema + impactul ei în bani/clienți pierduți.

## ⚡ Acțiuni Imediate (Quick Wins)
3 acțiuni concrete pe care le pot face în 30 de zile. Fii specific, nu generic.

## 🎯 Strategie 90 de Zile
Un plan în 3 faze (lunile 1, 2, 3) cu obiective clare și măsurabile.

## 💰 Potențial de Creștere Estimat
O estimare realistă (nu exagerată) a ce îmbunătățiri sunt posibile în 6 luni cu sistemul corect.

Fii direct, specific pentru România, fără buzzwords goale. Maxim 600 cuvinte total.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  return data.content?.[0]?.text || "Eroare la generare raport.";
}

/* ─── MARKDOWN RENDERER (simple) ─── */
function RenderMarkdown({ text }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-3">
      {lines.map((line, i) => {
        if (line.startsWith("## ")) {
          return (
            <h3 key={i} className="font-display italic text-xl text-white mt-6 mb-2 first:mt-0">
              {line.replace("## ", "")}
            </h3>
          );
        }
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} className="font-bold text-white text-sm">{line.replace(/\*\*/g, "")}</p>;
        }
        if (line.startsWith("- ") || line.startsWith("• ")) {
          const content = line.replace(/^[-•] /, "");
          // inline bold
          const parts = content.split(/\*\*(.*?)\*\*/g);
          return (
            <div key={i} className="flex gap-3 text-sm text-[hsl(var(--muted))] leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#89AACC" }} />
              <span>{parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white">{p}</strong> : p)}</span>
            </div>
          );
        }
        if (line.trim() === "") return <div key={i} className="h-1" />;
        // inline bold for regular paragraphs
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-sm text-[hsl(var(--muted))] leading-relaxed">
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white">{p}</strong> : p)}
          </p>
        );
      })}
    </div>
  );
}

/* ─── PROGRESS BAR ─── */
function ProgressBar({ step, total }) {
  return (
    <div className="w-full h-0.5 bg-white/8 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: "linear-gradient(90deg, #89AACC, #4E85BF)" }}
        initial={{ width: 0 }}
        animate={{ width: `${((step) / total) * 100}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function AuditPage() {
  const [step, setStep]               = useState(0); // 0=domain, 1-4=questions, 5=contact, 6=result
  const [domain, setDomain]           = useState(null);
  const [answers, setAnswers]         = useState({});
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [report, setReport]           = useState("");
  const [currentQ, setCurrentQ]       = useState(0);
  const reportRef                     = useRef(null);

  const domainData = DOMAINS.find((d) => d.id === domain);
  const totalSteps = domainData ? domainData.questions.length + 2 : 0; // +2 for domain + contact

  /* ── step helpers ── */
  const selectDomain = (id) => {
    setDomain(id);
    setCurrentQ(0);
    setAnswers({});
    setStep(1);
  };

  const answerQuestion = (qId, value) => {
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);
    const qs = domainData.questions;
    if (currentQ < qs.length - 1) {
      setTimeout(() => setCurrentQ((p) => p + 1), 300);
    } else {
      // all questions answered → contact step
      setTimeout(() => setStep(5), 300);
    }
  };

  const submitAndGenerate = async () => {
    setStep(6);
    setLoading(true);
    try {
      const result = await generateAuditReport(domain, answers, businessName);
      setReport(result);
    } catch (err) {
      setReport("## ⚠️ Eroare temporară\n\nNu am putut genera raportul acum. Te rugăm să ne contactezi direct pe WhatsApp.");
    } finally {
      setLoading(false);
      setTimeout(() => reportRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  const reset = () => {
    setStep(0); setDomain(null); setAnswers({});
    setBusinessName(""); setEmail(""); setReport(""); setCurrentQ(0);
  };

  return (
    <main className="bg-[hsl(var(--bg))] min-h-screen text-[hsl(var(--text))] overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 px-6 border-b border-[hsl(var(--stroke))]/20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(137,170,204,0.07) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="max-w-3xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center mb-6" style={{ background: "linear-gradient(90deg,#89AACC33,#4E85BF22)", borderRadius: 999, padding: "1px" }}>
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[hsl(var(--bg))]/80 backdrop-blur-sm text-[11px] font-display tracking-[0.2em] uppercase font-bold" style={{ color: "#89AACC" }}>
                <Sparkles size={11} className="animate-pulse" />
                AI Audit Rapid · Powered by Claude
              </span>
            </div>
          </motion.div>

          <motion.h1 className="font-display italic text-5xl sm:text-6xl md:text-7xl leading-[0.92] tracking-tighter mb-5"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            Diagnosticul digital
            <br />
            <span className="bg-clip-text text-transparent"
              style={{ background: "linear-gradient(90deg,#89AACC 0%,#4E85BF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              al afacerii tale.
            </span>
          </motion.h1>

          <motion.p className="text-[hsl(var(--muted))] font-body text-base max-w-lg mx-auto mb-3 leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            4 întrebări. 60 de secunde. Un raport AI generat instant — specific pentru afacerea și domeniul tău.
          </motion.p>
          <motion.p className="text-red-400/60 text-[11px] font-body flex items-center justify-center gap-1.5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            <AlertTriangle size={11} /> Gratuit · Fără obligații · Fără spam
          </motion.p>
        </div>
      </section>

      {/* ── AUDIT FLOW ── */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Progress */}
          {step > 0 && step < 6 && domainData && (
            <div className="mb-8">
              <ProgressBar step={step === 5 ? totalSteps - 1 : currentQ + 1} total={totalSteps} />
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-[hsl(var(--muted))] font-body uppercase tracking-widest">
                  {step === 5 ? "Contact" : `Întrebarea ${currentQ + 1} din ${domainData.questions.length}`}
                </span>
                <span className="text-[10px]" style={{ color: "#89AACC" }}>{domainData.label}</span>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* ── STEP 0: Domain selection ── */}
            {step === 0 && (
              <motion.div key="step0"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}>
                <p className="font-display italic text-2xl text-white mb-8 text-center">
                  În ce domeniu activezi?
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {DOMAINS.map((d) => (
                    <motion.button
                      key={d.id}
                      onClick={() => selectDomain(d.id)}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative flex flex-col items-start p-7 bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-[2rem] text-left hover:border-white/25 transition-all duration-200 overflow-hidden"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 30% 50%, ${d.color}12 0%, transparent 70%)` }} />
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 flex-shrink-0 relative z-10"
                        style={{ background: `${d.color}18`, color: d.color, border: `1px solid ${d.color}30` }}>
                        {d.icon}
                      </div>
                      <p className="font-display italic text-xl text-white mb-1.5 relative z-10">{d.label}</p>
                      <p className="text-[hsl(var(--muted))] font-body text-xs leading-relaxed relative z-10">{d.desc}</p>
                      <ChevronRight size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── STEP 1–4: Questions ── */}
            {step === 1 && domainData && (
              <motion.div key={`q-${currentQ}`}
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}>
                <div className="mb-8">
                  <button onClick={() => currentQ > 0 ? setCurrentQ((p) => p - 1) : setStep(0)}
                    className="inline-flex items-center gap-1.5 text-[hsl(var(--muted))] text-xs hover:text-white transition-colors mb-6 uppercase tracking-widest font-body">
                    <ArrowLeft size={12} /> Înapoi
                  </button>
                  <p className="font-display italic text-2xl sm:text-3xl text-white leading-snug">
                    {domainData.questions[currentQ].q}
                  </p>
                </div>

                <div className="space-y-3">
                  {domainData.questions[currentQ].options.map((opt) => (
                    <motion.button
                      key={opt}
                      onClick={() => answerQuestion(domainData.questions[currentQ].id, opt)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-5 bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-2xl text-left hover:border-[#89AACC]/40 hover:bg-white/3 transition-all duration-150 group"
                    >
                      <span className="font-body text-sm text-white/80 group-hover:text-white transition-colors">{opt}</span>
                      <ChevronRight size={14} className="text-white/20 group-hover:text-[#89AACC] flex-shrink-0 ml-3 transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── STEP 5: Contact ── */}
            {step === 5 && (
              <motion.div key="step5"
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}>
                <button onClick={() => { setStep(1); setCurrentQ(domainData.questions.length - 1); }}
                  className="inline-flex items-center gap-1.5 text-[hsl(var(--muted))] text-xs hover:text-white transition-colors mb-6 uppercase tracking-widest font-body">
                  <ArrowLeft size={12} /> Înapoi
                </button>

                <p className="font-display italic text-2xl sm:text-3xl text-white mb-2">
                  Aproape gata.
                </p>
                <p className="text-[hsl(var(--muted))] font-body text-sm mb-8">
                  Spune-ne cum te cheamă ca să personalizăm raportul.
                </p>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Numele afacerii tale"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-[hsl(var(--surface))] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm placeholder:text-white/25 focus:border-[#89AACC]/40 outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email (opțional — pentru copia raportului)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[hsl(var(--surface))] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm placeholder:text-white/25 focus:border-[#89AACC]/40 outline-none transition-colors"
                  />

                  <motion.button
                    onClick={submitAndGenerate}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all"
                    style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)", color: "#080810" }}
                  >
                    <Sparkles size={16} />
                    Generează Raportul AI
                    <ArrowRight size={16} />
                  </motion.button>

                  <p className="text-center text-[10px] text-white/20 font-body">
                    Raportul e generat de AI în ~15 secunde · Gratuit
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── STEP 6: Result ── */}
            {step === 6 && (
              <motion.div key="step6" ref={reportRef}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}>

                {loading ? (
                  <div className="flex flex-col items-center gap-6 py-20">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-2 border-[#89AACC]/20 flex items-center justify-center">
                        <Loader2 size={28} className="animate-spin" style={{ color: "#89AACC" }} />
                      </div>
                      <div className="absolute inset-0 rounded-full animate-ping border border-[#89AACC]/20" />
                    </div>
                    <div className="text-center">
                      <p className="font-display italic text-xl text-white mb-1">Analizăm afacerea ta...</p>
                      <p className="text-[hsl(var(--muted))] font-body text-sm">AI-ul procesează răspunsurile. ~15 secunde.</p>
                    </div>
                    {/* Animated bullets */}
                    <div className="space-y-2 w-full max-w-xs">
                      {["Analiză SEO & vizibilitate", "Evaluare conversie & UX", "Identificare oportunități", "Generare strategie 90 zile"].map((txt, i) => (
                        <motion.div key={i} className="flex items-center gap-3 text-xs text-[hsl(var(--muted))] font-body"
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.6 }}>
                          <div className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: "#89AACC" }} />
                          {txt}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Report header */}
                    <div className="flex items-center gap-3 mb-8 p-5 bg-[hsl(var(--surface))] border border-[#89AACC]/25 rounded-2xl">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)" }}>
                        <Sparkles size={16} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-display italic">
                          Raport AI — {businessName || domainData?.label}
                        </p>
                        <p className="text-[hsl(var(--muted))] text-[10px] font-body uppercase tracking-widest">
                          {domainData?.label} · Generat de CapeSystem AI
                        </p>
                      </div>
                      <CheckCircle size={16} style={{ color: "#89AACC" }} />
                    </div>

                    {/* Report body */}
                    <div className="p-8 bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-[2rem] mb-8">
                      <RenderMarkdown text={report} />
                    </div>

                    {/* CTAs */}
                    <div className="space-y-3">
                      <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02]"
                        style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)", color: "#080810" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.849L.057 23.571a.75.75 0 0 0 .921.921l5.722-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.962-1.359l-.355-.212-3.695.953.977-3.58-.232-.368A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                        </svg>
                        Discutăm implementarea pe WhatsApp
                        <ArrowRight size={15} />
                      </a>
                      <button onClick={reset}
                        className="w-full py-3 rounded-2xl text-xs font-body text-[hsl(var(--muted))] hover:text-white transition-colors border border-white/8 hover:border-white/20 uppercase tracking-widest">
                        Fă un audit nou
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* ── SOCIAL PROOF (only on step 0) ── */}
      <AnimatePresence>
        {step === 0 && (
          <motion.section
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="pb-20 px-6">
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "500+", label: "Audituri generate" },
                  { value: "15s",  label: "Timp mediu generare" },
                  { value: "100%", label: "Gratuit" },
                ].map((s) => (
                  <div key={s.label} className="bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-2xl p-5 text-center">
                    <p className="font-display italic text-2xl text-white mb-0.5">{s.value}</p>
                    <p className="text-[hsl(var(--muted))] font-body text-[10px] uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--stroke))]/20 py-8 px-6">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="CapeSystem" className="h-[28px] w-auto object-contain opacity-70" />
            <p className="text-[9px] text-[hsl(var(--muted))] font-body uppercase tracking-widest">azisunt.net</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+40733874143" className="text-[10px] font-body text-white/30 hover:text-white transition-colors flex items-center gap-1"><Phone size={10} /> +40 733 874 143</a>
            <a href="mailto:harapalb923@gmail.com" className="text-[10px] font-body text-white/30 hover:text-white transition-colors flex items-center gap-1"><Mail size={10} /> harapalb923@gmail.com</a>
            <a href="/" className="text-[10px] font-body text-white/30 hover:text-white transition-colors uppercase tracking-widest">← Acasă</a>
          </div>
        </div>
      </footer>
    </main>
  );
}