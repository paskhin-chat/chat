export function deduplicate<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
>(array: T[], key: K): T[] {
  const map = new Map<T[K], T>();

  for (const item of array) {
    map.set(item[key], item);
  }

  return Array.from(map.values());
}
