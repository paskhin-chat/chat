import { useReducer } from "react";

export function useRerender(): () => void {
  const [, rerender] = useReducer((prevState) => prevState + 1, 0);

  return rerender;
}
