import { ICommentInFrontend } from '../../../types/IComment';

export default interface IAction {
  type: 'add comment';
  payload: ICommentInFrontend;
}
