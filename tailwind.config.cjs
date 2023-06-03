/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./playground/**/*.{js,jsx,ts,tsx,html,css}', './components/**/*.{js,jsx,ts,tsx,html,css}'],
  theme: {
    extend: {
      animation: {
        indeterminate: 'indeterminate 2s infinite linear',
      },
      keyframes: {
        indeterminate: {
          from: {
            left: '-50%',
          },
          to: {
            left: '100%',
          },
        },
      },
    },
  },
  darkMode: 'class',
  // plugins: [require('@tailwindcss/container-queries')],
}
