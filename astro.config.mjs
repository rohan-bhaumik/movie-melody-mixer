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
    },
    ssr: {
      // Externalize react-dom/server.edge to prevent bundling issues
      external: ['react-dom/server.edge'],
      // Keep React in the bundle for proper hydration
      noExternal: ['react', 'react-dom']
    },
    resolve: {
      alias: {
        // Map server.edge to regular server for React 18 compatibility
        'react-dom/server.edge': 'react-dom/server',
        'react-dom/server$': 'react-dom/server'
      }
    },
    optimizeDeps: {
      // Exclude problematic dependencies from pre-bundling
      exclude: ['react-dom/server.edge']
    }
  }
}); 