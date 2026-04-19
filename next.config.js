/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─────────────────────────────────────────────────────────────────────────
  // FIX PRINCIPAL — Fără această cheie, Vercel NU copiază fișierele .md
  // în bundle-ul de runtime. Next.js 14 output file tracing analizează
  // STATIC importurile JS și nu poate detecta fișierele citite dinamic
  // prin process.cwd() + fs la runtime.
  //
  // "/**"          → aplică-se pe TOATE rutele (/  și  /blog/[slug])
  // "./content/**" → include recursiv tot ce e în folderul content/
  // ─────────────────────────────────────────────────────────────────────────
  outputFileTracingIncludes: {
    "/**": ["./content/**"],
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