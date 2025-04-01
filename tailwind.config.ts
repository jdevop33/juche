import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: "class",
  content: [
    // Removed './pages/**' path as this project uses the app router
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
     container: { // Added typical shadcn/ui container settings
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
        // Your custom colors are preserved:
        'dancheong-red': '#C8372D',
        'dancheong-blue': '#1E5CA4',
        'earth-yellow': '#E8B960',
        'forest-green': '#2A5C0B',
        'light-beige': '#F5E6D3',
        'dark-grey': '#333333',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
       fontFamily: { // Updated to use Geist font variables (likely defined in layout.tsx)
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        korean: ['Noto Sans KR', 'sans-serif'], // Kept your custom font
      },
       keyframes: { // Standard shadcn/ui keyframes
        "accordion-down": {
          from: { height: "0px" }, // Use "0px"
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" }, // Use "0px"
        },
      },
      animation: { // Standard shadcn/ui animations
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    animate, // from tailwindcss-animate
    typography,
    forms,
    aspectRatio,
    // Removed container-queries as it wasn't in the original file content I read
  ],
}

export default config;
