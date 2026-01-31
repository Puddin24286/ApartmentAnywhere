import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)"
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)"
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)"
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)"
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)"
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)"
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)"
        },
        form: {
          DEFAULT: "hsl(var(--form-bg))",
          hover: "hsl(var(--form-bg-hover))",
          focus: "hsl(var(--form-bg-focus))",
          disabled: "hsl(var(--form-bg-disabled))",
          border: "hsl(var(--form-border))",
          "border-hover": "hsl(var(--form-border-hover))",
          "border-focus": "hsl(var(--form-border-focus))",
          "border-error": "hsl(var(--form-border-error))",
          text: "hsl(var(--form-text))",
          "text-disabled": "hsl(var(--form-text-disabled))",
          placeholder: "hsl(var(--form-placeholder))",
          label: "hsl(var(--form-label))",
          "label-disabled": "hsl(var(--form-label-disabled))",
          error: "hsl(var(--form-error))",
          "error-bg": "hsl(var(--form-error-bg))",
          ring: "hsl(var(--form-focus-ring))",
          shadow: "hsl(var(--form-focus-shadow))"
        },
        "vintage-brown": "hsl(var(--vintage-brown))",
        "card-cream": "hsl(var(--card-cream))",
        "card-border": "hsl(var(--card-border))"
      },
      boxShadow: {
        vintage: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)",
        featured: "0 8px 16px -2px rgba(245, 158, 11, 0.3), 0 4px 8px -2px rgba(245, 158, 11, 0.2)"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwindcss-animate"),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwind-scrollbar")({ nocompatible: true })
  ]
} satisfies Config;

export default config;
