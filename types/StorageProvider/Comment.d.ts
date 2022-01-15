// eslint-disable-next-line import/no-cycle
import StorageProvider from '.';
import ICommentInDB from '../IComment';

export default class Comment {
  parent: StorageProvider;

  /** 获取一个帖子的所有回复
   * @param topicID 帖子ID
   */
  getComments(topicID: string | number): Promise<ICommentInDB[]>;

  /** 获取单个回复 */
  getComment(replyID: string): Promise<ICommentInDB | null>;

  /** 插入回复 */
  addComment(reply: ICommentInDB): Promise<ICommentInDB>;
}
