/**
 * Application config.
 */
export interface IConfig {
  /**
   * Current build mode.
   */
  mode: 'development' | 'production';
  /**
   * Alias for development mode always the opposite of {@see IConfig.prod}.
   */
  dev: boolean;
  /**
   * Alias for production mode.
   */
  prod: boolean;
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
  get mode(): 'development' | 'production' {
    return import.meta.env.MODE === 'production' ? 'production' : 'development';
  },
  get dev(): boolean {
    return import.meta.env.DEV;
  },
  get prod(): boolean {
    return import.meta.env.PROD;
  },
  get apiUri(): string {
    return config.dev
      ? 'http://localhost:3002/graphql'
      : 'https://api.chat.paskhin.me';
  },
  get apiWsUri(): string {
    return config.dev ? 'ws://localhost:3002/graphql' : '';
  },
};
