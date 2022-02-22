import { SyncOptions } from 'sequelize';
import Comment from './Comment';
import Quoting from './Quoting';
import Session from './Session';
import User from './User';

const asConstructor = (name: string) => name;

User.hasMany(Comment, { sourceKey: 'id', foreignKey: 'authorID', as: asConstructor('comment') });
Comment.belongsTo(User, { targetKey: 'id', foreignKey: 'authorID', as: asConstructor('author') });
User.hasMany(Session, { sourceKey: 'id', foreignKey: 'userID', as: asConstructor('session') });
Session.belongsTo(User, { targetKey: 'id', foreignKey: 'userID', as: asConstructor('user') });
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
  await Session.sync(options);
  await Quoting.sync(options);
};

export default { User, Comment, Quoting, Session };
