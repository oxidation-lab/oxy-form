import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/[name].[hash][extname]';
          }
          return '[name].[hash][extname]';
        },
      }
    }
  },
  root: 'test',
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
