interface IEnvironmental<T> {
  prod: T;
  dev: T;
  test: T;
}

/**
 * Available protocols.
 */
export enum Protocol {
  HTTPS = "https",
  HTTP = "http",
  WS = "ws",
  WSS = "wss",
}

interface IPorts {
  api: number;
  client: number;
  ui: number;
}

interface IDomains {
  api: string;
  client: string;
  ui: string;
}

interface IUrls {
  apiGql: string;
  api: string;
  wsGql: string;
  client: string;
  ui: string;
}

/**
 * Services domains.
 */
export const domains: IEnvironmental<IDomains> = {
  prod: {
    api: "api.chat.paskhin.me",
    client: "chat.paskhin.me",
    ui: "ui.chat.paskhin.me",
  },
  dev: {
    api: "localhost",
    client: "localhost",
    ui: "localhost",
  },
  test: {
    api: "localhost",
    client: "localhost",
    ui: "localhost",
  },
};

/**
 * Services ports.
 */
export const ports: IEnvironmental<IPorts> = {
  prod: {
    api: 443,
    client: 443,
    ui: 443,
  },
  dev: {
    api: 3_002,
    client: 6_005,
    ui: 6_006,
  },
  test: {
    api: 4_000,
    client: 4_001,
    ui: 4_002,
  },
};

/**
 * Services URLs.
 */
export const urls: IEnvironmental<IUrls> = {
  prod: {
    apiGql: `${Protocol.HTTPS}://${domains.prod.api}:${ports.prod.api}/graphql`,
    api: `${Protocol.HTTPS}://${domains.prod.api}:${ports.prod.api}`,
    wsGql: `${Protocol.WSS}://${domains.prod.api}:${ports.prod.api}/graphql`,
    client: `${Protocol.HTTPS}://${domains.prod.client}:${ports.prod.client}`,
    ui: `${Protocol.HTTPS}://${domains.prod.ui}:${ports.prod.ui}`,
  },
  dev: {
    apiGql: `${Protocol.HTTP}://${domains.dev.api}:${ports.dev.api}/graphql`,
    api: `${Protocol.HTTP}://${domains.dev.api}:${ports.dev.api}`,
    wsGql: `${Protocol.WS}://${domains.dev.api}:${ports.dev.api}/graphql`,
    client: `${Protocol.HTTP}://${domains.dev.client}:${ports.dev.client}`,
    ui: `${Protocol.HTTP}://${domains.dev.ui}:${ports.dev.ui}`,
  },
  test: {
    apiGql: `${Protocol.HTTP}://${domains.test.api}:${ports.test.api}/graphql`,
    api: `${Protocol.HTTP}://${domains.test.api}:${ports.test.api}`,
    wsGql: `${Protocol.WS}://${domains.test.api}:${ports.test.api}/graphql`,
    client: `${Protocol.HTTP}://${domains.test.client}:${ports.test.client}`,
    ui: `${Protocol.HTTP}://${domains.test.ui}:${ports.test.ui}`,
  },
};
