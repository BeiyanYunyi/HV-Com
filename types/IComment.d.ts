export default interface ICommentInDB {
  ID: string;
  authorID: string;
  replyTime: number | string;
  quotingID: string | null;
  content: string;
  route: string;
  floor: number | string;
}

export interface ICommentInFrontend {
  author: IUserInFrontend;
  ID: string;
  replyTime: number | string;
  quoting: IReplyInFrontend | null;
  content: string;
  floor: number | string;
}
