import { EventBus } from "../lib";
import { IStore } from "./types";

export interface IMapStore<Key, Value> extends IStore<ReadonlyMap<Key, Value>> {
  get(key: Key): Value | undefined;

  set(key: Key, item: Value): void;

  delete(key: Key): void;
}

export function createMapStore<Key, Value>(
  initialState = new Map<Key, Value>()
): IMapStore<Key, Value> {
  const state = initialState;
  const eventBus = new EventBus<Map<Key, Value>>();

  return {
    get state() {
      return state;
    },

    get(key) {
      return state.get(key);
    },

    set(key, item) {
      state.set(key, item);
      eventBus.emit(state);
    },

    delete(key) {
      state.delete(key);
      eventBus.emit(state);
    },

    reset() {
      state.clear();
      eventBus.emit(state);
    },

    subscribe(callback) {
      return eventBus.on(callback);
    },
  };
}
