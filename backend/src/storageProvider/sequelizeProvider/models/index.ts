import { SyncOptions } from 'sequelize/dist';
import Comment from './Comment';
import User from './User';

User.hasMany(Comment, { sourceKey: 'id', foreignKey: 'authorID', as: 'comment' });
Comment.belongsTo(User, { targetKey: 'id', foreignKey: 'authorID', as: 'author' });
Comment.belongsTo(Comment, { targetKey: 'ID', foreignKey: 'quotingID', as: 'quoting' });

const options: SyncOptions = {
  alter: true,
};

User.sync(options);
Comment.sync(options);

export default { User, Comment };
