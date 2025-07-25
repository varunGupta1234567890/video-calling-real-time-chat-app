/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",             // if using Vite
    "./src/**/*.{js,ts,jsx,tsx}" // React component files
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
    },
  },
  plugins: [],
}
