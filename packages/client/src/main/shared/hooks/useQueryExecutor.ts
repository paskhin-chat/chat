import {
  DocumentNode,
  QueryHookOptions,
  useQuery,
  ObservableQuery,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import { useSemanticMemo } from 'react-hookers';

import { IExecutor, TTruthy } from '../types';
import { apiClient } from '../api';

/**
 * Query descendant of executor.
 */
export interface IQueryExecutor<
  Response extends Record<string, unknown>,
  Variables extends Record<string, TTruthy> = Record<string, TTruthy>,
> extends IExecutor<Response, Variables> {
  /**
   * Method for use GQL subscription for update the query.
   */
  subscribeToMore: ObservableQuery<Response, Variables>['subscribeToMore'];
}

/**
 * Query options.
 */
export interface IQueryOptions<
  Response extends Record<string, unknown>,
  Variables extends Record<string, TTruthy> = Record<string, TTruthy>,
> extends Pick<
    QueryHookOptions<Response, Variables>,
    'onError' | 'fetchPolicy' | 'variables' | 'initialFetchPolicy'
  > {
  /**
   * Invokes after successfully query.
   */
  onCompleted?: (
    data: Response,
    options: { client: ApolloClient<NormalizedCacheObject> },
  ) => void;
}

/**
 * Generalized query executor hook.
 */
export function useQueryExecutor<
  Response extends Record<string, unknown>,
  Variables extends Record<string, TTruthy> = Record<string, TTruthy>,
>(
  query: DocumentNode,
  options?: IQueryOptions<Response, Variables>,
): IQueryExecutor<Response, Variables> {
  const { data, loading, error, client, refetch, subscribeToMore } = useQuery<
    Response,
    Variables
  >(query, {
    ...options,
    onCompleted: (completedData) => {
      options?.onCompleted?.(completedData, { client: apiClient });
    },
  });

  return useSemanticMemo(
    () => ({
      execute: (vars) => {
        void refetch(vars);
      },
      error,
      client,
      response: data,
      loading,
      subscribeToMore,
    }),
    [data, error, loading],
  );
}
