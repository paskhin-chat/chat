import { gql, useMutation, useQuery } from '@apollo/client';
import { LoginInput, RegisterInput, UserDto } from 'api/src/schema/schema';
import { ApolloError } from '@apollo/client/errors';

import { accessTokenProvider, apiClient } from '../../../shared';

/**
 * Viewer.
 */
export interface IViewer {
  /**
   * Viewer id.
   */
  id: string;
  /**
   * Viewer login.
   */
  login: string;
  /**
   * Viewer firstName.
   */
  firstName: string;
  /**
   * Viewer lastName.
   */
  lastName: string;
  /**
   * Viewer secondName.
   */
  secondName?: string;
}

/**
 * Hook for storing and getting viewer.
 */
export function useViewer(): {
  viewer: IViewer | undefined;
  loading: boolean;
} {
  const { data, loading } = useQuery<{ viewer: UserDto | null }>(
    gql`
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
    `,
  );

  const viewer = data?.viewer
    ? {
        ...data.viewer,
        secondName: data.viewer.secondName || undefined,
      }
    : undefined;

  return {
    viewer,
    loading,
  };
}

/**
 * Hook for sign user up.
 */
export function useSignUp(): [
  signUp: (input: RegisterInput) => void,
  result: { loading: boolean; error: ApolloError | undefined },
] {
  const [signUpMutation, { loading, error, client }] = useMutation<
    { register: string },
    { input: RegisterInput }
  >(
    gql`
      mutation SignUp($input: RegisterInput!) {
        register(input: $input)
      }
    `,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        accessTokenProvider.set(data.register);
        void client.resetStore();
      },
    },
  );

  return [
    (input) => signUpMutation({ variables: { input } }),
    { error, loading },
  ];
}

/**
 * Hook for log in user.
 */
export function useLogin(): [
  login: (input: LoginInput) => void,
  result: { loading: boolean; error: ApolloError | undefined },
] {
  const [loginMutation, { loading, error, client }] = useMutation<
    { login: string },
    { input: LoginInput }
  >(
    gql`
      mutation Login($input: LoginInput!) {
        login(input: $input)
      }
    `,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        accessTokenProvider.set(data.login);
        void client.resetStore();
      },
    },
  );

  return [
    (input) => loginMutation({ variables: { input } }),
    { loading, error },
  ];
}

/**
 * Logs out the viewer.
 */
export async function logout(): Promise<void> {
  accessTokenProvider.delete();
  await apiClient.resetStore();
}
