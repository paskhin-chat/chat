import { gql, IGqlExecutor, IGqlExecutorOptions, useGqlExecutor, Query } from '../../../shared';

export function useUsersExecutor(options?: IGqlExecutorOptions<Pick<Query, 'users'>>): IGqlExecutor {
  return useGqlExecutor(usersQuery, options);
}

const usersQuery = gql`
  query Users {
    users {
      id
      login
      firstName
      lastName
      secondName
      dob
    }
  }
`;
