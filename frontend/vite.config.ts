import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const root = path.resolve(`${__dirname}/..`);

const external = !!process.env.EXTERNAL;

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: { minify: true },
  plugins: [react()],
  root: path.join(root, 'frontend'),
  build: {
    lib: {
      entry: path.resolve(path.join(root, 'frontend', 'src', 'App.tsx')),
      name: 'HVCom',
      formats: ['umd'],
    },
    rollupOptions: {
      external: external ? ['react', 'react-dom', 'vditor'] : [],
      output: {
        globals: external
          ? {
              react: 'React',
              'react-dom': 'ReactDOM',
              vditor: 'Vditor',
            }
          : undefined,
      },
    },
    manifest: true,
    outDir: external ? path.join(root, 'dist', 'external') : path.join(root, 'dist', 'aio'),
    emptyOutDir: true,
  },
});
