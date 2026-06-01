import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const BASE = (process.env.BASE_PATH || '/').replace(/\/+$/, '') + '/';

export default defineConfig({
  site: 'https://comfortcreekcounseling.com',
  base: BASE,
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
