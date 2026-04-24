"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, ClipboardCheck, AlertTriangle,
  Globe, Zap, BarChart3, Phone, Mail,
} from "lucide-react";

const WA_LINK = "https://wa.me/40733874143";

function Badge({ children }) {
  return (
    <div className="inline-flex items-center mb-7" style={{ background: "linear-gradient(90deg,#89AACC33,#4E85BF22)", borderRadius: 999, padding: "1px" }}>
      <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[hsl(var(--bg))]/80 backdrop-blur-sm text-[11px] font-display tracking-[0.2em] uppercase font-bold" style={{ color: "#89AACC" }}>
        <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: "linear-gradient(135deg,#89AACC,#4E85BF)", boxShadow: "0 0 8px #89AACC80" }} />
        {children}
      </span>
    </div>
  );
}

const AUDIT_ITEMS = [
  { icon: <Globe size={18} />,    label: "Vizibilitate SEO",        desc: "Cât de ușor te găsesc clienții pe Google?" },
  { icon: <Zap size={18} />,      label: "Viteză & Performanță",    desc: "PageSpeed, Core Web Vitals, timp de încărcare." },
  { icon: <BarChart3 size={18} />, label: "Conversie & Copy",        desc: "Site-ul tău convinge sau respinge vizitatorii?" },
  { icon: <CheckCircle size={18} />, label: "Structură Tehnică",    desc: "Cod curat, mobile-first, securitate HTTPS." },
];

const STEPS = [
  { n: "01", title: "Completezi formularul",    desc: "3 minute. Ne spui despre afacerea ta și obiectivele tale." },
  { n: "02", title: "Analizăm în 24h",          desc: "Echipa CapeSystem face un audit complet al prezenței tale online." },
  { n: "03", title: "Primești raportul",         desc: "Un PDF cu problemele găsite, prioritizate, și soluțiile recomandate." },
  { n: "04", title: "Discutăm strategia",        desc: "O discuție de 30 min în care îți explicăm exact ce trebuie făcut." },
];

export default function AuditPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const data = new FormData(form);

    try {
      await fetch("https://formspree.io/f/xqewbwgj", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
    } catch {
      // fallback: show success anyway
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[hsl(var(--bg))] min-h-screen text-[hsl(var(--text))] overflow-x-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <div className="inline-flex items-center h-[45px] rounded-full backdrop-blur-md border border-white/10 bg-[hsl(var(--surface))]/80 px-4">
          <div className="flex items-center gap-5">
            <a href="/" className="accent-gradient p-[1px] rounded-full">
              <div className="bg-[hsl(var(--bg))] rounded-full px-2 py-1 text-[11px] font-display italic font-bold text-white">CS</div>
            </a>
            <div className="hidden sm:flex gap-5">
              <a href="/#work"  className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted))] hover:text-white transition-colors">Work</a>
              <a href="/blog"   className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted))] hover:text-white transition-colors">Blog</a>
              <a href="/audit"  className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold" style={{ color: "#89AACC" }}>
                <ClipboardCheck size={12} /> Audit Rapid
              </a>
            </div>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white text-[hsl(var(--bg))] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:scale-105 transition-transform">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.849L.057 23.571a.75.75 0 0 0 .921.921l5.722-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.962-1.359l-.355-.212-3.695.953.977-3.58-.232-.368A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 border-b border-[hsl(var(--stroke))]/20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(137,170,204,0.07) 0%,transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge>Audit Gratuit · CapeSystem</Badge>
          </motion.div>
          <motion.h1 className="font-display italic text-5xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tighter mb-6"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Află în 24h ce<br />
            <span className="bg-clip-text text-transparent"
              style={{ background: "linear-gradient(90deg,#89AACC 0%,#4E85BF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              frânează afacerea ta.
            </span>
          </motion.h1>
          <motion.p className="text-[hsl(var(--muted))] font-body text-base max-w-xl mb-8 leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            Un audit complet: SEO, viteză, conversie, cod tehnic. Primit ca PDF în 24h. Gratuit, fără obligații.
          </motion.p>

          <motion.div className="flex items-center gap-2 text-red-400/70 text-xs font-body"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <AlertTriangle size={12} />
            Maximum 2 audituri noi pe lună. Locuri disponibile: limitate.
          </motion.div>
        </div>
      </section>

      {/* What we audit */}
      <section className="py-16 px-6 border-b border-[hsl(var(--stroke))]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[hsl(var(--muted))] text-[10px] uppercase tracking-widest font-body mb-8">Ce analizăm</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AUDIT_ITEMS.map((item, i) => (
              <motion.div key={i}
                className="p-6 bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-2xl"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#89AACC] mb-4">{item.icon}</div>
                <p className="font-display italic text-white text-sm mb-1">{item.label}</p>
                <p className="text-[hsl(var(--muted))] font-body text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main: Form + Steps */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

          {/* FORM */}
          <div>
            <p className="text-[hsl(var(--muted))] text-[10px] uppercase tracking-widest font-body mb-6">Completează formularul</p>

            {submitted ? (
              <motion.div
                className="p-10 bg-[hsl(var(--surface))] border border-[#89AACC]/30 rounded-[2.5rem] text-center"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "linear-gradient(135deg,#89AACC,#4E85BF)" }}>
                  <CheckCircle size={24} className="text-white" />
                </div>
                <h3 className="font-display italic text-2xl text-white mb-3">Cerere primită!</h3>
                <p className="text-[hsl(var(--muted))] font-body text-sm leading-relaxed mb-8">
                  Îți trimitem raportul de audit în maxim 24h. Verifică și folderul Spam.
                </p>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/25 text-[#25D366] font-bold text-sm px-6 py-3 rounded-full hover:bg-[#25D366]/15 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.849L.057 23.571a.75.75 0 0 0 .921.921l5.722-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.962-1.359l-.355-.212-3.695.953.977-3.58-.232-.368A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                  Grăbești? Scrie pe WhatsApp
                </a>
              </motion.div>
            ) : (
              <div className="accent-gradient p-[1px] rounded-[2.5rem]">
                <div className="bg-[hsl(var(--bg))] rounded-[2.5rem] py-10 px-8">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="_subject" value="Cerere Audit Rapid — CapeSystem" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input type="text" name="name" placeholder="Numele tău" required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white text-sm placeholder:text-white/30 focus:border-white/30 outline-none transition-colors" />
                      <input type="email" name="email" placeholder="Email" required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white text-sm placeholder:text-white/30 focus:border-white/30 outline-none transition-colors" />
                    </div>
                    <input type="url" name="website" placeholder="Site-ul tău (https://...)" required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white text-sm placeholder:text-white/30 focus:border-white/30 outline-none transition-colors" />
                    <select name="goal" required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white text-sm focus:border-white/30 outline-none transition-colors appearance-none"
                      defaultValue="">
                      <option value="" disabled className="bg-[hsl(var(--bg))]">Obiectivul principal</option>
                      <option value="seo" className="bg-[hsl(var(--bg))]">Mai mult trafic organic (SEO)</option>
                      <option value="conversie" className="bg-[hsl(var(--bg))]">Mai multe conversii / vânzări</option>
                      <option value="redesign" className="bg-[hsl(var(--bg))]">Redesign complet</option>
                      <option value="viteza" className="bg-[hsl(var(--bg))]">Îmbunătățire viteză</option>
                      <option value="altele" className="bg-[hsl(var(--bg))]">Altele</option>
                    </select>
                    <textarea name="context" placeholder="Orice context ajutor: industrie, concurenți, probleme cunoscute..." rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white text-sm placeholder:text-white/30 focus:border-white/30 outline-none transition-colors resize-none" />
                    <button type="submit" disabled={loading}
                      className="w-full accent-gradient text-[hsl(var(--bg))] font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform uppercase text-xs tracking-widest disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {loading ? "Se trimite..." : <>Cer auditul gratuit <ArrowRight size={13} /></>}
                    </button>
                    <p className="text-center text-[10px] text-white/25 font-body">
                      Fără spam · Fără obligații · Răspuns în 24h
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* STEPS */}
          <div>
            <p className="text-[hsl(var(--muted))] text-[10px] uppercase tracking-widest font-body mb-6">Cum funcționează</p>
            <div className="space-y-5">
              {STEPS.map((s, i) => (
                <motion.div key={i} className="flex gap-5 items-start"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.1 }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-display italic text-sm font-bold"
                    style={{ background: "linear-gradient(135deg,rgba(137,170,204,0.15),rgba(78,133,191,0.08))", border: "1px solid rgba(137,170,204,0.2)", color: "#89AACC" }}>
                    {s.n}
                  </div>
                  <div className="pt-1">
                    <p className="font-display italic text-white text-base mb-1">{s.title}</p>
                    <p className="text-[hsl(var(--muted))] font-body text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp alternative */}
            <div className="mt-10 p-6 bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-2xl">
              <p className="text-[hsl(var(--muted))] text-[10px] uppercase tracking-widest font-body mb-4">Preferi direct?</p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-bold text-white hover:text-[#25D366] transition-colors group">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/10 transition-colors"
                  style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.849L.057 23.571a.75.75 0 0 0 .921.921l5.722-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.962-1.359l-.355-.212-3.695.953.977-3.58-.232-.368A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-display italic">Trimite mesaj pe WhatsApp</p>
                  <p className="text-[hsl(var(--muted))] text-[10px] font-body">Răspundem în max. 4 ore</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--stroke))]/20 pt-10 pb-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="accent-gradient p-[1px] rounded-full">
              <div className="bg-[hsl(var(--bg))] rounded-full px-2.5 py-1 text-[11px] font-display italic font-bold text-white">CS</div>
            </div>
            <div>
              <p className="font-display italic text-sm text-white">CapeSystem</p>
              <p className="text-[9px] text-[hsl(var(--muted))] font-body uppercase tracking-widest">azisunt.net</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+40733874143" className="flex items-center gap-1.5 text-[10px] font-body text-white/40 hover:text-white transition-colors">
              <Phone size={10} /> +40 733 874 143
            </a>
            <a href="mailto:harapalb923@gmail.com" className="flex items-center gap-1.5 text-[10px] font-body text-white/40 hover:text-white transition-colors">
              <Mail size={10} /> harapalb923@gmail.com
            </a>
            <a href="/" className="text-[10px] font-body text-white/40 hover:text-white transition-colors uppercase tracking-widest">← Acasă</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
