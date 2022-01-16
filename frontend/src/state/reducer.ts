import { ICommentInFrontend } from '../../../types/IComment';
import IAction from './IAction';
import IState from './IState';

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'add comment':
      return { ...state, comments: state.comments.concat(action.payload) };
    case 'init comment':
      return { ...state, comments: action.payload };

    default:
      return state;
  }
};

export const addComment = (comment: ICommentInFrontend): IAction => ({
  type: 'add comment',
  payload: comment,
});

export const initComment = (comments: ICommentInFrontend[]): IAction => ({
  type: 'init comment',
  payload: comments,
});

export default reducer;
