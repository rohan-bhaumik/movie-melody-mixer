import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// Configuration for Webflow Cloud deployment - using static output for edge compatibility
export default defineConfig({
  base: '/mixer',
  integrations: [
    tailwind(),
    react({
      // Enable client-side rendering for better edge compatibility
      experimentalReactChildren: true
    })
  ],
  output: 'static',
  adapter: cloudflare({
    // Use static mode for better edge compatibility
    mode: 'directory'
  }),
  build: {
    // Ensure proper asset handling for static deployment
    assets: '_astro',
    inlineStylesheets: 'auto'
  },
  vite: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    },
    build: {
      // Target modern browsers for better edge compatibility
      target: 'es2020',
      rollupOptions: {
        output: {
          // Ensure proper chunking for edge environments
          manualChunks: undefined
        }
      }
    }
  }
}); 