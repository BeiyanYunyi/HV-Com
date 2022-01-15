import StorageProvider from '../../../../types/StorageProvider';
import Comment from '../../../../types/StorageProvider/Comment';
import User from '../../../../types/StorageProvider/User';
import CommentProvider from './CommentProvider';
import UserProvider from './UserProvider';

class SequelizeStorageProvider implements StorageProvider {
  constructor() {
    this.Comment = new CommentProvider(this);
    this.User = new UserProvider(this);
  }

  // eslint-disable-next-line class-methods-use-this
  init(): Promise<void> {
    return Promise.resolve();
  }

  Comment: Comment;

  User: User;
}

export default SequelizeStorageProvider;
