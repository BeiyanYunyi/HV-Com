import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import requestLogger from './middlewares/requestLogger';
import commentRouter from './router/commentRouter';
import multiAvatarRouter from './router/multiAvatarRouter';
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
apiRouter.use('/generateAvatar', multiAvatarRouter);

export default apiRouter;
