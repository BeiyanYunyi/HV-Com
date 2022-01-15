import { setTimeout } from 'timers/promises';
import storageProvider from '../src/storageProvider';
import logger from '../src/utils/logger';
import timeUtils from '../src/utils/timeUtils';

const createTestSample = async () => {
  await setTimeout(5000);
  await storageProvider.User.createUser({
    id: '00000000-0000-0000-0000-000000000000',
    username: 'test',
    password: '',
  });
  const inserted = await storageProvider.Comment.addComment({
    ID: '00000000-0000-0000-0000-000000000000',
    authorID: '00000000-0000-0000-0000-000000000000',
    replyTime: timeUtils.getUnixStamp(),
    quotingID: null,
    content: 'test',
    votes: 0,
    route: '/',
  });
  logger.debug(inserted);
};

export default createTestSample;
