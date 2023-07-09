import { parse, stringify } from 'flatted';
import Cookies from 'js-cookie';

import { TTruthy } from '../types';

/**
 * Adapter for using cookies storage.
 */
export const cookiesStorageAdapter = {
  get<Value = unknown, Key extends string = string>(
    key: Key,
  ): Value | undefined {
    const storedValue = Cookies.get(key);

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

    Cookies.set(key, str);
  },

  delete(key: string): void {
    Cookies.remove(key);
  },
};
