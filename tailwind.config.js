/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: process.env.NODE_ENV === 'production' ? [] : ["./src/**/*.{js,jsx,ts,tsx}", "./stories/**.*.{js,tsx}"],
  // content: ["./src/**/*.{js,jsx,ts,tsx}", "./stories/**.*.{js,tsx}"], // For dev environment 
  content: [], // For production environment
  darkMode: 'class',
  corePlugins: {
    // preflight: process.env.NODE_ENV === 'production' ? false : true,
    preflight: false, // For prod environment
  },
  theme: {
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
