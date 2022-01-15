/* eslint-disable import/no-cycle */
import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
} from 'sequelize/dist';
import IUserInDB from '../../../../../types/IUser';
import sequelize from '../db';
import Comment from './Comment';

class User extends Model<IUserInDB> implements IUserInDB {
  declare password: string;

  declare lastRevokeTime: string | number;

  declare trustLevel: 'anonymous' | 'user' | 'manager' | 'administrator';

  declare username: string;

  declare avatar: string | null;

  declare mail: string | null;

  declare website: string | null;

  declare id: string;

  declare getComments: HasManyGetAssociationsMixin<Comment>;

  declare addComment: HasManyAddAssociationMixin<Comment, number>;

  declare hasComment: HasManyHasAssociationMixin<Comment, number>;

  declare countComments: HasManyCountAssociationsMixin;

  declare createComment: HasManyCreateAssociationMixin<Comment>;

  declare readonly comments?: Comment[];

  declare static associations: { comments: Association<User, Comment> };
}

User.init(
  {
    id: { type: DataTypes.TEXT, primaryKey: true },
    username: { type: DataTypes.TEXT, unique: true },
    password: { type: DataTypes.TEXT },
    avatar: { type: DataTypes.TEXT, allowNull: true },
    mail: { type: DataTypes.TEXT, allowNull: true },
    website: { type: DataTypes.TEXT, allowNull: true },
    lastRevokeTime: { type: DataTypes.BIGINT },
    trustLevel: { type: DataTypes.TEXT, allowNull: true },
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
