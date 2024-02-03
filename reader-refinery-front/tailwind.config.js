/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
