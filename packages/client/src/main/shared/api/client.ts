import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  ApolloLink,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { IConnectionParams } from 'api';

import { appConfig } from '../config';

import { accessTokenProvider } from './accessTokenProvider';
import { createErrorLink } from './errorLink';

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
