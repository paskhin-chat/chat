import { useEffect, useRef } from 'react';

import { useRerender } from '../hooks';
import { Executor } from '../lib';

// TODO: inline it to useGqlExecutor
export function useExecutor(): Executor {
  const executorRef = useRef(new Executor());

  const rerender = useRerender();

  useEffect(() => {
    executorRef.current.subscribe(() => {
      rerender();
    });
  }, [rerender]);

  return executorRef.current;
}
