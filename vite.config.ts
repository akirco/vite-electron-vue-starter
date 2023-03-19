import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@render': resolve(__dirname, './src/render'),
    },
  },
  server: {
    strictPort: true,
    host: true,
    port: 3000,
  },
  build: {
    outDir: 'dist/.render',
  },
});
