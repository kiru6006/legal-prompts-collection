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
          primary: "#1D4ED8",
          primaryHover: "#1E40AF",
          selected: "#DBEAFE",
          selectedText: "#1E40AF",
          border: "#E2E8F0",
          borderDark: "#CBD5E1",
          danger: "#B91C1C",
          warning: "#B45309",
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
