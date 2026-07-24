import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#4F5E44",
        input: "#4F5E44",
        ring: "#C84B31",
        background: "#2E3B27",
        foreground: "#F0EAD6",
        primary: {
          DEFAULT: "#C84B31",
          foreground: "#F0EAD6",
        },
        secondary: {
          DEFAULT: "#7B3F2B",
          foreground: "#F0EAD6",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#F0EAD6",
        },
        muted: {
          DEFAULT: "#3F5037",
          foreground: "#A8B89A",
        },
        accent: {
          DEFAULT: "#D4A853",
          foreground: "#2E3B27",
        },
        popover: {
          DEFAULT: "#2E3B27",
          foreground: "#F0EAD6",
        },
        card: {
          DEFAULT: "#364430",
          foreground: "#F0EAD6",
        },
        success: {
          DEFAULT: "#4ade80",
          foreground: "#2E3B27",
        },
        warning: {
          DEFAULT: "#D4A853",
          foreground: "#2E3B27",
        },
        // Phulkari brand colours
        cream: "#F0EAD6",
        forest: "#3B4A33",
        "forest-dark": "#2E3B27",
        brick: "#C84B31",
        terracotta: "#7B3F2B",
        gold: "#D4A853",
        sage: "#A8B89A",
        moss: "#4F5E44",
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Cormorant Garamond", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
      backgroundImage: {
        "phulkari-pattern": "radial-gradient(circle at 20% 20%, rgba(200,75,49,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(212,168,83,0.1) 0%, transparent 50%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
