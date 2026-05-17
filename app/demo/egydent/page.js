import DemoPage from "../../../components/DemoPage";

export const metadata = {
  title: "EgyDent | Clinică Dentară",
  description: "Tratamente dentare moderne în Cluj-Napoca. Programări rapide pe WhatsApp.",
};

export const demoConfig = {
  businessName: "EgyDent",
  hero: {
    tagline: "Clinică Dentară · Cluj-Napoca",
    headline: "Zâmbetul tău,\nîn mâini sigure.",
    subheadline: "Tratamente moderne, fără durere. Programare în mai puțin de 2 minute.",
    badge: null,
  },
  colors: {
    primary: "#2563eb",
    accent: "#1d4ed8",
  },
  cta: "Programează-te",
  contact: {
    phone: "+40 700 000 001",
    whatsapp: "40700000001",
    address: "Str. Clinicilor 14, Cluj-Napoca",
    mapUrl: null,
  },
  services: [
    { icon: "🦷", name: "Detartraj & Igienizare", price: "de la 200 RON" },
    { icon: "✨", name: "Albire Profesională", price: "de la 800 RON" },
    { icon: "🔧", name: "Implant Dentar", price: "de la 2500 RON" },
    { icon: "🪄", name: "Fațete Ceramice", price: "de la 1200 RON" },
    { icon: "🛡️", name: "Tratament Canal", price: "de la 600 RON" },
    { icon: "👶", name: "Stomatologie Pediatrică", price: "de la 150 RON" },
  ],
  gallery: [],
  reviews: [
    {
      name: "Andreea M.",
      text: "Am venit cu frică și am plecat zâmbind. Echipa e caldă și profesionistă. Recomand cu toată inima!",
      stars: 5,
    },
    {
      name: "Bogdan R.",
      text: "Programare rapidă, cabinet modern, nicio durere. Exact ce îmi trebuia.",
      stars: 5,
    },
    {
      name: "Cristina D.",
      text: "Cel mai bun dentist la care am fost. Tratamentul a fost explicat pas cu pas.",
      stars: 5,
    },
  ],
  sections: ["services", "gallery", "reviews", "contact"],
};

export default function EgyDentPage() {
  return <DemoPage config={demoConfig} />;
}
