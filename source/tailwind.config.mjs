/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        herac: {
          red: '#C8102E',
          dark: '#0D0D0D',
          gray: '#1A1A1A',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'Anton', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
