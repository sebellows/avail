import { isInteger } from './lang'

/** Used as the maximum memoize cache size. */
const MAX_MEMOIZE_SIZE = 500

type MemoizedStore<T> = {
  (str: string): T
  cache: Map<any, any>
}

/** Create a memoized version of a pure function. */
export const memoize = <T>(
  fn: (str: string) => T,
  cap: number | boolean = false,
): MemoizedStore<T> => {
  const memoized = function (str: string): T {
    const key = str
    const cache = memoized.cache

    if (cap) {
      const cacheSize = isInteger(cap) ? cap : MAX_MEMOIZE_SIZE

      if (cache.size === cacheSize) {
        cache.clear()
      }
    }

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn(str)

    memoized.cache = cache.set(key, result) || cache

    return result
  }

  memoized.cache = new Map()

  return memoized
}
