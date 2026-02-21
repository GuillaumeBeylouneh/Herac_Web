import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://guillaumebeylouneh.github.io/Herac_Web',
  base: '/Herac_Web',
  integrations: [tailwind(), sitemap()],
});