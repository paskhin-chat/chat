export const enum CanonicalErrorCode {
  GRAPHQL_PARSE_FAILED = "GRAPHQL_PARSE_FAILED",
  GRAPHQL_VALIDATION_FAILED = "GRAPHQL_VALIDATION_FAILED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
  FORBIDDEN = "FORBIDDEN",
  PERSISTED_QUERY_NOT_FOUND = "PERSISTED_QUERY_NOT_FOUND",
  PERSISTED_QUERY_NOT_SUPPORTED = "PERSISTED_QUERY_NOT_SUPPORTED",
  BAD_USER_INPUT = "BAD_USER_INPUT",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

export class CanonicalError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
  }
}
