import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useRef } from 'react';
import Vditor from 'vditor';
import format from 'date-fns/format';
import { ICommentInFrontend } from '../../../types/IComment';
import { useStateValue } from '../state';
import { initComment } from '../state/reducer';
import AppAvatar from './AppAvatar';

const Comment: FC<{ comment: ICommentInFrontend }> = ({ comment }) => {
  const targetDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const targetElement = targetDivRef.current;
    if (targetElement instanceof HTMLDivElement) {
      Vditor.preview(targetElement, comment.content);
    }
  }, [comment]);
  return (
    <Card variant="outlined" sx={{ padding: 1 }}>
      {comment.quoting && <Comment comment={comment.quoting} />}
      <CardHeader
        sx={{ margin: -1, marginTop: 0 }}
        title={comment.author.username}
        subheader={
          <>
            #{comment.floor}
            <br />
            {format(Number(comment.replyTime) * 1000, 'yyyy-MM-dd HH:mm:ss')}
          </>
        }
        avatar={<AppAvatar user={comment.author} />}
      />
      <CardContent sx={{ margin: -1, marginTop: 0 }}>
        <Typography component="div" ref={targetDivRef} />
      </CardContent>
    </Card>
  );
};

const Comments: FC = () => {
  const [{ comments, apiWrapper }, dispatch] = useStateValue();
  useEffect(() => {
    apiWrapper.getComments(window.location.pathname).then((comms) => dispatch(initComment(comms)));
  }, [dispatch, apiWrapper]);
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
