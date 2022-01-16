import express from 'express';
import BadRequestError from './errors/BadRequestError';
import storageProvider from './storageProvider';

require('express-async-errors');

const apiRouter = express.Router();

apiRouter.get('/comments', async (req, res) => {
  const { route } = req.query;
  if (!route || typeof route !== 'string') throw new BadRequestError('Invalid query');
  const comments = await storageProvider.Comment.getComments(route);
  res.json(comments);
});

export default apiRouter;
