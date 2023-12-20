import React from 'react';

import { useRerender } from '../hooks';

import { IAuthManager } from './createAuthManager';

export const AuthManagerContext = React.createContext<IAuthManager | null>(null);

export function useAuthManager(): IAuthManager {
  const rerender = useRerender();
  const authManager = React.useContext(AuthManagerContext);

  if (!authManager) {
    throw new Error('Auth manager must be provided through AuthManagerContext');
  }

  React.useEffect(() => authManager.subscribe(rerender), [authManager, rerender]);

  return authManager;
}
