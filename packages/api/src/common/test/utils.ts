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
): <Data>(
  query: string,
  variables: unknown,
) => Promise<AxiosResponse<{ data: Data }>> {
  return async <Data>(query: string, variables: unknown) => {
    try {
      return await axios.post(`${url}/graphql`, {
        query,
        variables,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log((error as AxiosError<{ data: Data }>).response?.data);
      throw error;
    }
  };
}
