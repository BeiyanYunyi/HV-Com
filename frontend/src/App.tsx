import Container from '@material-ui/core/Container';
import { useRef } from 'react';
import 'vditor/dist/index.css';
import Comments from './components/Comments';
import Editor, { EditorRef } from './components/Editor';
import { StateProvider, useStateValue } from './state';
import reducer from './state/reducer';

const Main = () => {
  const [{ comments }] = useStateValue();
  const editorRef = useRef<EditorRef>(null);
  return (
    <Container>
      <Comments comments={comments.map((comment) => comment.content)} />
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
