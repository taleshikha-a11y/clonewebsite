/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        quanto: {
          blue: '#0226BE',
          hover: '#011c91',
          light: '#EEF4FF',
          accent: '#1570EF',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto Flex', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
