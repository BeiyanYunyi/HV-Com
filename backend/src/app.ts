import path from 'path';
import express from 'express';
import { createServer } from 'vite';
import argv from './utils/argv';
import apiRouter from './apiRouter';
import storageProvider from './storageProvider';

const root = path.resolve(`${__dirname}/../../`);
const app = express();
app.use('/api', apiRouter);

(async () => {
  if (argv.dev) {
    const viteDevServer = await createServer({
      root: path.join(root, 'frontend'),
      server: { middlewareMode: 'html' },
    });
    app.use(viteDevServer.middlewares);
  } else {
    app.use(express.static(path.join(root, 'frontend', 'dist')));
  }
  await storageProvider.init();
})();

export default app;
