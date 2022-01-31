/* eslint-disable import/no-cycle */
import { Association, DataTypes, Model } from 'sequelize/dist';
import sequelize from '../db';
import User from './User';

export interface ISession {
  id: string;
  userID: string;
}

class Session extends Model<ISession> implements ISession {
  declare id: string;

  declare userID: string;

  declare static associations: { user: Association<Session, User> };

  declare user?: User;
}

Session.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    userID: { type: DataTypes.UUID, allowNull: false },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'session',
    indexes: [{ fields: ['id'], using: 'HASH' }],
  },
);

export default Session;
