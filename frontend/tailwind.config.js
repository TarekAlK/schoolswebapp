/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}',
  './index.html'],
  theme: {
    extend: {
      colors: {
        mainColor: 'rgb(var(--mainColor))',
        secondaryColor: 'rgb(var(--secondaryColor))',
        mainTextColor: 'rgb(var(--mainTextColor))',
        dimColor: 'rgb(var(--dimColor))',
        btnColor: 'rgb(var(--btnColor))'
      },
      keyframes: {
        fading: {
          '0%': {opacity: 1},
          '100%': {opacity: 0}
        }
      }
    },
  },
  plugins: [],
}