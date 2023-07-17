/**
 * Application config.
 */
export interface IConfig {
  /**
   * Current build mode.
   */
  mode: 'development' | 'production' | 'test';
  /**
   * Alias for development mode.
   */
  dev: boolean;
  /**
   * Alias for production mode.
   */
  prod: boolean;
  /**
   * Alias for testing mode.
   */
  test: boolean;
  /**
   * Uri for accessing api.
   */
  apiUri: string;
  /**
   * Uri for accessing api subscriptions.
   */
  apiWsUri: string;
}

/**
 * Application config.
 */
export const config: IConfig = {
  get mode() {
    if (import.meta.env.MODE === 'test') {
      return 'test';
    }

    if (import.meta.env.MODE === 'production') {
      return 'production';
    }

    return 'development';
  },
  get dev() {
    return config.mode === 'development';
  },
  get prod() {
    return config.mode === 'production';
  },
  get test() {
    return config.mode === 'test';
  },
  get apiUri() {
    return config.prod
      ? 'https://api.chat.paskhin.me/graphql'
      : 'http://localhost:3002/graphql';
  },
  get apiWsUri() {
    return config.prod
      ? 'wss://api.chat.paskhin.me/graphql'
      : 'ws://localhost:3002/graphql';
  },
};
