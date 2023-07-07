import React, { FC } from 'react';
import { ApolloProvider } from '@apollo/client';

import { Router } from 'page';
import { apiClient, GlobalStyles } from 'shared';

/**
 * App root.
 */
export const App: FC = () => (
  <ApolloProvider client={apiClient}>
    <GlobalStyles />

    <Router />
  </ApolloProvider>
);
