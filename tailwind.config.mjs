/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        brush: "Alex Brush, cursive",
        lush: "'Lush', cursive",
        gilroyRI: "'Gilroy-Regular-Italic', cursive",
        gilroyR: "'Gilroy-Regular', sanf-serif",
        gilroyB: "'Gilroy-Bold', sanf-serif",
        gilroyEB: "'Gilroy-ExtraBold', sanf-serif",
      },
      colors: {
        "custom-red": "#f12b42",
        "custom-green": "#3fae07",
        "custom-blue": "#112886",
        "custom-skyblue": "#45cede",
      },
    },
  },
  plugins: [],
};
