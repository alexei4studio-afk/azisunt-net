/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-syne)",  "sans-serif"],
        body:    ["var(--font-inter)", "sans-serif"],
        sans:    ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        accent: "#e8ff47",
        surface: {
          DEFAULT: "#080810",
          card:    "#0e0e1a",
          border:  "rgba(255,255,255,0.07)",
        },
      },
    },
  },
  plugins: [],
};
