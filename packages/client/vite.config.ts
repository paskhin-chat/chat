import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { config } from 'config';

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
    port: config.CLIENT_PORT,
  },
}));
