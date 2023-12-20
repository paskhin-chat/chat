import type { GraphQLError } from 'graphql';

import { CanonicalError, CanonicalErrorCode } from './canonicalError';

export function normalizeGqlError(error: GraphQLError): CanonicalError {
  const errorCode = error.extensions.code || CanonicalErrorCode.INTERNAL_SERVER_ERROR;

  return new CanonicalError(error.message, errorCode as string);
}

export function createInternalError(message = 'Something went wrong'): CanonicalError {
  return new CanonicalError(message, CanonicalErrorCode.INTERNAL_ERROR);
}

export function findUnauthenticatedError(errors: readonly CanonicalError[]): CanonicalError | undefined {
  return errors.find(error => error.code === CanonicalErrorCode.UNAUTHENTICATED);
}
