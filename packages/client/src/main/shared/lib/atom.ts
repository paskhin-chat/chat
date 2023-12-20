export function atom<T>(cb: () => T): T {
  return cb();
}
