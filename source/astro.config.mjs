import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://guillaumecrespel.github.io',
  base: '/Herac_Web',
  integrations: [tailwind()],
});
