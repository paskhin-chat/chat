import { IValueAccessor } from '../storage';
import { gql } from '../api/gql';
import { makeGqlRequest } from '../api/makeGqlRequest';
import { Mutation } from '../../gen/api-types';
import { EventBus } from '../lib';

export interface IAuthManager {
  readonly loggedIn: boolean;

  readonly accessToken: string | null;

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
      return accessTokenAccessor.get() !== null;
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
        `,
      );
    },

    async refreshAccessToken() {
      try {
        const res = await makeGqlRequest<Pick<Mutation, 'refreshAccessToken'>>(
          apiGqlUri,
          gql`
            mutation RefreshAccessToken {
              refreshAccessToken
            }
          `,
        );

        if (res.data) {
          accessTokenAccessor.set(res.data.refreshAccessToken);

          return true;
        }

        authManager.logout();

        return false;
      } catch {
        authManager.logout();

        return false;
      }
    },

    subscribe(listener) {
      return eventBus.on(listener);
    },
  };

  return authManager;
}
