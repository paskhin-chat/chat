import { parse, stringify } from 'flatted';

import { TTruthy } from '../types';

/**
 * Adapter for using localstorage.
 */
export const localStorageAdapter = {
  get<Value = unknown, Key extends string = string>(
    key: Key,
  ): Value | undefined {
    const storedValue = window.localStorage.getItem(key);

    if (storedValue != null) {
      try {
        return parse(storedValue) as Value;
      } catch {
        return undefined;
      }
    }

    return undefined;
  },

  set<Value extends TTruthy, Key extends string = string>(
    key: Key,
    value: Value,
  ): void {
    const str = stringify(value);

    window.localStorage.setItem(key, str);
  },

  delete(key: string): void {
    window.localStorage.removeItem(key);
  },
};
