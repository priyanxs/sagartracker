/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          900: '#1e3a8a',
        },
        transit: {
          bus: '#E11D48',      // Vivid Rose for fast recognition in bright sunlight
          ontime: '#16A34A',   // High-contrast vibrant green
          delayed: '#DC2626',  // Vivid warning red
          warning: '#D97706',  // Amber caution
          dark: '#0F172A',     // Slate 900 for sharp text
          card: '#FFFFFF',
          border: '#E2E8F0',
        }
      },
    },
  },
  plugins: [],
};
