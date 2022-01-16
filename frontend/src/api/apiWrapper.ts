import axios from 'axios';
import { ICommentInFrontend } from '../../../types/IComment';

const apiWrapper = new (class ApiWrapper {
  client = axios.create();

  async getComment(route: string) {
    const { data } = await this.client.get<ICommentInFrontend[]>('/api/comments', {
      params: { route },
    });
    return data;
  }
})();

export default apiWrapper;
