import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log("Starting Astro dev server directly in the foreground...");

// Run astro dev using node directly on the bin script
const binPath = path.join(__dirname, 'node_modules', 'astro', 'bin', 'astro.mjs');
const devProcess = spawn('node', [binPath, 'dev'], {
  cwd: __dirname,
  env: { ...process.env, NODE_ENV: 'development' },
  stdio: 'inherit'
});

devProcess.on('error', (err) => {
  console.error("Failed to start Astro process:", err);
});

devProcess.on('exit', (code, signal) => {
  console.log(`Astro process exited with code ${code} and signal ${signal}`);
});
