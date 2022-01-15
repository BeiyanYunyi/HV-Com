/* eslint-disable import/no-cycle */
import Comment from './Comment';
import User from './User';

export default class StorageProvider {
  /** 初始化：建表 */
  init(): Promise<void>;

  Comment: Comment;

  User: User;
}
