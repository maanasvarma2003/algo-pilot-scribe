import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        border: "hsl(var(--border))",
        "border-bright": "hsl(var(--border-bright))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          elevated: "hsl(var(--background-elevated))",
          glass: "hsl(var(--background-glass))",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
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
          elevated: "hsl(var(--card-elevated))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Trading specific colors
        trading: {
          green: "hsl(var(--trading-green))",
          "green-bright": "hsl(var(--trading-green-bright))",
          "green-soft": "hsl(var(--trading-green-soft))",
          red: "hsl(var(--trading-red))",
          "red-bright": "hsl(var(--trading-red-bright))",
          "red-soft": "hsl(var(--trading-red-soft))",
        },
        // Electric colors for advanced UI
        electric: {
          blue: "hsl(var(--electric-blue))",
          purple: "hsl(var(--electric-purple))",
          cyan: "hsl(var(--neon-cyan))",
        },
        golden: "hsl(var(--golden))",
        silver: "hsl(var(--silver))",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-trading": "var(--gradient-trading)",
        "gradient-danger": "var(--gradient-danger)",
        "gradient-glass": "var(--gradient-glass)",
        "gradient-mesh": "var(--gradient-mesh)",
      },
      boxShadow: {
        "soft": "var(--shadow-soft)",
        "strong": "var(--shadow-strong)",
        "glow-primary": "var(--glow-primary)",
        "glow-trading": "var(--glow-trading)",
        "glow-danger": "var(--glow-danger)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
