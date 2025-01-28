import type { Config } from "tailwindcss";

const { nextui } = require("@nextui-org/react");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
      fontSize: {
        "fluid-sm": "clamp(0.875rem, 2vw, 1.25rem)",
        "fluid-smd": "clamp(0.9375rem, 2.25vw, 1.75rem)",
        "fluid-md": "clamp(1rem, 2.5vw, 2.5rem)",
        "fluid-lg": "clamp(1.5rem, 3vw, 3rem)",
        "fluid-xlg": "clamp(2rem, 5vw, 4rem)",
      },
      spacing: {
        "fluid-sm": "clamp(4rem, 10vw, 6rem)",
        "fluid-md": "clamp(8rem, 15vw, 12rem)",
        "fluid-lg": "clamp(12rem, 20vw, 18rem)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "pulse-blur": {
          "0%, 100%": { transform: "scale(1) translate(0, 0)" },
          "50%": { transform: "scale(1.05) translate(2px, 2px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "alive-background": {
          "0%": {
            transform: "scale(1) translate(0, 0)",
            backgroundPosition: "50% 50%",
            opacity: "0.8",
          },
          "33%": {
            transform: "scale(1.03) translate(2px, -3px)",
            backgroundPosition: "55% 45%",
            opacity: "0.9",
          },
          "66%": {
            transform: "scale(0.98) translate(-3px, 2px)",
            backgroundPosition: "45% 55%",
            opacity: "0.85",
          },
          "100%": {
            transform: "scale(1) translate(0, 0)",
            backgroundPosition: "50% 50%",
            opacity: "0.8",
          },
        },
        "alive-foreground": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02) rotate(0.5deg)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "pulse-blur": "pulse-blur 10s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "alive-background": "alive-background 15s ease-in-out infinite",
        "alive-foreground": "alive-foreground 8s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    nextui(),
    addVariablesForColors,
    require("@tailwindcss/typography"),
  ],
} satisfies Config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
