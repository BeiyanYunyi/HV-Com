import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import requestLogger from './middlewares/requestLogger';
import commentRouter from './router/commentRouter';
import userRouter from './router/userRouter';
import apiSpec from './spec/apiSpec';

require('express-async-errors');

const apiRouter = express.Router();
apiRouter.use(requestLogger);
apiRouter.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateResponses: false,
    validateApiSpec: true,
  }),
);

apiRouter.use('/comment', commentRouter);
apiRouter.use('/user', userRouter);

export default apiRouter;
