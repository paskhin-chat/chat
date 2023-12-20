import { EventBus } from '../lib';

import { IStore } from './types';

export interface IBaseStore<State> extends IStore<State | null> {
  set: (state: State) => void;
}

export function createBaseStore<State>(initialState?: State): IBaseStore<State> {
  // eslint-disable-next-line unicorn/prefer-default-parameters
  let internalState = initialState || null;
  const eventBus = new EventBus<State | null>();

  return {
    get state() {
      return internalState;
    },

    set(state) {
      internalState = state || null;
      eventBus.emit(internalState);
    },

    reset() {
      internalState = null;
      eventBus.emit(internalState);
    },

    subscribe(callback) {
      return eventBus.on(callback);
    },
  };
}
