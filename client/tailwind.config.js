/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    // Add your file paths here
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'khand': ['Khand', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
        'carme': ['Carme', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
        'alegreya-sans-sc': ['Alegreya Sans SC', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
        'ibm-plex-sans': ['IBM Plex Sans', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
      },
      colors: {
        'cbvt-navy': 'rgb(15 40 81) / <alpha-value>',
        'cbvt-blue': 'rgb(96 139 193)',
        'cbvt-light-blue': 'rgb(113 147 190)',
        'cbvt-sky': 'rgb(203 220 235)',
        'cbvt-cream': 'rgb(245 239 235)',
        'cbvt-light-cream': 'rgb(247 247 250)',
        'cbvt-gray': 'rgb(103 103 103)',
        'cbvt-muted': 'rgb(163 152 152)',
        'cbvt-light': 'rgb(243 243 224)',
        // Shadcn/ui colors
        border: "hsl(214.3 31.8% 91.4%)",
        input: "hsl(214.3 31.8% 91.4%)",
        ring: "hsl(222.2 84% 4.9%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 84% 4.9%)",
        primary: {
          DEFAULT: "hsl(222.2 47.4% 11.2%)",
          foreground: "hsl(210 40% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(210 40% 96.1%)",
          foreground: "hsl(222.2 47.4% 11.2%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(210 40% 98%)",
        },
        muted: {
          DEFAULT: "hsl(210 40% 96.1%)",
          foreground: "hsl(215.4 16.3% 46.9%)",
        },
        accent: {
          DEFAULT: "hsl(210 40% 96.1%)",
          foreground: "hsl(222.2 47.4% 11.2%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 84% 4.9%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 84% 4.9%)",
        },
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('tailwindcss-textshadow'),
  ],
}