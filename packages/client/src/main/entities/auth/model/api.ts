import {
  gql,
  IGqlExecutor,
  IGqlExecutorOptions,
  useAuthManager,
  useGqlExecutor,
  Mutation,
  MutationLoginArgs,
  MutationRegisterArgs,
} from '../../../shared';

export function useLoginExecutor(
  options?: IGqlExecutorOptions<Pick<Mutation, 'login'>, MutationLoginArgs>,
): IGqlExecutor<MutationLoginArgs> {
  const authManager = useAuthManager();

  return useGqlExecutor<Pick<Mutation, 'login'>, MutationLoginArgs>(loginMutation, {
    ...options,
    onSuccess: data => {
      options?.onSuccess?.(data);

      if (data?.login) {
        authManager.login(data.login);
      }
    },
  });
}

export function useRegisterExecutor(
  options?: IGqlExecutorOptions<Pick<Mutation, 'register'>, MutationRegisterArgs>,
): IGqlExecutor<MutationRegisterArgs> {
  const authManager = useAuthManager();

  return useGqlExecutor<Pick<Mutation, 'register'>, MutationRegisterArgs>(registerMutation, {
    ...options,
    onSuccess: data => {
      options?.onSuccess?.(data);

      if (data?.register) {
        authManager.login(data.register);
      }
    },
  });
}

const loginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input)
  }
`;

const registerMutation = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`;
