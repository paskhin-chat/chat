import { parse, stringify } from "flatted";
import { IStorageAdapter } from "./types";

export enum LocalStorageKey {
  ACCESS_TOKEN = "at",
}

/**
 * Adapter for using localstorage.
 */
export function createLocalStorageAdapter<
  Value,
  Key extends string = string
>(): IStorageAdapter<Value, Key> {
  return {
    get(key) {
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

    set(key, value) {
      const str = stringify(value);

      window.localStorage.setItem(key, str);
    },

    delete(key) {
      window.localStorage.removeItem(key);
    },
  };
}
