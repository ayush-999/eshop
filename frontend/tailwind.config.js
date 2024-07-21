/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        "1300px": "1300px",
        "1100px": "1110px",
        "1000px": "1050px",
        "800px": "800px",
        "400px": "400px",
      },
      colors: {
        primary: {
          0: "#F6F9FF",
          10: "#F4F8FF",
          20: "#F3F7FF",
          30: "#F1F6FF",
          40: "#EFF5FF",
          50: "#eef4ff",
          100: "#e1eafe",
          200: "#c9d8fc",
          300: "#a7bffa",
          400: "#849bf5",
          500: "#6778ed",
          600: "#4a51e1",
          700: "#3c40c6",
          800: "#3337a0",
          900: "#30357f",
          950: "#1c1e4a",
        },
        error: {
          0: "#FFF5F7",
          10: "#FFF3F5",
          20: "#FFF1F3",
          30: "#FFEFF2",
          40: "#FFEDF0",
          50: "#fff0f3",
          100: "#ffdee4",
          200: "#ffc2ce",
          300: "#ff98ac",
          400: "#ff5c7b",
          500: "#ff2952",
          600: "#f80a37",
          700: "#e5042f",
          800: "#ad0727",
          900: "#8e0e26",
          950: "#4e0110",
        },
      },
    },
  },
  plugins: [],
};
