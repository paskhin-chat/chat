import {
  gql,
  IGqlExecutor,
  IGqlExecutorOptions,
  useGqlExecutor,
} from "../../../shared";
import { Query } from "../../../gen/api-types";

export function useViewerExecutor(
  options?: IGqlExecutorOptions<Pick<Query, "viewer">>
): IGqlExecutor<Pick<Query, "viewer">> {
  return useGqlExecutor(viewerQuery, options);
}

const viewerQuery = gql`
  query Viewer {
    viewer {
      id
      login
      firstName
      lastName
      secondName
      dob
    }
  }
`;
