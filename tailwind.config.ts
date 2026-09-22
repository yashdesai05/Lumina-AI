import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        primary: {
          DEFAULT: "#6366f1",
          50: "#eef0ff",
          100: "#e0e2fe",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        secondary: {
          DEFAULT: "#a855f7",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgba(10,10,11,0.9))",
        "glow-radial":
          "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.25), transparent 60%)",
        "aurora":
          "conic-gradient(from 180deg at 50% 50%, #6366f1, #a855f7, #6366f1)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(99,102,241,0.5)",
        "glow-purple": "0 0 40px -10px rgba(168,85,247,0.5)",
        glass: "0 8px 32px 0 rgba(0,0,0,0.37)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
