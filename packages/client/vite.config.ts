import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { ports } from 'constant';

/**
 * Vite config.
 */
export default defineConfig(() => ({
  root: './src/main',
  build: {
    outDir: '../../dist',
  },
  plugins: [react()],
  server: {
    port: ports.dev.client,
  },
  resolve: {
    alias: {
      app: path.resolve(process.cwd(), './src/main/app'),
      page: path.resolve(process.cwd(), './src/main/page'),
      widget: path.resolve(process.cwd(), './src/main/widget'),
      feature: path.resolve(process.cwd(), './src/main/feature'),
      entity: path.resolve(process.cwd(), './src/main/entity'),
      shared: path.resolve(process.cwd(), './src/main/shared'),
    },
  },
}));
