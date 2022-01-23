import { SyncOptions } from 'sequelize/dist';
import Comment from './Comment';
import Quoting from './Quoting';
import User from './User';

User.hasMany(Comment, { sourceKey: 'id', foreignKey: 'authorID', as: 'comment' });
Comment.belongsTo(User, { targetKey: 'id', foreignKey: 'authorID', as: 'author' });
Comment.belongsTo(Comment, { targetKey: 'ID', foreignKey: 'quotingID', as: 'quoting' });
Comment.hasMany(Quoting, { sourceKey: 'ID', foreignKey: 'source', as: 'quotingSource' });
Comment.hasMany(Quoting, { sourceKey: 'ID', foreignKey: 'target', as: 'quotingTarget' });
Quoting.belongsTo(Comment, { targetKey: 'ID', foreignKey: 'source', as: 'quotingSource' });
Quoting.belongsTo(Comment, { targetKey: 'ID', foreignKey: 'target', as: 'quotingTarget' });

const options: SyncOptions = {
  alter: true,
};

export const syncDB = async () => {
  await User.sync(options);
  await Comment.sync(options);
  await Quoting.sync(options);
};

export default { User, Comment, Quoting };
