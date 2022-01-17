import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import red from '@mui/material/colors/red';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useRef } from 'react';
import Vditor from 'vditor';
import { ICommentInFrontend } from '../../../types/IComment';
import apiWrapper from '../api/apiWrapper';
import { useStateValue } from '../state';
import { initComment } from '../state/reducer';

const Comment: FC<{ comment: ICommentInFrontend }> = ({ comment }) => {
  const targetDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const targetElement = targetDivRef.current;
    if (targetElement instanceof HTMLDivElement) {
      Vditor.preview(targetElement, comment.content);
    }
  }, [comment]);
  return (
    <Card>
      <CardHeader
        title={comment.author.username}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>{comment.author.username.substring(0, 1)}</Avatar>
        }
      />
      <CardContent>
        <div ref={targetDivRef} />
      </CardContent>
    </Card>
  );
};

const Comments: FC = () => {
  const [{ comments }, dispatch] = useStateValue();
  useEffect(() => {
    apiWrapper.getComments(window.location.pathname).then((comms) => dispatch(initComment(comms)));
  }, [dispatch]);
  if (comments.length === 0) return <Typography>还没有回复</Typography>;
  return (
    <Stack spacing={1} sx={{ marginBottom: 1 }}>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.ID} />
      ))}
    </Stack>
  );
};

export default Comments;
