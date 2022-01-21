import express from 'express';
import multiAvatar from '@multiavatar/multiavatar';

require('express-async-errors');

const multiAvatarRouter = express.Router();

multiAvatarRouter.get('/:username', async (req, res) => {
  const svgStr = multiAvatar(req.params.username);
  res.header({ 'Content-Type': 'image/svg+xml' }).send(svgStr);
});

export default multiAvatarRouter;
