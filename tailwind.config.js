/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        "sky-blue" : "#37B9F1",
        purple : "#8739F9",
        black:"rgb(0 0 0)",
        background : "#f2f5f5"
      } 
    },
  },
  plugins: [],
}

