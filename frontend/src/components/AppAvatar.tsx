import Avatar from '@mui/material/Avatar';
import { FC } from 'react';
import { IUserInFrontend } from '../../../types/IUser';
import { useStateValue } from '../state';

const AppAvatar: FC<{ user: IUserInFrontend }> = ({ user }) => {
  const [state] = useStateValue();
  if (user.avatar) return <Avatar src={user.avatar} />;
  return <Avatar src={`${state.backendURL}api/generateAvatar/${user.username}`} />;
};

export default AppAvatar;
