/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    backgroundImage: {},
    extend: {
      backgroundImage: {
        Main_img: "url('./image/Main_img.jpg')",
      },
      backgroundColor: {
        "cyan-50": "#e0f7fa",
        "cyan-500": "#26c6da",
        "cyan-600": "#00acc1",
        "stone-800": "#3e3e3e",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
