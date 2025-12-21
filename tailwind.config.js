/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js,jsx,ts,tsx,vue,svelte}",
    "./!(node_modules)/**/*.{html,js,jsx,ts,tsx,vue,svelte}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      }
    }
  },
  plugins: [],
}
