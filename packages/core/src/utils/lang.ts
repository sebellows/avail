/* eslint-disable no-case-declarations */

import { ValueOf } from 'type-fest'

import { ObjectType } from '../types'

import { hasOwn } from './common'

type TypeCheckerFn = (obj: unknown) => boolean

const hasLength = (o: unknown) => hasOwn(o, 'length') || hasOwn(o, 'size')
const lengthIsZero = (o: unknown) => hasLength(o) && (o as any).length === 0

export const typeOf = (o: unknown): string =>
  Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
const getTypeFn =
  (t: string): TypeCheckerFn =>
  (o: unknown): boolean =>
    typeOf(o) === t

export const isAsyncFunction = (o: unknown): boolean => getTypeFn('asyncfunction')(o)
export const isBoolean = (o: unknown): boolean => getTypeFn('boolean')(o)
export const isDate = (o: unknown): boolean => getTypeFn('date')(o)
export const isFunction = (o: unknown): boolean => getTypeFn('function')(o)
export const isMap = (o: unknown): boolean => getTypeFn('map')(o)
export const isNull = (o: unknown): boolean => getTypeFn('null')(o)
export const isNumber = (o: unknown): boolean => getTypeFn('number')(o)
export const isPlainObject = (o: unknown): boolean => getTypeFn('object')(o)
export const isRegExp = (o: unknown): boolean => getTypeFn('regexp')(o)
export const isSet = (o: unknown): boolean => getTypeFn('set')(o)
export const isString = (o: unknown): boolean => getTypeFn('string')(o)
export const isSymbol = (o: unknown): boolean => getTypeFn('symbol')(o)
export const isUndefined = (o: unknown): boolean => getTypeFn('undefined')(o)

export const isObject = (o: unknown): boolean => typeof o === 'object'
export const isInteger = (obj: unknown): boolean =>
  isNumber(obj) && (Number.isInteger(obj) as boolean)
export const isNil = (o: unknown): boolean => isNull(o) || isUndefined(o)
export const isPresent = (o: unknown): boolean => isDefined(o)

export const isIterable = (o: unknown): boolean =>
  !isNil(o) && typeof o[Symbol.iterator] === 'function'
export const isPromise = (o: unknown): boolean =>
  isObject(o) && isFunction((o as Promise<any>).then)

export const isPrimitive = (o: unknown): boolean => isNull(o) || (!isObject(o) && !isFunction(o))
export const isBuiltInMutableObject = (o: unknown): boolean =>
  isObject(o) && !isNull(o) && !isFunction(o) && !isPlainObject(o)
export const isBuiltInImmutableObject = (o: unknown): boolean => isNull(o) || isRegExp(o)

export const isEmptyObject = <T extends ObjectType = ObjectType>(o: T): boolean => {
  for (const prop in o) {
    if (Object.prototype.hasOwnProperty.call(o, prop)) {
      return false
    }
  }

  return true
}

export const isEmpty = (o: unknown): boolean =>
  !isNumber(o) && (isNil(o) || isEmptyObject(o as ObjectType) || lengthIsZero(o))

/**
 * @function isDefined
 * @description - Similar to `isPresent` but checks also if the element is empty or not.
 * @param {*} o - Any element/value to check
 * @param {Boolean} strict - When true, returns false for empty strings
 * @returns {Boolean}
 */
export const isDefined = (o: unknown, strict = true): boolean => {
  if (strict) {
    return !isEmpty(o)
  }

  return isPresent(o) && (!isEmptyObject(o as ObjectType) || (Array.isArray(o) && !lengthIsZero(o)))
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
export const toNumber = (val: unknown): number | any => {
  const num = parseFloat(String(val))

  return isNaN(num) ? val : num
}

export const toObject = <TReturn = Record<string, unknown>>(
  obj: unknown,
  callback = (
    x: keyof TReturn | [keyof TReturn, any],
    _i?: number,
    _obj?: typeof obj,
  ): ValueOf<TReturn> | [keyof TReturn, ValueOf<TReturn>] =>
    typeof x === 'string' ? (obj[x] as ValueOf<TReturn>) : (x as [keyof TReturn, ValueOf<TReturn>]),
): TReturn => {
  switch (typeOf(obj)) {
    case 'array':
      return (obj as string[]).reduce((acc, k, i) => {
        acc[k] = callback(k as keyof TReturn, i, obj)

        return acc
      }, {} as TReturn)

    case 'map':
    case 'set':
      const iter = obj as { entries: () => IterableIterator<[keyof TReturn, unknown]> }
      const entries = Array.from(iter.entries()) as [keyof TReturn, unknown][]

      return entries.reduce((acc, entry, i: number) => {
        const [key, value] = callback(entry, i, obj) as [keyof TReturn, ValueOf<TReturn>]

        acc[key] = value

        return acc
      }, {} as TReturn)

    default:
      return obj as TReturn
  }
}

export const toMap = <T>(obj: unknown, keyBy?: string): Map<string, T> => {
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

export const toBoolean = (value: unknown): boolean => coerceToBoolean(value)

const coerceToPromise = <T = any>(o: T | Promise<T>): Promise<T> =>
  isPromise(o) ? (o as Promise<T>) : Promise.resolve(o)
export const toPromise = <T = any>(o: T | Promise<T>): Promise<T> => coerceToPromise(o)
