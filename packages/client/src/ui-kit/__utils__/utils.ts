import { isFunction, random } from 'lodash';

/**
 * 50%/50% false/true.
 */
export function getRandomBool(): boolean {
  return random(1) > 0.5;
}

/**
 * Takes a value and return it or not randomly.
 */
export function getRandomValue<Value, Args extends unknown[] = unknown[]>(
  value: Value | ((...args: Args) => Value),
  ...args: Args
): Value | undefined {
  if (isFunction(value)) {
    return getRandomBool() ? value(...args) : undefined;
  }

  return getRandomBool() ? value : undefined;
}

/**
 * Find random element of array.
 */
export function findRandomIndex(array: unknown[]): number {
  const len = array.length;

  if (len <= 1) {
    return 0;
  }

  return random(0, len - 1);
}

/**
 * Find random element of array.
 */
export function findRandomElement<Element>(array: Element[]): Element | undefined {
  return array[findRandomIndex(array)];
}
