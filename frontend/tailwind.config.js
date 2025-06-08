/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      extend: {
        backdropBlur: {
          xs: "2px",
        },
      },
      fontFamily: {
        Poppins: ["Poppins", "serif"],
      },
    },
  },
  plugins: [],
};
