/* eslint-disable eqeqeq */
/* eslint-disable no-useless-escape */

export const noop = () => {}

export const isNil = (obj: any): boolean => obj === undefined || obj === null
export const isDefined = (obj: any): boolean => obj !== undefined && obj !== null

export const isObject = (obj: any): boolean => typeof obj === 'object'

export const typeOf = (obj: any, is?: string): string | boolean => {
  const type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
  return is ? type === is : type
}

export const isBoolean = (obj: any): boolean => typeOf(obj, 'boolean') as boolean
export const isPlainObject = (obj: any): boolean => typeOf(obj, 'object') as boolean
export const isString = (obj: any): boolean => typeOf(obj, 'string') as boolean
export const isSymbol = (obj: any): boolean => typeOf(obj, 'symbol') as boolean
export const isNumber = (obj: any): boolean => typeOf(obj, 'number') as boolean
export const isInteger = (obj: any): boolean => isNumber(obj) && (Number.isInteger(obj) as boolean)

export const isEmpty = (obj: any): boolean => {
  if (Array.isArray(obj) || typeof obj == 'string') {
    return obj.length === 0
  }
  if (isPlainObject(obj)) {
    return Object.keys(obj).length === 0
  }
  if (obj instanceof Map || obj instanceof Set) {
    return obj.size === 0
  }
  if (typeof obj == 'number') {
    return false
  }

  return true
}

export const isIterable = (obj: any): boolean => {
  if (isNil(obj)) {
    return false
  }
  return typeof obj[Symbol.iterator] === 'function'
}

export const isNode = (value: any): value is HTMLElement =>
  isObject(value) && (value as HTMLElement).nodeType === Node.ELEMENT_NODE

export const getNode = (el: any): Node | boolean => {
  if (isNil(el)) return false
  if (isNode(el)) {
    return el
  }
  if (isNode(el?.current)) {
    return el.current
  }
  if (isPlainObject(el)) {
    let found
    for (const child in el) {
      if (!isNode(child)) continue
      found = child
    }
    return found ?? false
  }
  return false
}

/** Check whether an object has the property. */
export const hasOwn = (obj: any, key: string): boolean => {
  return (
    Object.prototype.hasOwnProperty.call(obj, key) ||
    !isNil(Object.getOwnPropertyDescriptor(obj, key))
  )
}

/** Convert a value to a string that is actually rendered. */
export const toString = (val: unknown): string => {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
    ? JSON.stringify(val, null, 2)
    : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
export const toNumber = (val: any): number | any => {
  const num = parseFloat(String(val))
  return isNaN(num) ? val : num
}

export const toObject = (obj: any, callback = (x: any, i?: number, obj?: any) => x) => {
  switch (typeOf(obj)) {
    case 'array': {
      return obj.reduce((acc, k: string, i: number) => {
        acc[k] = callback(k, i, obj)
        return acc
      }, {})
    }
    case 'map':
    case 'set': {
      return Array.from(obj.entries()).reduce((acc, entry, i: number) => {
        const [key, value] = callback(entry, i, obj)
        acc[key] = value
        return acc
      }, {})
    }
    default:
      return obj
  }
}

export const toMap = <T>(obj: any, keyBy?: string): Map<string, T> => {
  if (!isObject(obj) || isNil(obj)) {
    throw new Error(
      `Parameter passed to "toMap" function must be either an array or a plain object.`,
    )
  }
  if (Array.isArray(obj)) {
    const map = new Map()
    return obj.reduce((acc, o, i) => {
      const key = keyBy && keyBy in o ? o[keyBy] : i
      acc.set(key, o)
      return acc
    }, map)
  }
  if (isPlainObject(obj)) {
    return new Map(Object.entries(obj))
  }
}

const coerceToBoolean = (value: unknown): boolean => {
  return !isNil(value) && `${value}` !== 'false'
}

export const toBoolean = (value: unknown) => coerceToBoolean(value)

/** Used as the maximum memoize cache size. */
const MAX_MEMOIZE_SIZE = 500

/** Create a memoized version of a pure function. */
export const memoize = <T>(fn: (str: string) => T, cap: number | boolean = false) => {
  const memoized = function (str: string) {
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

/** Camelize a hyphen-delimited string. */
export const camelize = memoize(function (str: string) {
  return str.replace(/-(\w)/g, function (_, c) {
    return c ? c.toUpperCase() : ''
  })
})

/** Capitalize a string. */
export const capitalize = memoize((str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/** Hyphenate a camelCase string. */
export const hyphenate = memoize((str: string): string => {
  return String(str)
    .replace(/\B([A-Z])/g, '-$1')
    .replace(/\s/g, '-')
    .toLowerCase()
})

/** Snakecase a string. */
export const snakeize = memoize((str: string): string => {
  return String(str)
    .replace(/\B([A-Z])/g, '_$1')
    .replace(/\s/g, '_')
    .toUpperCase()
})

export const pascalize = memoize(
  (str: string) => str.charAt(0).toUpperCase() + camelize(str).slice(1),
)

// const quoteExp = /[\'\"]/;
export const unquote = (str: string): string => {
  if (!str) return ''
  let unquoted = str

  if (str.startsWith('"') || str.startsWith("'")) {
    unquoted = str.slice(1)
  }
  if (str.endsWith('"') || str.endsWith("'")) {
    unquoted = unquoted.slice(0, unquoted.length - 2)
  }

  return unquoted
}

/**
 * Generate a unique ID.
 *
 * @example `const id = uuid(5, 'checkbox-'); // returns 'checkbox-0js9s'
 *
 * @author Gordon Brander <github.com/gordonbrander>
 * @see https://gist.github.com/gordonbrander/2230317
 *
 * @param {Number} limit The max length of the generated ID
 * @param {String} prefix Text to prepend to the ID
 * @returns {String}
 *
 * NOTE: There is no 100% guarantee of unique-ness here. `Math.random` "should" be
 * unique because of its seeding algorithm. Convert it to base-36 (numbers + letters),
 * and grab the first 9 characters after the decimal.
 */
export const uuid = (limit = 9, prefix = '') =>
  prefix + Math.random().toString(36).substring(2, limit)

/**
 * Ensure that a value is an array.
 */
export const variadic = (items: any) => (Array.isArray(items) ? items : [items])

/**
 * `throttle`
 *
 * A throttle function implementing requestAnimationFrame that only invokes the
 * passed callback at most once per animation frame on a browser (or per 1000/60 ms).
 */
type Throttled = {
  (...args: any[]): void
  cancel(): void
}
export const throttle = (cb: (e: any) => void): Throttled => {
  let requestId = null
  let lastArgs: any

  const later = (context: Throttled) => () => {
    requestId = null
    cb.apply(context, lastArgs)
  }

  const throttled = function (this: Throttled, ...args: any[]) {
    lastArgs = args

    if (requestId === null) {
      requestId = requestAnimationFrame(later(this))
    }
  }

  throttled.cancel = () => {
    cancelAnimationFrame(requestId)
    requestId = null
  }

  return throttled
}
