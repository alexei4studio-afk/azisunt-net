import { Syne, Inter } from "next/font/google";
import "./globals.css";

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
  description: "Transformăm traficul în profit. Infrastructură digitală de înaltă performanță pe azisunt.net.",
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

export default function RootLayout({ children }) {
  return (
    <html
      lang="ro"
      className={`${syne.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="bg-[#080810] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}