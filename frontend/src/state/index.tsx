import { createContext, Dispatch, FC, Reducer, useContext, useReducer } from 'react';
import ApiWrapper from '../services/apiWrapper';
import IAction from './IAction';
import IState from './IState';

const initialState: Omit<IState, 'apiWrapper'> = { comments: [], backendURL: '/' };

export const StateContext = createContext<[IState, Dispatch<IAction>]>([
  { ...initialState, apiWrapper: new ApiWrapper(initialState.backendURL) },
  () => initialState,
]);

export const StateProvider: FC<{
  reducer: Reducer<IState, IAction>;
  initialStateOverride?: Partial<IState>;
}> = ({ reducer, initialStateOverride, children }) => {
  const initState = { ...initialState, ...initialStateOverride };
  const [state, dispatch] = useReducer(reducer, {
    ...initState,
    apiWrapper: new ApiWrapper(initState.backendURL),
  });
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>;
};

export const useStateValue = () => useContext(StateContext);
