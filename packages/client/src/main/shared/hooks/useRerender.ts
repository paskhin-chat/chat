import { ReducerWithoutAction, useReducer } from 'react';

export function useRerender(): () => void {
  const [, rerender] = useReducer<ReducerWithoutAction<number>>(prevState => prevState + 1, 0);

  return rerender;
}
