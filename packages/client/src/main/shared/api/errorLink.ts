import { ApolloError, ApolloLink, fromPromise, gql } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { print, ExecutionResult } from 'graphql';

import { appConfig } from '../config';

import { accessTokenProvider } from './accessTokenProvider';

/**
 * Creates an error Apollo link.
 */
export function createErrorLink(): ApolloLink {
  return onError(({ forward, operation, graphQLErrors }) => {
    if (graphQLErrors) {
      for (const graphQLError of graphQLErrors) {
        // TODO: fix it in {@link https://github.com/dPaskhin/chat/issues/27}
        if (graphQLError.message === 'Unauthorized') {
          return fromPromise(getNewAccessToken()).flatMap((accessToken) => {
            operation.setContext({
              headers: {
                ...(operation.getContext().headers as Record<string, string>),
                authorization: `Bearer ${accessToken}`,
              },
            });

            return forward(operation);
          });
        }
      }
    }

    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined;
  });
}

async function getNewAccessToken(): Promise<string> {
  const res = await fetch(appConfig.apiUri, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: print(gql`
        mutation RefreshToken {
          refreshAccessToken
        }
      `),
      variables: {},
    }),
  });
  const executionResult = (await res.json()) as ExecutionResult<{
    refreshAccessToken: string | null;
  }>;

  if (!executionResult.data?.refreshAccessToken) {
    throw new ApolloError({ graphQLErrors: executionResult.errors });
  }

  accessTokenProvider.set(executionResult.data.refreshAccessToken);

  return executionResult.data.refreshAccessToken;
}
