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
  title: "CapeSystem | High-Performance Web Systems & Digital Marketing",
  description:
    "Engineering high-conversion digital infrastructure. Next-gen web systems for ambitious brands.",
  metadataBase: new URL("https://capesystem.com"),
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CapeSystem | High-Performance Web Systems & Digital Marketing",
    description:
      "Engineering high-conversion digital infrastructure. Next-gen web systems for ambitious brands.",
    images: ["/og-image.png"],
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