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
        50: 'rgb(var(--tw-color-gray-50) / <alpha-value>)',
        100: 'rgb(var(--tw-color-gray-100) / <alpha-value>)',
        200: 'rgb(var(--tw-color-gray-200) / <alpha-value>)',
        300: 'rgb(var(--tw-color-gray-300) / <alpha-value>)',
        400: 'rgb(var(--tw-color-gray-400) / <alpha-value>)',
        500: 'rgb(var(--tw-color-gray-500) / <alpha-value>)',
        600: 'rgb(var(--tw-color-gray-600) / <alpha-value>)',
        700: 'rgb(var(--tw-color-gray-700) / <alpha-value>)',
        800: 'rgb(var(--tw-color-gray-800) / <alpha-value>)',
        900: 'rgb(var(--tw-color-gray-900) / <alpha-value>)',
      }
    },
    extend: {
      screens: {
        'pointer-hover': { 'raw': '(hover: hover) and (pointer: fine)' },
        'pointer-touch': { 'raw': '(hover: none) and (pointer: coarse)' },
      },
      colors: {
        primary: {
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
        },
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography'), require('./src/plugin')],
};
