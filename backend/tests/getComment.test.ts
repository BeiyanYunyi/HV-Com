import { ICommentPostingAnonymously } from '../../types/IComment';
import storageProvider from '../src/storageProvider';
import api from './helper/api';
import createTestSample from './helper/createTestSample';

beforeAll(async () => {
  await storageProvider.init();
  await createTestSample();
});

afterAll(async () => {
  await storageProvider.close();
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
    await api.get('/api/comment/00000000-0000-0000-0000-000000000002').expect(404);
  });
  test('Should 400 if commentID is not a uuid', async () => {
    await api.get('/api/comment/00000000-0000-000-000000000000').expect(400);
  });
});

describe('Anonymous Post Comment Test', () => {
  test('Can post comments anonymously', async () => {
    const commentToPost1: ICommentPostingAnonymously = {
      author: { username: 'test2', mail: '', website: null },
      quotingID: null,
      content: '1145141919810',
      route: '/',
    };
    const commentToPost2: ICommentPostingAnonymously = {
      author: { username: 'test2', mail: null, website: null },
      quotingID: null,
      content: '364364',
      route: '/',
    };
    const commentToPost3: ICommentPostingAnonymously = {
      author: { username: 'test3', mail: null, website: null },
      quotingID: null,
      content: '1145141919810',
      route: '/test',
    };
    const [res1, res2, res3] = await Promise.all([
      api.post('/api/comment').send(commentToPost1).expect(201),
      api.post('/api/comment').send(commentToPost2).expect(201),
      api.post('/api/comment').send(commentToPost3).expect(201),
    ]);
    expect(res1.body.author.username).toBe('test2');
    expect(res1.body.content).toBe('1145141919810');
    expect(res1.body.route).toBe('/');
    expect(res2.body.author.username).toBe('test2');
    expect(res2.body.content).toBe('364364');
    expect(res2.body.route).toBe('/');
    expect(res3.body.author.username).toBe('test3');
    expect(res3.body.content).toBe('1145141919810');
    expect(res3.body.route).toBe('/test');
  });
  test('Injection test', async () => {
    const injectStr = "dd');DROP TABLE `comment`;--";
    const comment: ICommentPostingAnonymously = {
      author: { username: 'test2', mail: null, website: null },
      quotingID: null,
      content: injectStr,
      route: '/',
    };
    const res = await api.post('/api/comment').send(comment).expect(201);
    const { ID } = res.body;
    const res2 = await api.get(`/api/comment/${ID}`).expect(200);
    expect(res2.body.content).toBe(injectStr);
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
  test("Should 400 if there're extra parameters", async () => {
    const commentToPost = {
      author: { username: 'test2', mail: null, website: null },
      quotingID: null,
      content: '1145141919810',
      route: '/',
      anyExtraParam: 'fkyoufsyz',
    };
    await api.post('/api/comment').send(commentToPost).expect(400);
  });
  test('Should 400 if some parts of request body are missing', async () => {
    const commentToPost1: Partial<ICommentPostingAnonymously> = {
      author: { username: 'test2', mail: null, website: null },
      quotingID: null,
      content: '1145141919810',
    };
    const commentToPost2 = {
      author: { username: 'test2', website: null },
      quotingID: null,
      content: '1145141919810',
      route: '/',
    };
    await Promise.all([
      api.post('/api/comment').send(commentToPost1).expect(400),
      api.post('/api/comment').send(commentToPost2).expect(400),
    ]);
  });
  test('Should 400 if not nullable value is null', async () => {
    const commentToPost1 = {
      author: { username: 'test2', mail: null, website: null },
      quotingID: null,
      content: null,
      route: '',
    };
    const commentToPost2 = {
      author: { username: null, mail: null, website: null },
      quotingID: null,
      content: '1145141919810',
      route: '',
    };
    await Promise.all([
      api.post('/api/comment').send(commentToPost1).expect(400),
      api.post('/api/comment').send(commentToPost2).expect(400),
    ]);
  });
});

describe('Get Avatar Test', () => {
  test('can get avatar', async () => {
    await api.get('/api/generateAvatar/YaJuSenpai').expect(200);
  });
});
