import {
  ApolloClient,
  ApolloLink,
  fromPromise,
  gql,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { IConnectionParams } from 'api';
import { onError } from '@apollo/client/link/error';
import { GraphQLError } from 'graphql';

import { appConfig } from '../config';

import { accessTokenProvider } from './accessTokenProvider';

function clientInitiator(): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri: appConfig.apiUri,
    credentials: 'include',
  });

  const wsLink = new GraphQLWsLink(
    createClient<IConnectionParams>({
      url: appConfig.apiWsUri,
      connectionParams: () => ({
        authorization: accessTokenProvider.get() || '',
      }),
    }),
  );

  const authLink = new ApolloLink((operation, forward) => {
    const accessToken = accessTokenProvider.get();

    operation.setContext({
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    });

    return forward(operation);
  });

  return new ApolloClient({
    link: split(
      ({ query }) => {
        const definition = getMainDefinition(query);

        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      ApolloLink.from([createErrorLink(), authLink, httpLink]),
    ),
    cache: new InMemoryCache(),
  });
}

/**
 * Apollo graphql client.
 */
export const client = clientInitiator();

const REFRESH_TOKEN_QUERY = gql`
  mutation RefreshToken {
    refreshAccessToken
  }
`;

function createErrorLink(): ApolloLink {
  return onError(({ forward, operation, graphQLErrors }) => {
    if (graphQLErrors) {
      for (const graphQLError of graphQLErrors) {
        if (
          graphQLError.extensions.code === 'UNAUTHENTICATED' &&
          operation.query !== REFRESH_TOKEN_QUERY
        ) {
          return fromPromise(refreshAccessToken()).flatMap(() =>
            forward(operation),
          );
        }
      }
    }

    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined;
  });
}

async function refreshAccessToken(): Promise<string> {
  const res = await client.mutate<{ refreshAccessToken: string | null }>({
    mutation: REFRESH_TOKEN_QUERY,
  });

  const newAccessToken = res.data?.refreshAccessToken;

  if (!newAccessToken) {
    throw new GraphQLError('Empty AccessToken');
  }

  accessTokenProvider.set(newAccessToken);

  return newAccessToken;
}
