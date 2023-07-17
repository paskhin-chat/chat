import { localStorageAdapter } from '../lib';

/**
 * Key to reach the access token from localstorage.
 */
export const ACCESS_TOKEN_NAME = 'at';

/**
 * Provider for handling access token.
 */
export const accessTokenProvider = {
  get(): string | undefined {
    return localStorageAdapter.get(ACCESS_TOKEN_NAME);
  },
  set(token: string): void {
    localStorageAdapter.set(ACCESS_TOKEN_NAME, token);
  },
  delete(): void {
    localStorageAdapter.delete(ACCESS_TOKEN_NAME);
  },
};
