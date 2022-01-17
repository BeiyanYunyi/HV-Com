import { Sequelize } from 'sequelize/dist';
import config from '../../../../config/config.json';
import argv from '../../utils/argv';
import logger from '../../utils/logger';
import route from '../../utils/route';

const getSequelize = () => {
  if (argv.test)
    return new Sequelize({
      dialect: 'sqlite',
      storage: route.tempDBRoute,
      logging: (sql) => {
        logger.debug(sql);
      },
    });
  if (argv.dev)
    return new Sequelize('postgres://postgres@localhost', {
      database: config.databaseConfig.database,
      logging: (sql) => {
        logger.debug(sql);
      },
    });
  return new Sequelize(`postgres://${config.databaseConfig.address}`, {
    username: config.databaseConfig.username,
    password: config.databaseConfig.password,
    port: config.databaseConfig.port,
    database: config.databaseConfig.database,
    logging: (sql) => {
      logger.debug(sql);
    },
  });
};

const sequelize = getSequelize();

export const connectToDatabase = async () => {
  await sequelize.authenticate();
  logger.info('database connected');
};

export default sequelize;
