import { IAuthManager } from "../auth";
import { IConfig } from "../config";
import { CanonicalError } from "./canonicalError";
import { makeGqlRequest } from "./makeGqlRequest";
import {
  createInternalError,
  findUnauthenticatedError,
  normalizeGqlError,
} from "./errors";

export interface IRequestResponse<Data> {
  data: Data | null;
  errors: ReadonlyArray<CanonicalError>;
}

export interface IRequestManager {
  gqlRequest<Data, Variables>(
    query: string,
    variables?: Variables,
    signal?: AbortSignal
  ): Promise<IRequestResponse<Data>>;
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
      signal?: AbortSignal
    ): Promise<IRequestResponse<Data>> {
      return makeGqlRequest<Data, Variables>(
        config.apiGqlUri,
        query,
        variables,
        { accessToken: authManager.accessToken, signal }
      )
        .then((res) => {
          const normalizedErrors = res.errors?.map(normalizeGqlError) || [];

          const unauthenticatedError =
            findUnauthenticatedError(normalizedErrors);

          if (!unauthenticatedError) {
            return {
              data: res.data,
              errors: normalizedErrors,
            };
          }

          return options?.authManager?.refreshAccessToken().then((success) => {
            if (success) {
              return requestManager.gqlRequest<Data, Variables>(
                query,
                variables
              );
            }

            return {
              data: res.data,
              errors: normalizedErrors,
            };
          });
        })
        .catch((err) => ({
          data: null,
          errors: [createInternalError(err.message)],
        }));
    },
  };

  return requestManager;
}
