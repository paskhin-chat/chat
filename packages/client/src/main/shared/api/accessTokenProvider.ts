import { localStorageAdapter } from '../lib';

/**
 * Provider for handling access token.
 */
export const accessTokenProvider = {
  get(): string | undefined {
    return localStorageAdapter.get('at');
  },
  set(token: string): void {
    localStorageAdapter.set('at', token);
  },
  delete(): void {
    localStorageAdapter.delete('at');
  },
};
