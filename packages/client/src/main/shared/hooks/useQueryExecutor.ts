import {
  DocumentNode,
  QueryHookOptions,
  useQuery,
  ObservableQuery,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import noop from 'lodash/noop';

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
    'onError' | 'fetchPolicy' | 'variables'
  > {
  /**
   * Invokes after successfully query.
   */
  onCompleted?: (
    data: Response,
    options: { client: ApolloClient<NormalizedCacheObject> },
  ) => void;

  /**
   * If the query has a subscription. You can turn it off by this flag.
   *
   * @default true
   */
  shouldSubscribe?: boolean;
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

  const shouldSubscribe = options?.shouldSubscribe ?? true;

  return {
    execute: (vars) => {
      void refetch(vars);
    },
    error,
    client,
    response: data,
    loading,
    subscribeToMore: shouldSubscribe ? subscribeToMore : () => noop,
  };
}
