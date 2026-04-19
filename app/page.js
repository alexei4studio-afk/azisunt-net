"use client";

import { 
  useState, 
  useEffect, 
  useRef 
} from "react";
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle, 
  TrendingDown, 
  Eye, 
  ShieldAlert, 
  Layers, 
  Megaphone, 
  BarChart3, 
  Phone, 
  Mail, 
  Search, 
  Zap, 
  Users, 
  Star, 
  AlertTriangle, 
  Clock, 
  Trophy, 
  XCircle, 
  Video, 
  Globe, 
  Monitor, 
  Server, 
  ExternalLink, 
  Cpu,
  // Schimbăm numele aici ca să fim siguri
 
} from "lucide-react";

/* ─── Hook: apare când intră în viewport ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimatedSection({ children, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`${className} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } transition-all duration-700 ease-out`}
    >
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

/* ─── Sticky CTA Bar ─── */
function StickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-[#0e0e1a]/95 backdrop-blur-md border-t border-white/8 px-6 py-3 flex items-center justify-between max-w-6xl mx-auto gap-4">
        <p className="font-display font-700 text-sm hidden sm:block">
          Fiecare zi fără sistem = clienți la concurență.
        </p>
        <a
          href="#contact"
          className="ml-auto inline-flex items-center gap-2 bg-accent text-[#080810] font-display font-700 text-sm px-6 py-2.5 rounded-full hover:scale-105 transition-transform whitespace-nowrap"
        >
          Vorbim acum <ArrowRight size={14} />
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#problema", label: "Problema" },
    { href: "#succes", label: "Rezultate" },
    { href: "#portofoliu", label: "Portofoliu" },
    { href: "#plan", label: "Cum funcționează" },
    { href: "#incredere", label: "Clienți" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#080810]/90 backdrop-blur-md border-b border-white/5"
          : "py-6"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-display font-800 text-xl tracking-tight">
          Cape<span className="text-accent">System</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-white/50 hover:text-white transition-colors font-body"
              >
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

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#0e0e1a] border-t border-white/5 px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/70 font-body text-base"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 bg-accent text-[#080810] font-display font-700 text-sm px-5 py-3 rounded-full text-center"
          >
            Vorbim?
          </a>
        </div>
      )}
    </header>
  );
}

/* ─── HERO — Punctul 1: Ce oferi? + Punctul 7: CTA clar ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-20">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-4xl">
          <div className="animate-fadeup delay-100">
            <Badge>CapeSystem · Web Systems & Digital Marketing</Badge>
          </div>

          {/* ★ Punctul 1: Headline clar — ce oferi */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-800 leading-[1.05] tracking-tight mb-6 animate-fadeup delay-200">
            Sisteme digitale care{" "}
            <span className="text-accent">vând.</span>
            <br />
            Marketing care aduce{" "}
            <span className="text-white/40">clienți reali.</span>
          </h1>

          {/* ★ Punctul 2: durerea în Hero */}
          <p className="font-body text-lg sm:text-xl text-white/55 leading-relaxed max-w-2xl mb-4 animate-fadeup delay-300">
            Dacă afacerea ta nu apare în primele rezultate Google, nu există
            pentru 90% din potențialii tăi clienți. CapeSystem rezolvă asta —
            rapid, transparent, cu rezultate măsurabile.
          </p>

          {/* ★ Punctul 3: succesul — preview scurt în Hero */}
          <p className="font-body text-sm text-accent/80 mb-10 animate-fadeup delay-350 flex items-center gap-2">
            <CheckCircle size={15} className="text-accent flex-shrink-0" />
            Clienții noștri cresc traficul organic cu 200–400% în primele 6
            luni.
          </p>

          {/* ★ Punctul 7: CTA principal vizibil */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fadeup delay-400">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 bg-accent text-[#080810] font-display font-700 text-base px-8 py-4 rounded-full hover:scale-105 hover:glow-accent transition-all"
            >
              Vreau mai mulți clienți acum
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#plan"
              className="inline-flex items-center justify-center gap-2 border border-white/10 text-white/70 font-body text-base px-7 py-4 rounded-full hover:border-white/30 hover:text-white transition-all"
            >
              Cum funcționează →
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-6 animate-fadeup delay-500">
            <div className="flex -space-x-2">
              {["🧑‍💼", "👩‍💻", "👨‍🍳", "👩‍🎨"].map((e, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-surface-card border border-white/10 flex items-center justify-center text-sm"
                >
                  {e}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-xs text-white/40 font-body">
                +40 clienți mulțumiți · medie 4.9/5
              </p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <p className="text-xs text-white/40 font-body">
              ⚡ Livrare în{" "}
              <span className="text-white/70">14–21 zile</span>
            </p>
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
              <div
                key={i}
                className="flex-1 rounded-t bg-accent/20 hover:bg-accent/40 transition-colors"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="text-xs text-white/30 font-body mt-3">
            Client: salon frumusețe, Brașov
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEMA — Punctul 2: Ce problemă rezolvi? ─── */
function Problema() {
  const problems = [
    {
      icon: <Eye size={22} />,
      title: "Ești invizibil online",
      desc: "Competitorii tăi apar primii în Google. Tu nu exiști. Clienții potențiali nici nu știu că ești acolo — și nici nu vor ști vreodată.",
    },
    {
      icon: <TrendingDown size={22} />,
      title: "Site-ul tău nu convinge",
      desc: "Un site lent, vechi sau amator trimite oamenii direct la concurență. Prima impresie durează 3 secunde. A ta ce spune?",
    },
    {
      icon: <ShieldAlert size={22} />,
      title: "Reclame fără ROI real",
      desc: "Bagi bani în Meta Ads sau Google Ads fără să știi ce funcționează. Bugetul dispare, conversiile nu apar. E o gură de scurgere.",
    },
  ];

  return (
    <section id="problema" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <Badge>Problema reală</Badge>
          <h2 className="font-display font-800 text-4xl sm:text-5xl leading-tight tracking-tight mb-5">
            Ce pierzi în fiecare zi
            <br />
            fără o prezență digitală solidă
          </h2>
          <p className="text-white/50 font-body text-lg max-w-xl mx-auto">
            Nu e vorba de un site „de prezentare". E vorba de clienți care
            ajung la concurență în loc să ajungă la tine.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <AnimatedSection key={i}>
              <div className="group relative h-full bg-surface-card border border-white/7 rounded-2xl p-8 hover:border-red-500/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                  {p.icon}
                </div>
                <h3 className="font-display font-700 text-xl mb-3">
                  {p.title}
                </h3>
                <p className="text-white/50 font-body text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-16 text-center">
          <p className="font-body text-white/40 text-sm">
            Există o soluție simplă. Nu necesită bugete uriașe. Necesită o
            echipă care știe ce face.
          </p>
          <div className="mt-4 flex justify-center">
            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── SUCCES — Punctul 3: Cum arată succesul? ─── */
function Succes() {
  const outcomes = [
    {
      icon: <BarChart3 size={22} />,
      metric: "+312%",
      label: "Trafic organic",
      context: "Salon frumusețe, Brașov · 6 luni",
    },
    {
      icon: <Users size={22} />,
      metric: "+40%",
      label: "Rezervări online",
      context: "Restaurant, Cluj · prima lună",
    },
    {
      icon: <Trophy size={22} />,
      metric: "3 contracte",
      label: "Noi în 2 luni",
      context: "Freelancer design, București",
    },
    {
      icon: <Zap size={22} />,
      metric: "#1 Google",
      label: "Poziție locală",
      context: "Salon beauty, Timișoara · 90 zile",
    },
  ];

  return (
    <section id="succes" className="py-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <AnimatedSection className="text-center mb-16">
          <Badge>Cum arată succesul</Badge>
          <h2 className="font-display font-800 text-4xl sm:text-5xl leading-tight tracking-tight mb-5">
            Nu îți promitem vise.
            <br />
            <span className="text-accent">Îți arătăm rezultate reale.</span>
          </h2>
          <p className="text-white/50 font-body text-lg max-w-xl mx-auto">
            Imaginează-ți: telefonul sună, inbox-ul se umple cu cereri, iar tu
            ai timp să alegi cu cine lucrezi. Asta e viața după ce CapeSystem
            rezolvă prezența ta digitală.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {outcomes.map((o, i) => (
            <AnimatedSection key={i}>
              <div className="group h-full bg-surface-card border border-white/7 rounded-2xl p-7 text-center hover:border-accent/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent/8 text-accent flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/15 transition-colors">
                  {o.icon}
                </div>
                <p className="font-display font-800 text-4xl text-accent mb-1">
                  {o.metric}
                </p>
                <p className="font-display font-700 text-sm text-white mb-2">
                  {o.label}
                </p>
                <p className="font-body text-xs text-white/35">{o.context}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Succes narrative */}
        <AnimatedSection>
          <div className="relative bg-surface-card border border-accent/15 rounded-2xl p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative max-w-2xl">
              <p className="font-display font-700 text-2xl sm:text-3xl leading-snug mb-6">
                „Înainte nu știam ce e SEO-ul. Acum apar{" "}
                <span className="text-accent">prima pe Google</span> pentru
                orașul meu. Clienți noi în fiecare săptămână, organic."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users size={16} className="text-accent" />
                </div>
                <div>
                  <p className="font-display font-700 text-sm">Ioana P.</p>
                  <p className="text-xs text-white/40 font-body">
                    Antreprenor, salon beauty, Timișoara
                  </p>
                </div>
                <div className="flex gap-0.5 ml-auto">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className="fill-accent text-accent"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ★ Punctul 7: CTA repetat după secțiunea de succes */}
        <AnimatedSection className="mt-10 text-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-accent text-[#080810] font-display font-700 text-base px-8 py-4 rounded-full hover:scale-105 hover:glow-accent transition-all"
          >
            Vreau și eu aceste rezultate
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── PORTOFOLIU — BentoGrid ─── */
const portfolioProjects = [
  {
    badge: "Sistem Web",
    BadgeIcon: Globe,
    CardIcon: Globe,
    title: "napoletano.ro",
    description:
      "Sistem web complet pentru un restaurant premium din Iași — rezervări online, meniu dinamic, SEO local și infrastructură optimizată pentru conversii.",
    cta: "Detalii Proiect",
    href: "https://napoletano.ro",
    stack: "Next.js · Supabase · Vercel · Google Places API",
    featured: true,
  },
  const portfolioProjects = [
  {
    badge: "Full-Stack System",
    BadgeIcon: Globe,
    CardIcon: Globe,
    title: "napoletano.ro",
    description: "Sistem web custom cu integrare Supabase pentru managementul meniului și al galeriei în timp real. Optimizat pentru SEO local și conversii rapide.",
    cta: "Vezi Proiectul",
    href: "https://napoletano.ro",
    stack: "Next.js · Supabase · Google API · Vercel",
    featured: true,
  },
  {
    badge: "Hardware Pro",
    BadgeIcon: Monitor,
    CardIcon: Monitor,
    title: "Samsung Odyssey G9",
    description: "Configurația ultra-wide pe care dezvoltăm sistemele CapeSystem. Productivitate maximă pentru workflow-uri complexe de dezvoltare și marketing.",
    cta: "Verifică Preț & Stoc",
    href: "https://l.profitshare.ro/l/15727767",
    stack: "Productivity · Setup · 49 inch",
    featured: false,
  },
  {
    badge: "Digital Infrastructure",
    BadgeIcon: Server,
    CardIcon: Server,
    title: "azisunt.biz",
    description: "Infrastructură de business securizată și accelerată prin Cloudflare. Performanță de top și protecție avansată pentru ecosistemul digital azisunt.",
    cta: "Vezi Infrastructura",
    href: "https://azisunt.biz",
    stack: "Cloudflare · DNS Security · Edge Performance",
    featured: false,
  },
];

function PortfolioCard({ project }) {
  const { badge, BadgeIcon, CardIcon, title, description, cta, href, stack, featured } =
    project;
  return (
    <div
      className={[
        "group relative flex flex-col gap-4 rounded-2xl p-7 overflow-hidden",
        "bg-[#12121e] border transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:border-[#e8ff47]",
        featured ? "border-[rgba(232,255,71,0.18)]" : "border-white/5",
      ].join(" ")}
    >
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-14 -right-14 w-44 h-44 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 w-fit rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-[#e8ff47] border border-[rgba(232,255,71,0.2)] bg-[rgba(232,255,71,0.08)]">
        <BadgeIcon size={10} strokeWidth={2.5} />
        {badge}
      </span>

      {/* Icon decorativ */}
      <CardIcon size={32} strokeWidth={1.5} className="text-[#e8ff47]" aria-hidden="true" />

      {/* Titlu */}
      <h3 className="font-display text-[1.35rem] font-extrabold italic text-white leading-tight m-0">
        {title}
      </h3>

      {/* Descriere */}
      <p className="font-body text-sm text-gray-400 leading-relaxed flex-1 m-0">
        {description}
      </p>

      {/* Ghost CTA */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1.5 w-fit rounded-lg px-3.5 py-2 text-[13px] font-medium text-[#e8ff47] border border-[rgba(232,255,71,0.25)] bg-transparent transition-colors duration-150 hover:bg-[rgba(232,255,71,0.08)] hover:border-[rgba(232,255,71,0.5)]"
      >
        {cta}
        <ArrowUpRight size={14} strokeWidth={2.5} />
      </a>

      {/* Stack footer */}
      <div className="border-t border-white/5 pt-3 text-[11px] tracking-wider text-white/20">
        {stack}
      </div>
    </div>
  );
}

function Portofoliu() {
  return (
    <section id="portofoliu" className="py-28 relative">
      <div className="absolute top-1/2 right-0 w-[400px] h-[500px] bg-accent/4 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <AnimatedSection className="mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Badge>Portofoliu</Badge>
              <h2 className="font-display font-800 text-4xl sm:text-5xl leading-tight tracking-tight">
                Proiecte reale.
                <br />
                <span className="text-accent">Rezultate vizibile.</span>
              </h2>
            </div>
            <p className="text-white/45 font-body text-sm max-w-xs md:text-right leading-relaxed">
              Fiecare proiect e construit de la zero — zero template-uri,
              zero compromisuri.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {portfolioProjects.map((p) => (
              <PortfolioCard key={p.title} project={p} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── PLAN 3 PAȘI — Punctul 4 ─── */
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
      desc: "Rapoarte lunare clare. Știi exact câți vizitatori ai, de unde vin și câți devin clienți. Optimizăm continuu pe baza datelor, nu pe instinct.",
      tag: "Lunar · Rapoarte live",
    },
  ];

  return (
    <section id="plan" className="py-28 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <AnimatedSection className="text-center mb-16">
          <Badge>Cum funcționează</Badge>
          <h2 className="font-display font-800 text-4xl sm:text-5xl leading-tight tracking-tight mb-5">
            3 pași simpli de la
            <br />
            <span className="text-accent">invizibil la de neratat</span>
          </h2>
          <p className="text-white/50 font-body text-lg max-w-xl mx-auto">
            Am simplificat tot procesul astfel încât tu să te concentrezi pe
            afacere, nu pe marketing.
          </p>
        </AnimatedSection>

        <div className="relative">
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <AnimatedSection key={i}>
                <div className="group relative bg-surface-card border border-white/7 rounded-2xl p-8 hover:border-accent/20 hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center text-accent">
                      {s.icon}
                    </div>
                    <span className="font-display font-800 text-5xl text-white/5 group-hover:text-white/8 transition-colors">
                      {s.nr}
                    </span>
                  </div>
                  <h3 className="font-display font-700 text-xl mb-3">
                    {s.title}
                  </h3>
                  <p className="text-white/50 font-body text-sm leading-relaxed mb-5">
                    {s.desc}
                  </p>
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

/* ─── AUTORITATE & SOCIAL PROOF — Punctul 5 ─── */
function Incredere() {
  const stats = [
    { value: "40+", label: "Clienți activi" },
    { value: "4.9/5", label: "Rating mediu" },
    { value: "14 zile", label: "Timp mediu livrare" },
    { value: "6 ani", label: "Experiență în piață" },
  ];

  const reviews = [
    {
      name: "Andrei M.",
      role: "Proprietar restaurant, Cluj",
      text: "Am lansat site-ul în 18 zile. În prima lună am primit rezervări online cu 40% mai multe față de aceeași perioadă a anului trecut. ROI-ul s-a văzut imediat.",
      stars: 5,
    },
    {
      name: "Ioana P.",
      role: "Antreprenor, salon beauty, Timișoara",
      text: "Înainte nu știam ce e SEO-ul. Acum apar prima pe Google pentru orașul meu. Clienți noi în fiecare săptămână, organic, fără să plătesc reclame.",
      stars: 5,
    },
    {
      name: "Mihai T.",
      role: "Freelancer design, București",
      text: "Portofoliu rebuilt de la zero. Arată exact cum mi-am dorit. Deja am închis 3 contracte noi prin el în 2 luni — valoare totală peste 8.000€.",
      stars: 5,
    },
  ];

  return (
    <section id="incredere" className="py-24 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <Badge>De ce să ne alegi</Badge>
          <h2 className="font-display font-800 text-4xl sm:text-5xl leading-tight tracking-tight mb-5">
            Nu suntem prima agenție.
            <br />
            <span className="text-accent">Suntem prima care livrează.</span>
          </h2>
          <p className="text-white/50 font-body text-base max-w-lg mx-auto">
            6 ani în piată. 40+ afaceri transformate. Zero site-uri generic.
            Fiecare client primește o strategie croită pe nișa și pe obiectivele
            lui.
          </p>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection className="mb-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-[#080810] px-6 py-8 text-center hover:bg-surface-card transition-colors"
              >
                <p className="font-display font-800 text-3xl text-accent mb-1">
                  {s.value}
                </p>
                <p className="font-body text-xs text-white/45">{s.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Testimoniale */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reviews.map((r, i) => (
            <AnimatedSection key={i}>
              <div className="h-full bg-surface-card border border-white/7 rounded-2xl p-7 hover:border-accent/20 transition-all duration-300">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(r.stars)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="font-body text-white/65 text-sm leading-relaxed mb-6">
                  "{r.text}"
                </p>
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

        {/* ★ Punctul 7: CTA repetat */}
        <AnimatedSection className="text-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 border border-accent/30 bg-accent/5 text-accent font-display font-700 text-base px-8 py-4 rounded-full hover:bg-accent hover:text-[#080810] transition-all"
          >
            Consultanță gratuită — fără obligații
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── COSTUL INACȚIUNII — Punctul 6 ─── */
function CostulInactiunii() {
  const losses = [
    {
      icon: <Clock size={20} />,
      title: "Fiecare lună fără SEO = teren cedat",
      desc: "Google premiază vechimea și consistența. Fiecare lună în care competitorul tău publică conținut și obține linkuri te îndepărtează cu luni bune de poziția 1. Nu e un decalaj care se recuperează ușor.",
    },
    {
      icon: <TrendingDown size={20} />,
      title: "Reclame fără fundament = bani aruncați",
      desc: "Dacă site-ul tău nu convinge, nici cel mai bun ad nu îl va salva. Plătești pentru click-uri care pleacă în 5 secunde. Fără o fundație solidă, fiecare leu investit în ads este o gaură neagră.",
    },
    {
      icon: <Users size={20} />,
      title: "Clienții tăi ideali merg la altcineva",
      desc: "Chiar acum, un potențial client caută serviciul tău. Găsește un competitor cu site profesional, recenzii, și apare primul. Îți semnează clientul. Și o va face din nou mâine. Și poimâine.",
    },
    {
      icon: <XCircle size={20} />,
      title: "Prețul crește cu cât aștepți mai mult",
      desc: "Piața digitală nu stagnează. SEO-ul local devine mai competitiv în fiecare trimestru. Fiecare lună de amânare înseamnă mai multă muncă, mai mult timp și mai mulți bani pentru a ajunge la același rezultat.",
    },
  ];

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-900/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <AnimatedSection className="text-center mb-16">
          <Badge>Costul inacțiunii</Badge>
          <h2 className="font-display font-800 text-4xl sm:text-5xl leading-tight tracking-tight mb-5">
            Fiecare zi de amânare
            <br />
            <span className="text-red-400">costă bani reali.</span>
          </h2>
          <p className="text-white/50 font-body text-lg max-w-xl mx-auto">
            „Mai vedem", „ne mai gândim", „nu e momentul" — sunt cele mai
            scumpe fraze pe care le-ai putea spune. Iată de ce:
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {losses.map((l, i) => (
            <AnimatedSection key={i}>
              <div className="group h-full bg-surface-card border border-white/7 rounded-2xl p-8 hover:border-red-500/25 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                    {l.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-700 text-lg mb-2">
                      {l.title}
                    </h3>
                    <p className="text-white/50 font-body text-sm leading-relaxed">
                      {l.desc}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Urgency callout */}
        <AnimatedSection>
          <div className="relative bg-red-950/20 border border-red-500/20 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-red-500/15 flex items-center justify-center">
                <AlertTriangle size={28} className="text-red-400" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="font-display font-700 text-xl sm:text-2xl mb-2">
                Competitorul tău citește aceeași pagină.
              </p>
              <p className="text-white/55 font-body text-sm">
                Diferența dintre voi va fi cine acționează primul. CapeSystem
                lucrează cu maximum{" "}
                <span className="text-white/80">2 clienți noi pe lună</span>{" "}
                pentru a garanta calitatea. Locurile se ocupă rapid.
              </p>
            </div>
            {/* ★ Punctul 7: CTA în contextul urgenței */}
            <a
              href="#contact"
              className="flex-shrink-0 group inline-flex items-center gap-2 bg-accent text-[#080810] font-display font-700 text-sm px-7 py-3.5 rounded-full hover:scale-105 transition-transform whitespace-nowrap"
            >
              Rezerv un loc acum
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </AnimatedSection>
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
      items: [
        "Design custom, nu template",
        "Next.js · performanță maximă",
        "Mobile-first & SEO ready",
        "Copywriting inclus",
      ],
    },
    {
      icon: <Megaphone size={24} />,
      title: "Social Media Marketing",
      items: [
        "Strategie lunară de conținut",
        "Reels, Stories, Carousel",
        "Community management",
        "Rapoarte săptămânale",
      ],
    },
    {
      icon: <Search size={24} />,
      title: "SEO & Google Ads",
      items: [
        "Audit SEO complet",
        "Optimizare on-page & off-page",
        "Campanii Google Ads",
        "Tracking conversii",
      ],
    },
    {
      icon: <Zap size={24} />,
      title: "Branding & Identitate",
      items: [
        "Logo & identitate vizuală",
        "Brand guidelines",
        "Materiale print & digital",
        "Tone of voice",
      ],
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
                Servicii complete,
                <br />
                zero bătăi de cap
              </h2>
            </div>
            <p className="text-white/50 font-body text-base max-w-sm md:text-right">
              De la zero la prezență digitală completă. Sau doar ce ai nevoie
              acum — fără pachete umflate.
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
                <h3 className="font-display font-700 text-lg mb-5 leading-snug">
                  {s.title}
                </h3>
                <ul className="space-y-2.5">
                  {s.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm font-body text-white/50"
                    >
                      <CheckCircle
                        size={14}
                        className="text-accent mt-0.5 flex-shrink-0"
                      />
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

/* ─── CTA FINAL — Punctul 7: Formular de Contact Activ ─── */
function CTA() {
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative">
        <AnimatedSection className="text-center mb-12">
          <Badge>Hai să vorbim</Badge>
          <h2 className="font-display font-800 text-5xl sm:text-6xl leading-[1.05] tracking-tight mb-6">
            Sistemul tău web lucrează pentru tine
            <br />
            <span className="text-accent">sau împotriva ta?</span>
          </h2>
          <p className="font-body text-lg text-white/50 max-w-xl mx-auto mb-4">
            Trimite-ne un mesaj și îți facem un plan concret în 24 de ore.
          </p>
        </AnimatedSection>

        <AnimatedSection className="max-w-xl mx-auto bg-surface-card border border-white/10 p-8 rounded-3xl shadow-2xl relative">
          <form 
            action="https://formspree.io/f/xqewbwgj" 
            method="POST"
            className="space-y-5 text-left"
          >
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-white/40 mb-1.5 ml-1 uppercase tracking-widest">Nume Complet</label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-colors"
                placeholder="Ex: Andrei Ionescu"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-white/40 mb-1.5 ml-1 uppercase tracking-widest">Email Business</label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-colors"
                placeholder="andrei@companie.ro"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-medium text-white/40 mb-1.5 ml-1 uppercase tracking-widest">Proiectul tău pe scurt</label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-colors resize-none"
                placeholder="Spune-ne ce vrei să construim..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="group w-full bg-accent text-[#080810] font-display font-800 py-4 rounded-xl hover:bg-[#d4eb3d] transition-all flex items-center justify-center gap-2 text-lg active:scale-[0.98]"
            >
              Trimite Solicitarea
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-white/5 pt-8">
             <a href="tel:+40733874143" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
                <Phone size={14} className="text-accent" /> +40 733 874 143
             </a>
             <div className="w-1.5 h-1.5 rounded-full bg-white/10 hidden sm:block" />
             <div className="flex items-center gap-2 text-white/40 text-sm italic">
                <CheckCircle size={14} className="text-accent" /> Răspundem în max. 4 ore
             </div>
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
            Cape<span className="text-accent">System</span>
          </p>
          <p className="text-xs text-white/30 font-body">
            High-Performance Web Systems & Digital Marketing
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@capesystempower"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/30 transition-colors"
            aria-label="TikTok"
          >
            <Video size={15} />
          </a>
          {/* Facebook - FOLOSIM GLOBE PENTRU BUILD REUȘIT */}
          <a
            href="https://www.facebook.com/CSLEGION"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/30 transition-colors"
            aria-label="Facebook"
          >
            <Globe size={15} />
          </a>
          {/* Instagram - FOLOSIM GLOBE PENTRU BUILD REUȘIT */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/30 transition-colors"
            aria-label="Instagram"
          >
            <Globe size={15} />
          </a>
        </div>
        <p className="text-xs text-white/25 font-body">
          © {new Date().getFullYear()} CapeSystem. Toate drepturile rezervate.
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
      <StickyBar />
      <main>
        {/* P1: Ce oferi? + P2 intro + P7 CTA */}
        <Hero />
        {/* P2: Ce problemă rezolvi? */}
        <Problema />
        {/* P3: Cum arată succesul? */}
        <Succes />
        {/* Portofoliu */}
        <Portofoliu />
        {/* P4: Plan în 3 pași */}
        <Plan />
        {/* P5: De ce să am încredere? */}
        <Incredere />
        {/* P6: Costul inacțiunii */}
        <CostulInactiunii />
        {/* Servicii detaliate */}
        <Servicii />
        {/* P7: CTA final */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}