import { useContext } from 'react';
import { Client } from 'graphql-ws';

import { WsManagerContext } from './WsManagerContext';

export function useWsManager(): Client {
  const wsManager = useContext(WsManagerContext);

  if (!wsManager) {
    throw new Error('useWsManager must be used within a WsManagerContext.Provider');
  }

  return wsManager;
}
