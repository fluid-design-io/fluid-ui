/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'pointer-hover': { 'raw': '(hover: hover) and (pointer: fine)' },
        'pointer-touch': { 'raw': '(hover: none) and (pointer: coarse)' },
        // 'prefers-contrast': { 'raw': '(prefers-contrast: more)' },
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography'),],
};
