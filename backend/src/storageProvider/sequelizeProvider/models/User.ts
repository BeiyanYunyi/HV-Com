/* eslint-disable import/no-cycle */
import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManySetAssociationsMixin,
  Model,
} from 'sequelize';
import IUserInDB from '../../../../../types/IUser';
import sequelize from '../db';
import Comment from './Comment';
import Session from './Session';

class User extends Model<IUserInDB> implements IUserInDB {
  declare password: string;

  declare lastRevokeTime: string | number;

  declare trustLevel: 'anonymous' | 'user' | 'manager' | 'administrator';

  declare username: string;

  declare avatar: string | null;

  declare mail: string | null;

  declare website: string | null;

  declare id: string;

  declare getComment: HasManyGetAssociationsMixin<Comment>;

  declare addComment: HasManyAddAssociationMixin<Comment, string>;

  declare hasComment: HasManyHasAssociationMixin<Comment, string>;

  declare countComment: HasManyCountAssociationsMixin;

  declare createComment: HasManyCreateAssociationMixin<Comment>;

  declare addSession: HasManyAddAssociationMixin<Session, string>;

  declare countSession: HasManyCountAssociationsMixin;

  declare createSession: HasManyCreateAssociationMixin<Session>;

  declare getSession: HasManyGetAssociationsMixin<Session>;

  declare hasSession: HasManyHasAssociationMixin<Session, string>;

  declare removeSession: HasManyRemoveAssociationMixin<Session, string>;

  declare setSession: HasManySetAssociationsMixin<Session, string>;

  declare readonly comments?: Comment[];

  declare readonly sessions?: Session[];

  declare static associations: {
    comments: Association<User, Comment>;
    session: Association<User, Session>;
  };
}

User.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    username: { type: DataTypes.TEXT, unique: true, allowNull: false },
    password: { type: DataTypes.TEXT },
    avatar: { type: DataTypes.TEXT },
    mail: { type: DataTypes.TEXT },
    website: { type: DataTypes.TEXT },
    lastRevokeTime: { type: DataTypes.BIGINT, allowNull: false },
    trustLevel: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'user',
    indexes: [{ fields: ['username'], using: 'BTREE' }],
  },
);

export default User;
