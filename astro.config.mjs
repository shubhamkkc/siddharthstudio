// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

/** @type {any} */
const nodeGlobal = globalThis;
const nodeProcess = nodeGlobal.process;
const isDev = Boolean(
  nodeProcess?.argv?.includes('dev') ||
    nodeProcess?.env?.ASTRO_DEV === 'true' ||
    nodeProcess?.env?.NODE_ENV === 'development'
);

// https://astro.build/config
export default defineConfig({
  site: 'https://growsquadz.in',
  output: isDev ? 'static' : 'server',
  adapter: isDev ? undefined : cloudflare(),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      // Avoid pre-optimizing Sanity markdown parser deps that ship broken sourcemap paths.
      exclude: ['markdown-it', 'entities']
    }
  }
});