import axios, { AxiosError, AxiosResponse } from 'axios';
import { urls } from 'constant';

import { CookiesName } from '../context';

/**
 * Gql tag.
 */
export function gql(arr: TemplateStringsArray): string {
  let query = arr[0] || '';

  for (let i = 1; i < arguments.length; i += 1) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands,prefer-rest-params
    query += arguments[i] + arr[i];
  }

  return query;
}

interface ISession {
  at: string;
  rt: string;
}

/**
 * Request function factory.
 */
export function requestCreator(
  url = urls.test.api,
): <Data, Variables = unknown>(
  query: string,
  variables?: Variables,
  session?: ISession,
) => Promise<AxiosResponse<{ data: Data }>> {
  return async (query, variables, session) => {
    try {
      return await axios.post(
        url,
        {
          query,
          variables,
        },
        {
          withCredentials: true,
          headers: session
            ? {
                Cookie: `${CookiesName.REFRESH_TOKEN}=${session.rt}`,
                Authorization: `Bearer ${session.at}`,
              }
            : undefined,
        },
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log((error as AxiosError).response?.data);
      throw error;
    }
  };
}
