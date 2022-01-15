/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/lines-between-class-members */
import { DataTypes, Model } from 'sequelize/dist';
import ICommentInDB from '../../../../../types/IComment';
import sequelize from '../db';

class Comment extends Model<ICommentInDB> implements ICommentInDB {
  declare ID: string;
  declare authorID: string;
  declare replyTime: number;
  declare quotingID: string | null;
  declare content: string;
  declare votes: number;
  declare route: string;
}

Comment.init(
  {
    ID: { type: DataTypes.TEXT, primaryKey: true },
    authorID: { type: DataTypes.TEXT },
    replyTime: { type: DataTypes.BIGINT },
    quotingID: { type: DataTypes.TEXT },
    content: { type: DataTypes.TEXT, allowNull: true },
    votes: { type: DataTypes.INTEGER, defaultValue: 0 },
    route: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'comment',
    indexes: [{ fields: ['replyTime', 'route'], using: 'BTREE' }],
  },
);

export default Comment;
