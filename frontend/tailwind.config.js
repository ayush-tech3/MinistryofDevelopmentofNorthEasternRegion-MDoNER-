/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#07111e',
          900: '#0b192c',
          800: '#10243e',
          700: '#152e4d',
          600: '#1e426d',
        },
        alertOrange: {
          DEFAULT: '#f97316',
          hover: '#ea580c',
        },
        risk: {
          low: '#10b981',
          moderate: '#f59e0b',
          high: '#f97316',
          critical: '#ef4444',
        }
      }
    },
  },
  plugins: [],
}
