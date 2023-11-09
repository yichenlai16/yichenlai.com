/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    // extend: {
    //   fontFamily: {
    //     sans: ["'Noto Sans TC'", "sans-serif"],
    //   },
    // },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        ".scrollbar": {
          overflowY: "auto",
        },
        ".scrollbar::-webkit-scrollbar": {
          height: "0.5rem",
          width: "0.5rem",
        },
        ".scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: theme("colors.stone.200"),
        },
        ".scrollbar::-webkit-scrollbar-track": {
          backgroundColor: theme("colors.stone.100"),
        },
      });
    }),
    require("@tailwindcss/typography"),
    // ...
  ],
};
