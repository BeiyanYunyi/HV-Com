export interface IUserInFrontend {
  id: string;
  username: string;
  avatar: string | null;
  mail: string | null;
  website: string | null;
}

export default interface IUserInDB extends IUserInFrontend {
  password: string;
  lastRevokeTime: string | number;
  trustLevel: 'anonymous' | 'user' | 'manager' | 'administrator';
}
