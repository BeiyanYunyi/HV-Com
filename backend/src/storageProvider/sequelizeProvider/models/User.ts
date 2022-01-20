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
    id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
    username: { type: DataTypes.TEXT, unique: true, allowNull: false },
    password: { type: DataTypes.TEXT, allowNull: true },
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
