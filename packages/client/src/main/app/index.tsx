import React, { FC } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material';

import { Router } from 'page';
import { apiClient, GlobalStyles, theme } from 'shared';

/**
 * App root.
 */
export const App: FC = () => (
  <ApolloProvider client={apiClient}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Router />
    </ThemeProvider>
  </ApolloProvider>
);
