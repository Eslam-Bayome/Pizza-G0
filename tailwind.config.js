/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    fontFamily: {
      sans: "Roboto Mono , monospace",
    },

    extend: {
      colors: {
        babyblue: "#09c",
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
