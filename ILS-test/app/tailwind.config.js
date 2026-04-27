/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Poppins', 'Arial', 'sans-serif'] },
      colors: {
        brand: { DEFAULT: '#f28132', dark: '#e15b2a', light: '#fef5ef', hover: '#f5d2a9' },
        surface: { primary: '#ffffff', secondary: '#f8f7fa', tertiary: '#f4f2f7', '4th': '#eeedf2' },
      },
    },
  },
  plugins: [],
}

