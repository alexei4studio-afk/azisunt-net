import WebagencyClient from "./WebagencyClient";

export const metadata = {
  title: "Plan Pro · Webagency AI-First pentru Afaceri Locale | CapeSystem",
  description:
    "CapeSystem construiește sisteme web complete pentru afaceri locale din România: site performant, SEO local, Google Maps, structură citabilă de AI. Plan Pro — maxim 2 clienți pe lună.",
  metadataBase: new URL("https://azisunt.net"),
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

export default function Page() {
  return <WebagencyClient />;
}
