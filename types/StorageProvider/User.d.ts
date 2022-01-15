// eslint-disable-next-line import/no-cycle
import StorageProvider from '.';
import IUserInDB from '../IUser';

export default class User {
  parent: StorageProvider;

  /** 创建用户
   * @param user 用户
   */
  createUser(user: Pick<IUserInDB, 'id' | 'username' | 'password'>): Promise<void>;

  /** 获取单个用户信息
   * @param id 用户 id
   * @param username 用户名
   * @param forAuth 是否是为验证用户而获取信息（会返回密码 hash 和 lastRevokeTime）
   */
  getUser(
    {
      id,
      username,
    }: {
      id?: string | undefined;
      username?: string | undefined;
    },
    forAuth = false,
  ): Promise<IUserInDB, null>;

  /** 更新用户信息
   * @param userId 用户 ID
   * @param userInfo 用户信息的一部分
   */
  updateUser(userId: string, userInfo: Partial<IUserInDB>): Promise<void>;

  /** 删除用户
   * @param userId 用户 ID
   */
  deleteUser(userId: string): Promise<void>;
}
