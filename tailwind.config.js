/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  darkMode: 'selector', 
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#000cff",

          secondary: "#00a4ff",

          accent: "#a28d00",

          neutral: "#05030e",

          "base-100": "#232838",

          info: "#009dff",

          success: "#52cb00",

          warning: "#ff9800",

          error: "#ff3f5f",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
