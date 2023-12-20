import { EventBus } from "../lib";
import { IStore } from "./types";

export interface IBaseStore<State> extends IStore<State | null> {
  set(state: State): void;
}

export function createBaseStore<State>(
  initialState?: State
): IBaseStore<State> {
  let _state = initialState || null;
  const eventBus = new EventBus<State | null>();

  return {
    get state() {
      return _state;
    },

    set(state) {
      _state = state || null;
      eventBus.emit(state);
    },

    reset() {
      _state = null;
      eventBus.emit(_state);
    },

    subscribe(callback) {
      return eventBus.on(callback);
    },
  };
}
