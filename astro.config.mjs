// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

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
  output: isDev ? 'static' : 'server',
  adapter: isDev ? undefined : cloudflare(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      // Avoid pre-optimizing Sanity markdown parser deps that ship broken sourcemap paths.
      exclude: ['markdown-it', 'entities']
    }
  }
});