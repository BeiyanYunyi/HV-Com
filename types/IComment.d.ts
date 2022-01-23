import { IUserInFrontend } from './IUser';

export default interface ICommentInDB {
  ID: string;
  authorID: string;
  replyTime: number | string;
  quotingID: string | null;
  content: string;
  route: string;
  floor: number | string;
}

export type ICommentInserting = Pick<
  ICommentInDB,
  'ID' | 'authorID' | 'content' | 'quotingID' | 'replyTime' | 'route'
>;

export interface ICommentInFrontend {
  author: IUserInFrontend;
  ID: string;
  replyTime: number | string;
  quoting: ICommentInFrontend | null;
  content: string;
  floor: number | string;
}

export interface ICommentPostingAnonymously {
  author: {
    username: string;
    mail: string | null;
    website: string | null;
  };
  quotingID: string | null;
  content: string;
  route: string;
}
