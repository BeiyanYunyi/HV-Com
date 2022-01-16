import { Response, Request } from 'express';
import logger from '../utils/logger';

const requestLogger = (
  req: Request,
  res: Response<Record<string, any> | string>,
  next: () => unknown,
) => {
  const { method, url, res: reqRes } = req;
  logger.http({
    message: `${method} ${url}`,
    statusCode: reqRes?.statusCode,
  });
  next();
};

export default requestLogger;
