import Avatar from '@mui/material/Avatar';
import { FC } from 'react';
import { IUserInFrontend } from '../../../types/IUser';

const AppAvatar: FC<{ user: IUserInFrontend }> = ({ user }) => {
  if (user.avatar) return <Avatar src={user.avatar} alt={user.username} />;
  return <Avatar src={`https://api.multiavatar.com/${user.username}.svg`} alt={user.username} />;
};

export default AppAvatar;
