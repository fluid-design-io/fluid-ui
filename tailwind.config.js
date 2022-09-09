const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/**/*.{js,jsx,ts,tsx}", "./stories/**.*.{js,tsx}"], // For dev environment 
  content: [], // For production environment
  darkMode: 'class',
  corePlugins: {
    // preflight: true,
    preflight: false, // For prod environment
  },
  theme: {
    colors: {
      ...colors,
      gray: {
        50: '#f4f7fb',
        100: '#d8dbdf',
        200: '#bdc0c4',
        300: '#a2a5a9',
        400: '#888b8f',
        500: '#6f7276',
        600: '#575a5d',
        700: '#404346',
        800: '#2b2d30',
        900: '#17191c',
      }
    },
    extend: {
      screens: {
        'pointer-hover': { 'raw': '(hover: hover) and (pointer: fine)' },
        'pointer-touch': { 'raw': '(hover: none) and (pointer: coarse)' },
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography'), require('./src/plugin')],
};
