/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mutat în experimental pentru compatibilitate cu Next.js 14.2+
  experimental: {
    outputFileTracingIncludes: {
      "/**": [
        "./content/**/*.md",
        "./content/**",
      ],
    },
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