import { IAuthManager } from '../auth';
import { IConfig } from '../config';

import { CanonicalError } from './canonicalError';
import { makeGqlRequest } from './makeGqlRequest';
import { createInternalError, findUnauthenticatedError, normalizeGqlError } from './errors';

export interface IRequestResponse<Data> {
  data: Data | null;
  errors: readonly CanonicalError[];
}

export interface IRequestManager {
  gqlRequest: <Data, Variables>(
    query: string,
    variables?: Variables,
    signal?: AbortSignal,
  ) => Promise<IRequestResponse<Data>>;
}

export interface IOptions {
  config: IConfig;
  authManager: IAuthManager;
}

export function createRequestManager(options: IOptions): IRequestManager {
  const { config, authManager } = options;

  const requestManager = {
    async gqlRequest<Data, Variables>(
      query: string,
      variables?: Variables,
      signal?: AbortSignal,
    ): Promise<IRequestResponse<Data>> {
      return (
        makeGqlRequest<Data, Variables>(config.apiGqlUri, query, variables, {
          accessToken: authManager.accessToken,
          signal,
        })
          // eslint-disable-next-line promise/prefer-await-to-then
          .then(res => {
            const normalizedErrors = res.errors?.map(normalizeGqlError) || [];

            const unauthenticatedError = findUnauthenticatedError(normalizedErrors);

            if (!unauthenticatedError) {
              return {
                data: res.data,
                errors: normalizedErrors,
              };
            }

            // TODO: maybe it'd be better to turn it off at all
            // eslint-disable-next-line unicorn/consistent-destructuring,promise/prefer-await-to-then
            return options.authManager.refreshAccessToken().then(success => {
              if (success) {
                return requestManager.gqlRequest<Data, Variables>(query, variables);
              }

              return {
                data: res.data,
                errors: normalizedErrors,
              };
            });
          })
          // eslint-disable-next-line promise/prefer-await-to-then
          .catch(error => ({
            data: null,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            errors: [createInternalError(error.message as string)],
          }))
      );
    },
  };

  return requestManager;
}
