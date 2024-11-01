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
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          900: "#0c4a6e",
        },
        primaryFont: "#212529",
        primaryv1: "#4B5C74",
        primaryv2: "#76C2AF",
        secondaryv1: "#E0E0D0",
      },
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
            },
            primaryFont: "#212529",
            primaryv1: "#4B5C74",
            primaryv2: "#76C2AF",
            secondaryv1: "#E0E0D0",
          },
        },
      },
    }),
  ],
};
