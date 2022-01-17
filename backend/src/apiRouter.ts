import express from 'express';
import commentRouter from './router/commentRouter';

require('express-async-errors');

const apiRouter = express.Router();

apiRouter.use('/comment', commentRouter);

export default apiRouter;
