export interface IUserInFrontend {
  id: string;
  username: string;
  avatar: string | null;
  mail: string | null;
  website: string | null;
}

export default interface IUserInDB extends IUserInFrontend {
  password: string | null;
  lastRevokeTime: string | number;
  trustLevel: 'anonymous' | 'user' | 'manager' | 'administrator';
}

export type IUserToCreate = Pick<
  IUserInDB,
  'id' | 'username' | 'password' | 'mail' | 'website' | 'trustLevel' | 'avatar'
>;
