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
          sidebar: "#F8FAFC",
          text: "#0F172A",
          muted: "#475569",
          primary: "#1E3A8A", // Judicial Supreme Court Navy Blue
          primaryHover: "#172554", // Deep Midnight Navy
          accent: "#1E3A8A",
          selected: "#EFF6FF", // Crisp Judicial Blue Tint
          selectedText: "#1E3A8A",
          border: "#E2E8F0",
          borderDark: "#CBD5E1",
          
          // Indian Court Heritage Palette
          courtBlack: "#0F172A",    // Advocate Robe Black
          courtWhite: "#FFFFFF",    // Clean White Parchment
          courtNavy: "#1E3A8A",     // Ashok Chakra / Supreme Court Blue
          courtBlue: "#2563EB",     // Vibrant Judicial Blue
          courtRed: "#B91C1C",      // Red Tape / Court Velvet Crimson
          courtRedBg: "#FEF2F2",    // Soft Crimson Tint
          courtGold: "#D97706",     // Ashoka Emblem Gold / Ochre Yellow
          courtGoldBg: "#FEF3C7",   // Warm Gold Tint
          courtYellow: "#CA8A04",   // Deep Court Yellow
          
          danger: "#B91C1C",
          warning: "#D97706",
          success: "#047857",
        }
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ],
        mono: [
          '"SFMono-Regular"',
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace"
        ]
      }
    },
  },
  plugins: [],
}
