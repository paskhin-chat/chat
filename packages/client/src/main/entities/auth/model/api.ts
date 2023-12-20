import {
  gql,
  IGqlExecutor,
  IGqlExecutorOptions,
  useAuthManager,
  useGqlExecutor,
} from "../../../shared";
import {
  MutationLoginArgs,
  MutationRegisterArgs,
  Mutation,
} from "../../../gen/api-types";

export function useLoginExecutor(
  options?: IGqlExecutorOptions<Pick<Mutation, "login">, MutationLoginArgs>
): IGqlExecutor<Pick<Mutation, "login">, MutationLoginArgs> {
  const authManager = useAuthManager();

  return useGqlExecutor(loginMutation, {
    ...options,
    onSuccess: (data) => {
      options?.onSuccess?.(data);

      if (data?.login) {
        authManager.login(data.login);
      }
    },
  });
}

export function useRegisterExecutor(
  options?: IGqlExecutorOptions<
    Pick<Mutation, "register">,
    MutationRegisterArgs
  >
): IGqlExecutor<Pick<Mutation, "register">, MutationRegisterArgs> {
  const authManager = useAuthManager();

  return useGqlExecutor(registerMutation, {
    ...options,
    onSuccess: (data) => {
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
