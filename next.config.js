/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizat pentru Vercel
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  // Compresie activată implicit pe Vercel
  compress: true,
  // Trailing slash consistent
  trailingSlash: false,
  // Strict mode React
  reactStrictMode: true,
};

module.exports = nextConfig;
