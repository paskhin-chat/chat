import { DocumentNode, useMutation, MutationHookOptions } from '@apollo/client';
import { useEffect } from 'react';

import { TTruthy, IExecutor } from '../types';
import { findTopLevelField, getTopLevelFieldsCount } from '../lib';
import { apiClient } from '../api';

/**
 * Mutation descendant of executor.
 */
export interface IMutationExecutor<
  Response extends TTruthy,
  Input extends TTruthy = TTruthy,
> extends Omit<IExecutor<Response, IMutationVariables<Input>>, 'execute'> {
  /**
   * Overridden execute.
   */
  execute: (input?: Input) => void;
}

/**
 * Mutation options.
 */
export type TMutationOptions<
  Response extends TTruthy,
  Input extends TTruthy = TTruthy,
> = Pick<
  MutationHookOptions<Response, IMutationVariables<Input>>,
  'onCompleted' | 'onError'
>;

interface IMutationVariables<Input extends TTruthy> {
  input: Input;
}

/**
 * Generalized mutation executor hook.
 */
export function useMutationExecutor<
  Response extends TTruthy,
  Input extends TTruthy = TTruthy,
>(
  mutation: DocumentNode,
  options?: TMutationOptions<Response, Input>,
): IMutationExecutor<Response, Input> {
  const [execute, { loading, client, data, error }] = useMutation<
    Response,
    IMutationVariables<Input>
  >(mutation, {
    ...options,
    onCompleted: (completeData, clientOptions) => {
      options?.onCompleted?.(deriveResponse(completeData)!, {
        ...clientOptions,
        client: apiClient,
      });
    },
  });

  const topLevelFieldsCount = getTopLevelFieldsCount(mutation);

  useEffect(() => {
    if (topLevelFieldsCount !== 1) {
      throw new Error(
        'Use useMutationExecutor only with one mutation top level field',
      );
    }
  }, [topLevelFieldsCount]);

  const deriveResponse = (
    value: Record<string, Response> | null | undefined,
  ): Response | null | undefined => {
    const topLevelField = findTopLevelField(mutation);

    if (!topLevelField) {
      throw new Error(
        'Use useMutationExecutor only with one mutation top level field',
      );
    }

    return value && (value[topLevelField] as Response);
  };

  return {
    execute: (input) => {
      void execute({
        variables: input && { input },
      });
    },
    loading,
    response: deriveResponse(data),
    client,
    error,
  };
}
