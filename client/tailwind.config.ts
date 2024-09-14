// tailwind.config.js
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Enables dark mode based on class
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#ffffff', // Light mode background
          dark: '#171717',   // Dark mode background
        },
        foreground: {
          DEFAULT: '#171717', // Light mode text
          dark: '#e0e0e0',    // Dark mode text
        },
        primary: {
          DEFAULT: '#333333', // Light mode primary color
          dark: '#ffffff',   // Dark mode primary color
        },
        secondary: {
          DEFAULT: '#f4f4f4', // Light mode secondary color
          dark: '#333333',   // Dark mode secondary color
        },
        muted: {
          DEFAULT: '#f4f4f4',
          dark: '#333333',
        },
        accent: {
          DEFAULT: '#333333',
          dark: '#ffffff',
        },
        destructive: {
          DEFAULT: '#e3342f',
          dark: '#f56565',
        },
        border: {
          DEFAULT: '#dee2e6',
          dark: '#444444',
        },
        input: {
          DEFAULT: '#ffffff',
          dark: '#333333',
        },
        ring: {
          DEFAULT: '#80bdff',
          dark: '#0d6efd',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
