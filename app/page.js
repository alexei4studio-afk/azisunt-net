"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  CheckCircle,
  TrendingDown,
  Eye,
  ShieldAlert,
  Layers,
  Megaphone,
  BarChart3,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Search,
  Zap,
  Users,
  Star,
} from "lucide-react";

/* ─── Hook: apare când intră în viewport ─── */
function useInView(threshold = 0.15) {
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

/* ─── Componente reutilizabile ─── */
function AnimatedSection({ children, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`${className} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700 ease-out`}>
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-display tracking-widest uppercase text-white/60 mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-ring inline-block" />
      {children}
    </span>
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

  const links = [
    { href: "#problema", label: "Problema" },
    { href: "#plan", label: "Cum funcționează" },
    { href: "#servicii", label: "Servicii" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3 bg-[#080810]/90 backdrop-blur-md border-b border-white/5" : "py-6"}`}>
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-display font-800 text-xl tracking-tight">
          azi<span className="text-accent">sunt</span>.net
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-white/50 hover:text-white transition-colors font-body">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-accent text-[#080810] font-display font-700 text-sm px-5 py-2.5 rounded-full hover:scale-105 transition-transform"
        >
          Vorbim? <ArrowRight size={14} />
        </a>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2">
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0e0e1a] border-t border-white/5 px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/70 font-body text-base">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-2 bg-accent text-[#080810] font-display font-700 text-sm px-5 py-3 rounded-full text-center">
            Vorbim?
          </a>
        </div>
      )}
    </header>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-20">
      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-4xl">
          <div className="animate-fadeup delay-100">
            <Badge>Agenție Web & Marketing · România</Badge>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-800 leading-[1.05] tracking-tight mb-8 animate-fadeup delay-200">
            Site-uri care{" "}
            <span className="relative inline-block">
              <span className="text-accent">vând.</span>
            </span>
            <br />
            Marketing care aduce{" "}
            <span className="text-white/40">clienți reali.</span>
          </h1>

          <p className="font-body text-lg sm:text-xl text-white/55 leading-relaxed max-w-2xl mb-10 animate-fadeup delay-300">
            Suntem o echipă mică, obsedată de rezultate. Construim prezențe digitale pentru antreprenori și afaceri locale care vor să crească — fără bani aruncați pe reclame care nu convertesc.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fadeup delay-400">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 bg-accent text-[#080810] font-display font-700 text-base px-7 py-4 rounded-full hover:scale-105 hover:glow-accent transition-all"
            >
              Vreau un site care vinde
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#plan"
              className="inline-flex items-center justify-center gap-2 border border-white/10 text-white/70 font-body text-base px-7 py-4 rounded-full hover:border-white/30 hover:text-white transition-all"
            >
              Cum funcționează
            </a>
          </div>

          {/* Social proof mini */}
          <div className="mt-14 flex flex-wrap items-center gap-6 animate-fadeup delay-500">
            <div className="flex -space-x-2">
              {["🧑‍💼", "👩‍💻", "👨‍🍳", "👩‍🎨"].map((e, i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-surface-card border border-white/10 flex items-center justify-center text-sm">
                  {e}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-accent text-accent" />)}
              </div>
              <p className="text-xs text-white/40 font-body">+40 clienți mulțumiți în ultimele 12 luni</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <p className="text-xs text-white/40 font-body">⚡ Livrare în <span className="text-white/70">14–21 zile</span></p>
          </div>
        </div>
      </div>

      {/* Floating card — desktop only */}
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 animate-float">
        <div className="w-72 bg-surface-card border border-white/8 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <BarChart3 size={18} className="text-accent" />
            </div>
            <div>
              <p className="font-display font-700 text-sm">Trafic organic</p>
              <p className="text-xs text-white/40 font-body">ultima lună</p>
            </div>
          </div>
          <div className="flex items-end gap-1 mb-3">
            <span className="font-display font-800 text-4xl">+312%</span>
          </div>
          <div className="flex gap-1 items-end h-12">
            {[30, 45, 38, 55, 62, 70, 85, 95, 100].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-accent/20 hover:bg-accent/40 transition-colors" style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="text-xs text-white/30 font-body mt-3">Client: salon frumusețe, Brașov</p>
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEMA ─── */
function Problema() {
  const problems = [
    {
      icon: <Eye size={22} />,
      title: "Ești invizibil online",
      desc: "Competitorii tăi apar primii în Google. Tu nu exiști. Clienții potențiali nici nu știu că ești acolo.",
    },
    {
      icon: <TrendingDown size={22} />,
      title: "Site-ul tău nu convinge",
      desc: "Un site vechi, lent sau prost arătat trimite oamenii direct la concurență. Prima impresie se formează în 3 secunde.",
    },
    {
      icon: <ShieldAlert size={22} />,
      title: "Reclame fără ROI real",
      desc: "Bagi bani în Meta Ads sau Google Ads, dar nu știi ce funcționează și ce nu. Bugetul se scurge fără rezultate clare.",
    },
  ];

  return (
    <section id="problema" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <Badge>Problema reală</Badge>
          <h2 className="font-display font-800 text-4xl sm:text-5xl leading-tight tracking-tight mb-5">
            Ce pierzi în fiecare zi<br />fără o prezență digitală solidă
          </h2>
          <p className="text-white/50 font-body text-lg max-w-xl mx-auto">
            Nu e vorba de un site „de prezentare". E vorba de clienți care ajung la concurență în loc să ajungă la tine.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <AnimatedSection key={i} className={`transition-all delay-${i * 150}`}>
              <div className="group relative h-full bg-surface-card border border-white/7 rounded-2xl p-8 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                  {p.icon}
                </div>
                <h3 className="font-display font-700 text-xl mb-3">{p.title}</h3>
                <p className="text-white/50 font-body text-sm leading-relaxed">{p.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Divider with CTA hint */}
        <AnimatedSection className="mt-16 text-center">
          <p className="font-body text-white/40 text-sm">
            Există o soluție simplă. Nu necesită bugete uriașe. Necesită o echipă care știe ce face.
          </p>
          <div className="mt-4 flex justify-center">
            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── PLAN 3 PAȘI ─── */
function Plan() {
  const steps = [
    {
      nr: "01",
      icon: <Phone size={20} />,
      title: "Discutăm gratuit",
      desc: "Îmi spui despre afacerea ta, obiective și cine sunt clienții tăi ideali. Eu îți spun direct ce funcționează și ce nu în nișa ta. Fără vânzare agresivă.",
      tag: "30 min · Zoom sau telefon",
    },
    {
      nr: "02",
      icon: <Layers size={20} />,
      title: "Construim și lansăm",
      desc: "Design personalizat, copywriting convingător, SEO on-page și setup-ul complet de marketing. Tu nu faci nimic altceva decât să aprobi.",
      tag: "14–21 zile · Proces transparent",
    },
    {
      nr: "03",
      icon: <BarChart3 size={20} />,
      title: "Crești cu date reale",
      desc: "Rapoarte lunare clare. Știi exact câți vizitatori ai, de unde vin și câți devin clienți. Optimizăm continuu pe baza datelor.",
      tag: "Lunar · Rapoarte live",
    },
  ];

  return (
    <section id="plan" className="py-28 relative">
      {/* bg accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <AnimatedSection className="text-center mb-16">
          <Badge>Cum funcționează</Badge>
          <h2 className="font-display font-800 text-4xl sm:text-5xl leading-tight tracking-tight mb-5">
            3 pași simpli de la<br />
            <span className="text-accent">invizibil la de neratat</span>
          </h2>
          <p className="text-white/50 font-body text-lg max-w-xl mx-auto">
            Am simplificat tot procesul astfel încât tu să te concentrezi pe afacere, nu pe marketing.
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <AnimatedSection key={i}>
                <div className="group relative bg-surface-card border border-white/7 rounded-2xl p-8 hover:border-accent/20 hover:-translate-y-2 transition-all duration-300">
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center text-accent">
                      {s.icon}
                    </div>
                    <span className="font-display font-800 text-5xl text-white/5 group-hover:text-white/8 transition-colors">
                      {s.nr}
                    </span>
                  </div>
                  <h3 className="font-display font-700 text-xl mb-3">{s.title}</h3>
                  <p className="text-white/50 font-body text-sm leading-relaxed mb-5">{s.desc}</p>
                  <span className="inline-block text-xs font-body text-accent/70 border border-accent/20 bg-accent/5 px-3 py-1 rounded-full">
                    {s.tag}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICII ─── */
function Servicii() {
  const services = [
    {
      icon: <Layers size={24} />,
      title: "Web Design & Dezvoltare",
      items: ["Design custom, nu template", "Next.js · performanță maximă", "Mobile-first & SEO ready", "Copywriting inclus"],
    },
    {
      icon: <Megaphone size={24} />,
      title: "Social Media Marketing",
      items: ["Strategie lunară de conținut", "Reels, Stories, Carousel", "Community management", "Rapoarte săptămânale"],
    },
    {
      icon: <Search size={24} />,
      title: "SEO & Google Ads",
      items: ["Audit SEO complet", "Optimizare on-page & off-page", "Campanii Google Ads", "Tracking conversii"],
    },
    {
      icon: <Zap size={24} />,
      title: "Branding & Identitate",
      items: ["Logo & identitate vizuală", "Brand guidelines", "Materiale print & digital", "Tone of voice"],
    },
  ];

  return (
    <section id="servicii" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Badge>Ce facem</Badge>
              <h2 className="font-display font-800 text-4xl sm:text-5xl leading-tight tracking-tight">
                Servicii complete,<br />zero bătăi de cap
              </h2>
            </div>
            <p className="text-white/50 font-body text-base max-w-sm md:text-right">
              De la zero la prezență digitală completă. Sau doar ce ai nevoie acum — fără pachete umflate.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <AnimatedSection key={i}>
              <div className="group h-full bg-surface-card border border-white/7 rounded-2xl p-7 hover:border-accent/25 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent/8 text-accent flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors">
                  {s.icon}
                </div>
                <h3 className="font-display font-700 text-lg mb-5 leading-snug">{s.title}</h3>
                <ul className="space-y-2.5">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm font-body text-white/50">
                      <CheckCircle size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALE ─── */
function Testimoniale() {
  const reviews = [
    {
      name: "Andrei M.",
      role: "Proprietar restaurant, Cluj",
      text: "Am lansat site-ul în 18 zile. În prima lună am primit rezervări online cu 40% mai multe față de aceeași perioadă a anului trecut.",
      stars: 5,
    },
    {
      name: "Ioana P.",
      role: "Antreprenor, salon beauty, Timișoara",
      text: "Înainte nu știam ce e SEO-ul. Acum apar prima pe Google pentru orașul meu. Clienți noi în fiecare săptămână, organic.",
      stars: 5,
    },
    {
      name: "Mihai T.",
      role: "Freelancer design, București",
      text: "Portofoliu rebuilt de la zero. Arată exact cum mi-am dorit. Deja am închis 3 contracte noi prin el în 2 luni.",
      stars: 5,
    },
  ];

  return (
    <section className="py-24 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <Badge>Ce spun clienții</Badge>
          <h2 className="font-display font-800 text-4xl leading-tight">
            Rezultate, nu promisiuni
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <AnimatedSection key={i}>
              <div className="h-full bg-surface-card border border-white/7 rounded-2xl p-7">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(r.stars)].map((_, j) => (
                    <Star key={j} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-body text-white/65 text-sm leading-relaxed mb-6">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                    <Users size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-display font-700 text-sm">{r.name}</p>
                    <p className="text-xs text-white/35 font-body">{r.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA PRINCIPAL ─── */
function CTA() {
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <AnimatedSection>
          <Badge>Hai să vorbim</Badge>
          <h2 className="font-display font-800 text-5xl sm:text-6xl leading-[1.05] tracking-tight mb-6">
            Ești gata să oprești<br />
            <span className="text-accent">hemoragia de clienți?</span>
          </h2>
          <p className="font-body text-lg text-white/50 max-w-xl mx-auto mb-10">
            O discuție de 30 de minute îți poate schimba traiectoria afacerii. Fără costuri, fără obligații — doar claritate.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="mailto:salut@azisunt.net"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-accent text-[#080810] font-display font-700 text-base px-8 py-4 rounded-full hover:scale-105 transition-all shadow-lg shadow-accent/20"
            >
              <Mail size={16} />
              salut@azisunt.net
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+40700000000"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-white/10 text-white font-body text-base px-8 py-4 rounded-full hover:border-white/25 hover:bg-white/5 transition-all"
            >
              <Phone size={16} />
              +40 700 000 000
            </a>
          </div>

          {/* Garanție */}
          <div className="inline-flex items-center gap-3 text-sm font-body text-white/40 border border-white/8 rounded-full px-5 py-2.5">
            <CheckCircle size={15} className="text-accent" />
            Consultanță gratuită · Fără spam · Răspundem în max. 4 ore
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display font-700 text-lg tracking-tight mb-1">
            azi<span className="text-accent">sunt</span>.net
          </p>
          <p className="text-xs text-white/30 font-body">Web Design & Social Media Marketing · România</p>
        </div>
        <div className="flex items-center gap-5">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
             className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/30 transition-colors">
            <Instagram size={15} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
             className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/30 transition-colors">
            <Facebook size={15} />
          </a>
        </div>
        <p className="text-xs text-white/25 font-body">
          © {new Date().getFullYear()} Azi Sunt. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problema />
        <Plan />
        <Servicii />
        <Testimoniale />
        <CTA />
      </main>
      <Footer />
    </>
  );
}