/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "app-background": "url('/public/assets/covers/backgroundImg.jpg')",
        "content-background": "url('/public/assets/covers/backgroundImg.jpg')",
      },
    },
  },
  plugins: [],
};
