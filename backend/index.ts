import http from 'http';
import app from './src/app';
import logger from './src/utils/logger';

const server = http.createServer(app);
server.listen(3000);
logger.info('Server running at port 3000');
