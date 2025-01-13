/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ["./index.html","./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}

