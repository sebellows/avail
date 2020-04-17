import { isIterable, isPlainObject } from './common';

/* eslint-disable eqeqeq */
/* eslint-disable no-useless-escape */

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

export const setNestedProp = (
  obj: Record<string, any>,
  prop: string,
  value: any,
) => {
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

export const cloneDeep = (value, instance) => {
  if (isPlainObject(value)) {
    return cloneObjectDeep(value, instance);
  } else if (Array.isArray(value)) {
    return cloneArrayDeep(value, instance);
  }
  return value;
};

function cloneObjectDeep(value, instance) {
  if (typeof instance === 'function') {
    return instance(value);
  }
  if (instance || isPlainObject(value)) {
    const res = new value.constructor();

    for (const key in value) {
      res[key] = cloneDeep(value[key], instance);
    }

    return res;
  }
  return value;
}

function cloneArrayDeep(value, instance) {
  const res = new value.constructor(value.length);

  for (let i = 0; i < value.length; i++) {
    res[i] = cloneDeep(value[i], instance);
  }

  return res;
}
