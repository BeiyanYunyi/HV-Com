import { ICommentPostingAnonymously } from '../../types/IComment';
import storageProvider from '../src/storageProvider';
import api from './helper/api';
import createTestSample from './helper/createTestSample';

beforeAll(async () => {
  await storageProvider.init();
  await createTestSample();
});

describe('Get Comment Test', () => {
  test('Get comments', async () => {
    const res = await api.get('/api/comment?route=%2F').expect(200);
    expect(res.body).toHaveLength(2);
  });
  test('Should 400 if route is invalid', async () => {
    await api.get('/api/comment').expect(400);
  });
  test('Get comment', async () => {
    const res = await api.get('/api/comment/00000000-0000-0000-0000-000000000000').expect(200);
    expect(res.body.ID).toBe('00000000-0000-0000-0000-000000000000');
  });
  test('Should 404 if comment not found', async () => {
    await api.get('/api/comment/fkyoufsyz114514').expect(404);
  });
});

describe('Anonymous Post Comment Test', () => {
  test('Post comments anonymously', async () => {
    const commentToPost: ICommentPostingAnonymously = {
      author: { username: 'test2', mail: null, website: null },
      quotingID: null,
      content: '1145141919810',
      route: '/',
    };
    const res = await api.post('/api/comment').send(commentToPost).expect(201);
    expect(res.body.author.username).toBe('test2');
    expect(res.body.content).toBe('1145141919810');
  });
  test('Should 409 if username conflicts with signed user', async () => {
    const commentToPost: ICommentPostingAnonymously = {
      author: { username: 'test', mail: null, website: null },
      quotingID: null,
      content: '1145141919810',
      route: '/',
    };
    await api.post('/api/comment').send(commentToPost).expect(409);
  });
});
