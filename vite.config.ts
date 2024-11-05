import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: false
  },
  root: 'test',
  plugins: [react({
    fastRefresh: false,
  } as any),],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
