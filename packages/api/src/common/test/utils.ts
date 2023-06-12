import axios, { AxiosError, AxiosResponse } from 'axios';

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

/**
 * Request function factory.
 */
export function requestCreator(
  url: string,
): <Data, Variables = unknown>(
  query: string,
  variables: Variables,
  accessToken?: string,
) => Promise<AxiosResponse<{ data: Data }>> {
  return async (query, variables, accessToken) => {
    try {
      return await axios.post(
        `${url}/graphql`,
        {
          query,
          variables,
        },
        {
          headers: accessToken
            ? {
                Authorization: `Bearer ${accessToken}`,
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
