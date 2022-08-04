/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", './node_modules/@fluid-design/fluid-ui/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'pointer-hover': { 'raw': '(hover: hover) and (pointer: fine)' },
        'pointer-touch': { 'raw': '(hover: none) and (pointer: coarse)' },
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography'),],
};
