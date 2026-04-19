/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ FIX CRITIC: Spune Vercel să includă fișierele .md în bundle
  // Fără asta, `fs.readdirSync` găsește un folder gol în producție
  outputFileTracingIncludes: {
    // Toate rutele care folosesc fs să includă content/blog
    "/": ["./content/blog/**/*.md"],
    "/blog/[slug]": ["./content/blog/**/*.md"],
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