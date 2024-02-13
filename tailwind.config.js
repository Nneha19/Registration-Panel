/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'blue-500': '#F5F9FF', 
        'lightgray':'#BDBDBD',
        'darkgray':'#8692A6',
      },
    },
  },
  plugins: [],
}

