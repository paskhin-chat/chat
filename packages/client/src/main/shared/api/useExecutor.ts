import { useRerender } from "../hooks";
import { Executor } from "../lib";
import { useEffect, useRef } from "react";

// TODO: inline it to useGqlExecutor
export function useExecutor(): Executor {
  const executorRef = useRef(new Executor());

  const rerender = useRerender();

  useEffect(() => {
    executorRef.current.subscribe(() => {
      rerender();
    });
  }, []);

  return executorRef.current;
}
