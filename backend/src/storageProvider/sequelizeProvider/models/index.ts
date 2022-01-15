import { SyncOptions } from 'sequelize/dist';
import Comment from './Comment';
import User from './User';

User.hasMany(Comment, { sourceKey: 'id', foreignKey: 'authorID', as: 'comment' });
Comment.belongsTo(User, { targetKey: 'id', foreignKey: 'authorID' });

const options: SyncOptions = {
  alter: true,
};

User.sync(options);
Comment.sync(options);

export default { User, Comment };
