/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
  content: [
    './src/**/*.{html,ts}',
    './spartan-ui/**/*.{html,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
