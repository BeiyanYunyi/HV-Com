import express from 'express';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import config from '../../../config';
import { ICommentPostingAnonymously } from '../../../types/IComment';
import { IUserToCreate } from '../../../types/IUser';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';
import NotFoundError from '../errors/NotFoundError';
import storageProvider from '../storageProvider';
import timeUtils from '../utils/timeUtils';

require('express-async-errors');

const commentRouter = express.Router();

commentRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const comment = await storageProvider.Comment.getComment(id);
  if (!comment) throw new NotFoundError('Comment Not Found');
  res.json(comment);
});

commentRouter.get('/', async (req, res) => {
  const { route } = req.query;
  if (!route || typeof route !== 'string') throw new BadRequestError('Invalid query');
  const comments = await storageProvider.Comment.getComments(route);
  res.json(comments);
});

commentRouter.post('/', async (req, res) => {
  const { body }: { body: ICommentPostingAnonymously } = req;
  const userInDB = await storageProvider.User.getUser({ username: body.author.username });
  if (userInDB && userInDB.trustLevel !== 'anonymous') {
    throw new ConflictError('Username conflicted.');
  }
  const id = uuidv5(body.author.username, config.uuidNameSpace);
  const ID = uuidv4();
  if (!userInDB) {
    const userToCreate: IUserToCreate = {
      id,
      username: body.author.username,
      mail: body.author.mail,
      password: '',
      website: body.author.website,
      trustLevel: 'anonymous',
      avatar: null,
    };
    await storageProvider.User.createUser(userToCreate);
  }
  await storageProvider.Comment.addComment({
    ID,
    authorID: id,
    replyTime: timeUtils.getUnixStamp(),
    quotingID: body.quotingID,
    content: body.content,
    route: body.route,
  });
  const commentInserted = await storageProvider.Comment.getComment(ID);
  res.status(201).json(commentInserted);
});

export default commentRouter;
