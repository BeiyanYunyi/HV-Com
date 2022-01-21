import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useStateValue } from '../state';
import { addComment } from '../state/reducer';
import TextField from './TextField';

export interface EditorRef {
  vd: Vditor;
}

const Editor = forwardRef((props, ref) => {
  const [state, dispatch] = useStateValue();
  const { apiWrapper } = state;
  const [open, setOpen] = useState(false);
  const [vd, setVd] = useState<Vditor>();
  const [{ username, mail, website }, setInfo] = useState({ username: '', mail: '', website: '' });
  const editorDivRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({ vd, open }));
  const handleClick = () => {
    if (!editorDivRef.current) return null;
    const vditor = new Vditor(editorDivRef.current, {
      icon: 'material',
      minHeight: window.innerHeight / 2,
      mode: 'wysiwyg',
      cache: { id: 'comment-editor' },
    });
    setVd(vditor);
    return setOpen(true);
  };
  return (
    <>
      {!open && (
        <Button sx={{ minHeight: window.innerHeight / 4 }} fullWidth onClick={handleClick}>
          点我开始回复
        </Button>
      )}
      <div ref={editorDivRef} />
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
              onClick={async () => {
                const res = await apiWrapper.postComment({
                  route: window.location.pathname,
                  content: vd.getValue(),
                  author: { username, mail, website },
                });
                dispatch(addComment(res));
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
