import { getSortedPostsData } from "../lib/posts";
import HomeClient from "./HomeClient";

export const metadata = {
  title: "CapeSystem — Sisteme digitale care vând | azisunt.net",
  description: "Agenție web din România specializată în sisteme digitale de performanță: web design conversional, SEO tehnic, marketing digital. Rezultate reale pentru afacerea ta.",
  alternates: { canonical: "https://azisunt.net" },
  openGraph: {
    title: "CapeSystem — Sisteme digitale care vând",
    description: "Agenție web din România. Web design, SEO, marketing digital — sisteme care aduc clienți.",
    url: "https://azisunt.net",
    siteName: "CapeSystem",
    locale: "ro_RO",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "CapeSystem",
      url: "https://azisunt.net",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://azisunt.net/blog?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "LocalBusiness",
      name: "CapeSystem",
      alternateName: "azisunt.net",
      url: "https://azisunt.net",
      description: "Agenție web din România specializată în sisteme digitale de performanță, SEO tehnic și marketing digital.",
      address: { "@type": "PostalAddress", addressCountry: "RO" },
      sameAs: [
        "https://www.facebook.com/CSLEGION",
        "https://instagram.com/capesystemdesign",
        "https://www.tiktok.com/@capesystempower",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicii Web Agency",
        url: "https://azisunt.net/webagency",
      },
    },
  ],
};

export default function Page() {
  const allPostsData = getSortedPostsData();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient latestPosts={allPostsData.slice(0, 3)} />
    </>
  );
}