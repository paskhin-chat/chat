/* eslint-disable unicorn/prefer-module */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';

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
    port: 6_005,
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, './src/main/app'),
      page: path.resolve(__dirname, './src/main/page'),
      widget: path.resolve(__dirname, './src/main/widget'),
      feature: path.resolve(__dirname, './src/main/feature'),
      entity: path.resolve(__dirname, './src/main/entity'),
      shared: path.resolve(__dirname, './src/main/shared'),
    },
  },
}));

/* eslint-enable */
