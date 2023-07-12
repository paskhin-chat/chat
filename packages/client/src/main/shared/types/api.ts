import { ApolloClient } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';

import { TTruthy } from 'shared/types/lib';

/**
 * Executor result object.
 */
export interface IExecutor<
  Response extends TTruthy,
  Variables extends TTruthy = TTruthy,
> {
  /**
   * Trigger the execution of query|mutation.
   */
  execute: (variables?: Variables) => void;

  /**
   * Is query|mutation currently in progress.
   */
  loading: boolean;

  /**
   * Response of query|mutation.
   */
  response: Response | undefined | null;

  /**
   * Global Apollo client.
   */
  client: ApolloClient<object>;

  /**
   * Error occurred while the request.
   */
  error: ApolloError | undefined;
}
