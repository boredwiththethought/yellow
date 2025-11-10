import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',
          light: '#333333',
        },
        secondary: {
          DEFAULT: '#666666',
          light: '#999999',
        },
        accent: '#FF6B6B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        rageitalic: ['Rage Italic', 'serif'],
        poppins : ['Poppins', 'sans-serif'],
        volkhov: ['Volkhov', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config