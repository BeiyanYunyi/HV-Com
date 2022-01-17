/* eslint-disable import/no-cycle */
import CCommentProvider from './CCommentProvider';
import CUserProvider from './CUserProvider';

export default class StorageProvider {
  /** 初始化：建表 */
  init(): Promise<void>;

  Comment: CCommentProvider;

  User: CUserProvider;
}
