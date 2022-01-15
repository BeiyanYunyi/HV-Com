export default interface ICommentInDB {
  ID: string;
  authorID: string;
  replyTime: number;
  quotingID: string | null;
  content: string;
  votes: number;
  route: string;
}

export interface ICommentInFrontend {
  author: IUserInFrontend;
  ID: string;
  replyTime: number;
  quoting: IReplyInFrontend | null;
  content: string;
  votes: number;
}
