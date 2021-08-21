/* eslint-disable eqeqeq */
/* eslint-disable no-useless-escape */

import { ValueOf } from 'type-fest'

import { CollectionIter } from '../types'

import { isFastEqual } from './isEqual'
import {
  isBoolean,
  isIterable,
  isNil,
  isNumber,
  isObject,
  isPlainObject,
  isPresent,
  isSymbol,
  toNumber,
  toString,
} from './lang'
import { memoize } from './memoize'
import { range } from './range'

/**
 * Get the first item that is not variadic (not an array).
 *
 * @example
 * const firstNumber = unary([1, 2, 3]) //=> 1
 */
export const unary = <T = unknown>(items: T): T | null => {
  if (Array.isArray(items)) {
    return items.length > 0 ? items[0] : null
  }

  return items
}

/**
 * @function variadic
 * @description Ensure that a value is an array or has a variable number.
 */
export const variadic = <T = unknown>(items: T): T[] => (Array.isArray(items) ? items : [items])

export const getNestedProp = <T extends Record<string, unknown> = Record<string, unknown>>(
  obj: T,
  key: string,
): unknown => {
  try {
    return key.split('.').reduce((o, prop) => {
      if (o instanceof Map) {
        return o.get(prop)
      }

      return o[prop]
    }, obj)
  } catch (err) {
    return null
  }
}

const _getPosition = (
  values: unknown,
  paramOrFn: string | ((...arr: any[]) => any) = null,
  position: number | 'first' | 'last',
) => {
  function getFirstOrLast(arr: any[]) {
    if (!arr.length) return arr

    const index = position === 'first' ? 0 : position

    return position === 'last' ? arr[arr.length - 1] : arr[index]
  }

  if (typeof values == 'string') {
    if (paramOrFn && typeof paramOrFn == 'function') {
      const strs = paramOrFn(values)

      return strs.length ? strs.reverse()[0] : values
    } else {
      const sep = paramOrFn && typeof paramOrFn == 'string' ? paramOrFn : '.'
      const strs = values.split(sep)

      return getFirstOrLast(strs)
    }
  }

  if (!Array.isArray(values) && !isIterable(values)) return values

  const valuesArr = (
    isIterable(values) ? Array.from(values as Iterable<unknown>) : values
  ) as unknown[]

  if (paramOrFn) {
    if (typeof paramOrFn == 'function') {
      return getFirstOrLast(paramOrFn(valuesArr))
    }

    return getFirstOrLast(
      valuesArr.filter((val) => {
        return (
          (isPlainObject(val) && paramOrFn in (val as Record<string, unknown>)) || val === paramOrFn
        )
      }),
    )
  }

  return getFirstOrLast(valuesArr)
}

export const first = (
  values: string | string[] | Iterable<string>,
  paramOrFn?: string | ((...arr: any[]) => any),
): any => {
  return _getPosition(values, paramOrFn, 'first')
}

export const last = (
  values: string | string[] | Iterable<string>,
  paramOrFn?: string | ((...arr: any[]) => any),
): any => {
  return _getPosition(values, paramOrFn, 'last')
}

type CloneCallback = (...args: any[]) => any

export const clone = <TValue extends Record<string, unknown>>(
  value: TValue,
  callback?: CloneCallback,
): TValue | TValue[] => {
  if (isPlainObject(value)) {
    return cloneObjectDeep(value, callback)
  } else if (Array.isArray(value)) {
    return cloneArrayDeep(value, callback)
  }

  return value
}

const cloneObjectDeep = <TValue extends Record<string, unknown> | ObjectConstructor>(
  // eslint-disable-next-line @typescript-eslint/ban-types
  value: TValue,
  callback?: CloneCallback,
) => {
  if (callback && typeof callback === 'function') {
    return callback(value)
  }

  if (Object.keys(value).length) {
    const res = new (value.constructor as ObjectConstructor)()

    for (const key in value) {
      const indexStr = key as string

      res[indexStr] = clone(value[indexStr], callback)
    }

    return res
  }

  return value
}

const cloneArrayDeep = (value: any, callback?: CloneCallback) => {
  return value.map((val: any) => clone(val, callback))
}

/** Used to match backslashes in property paths. */
const escapeCharRE = /\\(\\)?/g

/** Used to match property names within property paths. */
const deepPropRE = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
const plainPropRE = /^\w*$/
const propNameRE =
  /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g

/**
 * Converts `value` to a property path array.
 *
 * @example
 * ```
 * toPath('a[0].b.c'); // => ['a', '0', 'b', 'c']
 * ```
 */
export const toPath = (value: string | symbol | (string | symbol)[]): (string | symbol)[] => {
  if (Array.isArray(value)) {
    return value.map(toKey)
  }

  return isSymbol(value) ? [value] : stringToPath(String(value))
}

/** Converts `string` to a property path array. */
const stringToPath = memoize((str: string): string[] => {
  const result = []

  if (str.charCodeAt(0) === 46 /* . */) {
    result.push('')
  }

  str.replace(propNameRE, (match: string, num: number, quote: string, substr: string): string => {
    const replacement = quote ? substr.replace(escapeCharRE, '$1') : num || match

    result.push(replacement)

    return String(replacement)
  })

  return result
}, true)

/** Converts `value` to a string key if it's not a string or symbol. */
function toKey(value: string | symbol | number): string | symbol {
  if (typeof value == 'string' || isSymbol(value)) {
    return value as string | symbol
  }

  return `${String(value)}` == '0' && 1 / Number(value) == -Infinity ? '-0' : `${String(value)}`
}

/** Checks if `value` is a property name and not a property path. */
function isKey<T extends Record<string, unknown>>(value: unknown, object: T): boolean {
  if (Array.isArray(value)) return false

  if (value == null || isBoolean(value) || isNumber(value) || isSymbol(value)) {
    return true
  }

  const stringValue = String(value)

  return (
    plainPropRE.test(stringValue) ||
    !deepPropRE.test(stringValue) ||
    (object != null && stringValue in object)
  )
}

/** Casts `value` to a path array if it's not one. */
function castPath<T extends Record<string, unknown>>(value: any, obj: T): string[] {
  if (Array.isArray(value)) return value

  if (isKey(value, obj)) return [value]

  return stringToPath(toString(value))
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 */
export function get<T extends Record<string, unknown> = Record<string, unknown>>(
  obj: T,
  path: string | string[],
  defaultValue: any = undefined,
): any {
  if (isNil(obj)) return defaultValue

  const paths = castPath(path, obj)

  let index = 0

  for (const path of paths) {
    if (isPresent(obj)) {
      obj = obj[path] as T
      index++
    }
  }

  return index && index == paths.length ? obj : defaultValue
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
export function has<T extends Record<string, unknown> = Record<string, unknown>>(
  obj: T,
  path: string | string[],
  hasFunc?: (o: T, k: string | symbol) => boolean,
): boolean {
  if (isNil(obj)) return false

  path = castPath(path, obj)

  let i = -1
  const length = path.length
  let result = false

  while (++i < length) {
    const key = toKey(path[i])

    if (!(result = obj != null && hasFunc(obj, key))) {
      break
    }

    obj = obj[toString(key)] as T
  }

  if (result || ++i != length) {
    return result
  }

  return Array.isArray(obj) && !!obj[toNumber(path)]
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties.
 */
export function set<T extends Record<string, unknown> = Record<string, unknown>>(
  obj: T,
  path: string | symbol | (string | symbol)[],
  value: unknown,
  customizer?: (v: unknown, k: keyof T, o: T) => unknown,
): T {
  if (!isObject(obj) || !isPresent(obj)) return obj

  const paths = castPath(path, obj)

  let i = -1
  let nested = clone(obj) as T

  while (isPresent(nested) && ++i < paths.length) {
    const key = toKey(String(paths[i])) as keyof typeof nested
    let newValue = value

    if (i !== paths.length - 1) {
      const objValue = nested[key]

      newValue = customizer ? customizer(objValue, key, nested) : undefined

      if (!isPresent(newValue)) {
        newValue = isObject(objValue) ? objValue : isNumber(paths[i + 1]) ? [] : {}
      }
    }

    nested[key] = newValue as ValueOf<typeof newValue>
    nested = nested[key] as T
  }

  return obj
}

/**
 * Removes the property at `path` of `obj`.
 *
 * **Note:** This method mutates `obj`.
 *
 * @param {Object} obj The object to modify.
 * @param {Array|string} path The path of the property to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 *
 * @example
 *
 * const obj = { 'a': [{ 'b': { 'c': 7 } }] };
 * _.unset(obj, 'a[0].b.c');
 * // => true
 *
 * console.log(obj);
 * // => { 'a': [{ 'b': {} }] };
 *
 * _.unset(obj, ['a', '0', 'b', 'c']);
 * // => true
 *
 * console.log(obj);
 * // => { 'a': [{ 'b': {} }] };
 */
export function unset<T extends Record<string, unknown> = Record<string, unknown>>(
  obj: T,
  path: string | symbol | (string | symbol)[],
): boolean {
  if (isNil(obj)) return true

  const paths = castPath(path, obj) as string[]

  obj = paths.length < 2 ? obj : get(obj, paths.slice(0, -1))

  function _delete(): boolean {
    const lastKey = Array.isArray(obj) ? toNumber(last(paths)) : toKey(last(paths))

    if (isNumber(lastKey) && Array.isArray(obj)) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(obj as T[]).splice(+lastKey, 1)

      return obj.length === lastKey
    }

    return delete obj[toKey(last(paths)) as string]
  }

  return obj == null || _delete()
}

interface Queue<T extends Record<string, unknown> = Record<string, unknown>> {
  [Symbol.iterator](): Queue
  current: () => T
  at: (index: number) => IteratorResult<T>
  jump(num: number): IteratorResult<T>
  next: () => IteratorResult<T>
  prev: () => IteratorResult<T>
}

export function queue<T extends Record<string, unknown> = Record<string, unknown>>(
  items: T[],
  initialValue?: T,
): Queue<T> {
  let done = false
  let currIndex = initialValue ? items.indexOf(initialValue) : -1
  let value = initialValue

  return {
    [Symbol.iterator]() {
      return this
    },
    current: () => {
      return items[currIndex]
    },
    at: (index: number) => {
      if (index >= 0 && index < items.length) {
        currIndex = index
        done = currIndex === items.length
        value = items[currIndex]

        return {
          done,
          value,
        }
      }

      throw new RangeError(`The index must be between 0 and ${items.length - 1}.`)
    },
    jump(num: number) {
      if (num !== currIndex) {
        if (num < 0) {
          currIndex -= Math.abs(num)
        } else {
          currIndex += num
        }

        currIndex = currIndex < 0 ? 0 : currIndex > items.length ? items.length : currIndex
        done = currIndex === 0 || currIndex === items.length
        value = items[currIndex]
      }

      return { done, value }
    },
    next: () => {
      ++currIndex
      done = currIndex === items.length

      value = !done ? items[currIndex] : undefined

      return {
        done,
        value,
      }
    },
    prev: () => {
      --currIndex
      done = currIndex === -1

      value = !done ? items[currIndex] : undefined

      return {
        done,
        value,
      }
    },
  }
}

export function pick<
  T extends Record<string, unknown> = Record<string, unknown>,
  TReturn = Pick<T, keyof Partial<T>>,
>(obj: T, ...keys: string[]): TReturn {
  return keys.reduce((o, key) => {
    if (key in obj) {
      o[key] = obj[key]
    }

    return o
  }, {} as TReturn)
}

export function pickBy<T = Record<string, unknown>, TReturn = Pick<T, keyof Partial<T>>>(
  obj: T,
  cb: CollectionIter<T, boolean>,
): TReturn {
  const keys = Object.keys(obj).filter((key) => cb(obj[key])) as (keyof T)[]
  const props = keys.reduce((acc, k: keyof T) => {
    acc[k as string] = obj[k]

    return acc
  }, {} as TReturn)

  return props
}

export function omit<T extends Record<string, unknown> = Record<string, unknown>>(
  obj: T,
  ...keys: string[]
): Omit<T, keyof T> {
  return Object.keys(obj).reduce((o, key) => {
    if (!keys.includes(key)) {
      o[key] = obj[key]
    }

    return o
  }, {} as Omit<T, keyof T>)
}

export function omitBy<T extends Record<string, unknown> = Record<string, unknown>>(
  obj: T,
  cb: CollectionIter<T, boolean>,
): Partial<T> {
  return Object.entries(obj).reduce((o, [k, v]) => {
    if (!cb(v as ValueOf<T>)) {
      o[k] = v
    }

    return o
  }, {})
}

function unequalObjs<T1, T2 = T1>(v1: T1, v2: T2): boolean {
  return isPlainObject(v1) && isPlainObject(v2) && !isFastEqual(v1, v2)
}

export function deepMerge<
  T1 extends Record<string, unknown>,
  T2 extends Record<string, unknown> = T1,
  TReturnType = Partial<T1 & T2>,
>(objA: T1, objB: T2): TReturnType {
  if (isFastEqual(objA, objB)) return objB as unknown as TReturnType
  if (!Object.keys(objB).length) return objA as unknown as TReturnType

  function merge<TT1 extends Record<string, unknown>, TT2 extends Record<string, unknown> = T1>(
    v1: TT1,
    v2: TT2,
  ) {
    let remainder = []

    if (unequalObjs(v1, v2)) {
      let newObj = {}
      const v1Keys = Object.keys(v1)
      const v2Keys = Object.keys(v2)
      let diffA = v1Keys.filter((k) => !v2Keys.includes(k))
      let diffB = v2Keys.filter((k) => !v1Keys.includes(k))

      diffA.forEach((k) => {
        newObj[k] = v1[k]
      })
      diffB.forEach((k) => {
        newObj[k] = v2[k]
      })
      diffA = []
      diffB = []

      const result = Object.entries(v1).reduce((o, [k, v]) => {
        o[k] = merge(v as TT1, v2[k] as TT2)

        return o
      }, newObj)

      newObj = {}

      return result
    } else if (Array.isArray(v1) && Array.isArray(v2)) {
      const newArr = v1.length ? range(v1.length) : []

      if (v1.length < v2.length) {
        remainder = v2.splice(v1.length)
      }

      const arr2 = v1.reduce((arr, v, i) => {
        if (unequalObjs(v, v2[i])) {
          const item = merge(v, v2[i])

          arr[i] = item
        } else if (typeof v2[i] !== 'undefined' && v !== v2[i]) {
          arr[i] = v2[i]
        } else {
          arr[i] = v
        }

        return arr
      }, newArr)

      return arr2.concat(remainder)
    } else if (typeof v2 !== 'undefined' && v1 !== v2) {
      return v2
    }

    return v1
  }

  return merge(objA, objB)
}
