import StorageProvider from '../../../../types/StorageProvider';
import CCommentProvider from '../../../../types/StorageProvider/CCommentProvider';
import CUserProvider from '../../../../types/StorageProvider/CUserProvider';
import CommentProvider from './CommentProvider';
import { syncDB } from './models';
import UserProvider from './UserProvider';

class SequelizeStorageProvider implements StorageProvider {
  constructor() {
    this.Comment = new CommentProvider(this);
    this.User = new UserProvider(this);
  }

  // eslint-disable-next-line class-methods-use-this
  async init(): Promise<void> {
    await syncDB();
  }

  Comment: CCommentProvider;

  User: CUserProvider;
}

export default SequelizeStorageProvider;
