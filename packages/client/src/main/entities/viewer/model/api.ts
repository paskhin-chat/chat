import { gql, IGqlExecutor, IGqlExecutorOptions, useGqlExecutor, Query } from '../../../shared';

export function useViewerExecutor(options?: IGqlExecutorOptions<Pick<Query, 'viewer'>>): IGqlExecutor {
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
