import React, { FC } from 'react';
import { ThemeProvider } from '@mui/material';

import {
  AuthManagerContext,
  config,
  ConfigContext,
  createAuthManager,
  createLocalStorageAdapter,
  createRequestManager,
  createValueAccessor,
  createWsManager,
  GlobalStyles,
  LocalStorageKey,
  RequestManagerContext,
  theme,
  WsManagerContext,
} from '../shared';
import { Router } from '../pages';

/**
 * App root.
 */
export const App: FC = () => {
  const authManager = createAuthManager({
    apiGqlUri: config.apiGqlUri,
    accessTokenAccessor: createValueAccessor(createLocalStorageAdapter(), LocalStorageKey.ACCESS_TOKEN),
  });
  const requestManager = createRequestManager({
    authManager,
    config,
  });
  const wsManager = createWsManager({
    url: config.apiWsGqlUri,
    accessToken: authManager.accessToken,
  });

  return (
    <ThemeProvider theme={theme}>
      <ConfigContext.Provider value={config}>
        <AuthManagerContext.Provider value={authManager}>
          <RequestManagerContext.Provider value={requestManager}>
            <WsManagerContext.Provider value={wsManager}>
              <GlobalStyles />

              <Router />
            </WsManagerContext.Provider>
          </RequestManagerContext.Provider>
        </AuthManagerContext.Provider>
      </ConfigContext.Provider>
    </ThemeProvider>
  );
};
