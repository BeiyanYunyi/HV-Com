// eslint-disable-next-line import/no-cycle
import StorageProvider from '.';
import ICommentInDB, { ICommentInFrontend, ICommentInserting } from '../IComment';

export default class CCommentProvider {
  parent: StorageProvider;

  /** 获取一个帖子的所有回复
   * @param route 路径
   */
  getComments(route: string | number, order: 'ASC' | 'DESC' = 'ASC'): Promise<ICommentInFrontend[]>;

  /** 获取单个回复 */
  getComment(ID: string): Promise<ICommentInFrontend | null>;

  /** 插入回复 */
  addComment(reply: ICommentInserting): Promise<ICommentInDB>;

  /** Count comments in a route.
   * @param route the route
   */
  countComment(route: string): Promise<number>;
}
