import Container from '@material-ui/core/Container';
import { useEffect, useRef } from 'react';
import 'vditor/dist/index.css';
import apiWrapper from './api/apiWrapper';
import Comments from './components/Comments';
import Editor, { EditorRef } from './components/Editor';
import { StateProvider, useStateValue } from './state';
import reducer, { initComment } from './state/reducer';

const Main = () => {
  const [{ comments }, dispatch] = useStateValue();
  useEffect(() => {
    apiWrapper.getComment(window.location.pathname).then((comms) => dispatch(initComment(comms)));
  }, [dispatch]);
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
