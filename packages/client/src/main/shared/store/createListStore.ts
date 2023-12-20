import { Many } from '../types';
import { EventBus } from '../lib';

import { IStore } from './types';

export interface IListStore<Item> extends IStore<Item[]> {
  replace: (items: Many<Item>) => void;

  prepend: (items: Many<Item>) => void;

  append: (items: Many<Item>) => void;

  modify: (predicate: (item: Item, index: number, array: Item[]) => boolean, item: Partial<Item>) => void;
}

/**
 * @param initialState
 */
export function createListStore<Item>(initialState: Item[] = []): IListStore<Item> {
  let state = initialState;
  const eventBus = new EventBus<Item[]>();

  return {
    get state() {
      return state;
    },

    replace(items) {
      state = Array.isArray(items) ? items : [items];
      eventBus.emit(state);
    },

    prepend(items) {
      state = Array.isArray(items) ? items.concat(...state) : [items].concat(...state);

      eventBus.emit(state);
    },

    append(items) {
      state = Array.isArray(items) ? state.concat(...items) : state.concat(items);

      eventBus.emit(state);
    },

    modify(predicate, item) {
      const copy = state.slice();

      // eslint-disable-next-line unicorn/no-array-callback-reference
      Object.assign(copy.find(predicate) || {}, item);

      state = copy;

      eventBus.emit(state);
    },

    reset() {
      state = initialState.slice();

      eventBus.emit(state);
    },

    subscribe(callback) {
      return eventBus.on(callback);
    },
  };
}
