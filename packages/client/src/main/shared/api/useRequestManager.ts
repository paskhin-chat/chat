import { useContext } from 'react';

import { RequestManagerContext } from './RequestManagerContext';
import { IRequestManager } from './createRequestManager';

export function useRequestManager(): IRequestManager {
  const requestManager = useContext(RequestManagerContext);

  if (!requestManager) {
    throw new Error('useRequestManager must be used within a RequestManagerContext.Provider');
  }

  return requestManager;
}
