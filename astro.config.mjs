import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  base: '/mixer',
  integrations: [
    tailwind(),
    react()
  ],
  output: 'static',
  trailingSlash: 'always',
  build: {
    assets: '_astro'
  }
}); 