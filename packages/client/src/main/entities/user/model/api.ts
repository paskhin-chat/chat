import { gql, IGqlExecutor, IGqlExecutorOptions, useGqlExecutor } from '../../../shared';
import { Query } from '../../../gen/api-types';

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
