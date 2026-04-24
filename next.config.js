/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── FILE TRACING ────────────────────────────────────────────────────────
  // Fără această cheie Vercel nu copiază fișierele .md în runtime bundle.
  // Glob-ul trebuie să fie RELATIV față de rădăcina proiectului.
  // Adăugăm atât forma cu slash cât și fără, pentru compatibilitate maximă.
  outputFileTracingIncludes: {
    "/**": [
      "./content/**/*.md",
      "./content/**",
    ],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  compress: true,
  trailingSlash: false,
  reactStrictMode: true,
};

module.exports = nextConfig;