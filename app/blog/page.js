// Server Component — fără "use client"
import { getSortedPostsData } from "../../lib/posts";
import BlogContent, { FAQS } from "./BlogContent";

export const metadata = {
  title: "Knowledge Hub | CapeSystem · SEO, GEO, AEO & Sisteme Digitale",
  description: "Studii de caz reale, tactici SEO/GEO/AEO și automatizări AI. Conținut structurat pentru Google, ChatGPT și Perplexity.",
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

export default function BlogPage() {
  let articles = [];
  try {
    const data = getSortedPostsData();
    articles = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("[blog/page] getSortedPostsData error:", err);
    articles = [];
  }

  const safeFAQS = Array.isArray(FAQS) ? FAQS : [];

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
    "blogPost": articles.map((a) => ({
      "@type": "BlogPosting",
      "headline": a.title,
      "description": a.excerpt,
      "datePublished": a.date,
      "url": `https://azisunt.net/blog/${a.slug}`,
      "author": { "@type": "Organization", "name": "CapeSystem" },
      "keywords": [a.category, a.tag, "CapeSystem", "azisunt.net"].filter(Boolean).join(", "),
    })),
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": safeFAQS.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogContent articles={articles} />
    </>
  );
}