import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // used for hosting on johan.li/uncharted-waters-2
  base: process.env.PUBLIC_PATH || '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
