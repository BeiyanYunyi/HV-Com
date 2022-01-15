import { createContext, Dispatch, FC, Reducer, useContext, useReducer } from 'react';
import IAction from './IAction';
import IState from './IState';

const initialState: IState = { comments: [] };

export const StateContext = createContext<[IState, Dispatch<IAction>]>([
  initialState,
  () => initialState,
]);

export const StateProvider: FC<{ reducer: Reducer<IState, IAction> }> = ({ reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>;
};

export const useStateValue = () => useContext(StateContext);
