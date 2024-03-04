const {nextui} = require("@nextui-org/react");

module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",

    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",

    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        blue_gray: { 50: "#f1f1f1", 100: "#cccccc" },
        indigo: {
          400: "#635bd6",
          500: "#4137d1",
          900: "#0f0a5b",
          "50_0c": "#e7e5ff0c",
          A400_e5: "#544aeae5",
          "900_cc": "#0f0a5bcc",
          "500_7f": "#4137d17f",
          "900_03": "#180a5c",
          "900_01": "#1e1682",
          "900_02": "#160f6f",
          A400: "#554ae9",
        },
        deep_purple: {
          200: "#a8a3f4",
          900: "#291782",
          "800_99": "#3028a399",
          "200_01": "#b1a3f5",
        },
        black: { 900: "#020118", "900_01": "#0c0c0c" },
        gray: {
          100: "#f6f6f6",
          300: "#e6e6e6",
          400: "#c9c9c9",
          600: "#7f7f7f",
          900: "#06032f",
        },
        teal: { A700: "#14b8a9" },
        amber: { 500: "#ffbd14" },
        white: { A700: "#ffffff" },
        cyan: { 400: "#2dd4c5" },
      },
      backgroundImage: {
        gradient: "linear-gradient(180deg ,#554ae9,#544aeae5)",
      },
      fontFamily: {
        lexend: "Lexend",
        basiercircle: "Basier Circle",
        bevietnampro: "Be Vietnam Pro",
        inter: "Inter",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("flowbite/plugin"),
    nextui()
  ],
};
