/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "10xl": "12rem",
      },
      backdropBrightness: {
        30: ".30",
      },
    },
  },
  plugins: [],
};
