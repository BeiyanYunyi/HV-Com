/* eslint-disable class-methods-use-this */
import IUserInDB from '../../../../types/IUser';
import StorageProvider from '../../../../types/StorageProvider';
import UserClass from '../../../../types/StorageProvider/User';
import NotFoundError from '../../errors/NotFoundError';
import timeUtils from '../../utils/timeUtils';
import models from './models';

export default class UserProvider implements UserClass {
  constructor(parent: StorageProvider) {
    this.parent = parent;
  }

  async createUser(
    user: Pick<IUserInDB, 'id' | 'username' | 'password' | 'mail' | 'website'>,
  ): Promise<void> {
    const userToCreate: IUserInDB = {
      ...user,
      lastRevokeTime: timeUtils.getUnixStamp(),
      trustLevel: 'user',
      avatar: null,
    };
    await models.User.create(userToCreate);
  }

  async getUser(
    { id, username }: { id?: string | undefined; username?: string | undefined },
    forAuth?: boolean,
  ) {
    const queryAry: (keyof IUserInDB)[] = [
      'avatar',
      'id',
      'username',
      'mail',
      'website',
      'trustLevel',
    ];
    if (forAuth) queryAry.push('password', 'lastRevokeTime');
    if (id) {
      const user = await models.User.findByPk(id, { attributes: queryAry });
      if (!user) return null;
      return user.toJSON();
    }
    if (username) {
      const user = await models.User.findOne({ where: { username }, attributes: queryAry });
      if (!user) return null;
      return user.toJSON();
    }
    return null;
  }

  async updateUser(userId: string, userInfo: Partial<IUserInDB>): Promise<void> {
    const userToUpdate = await models.User.findByPk(userId);
    if (!userToUpdate) throw new NotFoundError('用户不存在');
    await userToUpdate.update(userInfo);
  }

  async deleteUser(userId: string): Promise<void> {
    const userToDelete = await models.User.findByPk(userId);
    if (!userToDelete) throw new NotFoundError('用户不存在');
    await userToDelete.destroy();
  }

  parent: StorageProvider;
}
