import { setTimeout } from 'timers/promises';
import storageProvider from '../../src/storageProvider';
import timeUtils from '../../src/utils/timeUtils';

const nilID = '00000000-0000-0000-0000-000000000000';

/** Insert test sample to database. */
const createTestSample = async () => {
  await storageProvider.User.createUser({
    id: nilID,
    username: 'test',
    password: '',
    mail: null,
    website: null,
    trustLevel: 'administrator',
    avatar: null,
  });
  await storageProvider.User.createSession(nilID);
  await storageProvider.Comment.addComment({
    ID: nilID,
    authorID: nilID,
    replyTime: timeUtils.getUnixStamp(),
    quotingID: null,
    content: 'test',
    route: '/',
  });
  await setTimeout(2000);
  await storageProvider.Comment.addComment({
    ID: 'b7fc21cb-b937-47a0-b5d6-7dff9ce34ba7',
    authorID: nilID,
    replyTime: timeUtils.getUnixStamp(),
    quotingID: nilID,
    content: 'test2',
    route: '/',
  });
};

export default createTestSample;
