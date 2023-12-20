import { GraphQLError } from "graphql/index";

interface IOptions {
  accessToken?: string;
  signal?: AbortSignal;
}

export interface IGqlResponse<Data> {
  data: Data | null;
  errors?: ReadonlyArray<GraphQLError>;
}

export async function makeGqlRequest<Data, Variables = void>(
  uri: string,
  query: string,
  variables?: Variables,
  options?: IOptions
): Promise<IGqlResponse<Data>> {
  const headers = new Headers();

  headers.set("Content-Type", "application/json");

  if (options?.accessToken) {
    headers.set("Authorization", `Bearer ${options.accessToken}`);
  }

  // TODO: handle errors
  const res = await fetch(uri, {
    headers,
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ query, variables }),
    signal: options?.signal,
  });

  return res.json();
}
