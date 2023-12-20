import { parse, stringify } from 'flatted';
import Cookies from 'js-cookie';

import { IStorageAdapter } from './types';

/**
 * Adapter for using cookies storage.
 */
export function createCookiesStorageAdapter<Value, Key extends string = string>(): IStorageAdapter<Value, Key> {
  return {
    get(key) {
      const storedValue = Cookies.get(key);

      if (storedValue != null) {
        try {
          return parse(storedValue) as Value;
        } catch {
          return null;
        }
      }

      return null;
    },

    set(key, value) {
      const str = stringify(value);

      Cookies.set(key, str);
    },

    delete(key) {
      Cookies.remove(key);
    },
  };
}
