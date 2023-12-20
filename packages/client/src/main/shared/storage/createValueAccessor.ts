import { EventBus } from "@smikhalevski/event-bus";
import { IStorageAdapter, IValueAccessor } from "./types";

export function createValueAccessor<Value, Key extends string = string>(
  storageAdapter: IStorageAdapter<Value, Key>,
  key: Key
): IValueAccessor<Value> {
  const eventBus = new EventBus();

  return {
    get() {
      return storageAdapter.get(key);
    },
    set(value) {
      storageAdapter.set(key, value);
      eventBus.publish();
    },
    delete() {
      storageAdapter.delete(key);
      eventBus.publish();
    },
    subscribe(listener) {
      eventBus.subscribe(listener);
    },
  };
}
