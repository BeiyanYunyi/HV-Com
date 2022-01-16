import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import red from '@material-ui/core/colors/red';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import { FC, useEffect } from 'react';
import Vditor from 'vditor';
import { ICommentInFrontend } from '../../../types/IComment';
import { IUserInFrontend } from '../../../types/IUser';
import apiWrapper from '../api/apiWrapper';
import { useStateValue } from '../state';
import { initComment } from '../state/reducer';

const Comment: FC<{ comment: ICommentInFrontend }> = ({ comment }) => {
  useEffect(() => {
    const targetElement = document.querySelector(`div#comment-${comment.floor}`);
    if (targetElement instanceof HTMLDivElement) {
      Vditor.preview(targetElement, comment.content);
    }
  }, [comment]);
  const { author }: { author: IUserInFrontend } = comment;
  return (
    <Card>
      <CardHeader
        title={author.username}
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{author.username.substring(0, 1)}</Avatar>}
      />
      <CardContent>
        <Typography component="div" id={`comment-${comment.floor}`} />
      </CardContent>
    </Card>
  );
};

const Comments: FC<{ comments: string[] }> = () => {
  const [{ comments }, dispatch] = useStateValue();
  useEffect(() => {
    apiWrapper.getComment(window.location.pathname).then((comms) => dispatch(initComment(comms)));
  }, [dispatch]);
  if (comments.length === 0) return <Typography>还没有回复</Typography>;
  return (
    <Stack spacing={1}>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.ID} />
      ))}
    </Stack>
  );
};

export default Comments;
