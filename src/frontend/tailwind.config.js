/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "oklch(var(--card) / <alpha-value>)",
          foreground: "oklch(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--popover) / <alpha-value>)",
          foreground: "oklch(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        devanagari: ['Noto Serif Devanagari', 'Noto Sans Devanagari', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'neon': '0 0 20px rgba(168, 85, 247, 0.45), 0 0 60px rgba(168, 85, 247, 0.15)',
        'neon-sm': '0 0 10px rgba(168, 85, 247, 0.35)',
        'neon-pink': '0 0 20px rgba(236, 72, 153, 0.45)',
        'neon-cyan': '0 0 20px rgba(34, 211, 238, 0.35)',
        'card-hover': '0 8px 32px rgba(168, 85, 247, 0.25), 0 0 0 1px rgba(168, 85, 247, 0.20)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float2': 'float2 11s ease-in-out infinite',
        'float3': 'float3 14s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'stagger-in': 'stagger-in 0.5s ease forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
