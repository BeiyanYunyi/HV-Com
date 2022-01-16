import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Stack from '@material-ui/core/Stack';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import timeUtils from '../../../backend/src/utils/timeUtils';
import { IUserInFrontend } from '../../../types/IUser';
import { useStateValue } from '../state';
import { addComment } from '../state/reducer';
import TextField from './TextField';

export interface EditorRef {
  vd: Vditor;
}

const Editor = forwardRef((props, ref) => {
  const [, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [vd, setVd] = useState<Vditor>();
  const [{ username, mail, website }, setInfo] = useState({ username: '', mail: '', website: '' });
  useImperativeHandle(ref, () => ({ vd, open }));
  const handleClick = async () => {
    const vditor = new Vditor('comment-editor', {
      icon: 'material',
      minHeight: window.innerHeight / 2,
      mode: 'wysiwyg',
    });
    setVd(vditor);
    setOpen(true);
  };
  return (
    <>
      {!open && (
        <Button sx={{ minHeight: window.innerHeight / 4 }} fullWidth onClick={handleClick}>
          点我开始回复
        </Button>
      )}
      <div id="comment-editor" />
      {open && vd && (
        <>
          <Grid container spacing={1} sx={{ paddingTop: 1, marginBottom: 1 }}>
            <Grid item xs={12} lg={4}>
              <TextField
                label="昵称"
                value={username}
                autoComplete="username"
                onChange={(e) => setInfo((info) => ({ ...info, username: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                label="邮箱"
                value={mail}
                onChange={(e) => setInfo((info) => ({ ...info, mail: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                label="网址"
                value={website}
                onChange={(e) => setInfo((info) => ({ ...info, website: e.target.value }))}
              />
            </Grid>
          </Grid>
          <Stack direction="row" spacing={1} justifyContent="space-evenly">
            <Button variant="outlined" color="error">
              清空
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                const author: IUserInFrontend = {
                  id: uuidv4(),
                  username,
                  mail,
                  website,
                  avatar: null,
                };
                dispatch(
                  addComment({
                    ID: uuidv4(),
                    replyTime: timeUtils.getUnixStamp(),
                    quoting: null,
                    floor: 0,
                    content: vd.getValue(),
                    author,
                  }),
                );
                vd.setValue('');
                vd.clearCache();
              }}
            >
              提交
            </Button>
          </Stack>
        </>
      )}
    </>
  );
});

export default Editor;
