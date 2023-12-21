import { Client, createClient } from 'graphql-ws';

export interface IWsManagerOptions {
  url: string;
  accessToken: string | null;
}

export function createWsManager(options: IWsManagerOptions): Client {
  return createClient({
    url: options.url,
    connectionParams: {
      authorization: options.accessToken,
    },
    shouldRetry: () => options.accessToken !== null,
  });
}
