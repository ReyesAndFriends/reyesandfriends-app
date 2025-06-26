/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.bg-hero-section': {
          'background-image': 'linear-gradient(to right, #4b0d0d, #2d0a09)',
          'opacity': '0.95',
        },
      });
    },
  ],
};
