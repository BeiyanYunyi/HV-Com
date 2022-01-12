import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const root = path.resolve(`${__dirname}/..`);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: path.join(root, 'frontend'),
});
