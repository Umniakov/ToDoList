/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/*.js", "./src/*.html", "./src/components/*.js"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        "11+1": "40px repeat(11, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
