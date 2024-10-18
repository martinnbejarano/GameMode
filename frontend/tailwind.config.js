/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryFont: "#212529",
        primaryv1: "#4B5C74",
        primaryv2: "#76C2AF",
        secondaryv1: "#E0E0D0",
      },
    },
  },
  plugins: [nextui()],
};
