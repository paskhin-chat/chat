import type { AnyFunction } from '../types';

/**
 * Alternative of queueMicrotask, that creates a microtask.
 *
 * This function creates a macrotask.
 */
export function queueMacrotask(cb: AnyFunction): void {
  setTimeout(cb);
}
