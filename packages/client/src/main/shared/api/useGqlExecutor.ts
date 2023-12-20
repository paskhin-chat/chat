import { useRequestManager } from "./useRequestManager";
import { useCallback, useMemo, useRef } from "react";
import { IRequestResponse } from "./createRequestManager";
import { Executor } from "../lib";
import { useExecutor } from "./useExecutor";

export interface IGqlExecutorOptions<
  Data,
  Variables = void,
  PreExecuteResult = void
> {
  onPreExecute?: (variables: Variables | undefined) => PreExecuteResult;
  onSuccess?: (
    data: IRequestResponse<Data>["data"],
    optimisticData?: PreExecuteResult
  ) => void;
  onError?: (errors: IRequestResponse<Data>["errors"]) => void;
  onSettle?: () => void;
}

// TODO: enhance types
export interface IGqlExecutor<Data, Variables = void>
  extends Pick<Executor, "fulfilled" | "pending" | "settled" | "rejected"> {
  execute: (variables?: Variables) => void;
}

export function useGqlExecutor<Data, Variables = void, PreExecuteResult = void>(
  mutation: string,
  options?: IGqlExecutorOptions<Data, Variables, PreExecuteResult>
): IGqlExecutor<Data, Variables> {
  const requestManager = useRequestManager();
  const executor = useExecutor();

  // TODO: make one ref
  const onPreExecuteRef =
    useRef<
      IGqlExecutorOptions<Data, Variables, PreExecuteResult>["onPreExecute"]
    >();
  const onSuccessRef =
    useRef<
      IGqlExecutorOptions<Data, Variables, PreExecuteResult>["onSuccess"]
    >();
  const onErrorRef =
    useRef<IGqlExecutorOptions<Data, Variables, PreExecuteResult>["onError"]>();
  const onSettleRef =
    useRef<
      IGqlExecutorOptions<Data, Variables, PreExecuteResult>["onSettle"]
    >();

  onPreExecuteRef.current = options?.onPreExecute;
  onSuccessRef.current = options?.onSuccess;
  onErrorRef.current = options?.onError;
  onSettleRef.current = options?.onSettle;

  const execute = useCallback(
    (variables?: Variables): Promise<any> => {
      return executor.execute(async (signal) => {
        const preExecuteResult = onPreExecuteRef.current?.(variables);

        const res = await requestManager.gqlRequest<Data, Variables>(
          mutation,
          variables,
          signal
        );

        if (res.errors.length > 0) {
          onErrorRef.current?.(res.errors);

          onSettleRef.current?.();
          return;
        }

        onSuccessRef.current?.(res.data, preExecuteResult || undefined);
        onSettleRef.current?.();
        return;
      });
    },
    [executor]
  );

  return useMemo(
    () => ({
      fulfilled: executor.fulfilled,
      pending: executor.pending,
      settled: executor.settled,
      rejected: executor.rejected,
      execute,
    }),
    [
      executor.fulfilled,
      executor.pending,
      executor.settled,
      executor.rejected,
      execute,
    ]
  );
}
