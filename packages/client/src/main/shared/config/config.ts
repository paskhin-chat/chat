import { urls } from 'constant';

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
    if (config.prod) {
      return urls.prod.api;
    }

    if (config.test) {
      return urls.test.api;
    }

    return urls.dev.api;
  },
  get apiWsUri() {
    if (config.prod) {
      return urls.prod.ws;
    }

    if (config.test) {
      return urls.test.ws;
    }

    return urls.dev.ws;
  },
};
