/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/components/**/*.{js,ts,jsx,tsx}',
  ],
  options: {
    safelist: {
      standard: [/^bg-/, /^text-/],
    },
  },
  theme: {
    extend: {
      colors: {
        ashen: {
          100: '#adadb8',
          200: '#848494',
          300: '#53535f',
          400: '#3b3b44',
          500: '#323239',
          600: '#26262c',
          700: '#1f1f23',
          800: '#18181b',
          900: '#0e0e10',
        },
      },
    },
  },
  plugins: [],
}
