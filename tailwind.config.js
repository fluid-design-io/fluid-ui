/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./stories/**.*.{js,tsx}"], // For dev environment 
  // content: [], // For production environment
  darkMode: 'class',
  corePlugins: {
    preflight: true,
    // preflight: false, // For prod environment
  },
  theme: {
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
        secondary: {
          // Customize it on globals.css :root
          50: 'rgb(var(--tw-color-secondary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-secondary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-secondary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-secondary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-secondary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-secondary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-secondary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-secondary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-secondary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-secondary-900) / <alpha-value>)',
        },
      }
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@headlessui/tailwindcss'), require('./src/plugin/core'), require('./src/plugin/button'), require('./src/plugin/tooltip')],
};
