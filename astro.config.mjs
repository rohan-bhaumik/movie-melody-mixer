import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// Configuration for Webflow Cloud deployment on Cloudflare Edge runtime
export default defineConfig({
  base: '/mixer',
  integrations: [
    tailwind(),
    react()
  ],
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  vite: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }
}); 