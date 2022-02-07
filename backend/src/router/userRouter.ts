import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import storageProvider from '../storageProvider';
import config from '../../../config';
import { IUserToCreate } from '../../../types/IUser';

require('express-async-errors');

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  const {
    body,
  }: {
    body: {
      password: string;
      username: string;
      mail: string | null;
      website: string | null;
    };
  } = req;
  const pwdHash = await bcrypt.hash(body.password, config.passwordSalt);
  const userToCreate: IUserToCreate = {
    id: uuidv4(),
    username: body.username,
    mail: body.mail,
    website: body.website,
    avatar: null,
    trustLevel: 'user',
    password: pwdHash,
  };
  await storageProvider.User.createUser(userToCreate);
  const session = await storageProvider.User.createSession(userToCreate.id);
  res.json(session);
});

export default userRouter;
