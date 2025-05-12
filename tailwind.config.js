/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/JSX files in src
    "./public/index.html" // Include index.html if you use Tailwind classes there
  ],
  theme: {
    extend: {
       // You can extend the default theme here (e.g., add custom colors for SolPower)
       colors: {
         'solpower-primary': '#007bff', // Example primary blue
         'solpower-secondary': '#ffdd57', // Example secondary yellow
         'solpower-dark': '#343a40',
         'solpower-light': '#f8f9fa',
       }
    },
  },
  plugins: [],
}