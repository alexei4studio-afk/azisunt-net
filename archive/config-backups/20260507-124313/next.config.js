/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/blog": ["./content/blog/**/*"],
    },
  },
};

module.exports = nextConfig;