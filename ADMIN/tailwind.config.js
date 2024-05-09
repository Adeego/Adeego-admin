const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'DeepGreen': '#017449',
        'LightGreen': '#B3D5C8',
        'LightGrey': '#EEEEEE',
        'DarkGrey': '#1F1F1F',
        'Gold': '#FFD700',
        'CharcoalGrey': '#4D4D4D',
        'Red': '#DC143C'
      },
      height: {
        '128': '550px',
        '144': '680px',
      },
      width: {
        '100': '420px'
      }
    },
  },
  plugins: [nextui()],
}