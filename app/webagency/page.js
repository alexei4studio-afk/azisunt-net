import WebagencyClient from "./WebagencyClient";

export const metadata = {
  title: "Plan Pro · Webagency AI-First pentru Afaceri Locale | CapeSystem",
  description:
    "CapeSystem construiește sisteme web complete pentru afaceri locale din România: site performant, SEO local, Google Maps, structură citabilă de AI. Plan Pro — maxim 2 clienți pe lună.",
  metadataBase: new URL("https://azisunt.net"),
  alternates: {
    canonical: "https://azisunt.net/webagency",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Plan Pro · Webagency AI-First | CapeSystem",
    description:
      "Site + SEO local + Google Maps + vizibilitate AI pentru afaceri locale din România. Nu o broșură online — un canal de achiziție.",
    url: "https://azisunt.net/webagency",
    siteName: "CapeSystem",
    locale: "ro_RO",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://azisunt.net/webagency",
      name: "CapeSystem Plan Pro — Webagency AI-First",
      url: "https://azisunt.net/webagency",
      description:
        "Webagency AI-first pentru afaceri locale din România. Site performant Next.js, SEO local, Google Business Profile, AEO. Plan Pro — maxim 2 clienți pe lună.",
      provider: {
        "@type": "Organization",
        name: "CapeSystem",
        url: "https://azisunt.net",
        telephone: "+40733874143",
        email: "harapalb923@gmail.com",
        areaServed: "RO",
        sameAs: [
          "https://www.facebook.com/CSLEGION",
          "https://instagram.com/capesystemdesign",
          "https://www.tiktok.com/@capesystempower",
        ],
      },
      serviceType: [
        "Web Design",
        "SEO Local",
        "Answer Engine Optimization",
        "Google Business Profile",
        "Digital Marketing",
      ],
      areaServed: { "@type": "Country", name: "România" },
      offers: {
        "@type": "Offer",
        name: "Plan Pro",
        description:
          "Site complet Next.js + SEO local + Google Maps + AEO + tracking. Preț personalizat. Maxim 2 clienți pe lună.",
        url: "https://azisunt.net/webagency",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Ce diferență face față de o agenție obișnuită?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Agențiile obișnuite construiesc site-uri. Noi construim sisteme de achiziție. Diferența este că fiecare decizie de design, content și structură este luată în funcție de impactul ei asupra vizibilității locale și a conversiei — nu în funcție de preferințe estetice.",
          },
        },
        {
          "@type": "Question",
          name: "Cât durează să apar în Google după lansare?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pentru rezultatele organice (Google Search), estimează 2–4 luni pentru un site nou, mai puțin pentru un domeniu existent. Google Maps poate arăta îmbunătățiri mai rapid, uneori în câteva săptămâni, dacă profilul Google Business este complet și corect optimizat.",
          },
        },
        {
          "@type": "Question",
          name: "Am deja un site. Trebuie să îl refac complet?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nu neapărat. Depinde de starea actuală. Unele site-uri au nevoie de refacere completă, altele pot fi îmbunătățite. Auditul gratuit ne ajută să înțelegem situația reală și să recomandăm abordarea corectă — nu cea mai costisitoare.",
          },
        },
        {
          "@type": "Question",
          name: "Ce înseamnă AEO și de ce e important?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AEO (Answer Engine Optimization) este practica de a construi conținut astfel încât ChatGPT, Perplexity, Google AI Overview și alte sisteme AI să poată cita afacerea ta în răspunsurile lor. Pe măsură ce mai mulți oameni pun întrebări direct AI-ului în loc să caute pe Google, prezența în aceste răspunsuri devine un canal de achiziție important.",
          },
        },
        {
          "@type": "Question",
          name: "Câți clienți noi acceptați pe lună?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Maxim 2. Nu este un truc de marketing — este o limitare reală. Fiecare proiect primește atenție directă și nu delegăm la echipe junior. Această limită menține calitatea și ne permite să urmărim rezultatele pentru fiecare client.",
          },
        },
        {
          "@type": "Question",
          name: "Care este pasul următor dacă vreau să încep?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Solicită un audit gratuit la azisunt.net/audit sau scrie-ne pe WhatsApp. Primul pas este o discuție de 20–30 minute despre afacere, obiective și situația actuală. Pe baza acesteia facem o propunere concretă.",
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebagencyClient />
    </>
  );
}
