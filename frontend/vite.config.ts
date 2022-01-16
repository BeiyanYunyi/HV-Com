import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const root = path.resolve(`${__dirname}/..`);

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: { minify: true },
  plugins: [react()],
  root: path.join(root, 'frontend'),
  build: {
    lib: {
      entry: path.resolve(path.join(root, 'frontend', 'src', 'App.tsx')),
      name: 'vCom',
      // fileName: (format) => `vCom.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'vditor'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          vditor: 'Vditor',
        },
      },
    },
    manifest: true,
  },
});
