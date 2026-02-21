import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://guillaumebeylouneh.github.io',
  base: '/Herac_Web',
  integrations: [tailwind()],
});
