/**
 * Allows all types except null and undefined.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type TTruthy = {};

/**
 * Alias for value that can be empty or undefined.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type Maybe<T> = T | undefined | null;

export type Many<T> = T | T[];

/**
 * Alias for any function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/naming-convention
export type AnyFunction = (...args: any) => any;

export type ExcludeNullish<T> = T extends null
  ? never
  : T extends undefined
  ? never
  : T;
