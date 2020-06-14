/* eslint-disable eqeqeq */
/* eslint-disable no-useless-escape */

import {
  isBoolean,
  isIterable,
  isPlainObject,
  isSymbol,
  memoize,
  isNumber,
  toString,
  isNil,
  isDefined,
  isObject,
  toNumber,
} from './common';

export const getNestedProp = (obj: any, key: string) => {
  try {
    return key.split('.').reduce((o, prop) => {
      if (o instanceof Map) {
        return o.get(prop);
      }
      return o[prop];
    }, obj);
  } catch (err) {
    return null;
  }
};

const _getPosition = (
  values: any,
  paramOrFn: string | Function = null,
  position: number | 'first' | 'last',
) => {
  function getFirstOrLast(arr: any[]) {
    if (!arr.length) return arr;

    const index = position === 'first' ? 0 : position;

    return position === 'last' ? arr[arr.length - 1] : arr[index];
  }

  if (typeof values == 'string') {
    if (paramOrFn && typeof paramOrFn == 'function') {
      const strs = paramOrFn(values);
      return strs.length ? strs.reverse()[0] : values;
    } else {
      const sep = paramOrFn && typeof paramOrFn == 'string' ? paramOrFn : '.';
      const strs = values.split(sep);
      return getFirstOrLast(strs);
    }
  }

  if (!Array.isArray(values) && !isIterable(values)) return values;

  const valuesArr = isIterable(values) ? Array.from(values) : values;

  if (paramOrFn) {
    if (typeof paramOrFn == 'function') {
      return getFirstOrLast(paramOrFn(valuesArr));
    }
    return getFirstOrLast(
      valuesArr.filter((val) => {
        return (isPlainObject(val) && paramOrFn in val) || val === paramOrFn;
      }),
    );
  }

  return getFirstOrLast(valuesArr);
};

export const first = (values: any, paramOrFn?: string | Function): any => {
  return _getPosition(values, paramOrFn, 'first');
};

export const last = (values: any, paramOrFn?: string | Function): any => {
  return _getPosition(values, paramOrFn, 'last');
};

export const clone = (value: any, callback?: Function) => {
  if (isPlainObject(value)) {
    return cloneObjectDeep(value, callback);
  } else if (Array.isArray(value)) {
    return cloneArrayDeep(value, callback);
  }
  return value;
};

const cloneObjectDeep = (value: any, callback?: Function) => {
  if (callback && typeof callback === 'function') {
    return callback(value);
  }
  if (Object.keys(value).length) {
    const res = new value.constructor();

    for (const key in value) {
      res[key] = clone(value[key], callback);
    }

    return res;
  }
  return value;
};

const cloneArrayDeep = (value: any, callback?: Function) => {
  return value.map((val: any) => clone(val, callback));
};

/** Used to match backslashes in property paths. */
const escapeCharRE = /\\(\\)?/g;

/** Used to match property names within property paths. */
const deepPropRE = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const plainPropRE = /^\w*$/;
const propNameRE = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Converts `value` to a property path array.
 *
 * @example
 * ```
 * toPath('a[0].b.c'); // => ['a', '0', 'b', 'c']
 * ```
 */
export const toPath = (value: string | Symbol | (string | Symbol)[]): (string | Symbol)[] => {
  if (Array.isArray(value)) {
    return value.map(toKey);
  }
  return isSymbol(value) ? [value] : stringToPath(String(value));
};

/** Converts `string` to a property path array. */
const stringToPath = memoize((str: string): string[] => {
  const result = [];
  if (str.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  str.replace(propNameRE, (match: string, num: number, quote: string, substr: string): string => {
    const replacement = quote ? substr.replace(escapeCharRE, '$1') : num || match;
    result.push(replacement);
    return String(replacement);
  });
  return result;
}, true);

/** Converts `value` to a string key if it's not a string or symbol. */
function toKey(value: string | Symbol): string | Symbol {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  return `${value}` == '0' && 1 / Number(value) == -Infinity ? '-0' : `${value}`;
}

/** Checks if `value` is a property name and not a property path. */
function isKey<T extends Object>(value: any, object: T): boolean {
  if (Array.isArray(value)) return false;

  if (value == null || isBoolean(value) || isNumber(value) || isSymbol(value)) {
    return true;
  }

  return (
    plainPropRE.test(value) ||
    !deepPropRE.test(value) ||
    (object != null && value in Object(object))
  );
}

/** Casts `value` to a path array if it's not one. */
function castPath<T extends Object>(value: any, obj: T): string[] {
  if (Array.isArray(value)) return value;

  if (isKey(value, obj)) return [value];

  return stringToPath(toString(value));
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 */
export function get<T>(obj: T, path: string | string[], defaultValue: any = undefined): any {
  if (isNil(obj)) return defaultValue;

  const paths = castPath(path, obj);

  let index = 0;

  for (const path of paths) {
    if (isDefined(obj)) {
      obj = obj[path];
      index++;
    }
  }

  return index && index == paths.length ? obj : defaultValue;
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
export function has(obj: object, path: string | string[], hasFunc?: Function): boolean {
  if (isNil(obj)) return false;

  path = castPath(path, obj);

  let i = -1;
  let length = path.length;
  let result = false;

  while (++i < length) {
    const key = toKey(path[i]);
    if (!(result = obj != null && hasFunc(obj, key))) {
      break;
    }
    obj = obj[toString(key)];
  }

  if (result || ++i != length) {
    return result;
  }

  return Array.isArray(obj) && !!obj[toNumber(path)];
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties.
 */
export function set<T>(
  obj: T,
  path: string | Symbol | (string | Symbol)[],
  value: any,
  customizer?: Function,
): T {
  if (!isObject(obj) || !isDefined(obj)) return obj;

  const paths = castPath(path, obj);

  let i = -1;
  let nested = obj;

  while (isDefined(nested) && ++i < paths.length) {
    let key = toKey(String(paths[i])) as string;
    let newValue = value;

    if (i !== paths.length - 1) {
      const objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (!isDefined(newValue)) {
        newValue = isObject(objValue) ? objValue : isNumber(paths[i + 1]) ? [] : {};
      }
    }

    nested[key] = newValue;
    nested = nested[key];
  }

  return obj;
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
export function unset<T>(obj: T, path: string | Symbol | (string | Symbol)[]): boolean {
  if (obj == null) return true;

  const paths = castPath(path, obj) as string[];
  obj = paths.length < 2 ? obj : get(obj, paths.slice(0, -1));

  function _delete(): boolean {
    const lastKey = Array.isArray(obj) ? toNumber(last(paths)) : toKey(last(paths));

    if (isNumber(lastKey) && Array.isArray(obj)) {
      obj.splice(+lastKey, 1);
      return obj.length === lastKey;
    }
    return delete obj[toKey(last(paths)) as string];
  }

  return obj == null || _delete();
}
