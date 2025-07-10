import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    },
    resolve: {
      alias: {
        // Use our polyfill for react-dom/server.edge
        'react-dom/server.edge': resolve(__dirname, 'src/polyfills/react-dom-server-edge.js'),
        'react-dom/server$': 'react-dom/server'
      }
    },
    ssr: {
      // Don't try to externalize our polyfill
      noExternal: ['react', 'react-dom']
    },
    optimizeDeps: {
      // Exclude the problematic import from optimization
      exclude: ['react-dom/server.edge']
    }
  }
}); 