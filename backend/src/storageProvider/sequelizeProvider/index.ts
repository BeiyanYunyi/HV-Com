import { setTimeout } from 'timers/promises';
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
  async init(): Promise<void> {
    await setTimeout(5000);
  }

  Comment: Comment;

  User: User;
}

export default SequelizeStorageProvider;
