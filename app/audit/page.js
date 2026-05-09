import { webpageSchema, serviceSchema, breadcrumbSchema, organizationSchema } from "../../lib/schema";
import AuditClient from "./AuditClient";

export const metadata = {
  title: "AI Audit Digital Gratuit — Diagnosticul afacerii tale | CapeSystem",
  description: "Audit digital AI în 60 de secunde. 4 întrebări, raport instant generat de Claude AI. Vizibilitate SEO, conversie, strategie 90 zile. Gratuit, fără obligații.",
  alternates: { canonical: "https://azisunt.net/audit" },
  openGraph: {
    title: "AI Audit Digital Gratuit | CapeSystem",
    description: "Diagnosticul digital al afacerii tale în 60 de secunde. Gratuit, powered by Claude AI.",
    url: "https://azisunt.net/audit",
    siteName: "CapeSystem",
    locale: "ro_RO",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  ...webpageSchema({
    name: "AI Audit Digital — CapeSystem",
    description: "Audit digital AI gratuit pentru afaceri din România. Diagnosticul complet în 60 de secunde.",
    url: "https://azisunt.net/audit",
    breadcrumb: breadcrumbSchema([
      { name: "Acasă", item: "https://azisunt.net" },
      { name: "AI Audit", item: "https://azisunt.net/audit" },
    ]),
    mainEntity: serviceSchema({
      name: "AI Audit Digital Gratuit",
      description: "Audit digital complet generat de AI pentru afacerea ta în 60 de secunde",
      provider: organizationSchema({
        "@type": "LocalBusiness",
        sameAs: "https://azisunt.net/webagency",
      }),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "RON",
        url: "https://azisunt.net/audit",
      },
    }),
  }),
};

export default function AuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AuditClient />
    </>
  );
}
