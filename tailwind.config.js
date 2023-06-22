/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sun": "#E9CBB4",
        "cloud": "#C7D0C3",
        "rain": "#b5b7d1",
        "night": "#5d5e6f",
      }
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "1rem",
      center: true,
    },
    screens: {
      xs: "450px",
      sm: "640px",
      md: "768px",
    }
  },
  plugins: [],
}

