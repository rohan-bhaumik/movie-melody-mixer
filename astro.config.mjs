import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  base: '/mixer',
  integrations: [
    tailwind(),
    react()
  ],
  output: 'hybrid',
  adapter: cloudflare({
    mode: 'directory'
  }),
  trailingSlash: 'always',
  build: {
    assets: '_astro'
  }
}); 