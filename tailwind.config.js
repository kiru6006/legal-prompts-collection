/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        legal: {
          bg: "#FFFFFF",
          bgSubtle: "#F8FAFC",
          panel: "#F1F5F9",
          text: "#0F172A",
          textSubtle: "#475569",
          accent: "#0F5C6B",
          accentSubtle: "#E6F1F3",
          border: "#E2E8F0",
          critical: "#B91C1C",
          warning: "#B45309",
          success: "#047857",
          info: "#1D4ED8",
        }
      }
    },
  },
  plugins: [],
}
