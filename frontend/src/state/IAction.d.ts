import { ICommentInFrontend } from '../../../types/IComment';

type IAction =
  | {
      type: 'add comment';
      payload: ICommentInFrontend;
    }
  | { type: 'init comment'; payload: ICommentInFrontend[] };

export default IAction;
