import { Syne, Inter } from "next/font/google";
import "./globals.css";
import FloatingChat from "../components/FloatingChat";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata = {
  title: "CapeSystem | Sisteme Web & Marketing pe azisunt.net",
  description:
    "Transformăm traficul în profit. Infrastructură digitală de înaltă performanță pe azisunt.net.",
  metadataBase: new URL("https://azisunt.net"),
  robots: { index: true, follow: true },
  openGraph: {
    title: "CapeSystem | azisunt.net",
    description: "Sisteme digitale care vând. Marketing care aduce clienți reali.",
    url: "https://azisunt.net",
    siteName: "CapeSystem",
    locale: "ro_RO",
    type: "website",
  },
};

/* ─── CapeSystem brand config for chatbot ─── */
const CHAT_BRAND = {
  primaryColor: "#89AACC",
  accentColor:  "#4E85BF",
  brandName:    "CapeSystem",
  ctaLink:      "/audit",
  phone:        "+40 733 874 143",
};

const CHAT_KNOWLEDGE = `
CapeSystem face sisteme web custom (Next.js, 100/100 PageSpeed), SEO, GEO, AEO,
marketing automation și integrări AI pentru afaceri din România.
Maxim 2 clienți noi pe lună. Audit gratuit la /audit.
Portofoliu: napoletano.ro (+312% trafic), azisunt.biz, StartFIRMĂ (5500+ firme).
Contact: harapalb923@gmail.com | +40 733 874 143 | wa.me/40733874143
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="ro"
      className={`${syne.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="bg-[#080810] text-white antialiased">
        {children}

        {/* ── FloatingChat — apare pe toate paginile ── */}
        <FloatingChat
          brand={CHAT_BRAND}
          knowledge={CHAT_KNOWLEDGE}
          greeting="Salut! Pot să te ajut cu ceva legat de CapeSystem? 👋"
        />
      </body>
    </html>
  );
}
