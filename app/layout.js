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
  title: "Azi Sunt | Web Design & Social Media Marketing",
  description: "Construim site-uri care vând și strategii de social media care aduc clienți reali.",
  metadataBase: new URL("https://azisunt.net"),
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className={`${syne.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-[#080810] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}