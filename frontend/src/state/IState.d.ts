import { ICommentInFrontend } from '../../../types/IComment';
// eslint-disable-next-line import/no-cycle
import ApiWrapper from '../services/apiWrapper';

export default interface IState {
  comments: ICommentInFrontend[];
  backendURL: string;
  apiWrapper: ApiWrapper;
}
