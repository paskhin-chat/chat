import { parse, stringify } from "flatted";

export interface IStorageAdapter<Value, Key extends string = string> {
  get(key: Key): Value | undefined;

  set(key: Key, value: Value): void;

  delete(key: Key): void;
}

export interface IValueAccessor<Value> {
  get(): Value | undefined;

  set(value: Value): void;

  delete(): void;

  subscribe(listener: () => void): void;
}
