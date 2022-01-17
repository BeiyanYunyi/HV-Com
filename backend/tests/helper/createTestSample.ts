import { setTimeout } from 'timers/promises';
import storageProvider from '../../src/storageProvider';
import timeUtils from '../../src/utils/timeUtils';

/** Insert test sample to database. */
const createTestSample = async () => {
  await storageProvider.User.createUser({
    id: '00000000-0000-0000-0000-000000000000',
    username: 'test',
    password: '',
    mail: null,
    website: null,
    trustLevel: 'administrator',
    avatar: null,
  });
  await storageProvider.Comment.addComment({
    ID: '00000000-0000-0000-0000-000000000000',
    authorID: '00000000-0000-0000-0000-000000000000',
    replyTime: timeUtils.getUnixStamp(),
    quotingID: null,
    content: 'test',
    route: '/',
  });
  await setTimeout(2000);
  await storageProvider.Comment.addComment({
    ID: 'b7fc21cb-b937-47a0-b5d6-7dff9ce34ba7',
    authorID: '00000000-0000-0000-0000-000000000000',
    replyTime: timeUtils.getUnixStamp(),
    quotingID: '00000000-0000-0000-0000-000000000000',
    content: 'test2',
    route: '/',
  });
};

export default createTestSample;
