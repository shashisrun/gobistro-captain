/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    darkTheme: "darktheme",
    themes: [
      {
        lighttheme: {
          "primary": "#ec5629",
          "secondary": "#BCDDF1",
          "accent": "#D99330",
          "neutral": "#FFF1F1",
          "base-100": "#F4F4F4",
          "base-200": "#EEEEEE",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
        darktheme: {
          "primary": "#ec5629",
          "secondary": "#1c3748",
          "accent": "#D99330",
          "neutral": "#110E0E",
          "base-100": "#0c121f",
          "base-200": "#070B12",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  theme: {},
  plugins: [require("daisyui")],
}
