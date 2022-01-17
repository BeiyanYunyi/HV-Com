import axios from 'axios';
import { ICommentInFrontend, ICommentPostingAnonymously } from '../../../types/IComment';

const apiWrapper = new (class ApiWrapper {
  client = axios.create();

  async getComments(route: string) {
    const { data } = await this.client.get<ICommentInFrontend[]>('/api/comment', {
      params: { route },
    });
    return data;
  }

  async postComment(param: {
    route: string;
    content: string;
    author: { username: string; mail: string | null; website: string | null };
  }) {
    const { author } = param;
    if (author.mail === '') author.mail = null;
    if (author.website === '') author.website = null;
    const commentToPost: ICommentPostingAnonymously = { ...param, quotingID: null, author };
    const { data } = await this.client.post<ICommentInFrontend>('/api/comment', commentToPost);
    return data;
  }
})();

export default apiWrapper;
