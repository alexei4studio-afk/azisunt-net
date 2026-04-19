// app/page.js
import { getSortedPostsData } from "../lib/posts"; // Ieșim un nivel până la lib
import BlogContent from "./blog/BlogContent";    // Intrăm în folderul blog pentru componentă

/* ─── NAVBAR (Server-safe) ─── */
// ... restul codului tău (Navbar, FAQS_LD, etc.)

/* ─── FAQ data (pentru JSON-LD) ─── */
const FAQS_LD = [
  {
    q: "Ce este GEO (Generative Engine Optimization)?",
    a: "GEO este practica de a structura conținutul și datele unui site (prin JSON-LD, entități semantice și autoritate topică) astfel încât modelele AI precum ChatGPT sau Perplexity să poată identifica și recomanda brandul tău ca răspuns la întrebările utilizatorilor.",
  },
  {
    q: "Cât durează să apari în răspunsurile AI?",
    a: "Primele rezultate apar în 30–90 de zile de la implementarea corectă a structurii de date și publicarea consecventă a conținutului de autoritate. Viteza depinde de nișă și de volumul de conținut existent.",
  },
  {
    q: "AEO vs SEO — care e diferența principală?",
    a: "SEO optimizează pentru motoarele de căutare clasice (Google, Bing) prin cuvinte cheie și linkuri. AEO optimizează pentru motoarele de răspuns (Google Featured Snippets, SGE, AI Overview) prin structuri Q&A și răspunsuri directe, concise și factuale.",
  },
  {
    q: "Poate un site mic să domine căutările AI?",
    a: "Da. Autoritatea topică bătă dimensiunea site-ului. Un site cu 20 de articole profunde pe o nișă specifică va fi citat de AI mai des decât un site cu 500 de articole generice. Calitatea și structura primează.",
  },
];

/* ─── PAGE (Server Component) ─── */
export default function BlogPage() {
  // Citim articolele din content/blog/*.md la build time
  const articles = getSortedPostsData();

  // JSON-LD dinamic — construit din articolele reale
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "CapeSystem Knowledge Hub",
    "description": "Studii de caz, tactici SEO/GEO/AEO și sisteme AI pentru afaceri digitale performante.",
    "url": "https://azisunt.net/blog",
    "publisher": {
      "@type": "Organization",
      "name": "CapeSystem",
      "url": "https://azisunt.net",
      "logo": { "@type": "ImageObject", "url": "https://azisunt.net/logo.png" },
      "sameAs": [
        "https://www.tiktok.com/@capesystempower",
        "https://www.facebook.com/CSLEGION",
        "https://instagram.com/capesystemdesign",
      ],
    },
    // BlogPosting entries — câte unul per articol
    "blogPost": articles.map((a) => ({
      "@type": "BlogPosting",
      "headline": a.title,
      "description": a.excerpt,
      "datePublished": a.date,
      "url": `https://azisunt.net/blog/${a.slug}`,
      "author": {
        "@type": "Organization",
        "name": "CapeSystem",
      },
      "keywords": [a.category, a.tag, "CapeSystem", "azisunt.net"].filter(Boolean).join(", "),
    })),
    // FAQPage pentru AEO / Featured Snippets
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": FAQS_LD.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  };

  return (
    <>
      {/* JSON-LD injectat în <head> via Next.js Script sau inline */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

     

      {/*
        BlogContent primește articolele ca props și gestionează
        toată interactivitatea (filtre, search) pe client.
      */}
      <BlogContent initialArticles={articles} />
    </>
  );
}

/* ─── metadata (SEO on-page) ─── */
export const metadata = {
  title: "Knowledge Hub | CapeSystem · SEO, GEO, AEO & Sisteme Digitale",
  description:
    "Studii de caz reale, tactici SEO/GEO/AEO și automatizări AI. Conținut structurat pentru Google, ChatGPT și Perplexity — de la CapeSystem.",
  metadataBase: new URL("https://azisunt.net"),
  alternates: { canonical: "https://azisunt.net/blog" },
  openGraph: {
    title: "Knowledge Hub | CapeSystem",
    description: "Cum construim sisteme digitale care domină căutările clasice și AI.",
    url: "https://azisunt.net/blog",
    siteName: "CapeSystem",
    locale: "ro_RO",
    type: "website",
  },
};
