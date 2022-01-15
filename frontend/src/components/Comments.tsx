import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import { FC, useEffect } from 'react';
import Vditor from 'vditor';

const Comment: FC<{ comment: string; floor: string }> = ({ comment, floor }) => {
  useEffect(() => {
    const targetElement = document.querySelector(`div#comment-${floor}`);
    if (targetElement instanceof HTMLDivElement) {
      Vditor.preview(targetElement, comment);
    }
  }, [comment, floor]);
  return (
    <Card>
      <CardContent>
        <div id={`comment-${floor}`} />
      </CardContent>
    </Card>
  );
};

const Comments: FC<{ comments: string[] }> = ({ comments }: { comments: string[] }) => {
  if (comments.length === 0) return <Typography>还没有回复</Typography>;
  return (
    <Stack spacing={1}>
      {comments.map((comment, idx) => (
        <Comment comment={comment} key={idx.toString()} floor={idx.toString()} />
      ))}
    </Stack>
  );
};

export default Comments;
