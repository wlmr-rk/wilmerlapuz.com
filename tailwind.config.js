/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        // TokyoNight color palette
        slate: {
          950: "#16161e",
          900: "#1a1b26",
          800: "#24283b",
          700: "#414868",
          600: "#565f89",
          500: "#737aa2",
          400: "#9699a3",
          300: "#c0caf5",
          200: "#e0e6ff",
          100: "#ffffff",
        },
        blue: {
          400: "#7aa2f7",
          500: "#7dcfff",
          600: "#2ac3de",
          700: "#0db9d7",
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
