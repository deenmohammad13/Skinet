/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",   // 👈 tells Tailwind to scan Angular templates & components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true,
}
