import { EventBus } from '../lib';

import { IStorageAdapter, IValueAccessor } from './types';

export function createValueAccessor<Value, Key extends string = string>(
  storageAdapter: IStorageAdapter<Value, Key>,
  key: Key,
): IValueAccessor<Value> {
  const eventBus = new EventBus();

  return {
    get() {
      return storageAdapter.get(key);
    },
    set(value) {
      storageAdapter.set(key, value);
      eventBus.emit();
    },
    delete() {
      storageAdapter.delete(key);
      eventBus.emit();
    },
    subscribe(listener) {
      eventBus.on(listener);
    },
  };
}
