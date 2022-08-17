/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: process.env.NODE_ENV === 'production' ? [] : ["./src/**/*.{js,jsx,ts,tsx}", "./stories/**.*.{js,tsx}"],
  // content: ["./src/**/*.{js,jsx,ts,tsx}", "./stories/**.*.{js,tsx}"], // For dev environment 
  content: [], // For production environment
  darkMode: 'class',
  corePlugins: {
    // preflight: process.env.NODE_ENV === 'production' ? false : true,
    preflight: false, // For dev environment
  },
  theme: {
    extend: {
      screens: {
        'pointer-hover': { 'raw': '(hover: hover) and (pointer: fine)' },
        'pointer-touch': { 'raw': '(hover: none) and (pointer: coarse)' },
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography'), require('./src/plugin')],
};
