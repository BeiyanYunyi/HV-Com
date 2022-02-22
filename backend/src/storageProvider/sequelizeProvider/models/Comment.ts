/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import { Association, DataTypes, Model } from 'sequelize';
import ICommentInDB, { ICommentInFrontend } from '../../../../../types/IComment';
import { IUserInFrontend } from '../../../../../types/IUser';
import sequelize from '../db';
import User from './User';

class Comment extends Model<ICommentInDB> implements ICommentInDB {
  declare ID: string;

  declare authorID: string;

  declare replyTime: number | string;

  declare quotingID: string | null;

  declare content: string;

  declare route: string;

  declare floor: number | string;

  declare readonly author: IUserInFrontend;

  declare readonly quoting: ICommentInFrontend;

  declare static associations: {
    author: Association<Comment, User>;
    quoting: Association<Comment, Comment>;
  };

  declare toJSON: <T extends ICommentInFrontend | ICommentInDB>() => T;
}

Comment.init(
  {
    ID: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    authorID: { type: DataTypes.UUID, allowNull: false },
    replyTime: { type: DataTypes.BIGINT, allowNull: false },
    quotingID: { type: DataTypes.UUID },
    content: { type: DataTypes.TEXT, allowNull: false },
    route: { type: DataTypes.TEXT, allowNull: false },
    floor: { type: DataTypes.BIGINT, allowNull: false },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'comment',
    indexes: [{ fields: ['floor', 'route'], using: 'BTREE' }],
  },
);

export default Comment;
