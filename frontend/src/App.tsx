import Container from '@mui/material/Container';
import { FC, StrictMode, useRef } from 'react';
import ReactDOM from 'react-dom';
import 'vditor/dist/index.css';
import IOption from '../../types/IOption';
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

const App: FC<{ options: IOption }> = ({ options }) => (
  <StrictMode>
    <StateProvider reducer={reducer} initialStateOverride={{ backendURL: options.backendURL }}>
      <Main />
    </StateProvider>
  </StrictMode>
);

const HVCom = {
  App,
  render(options: IOption) {
    ReactDOM.render(<App options={options} />, document.querySelector(`div#${options.id}`));
  },
};

export default HVCom;
