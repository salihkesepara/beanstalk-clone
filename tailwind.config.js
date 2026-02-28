/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0B',
        primary: '#4ADE80',
        textMain: '#FFFFFF',
        textMuted: '#A1A1AA',
        borderSubtle: 'rgba(255, 255, 255, 0.1)'
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'hero-vignette': 'radial-gradient(circle at 50% 100%, rgba(56, 189, 248, 0.1) 0%, transparent 60%)',
      }
    },
  },
  plugins: [],
}
