/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        main: "var(--main)",
        "main-secondary": "var(--main-secondary)",
        "main-tertiary": "var(--main-tertiary)",
        "hover-main": "var(--hover-main)",
        second: "var(--second)",
        "black-1": "var(--black-1)",
        "black-2": "var(--black-2)",
        "black-3": "var(--black-3)",
        "black-4": "var(--black-4)",
        fallback: "var(--fallback)",
        "border-bg": "var(--border-bg)",
        "white-80": "var(--white-80)",
        "gray-200": "var(--gray-200)",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /group-hover\/\d+:hover:max-h-\[400px\]/,
    },
  ],
}
