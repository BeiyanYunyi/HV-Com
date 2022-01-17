import Container from '@mui/material/Container';
import { useRef } from 'react';
import 'vditor/dist/index.css';
import Comments from './components/Comments';
import Editor, { EditorRef } from './components/Editor';
import { StateProvider } from './state';
import reducer from './state/reducer';

const Main = () => {
  const editorRef = useRef<EditorRef>(null);
  return (
    <Container>
      <Comments />
      <Editor ref={editorRef} />
    </Container>
  );
};

const App = () => (
  <StateProvider reducer={reducer}>
    <Main />
  </StateProvider>
);
export default App;
