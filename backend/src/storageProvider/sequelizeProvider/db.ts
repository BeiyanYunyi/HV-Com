/* eslint-disable @typescript-eslint/no-unused-vars */
import { Sequelize } from 'sequelize/dist';
import config from '../../../../config/config.json';
import logger from '../../utils/logger';

const sequelize =
  process.env.NODE_ENV === 'production'
    ? new Sequelize(`postgres://${config.databaseConfig.address}`, {
        dialectOptions: {},
        username: config.databaseConfig.username,
        password: config.databaseConfig.password,
        port: config.databaseConfig.port,
        database: config.databaseConfig.database,
        logging: (sql) => {
          logger.debug(sql);
        },
      })
    : new Sequelize('postgres://postgres@localhost', {
        database: config.databaseConfig.database,
        logging: (sql) => {
          logger.debug(sql);
        },
      });

export const connectToDatabase = async () => {
  await sequelize.authenticate();
  logger.info('database connected');
};

export default sequelize;
