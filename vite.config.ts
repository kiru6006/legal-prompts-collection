import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Using relative paths ensures GitHub Pages compatibility under any subpath
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
