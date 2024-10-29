import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'test',
  plugins: [react()],
  server: {
    port: 3000,
  },
});
