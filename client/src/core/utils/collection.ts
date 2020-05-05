import { isIterable, isPlainObject } from './common';
import { range } from './range';

/* eslint-disable eqeqeq */
/* eslint-disable no-useless-escape */

export const collection = <T>(
  items: Record<string, T> | T[],
  trackingKey: string | number = null,
  loopAround = true,
) => {
  const keys = isPlainObject(items) ? Object.keys(items) : range((items as T[]).length);
  let currIndex = 0;
  let _current;

  return {
    keys,
    size: keys.length,
    get current() {
      return _current;
    },
    set current(keyOrItem: string | number | T) {
      // if (!keys[key]) {
      //   throw new Error(`${key} does not exist in the collection.`);
      // }
      if (isPlainObject(keyOrItem)) {
        currIndex = keys.findIndex((key) => key === keyOrItem[trackingKey]);
        _current = keyOrItem;
      } else if (keys.includes(keyOrItem as never)) {
        currIndex = keys.indexOf(keyOrItem as never);
        _current = items[currIndex];
      }
    },
    get: function (key: string | number) {
      if (isPlainObject(items)) {
        return getNestedProp(items, key as string);
      }
      return items[key];
    },
    has: function (key: string | number) {
      return Boolean(this.get(key));
    },
    set: function (key: string, value: any) {
      if (isPlainObject(items)) {
        setNestedProp(items, key, value);
      } else {
        items[key] = value;
      }
    },
    first: function (paramOrFn?: string | Function) {
      return first(items, paramOrFn);
    },
    last: function (paramOrFn?: string | Function) {
      return last(items, paramOrFn);
    },
    map: function (fn: (item: T, index?: number, arr?: T[]) => any) {
      if (isPlainObject(items)) {
        return this.values().map(fn);
      }
      return (items as T[]).map(fn);
    },
    values: function (): T[] {
      return isPlainObject(items) ? (Object.values(items) as T[]) : (items as T[]);
    },
    prev: function () {
      const prevIndex = currIndex !== 0 ? currIndex - 1 : loopAround ? this.keys.length - 1 : 0;
      const prevKey = isPlainObject(items) ? this.keys[prevIndex] : this.keys[+prevIndex];
      currIndex = prevIndex;
      this.current = items[prevKey];
    },
    next: function () {
      const nextIndex =
        currIndex !== this.keys.length - 1 ? currIndex + 1 : loopAround ? 0 : this.keys.length - 1;
      const nextKey = isPlainObject(items) ? this.keys[nextIndex] : this.keys[+nextIndex];
      currIndex = nextIndex;
      this.current = items[nextKey];
    },
  };
};

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

export const setNestedProp = (obj: Record<string, any>, prop: string, value: any) => {
  if (isPlainObject(obj)) {
    for (const key in obj) {
      if (key === prop) {
        if (isPlainObject(obj[prop]) && isPlainObject(value)) {
          obj[prop] = { ...obj[prop], ...value };
        } else {
          obj[prop] = value;
        }
        break;
      }
      setNestedProp(obj[key], prop, value);
    }
  }
};

const _getPosition = (
  values: any,
  paramOrFn: string | Function = null,
  position: number | 'first' | 'last',
) => {
  function getFirstOrLast(arr: any[]) {
    if (arr.length) {
      if (position === 'last' || position === 'first') {
        return position === 'last' ? arr.reverse()[0] : arr[0];
      }
      if (typeof position == 'number' && arr[position]) {
        return arr[position];
      }
    }
    return arr;
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
  } else if ((Array.isArray(values) && values.length) || isIterable(values)) {
    let valuesArr = Array.isArray(values) ? Array.from(values) : values;

    if (paramOrFn) {
      if (typeof paramOrFn == 'string') {
        valuesArr = values.filter((val) => {
          if (isPlainObject(val) && paramOrFn in val) {
            return val;
          }
          return val === paramOrFn;
        });
      } else if (typeof paramOrFn == 'function') {
        valuesArr = paramOrFn(values);
      }
    }
    return getFirstOrLast(valuesArr);
  }
  return values;
};

export const first = (values: any, paramOrFn?: string | Function): any => {
  return _getPosition(values, paramOrFn, 'first');
};

export const last = (values: any, paramOrFn?: string | Function): any => {
  return _getPosition(values, paramOrFn, 'last');
};

export const clone = (value: any, callback: Function) => {
  if (isPlainObject(value)) {
    return cloneObjectDeep(value, callback);
  } else if (Array.isArray(value)) {
    return cloneArrayDeep(value, callback);
  }
  return value;
};

const cloneObjectDeep = (value: any, callback: Function) => {
  if (typeof callback === 'function') {
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

const cloneArrayDeep = (value: any, callback: Function) => {
  return value.map((val: any) => clone(val, callback));
};
