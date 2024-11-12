/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        text: '#080808',
        background: '#f0f6f6',
        primary: '#5b91fe',
        secondary: '#ffffff',
        accent: '#aab0bb',
      },
    },
  },
  plugins: [],
}
