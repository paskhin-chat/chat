import { IValueAccessor } from "../storage";
import { gql, makeGqlRequest } from "../api";
import { Mutation } from "../../gen/api-types";
import { EventBus } from "../lib";

export interface IAuthManager {
  readonly loggedIn: boolean;

  readonly accessToken: string | undefined;

  refreshAccessToken: () => Promise<boolean>;

  login: (token: string) => void;

  logout: () => void;

  subscribe: (listener: () => void) => () => void;
}

interface IOptions {
  apiGqlUri: string;
  accessTokenAccessor: IValueAccessor<string>;
}

export function createAuthManager(options: IOptions): IAuthManager {
  const { apiGqlUri, accessTokenAccessor } = options;

  const eventBus = new EventBus();

  accessTokenAccessor.subscribe(() => eventBus.emit());

  const authManager: IAuthManager = {
    get loggedIn() {
      return accessTokenAccessor.get() != null;
    },

    get accessToken() {
      return accessTokenAccessor.get();
    },

    login(token) {
      accessTokenAccessor.set(token);
    },

    logout() {
      accessTokenAccessor.delete();

      void makeGqlRequest(
        apiGqlUri,
        gql`
          mutation Logout {
            logout
          }
        `
      );
    },

    refreshAccessToken() {
      return makeGqlRequest<Pick<Mutation, "refreshAccessToken">>(
        apiGqlUri,
        gql`
          mutation RefreshAccessToken {
            refreshAccessToken
          }
        `
      )
        .then((res) => {
          if (res.data) {
            accessTokenAccessor.set(res.data.refreshAccessToken);

            return true;
          }

          authManager.logout();

          return false;
        })
        .catch(() => {
          authManager.logout();

          return false;
        });
    },

    subscribe(listener) {
      return eventBus.on(listener);
    },
  };

  return authManager;
}
