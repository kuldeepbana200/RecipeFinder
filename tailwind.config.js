/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your file structure
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        openSans: ['"Open Sans"', 'sans-serif'],
        pacifico: ['"Pacifico"', 'cursive'],
        montserrat: ['"Montserrat Alternates"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
