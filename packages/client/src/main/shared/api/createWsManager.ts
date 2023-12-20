import { Client, createClient } from "graphql-ws";

export interface IWsManagerOptions {
  url: string;
  accessTokenAccessor: () => string | undefined;
}

export function createWsManager(options: IWsManagerOptions): Client {
  return createClient({
    url: options.url,
    connectionParams: {
      authorization: options.accessTokenAccessor(),
    },
    shouldRetry: () => {
      return options.accessTokenAccessor() !== undefined;
    },
  });
}
