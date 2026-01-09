/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        card: "#181818",
        primary: "#1DB954",
      },
    },
  },
  plugins: [],
};
