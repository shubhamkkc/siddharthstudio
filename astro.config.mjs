// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// Enable Cloudflare adapter only when building on Cloudflare Pages or GitHub Actions CI
const isCloudflare = process.env.CF_PAGES === '1' || process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  output: isCloudflare ? 'server' : undefined,
  adapter: isCloudflare ? cloudflare() : undefined,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});