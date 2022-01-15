import { ICommentInFrontend } from '../../../types/IComment';
import IAction from './IAction';
import IState from './IState';

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'add comment':
      return { ...state, comments: state.comments.concat(action.payload) };

    default:
      return state;
  }
};

export const addComment = (comment: ICommentInFrontend): IAction => ({
  type: 'add comment',
  payload: comment,
});

export default reducer;
