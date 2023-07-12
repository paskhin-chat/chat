import { gql } from '@apollo/client';
import { LoginInput, RegisterInput, UserDto } from 'api';

import {
  accessTokenProvider,
  apiClient,
  IExecutor,
  IMutationExecutor,
  TMutationOptions,
  useMutationExecutor,
  useQueryExecutor,
} from 'shared';

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
export function useViewerExecutor(): IExecutor<IViewer> {
  const executor = useQueryExecutor<{ viewer: UserDto | null }>(
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

  return {
    ...executor,
    response:
      executor.response?.viewer && viewerMapper(executor.response.viewer),
  };
}

/**
 * Hook for sign a user up.
 */
export function useSignUpExecutor(
  options?: TMutationOptions<string, RegisterInput>,
): IMutationExecutor<string, RegisterInput> {
  return useMutationExecutor(
    gql`
      mutation SignUp($input: RegisterInput!) {
        register(input: $input)
      }
    `,
    {
      ...options,
      onCompleted: (data, clientOptions) => {
        options?.onCompleted?.(data, clientOptions);

        accessTokenProvider.set(data);
        void clientOptions?.client?.resetStore();
      },
    },
  );
}

/**
 * Hook for log a user in.
 */
export function useLoginExecutor(
  options?: TMutationOptions<string, LoginInput>,
): IMutationExecutor<string, LoginInput> {
  return useMutationExecutor(
    gql`
      mutation Login($input: LoginInput!) {
        login(input: $input)
      }
    `,
    {
      ...options,
      onCompleted: (data, clientOptions) => {
        options?.onCompleted?.(data, clientOptions);

        accessTokenProvider.set(data);
        void clientOptions?.client?.resetStore();
      },
    },
  );
}

/**
 * Logs the viewer out.
 */
export async function logout(): Promise<void> {
  accessTokenProvider.delete();
  await apiClient.resetStore();
}

function viewerMapper(dto: UserDto): IViewer {
  return {
    ...dto,
    secondName: dto.secondName || undefined,
  };
}
