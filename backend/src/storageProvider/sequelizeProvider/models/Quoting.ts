import { Association, DataTypes, Model } from 'sequelize/dist';
import sequelize from '../db';
import Comment from './Comment';

interface IQuoting {
  id: string;
  source: string;
  target: string;
}

class Quoting extends Model<IQuoting> implements IQuoting {
  declare id: string;

  declare source: string;

  declare target: string;

  declare static associations: { comments: Association<Quoting, Comment> };
}

Quoting.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    source: { type: DataTypes.TEXT, allowNull: false, references: { model: Comment, key: 'ID' } },
    target: { type: DataTypes.TEXT, allowNull: false, references: { model: Comment, key: 'ID' } },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'quoting',
    indexes: [
      { fields: ['source'], using: 'HASH' },
      { fields: ['target'], using: 'HASH' },
    ],
  },
);

export default Quoting;
