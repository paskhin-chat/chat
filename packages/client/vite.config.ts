import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

/**
 * Vite config.
 */
export default defineConfig(() => ({
  root: './src/main',
  build: {
    outDir: '../../dist',
  },
  base: '',
  plugins: [react()],
  server: {
    port: 6_005,
  },
}));
