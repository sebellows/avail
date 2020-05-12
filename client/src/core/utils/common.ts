/* eslint-disable eqeqeq */
/* eslint-disable no-useless-escape */
import { FieldElement } from '../contracts/form';

export const isNil = (obj: any) => obj === undefined || obj === null;
export const isDefined = (obj: any): boolean => obj !== undefined && obj !== null;

export const isObject = (obj: any) => typeof obj === 'object';

export const typeOf = (obj: any, is?: string): string | boolean => {
  const type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  return is ? type === is : type;
};

export const isPlainObject = (obj: any) => typeOf(obj, 'object');
export const isString = (obj: any) => typeOf(obj, 'string');
export const isNumber = (obj: any) => typeOf(obj, 'number');

export const isEmpty = (obj: any) => {
  if (Array.isArray(obj) || typeof obj == 'string') {
    return obj.length > 0;
  }
  if (isPlainObject(obj)) {
    return Object.keys(obj).length > 0;
  }
  if (obj instanceof Map || obj instanceof Set) {
    return obj.size > 0;
  }
  if (typeof obj == 'number') {
    return obj > 0;
  }

  return false;
};

export const isIterable = (obj: any): boolean => {
  if (isNil(obj)) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
};

export const isNode = (value: any): value is HTMLElement =>
  isObject(value) && (value as HTMLElement).nodeType === Node.ELEMENT_NODE;

export const getNode = (el: any): Node | boolean => {
  if (isNil(el)) return false;
  if (isNode(el)) {
    return el;
  }
  if (isNode(el?.current)) {
    return el.current;
  }
  if (isPlainObject(el)) {
    let found;
    for (const child in el) {
      if (!isNode(child)) continue;
      found = child;
    }
    return found ?? false;
  }
  return false;
};

export const isCheckBoxInput = (element: FieldElement): element is HTMLInputElement =>
  element.type === 'checkbox';
export const isRadioInput = (element: FieldElement): element is HTMLInputElement =>
  element.type === 'radio';
export const isRadioOrCheckbox = (ref: FieldElement): ref is HTMLInputElement =>
  isRadioInput(ref) || isCheckBoxInput(ref);

/** Check whether an object has the property. */
export const hasOwn = (obj: any, key: string) => {
  return (
    Object.prototype.hasOwnProperty.call(obj, key) ||
    !isNil(Object.getOwnPropertyDescriptor(obj, key))
  );
};

/** Convert a value to a string that is actually rendered. */
export const toString = (val: unknown): string => {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
    ? JSON.stringify(val, null, 2)
    : String(val);
};

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
export const toNumber = (val: unknown): number | unknown => {
  const num = parseFloat(String(val));
  return isNaN(num) ? val : num;
};

export const toMap = <T>(obj: any, keyBy?: string): Map<string, T> => {
  if (!isObject(obj) || isNil(obj)) {
    throw new Error(
      `Parameter passed to "toMap" function must be either an array or a plain object.`,
    );
  }
  if (Array.isArray(obj)) {
    const map = new Map();
    return obj.reduce((acc, o, i) => {
      const key = keyBy && keyBy in o ? o[keyBy] : i;
      acc.set(key, o);
      return acc;
    }, map);
  }
  if (isPlainObject(obj)) {
    return new Map(Object.entries(obj));
  }
};

const coerceToBoolean = (value: unknown): boolean => {
  return !isNil(value) && `${value}` !== 'false';
};

export const toBoolean = (value: unknown) => coerceToBoolean(value);

/** Create a memoize version of a pure function. */
export const memoize = <T>(fn: (str: string) => T) => {
  const cache = {};
  return function cachedFn(str) {
    return cache[str] || (cache[str] = fn(str));
  };
};

/** Camelize a hyphen-delimited string. */
export const camelize = memoize(function (str: string) {
  return str.replace(/-(\w)/g, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});

/** Capitalize a string. */
export const capitalize = memoize((str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/** Hyphenate a camelCase string. */
export const hyphenate = memoize((str: string): string => {
  return String(str)
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
});

export const stripUnit = (value: string): number =>
  value.match(/\d+/g) ? parseInt(value, 10) : +value;

export const toPx = (value: number | string) => {
  return typeof value == 'string' ? `${stripUnit(value)}px` : `${value}px`;
};

export const percentage = (num: number, den: number): string => {
  const ratio = Number.parseFloat(String((num / den) * 100));
  let ratioStr = `${ratio}`;
  if (ratioStr.split('.').length > 1 && ratioStr.split('.')[1].length > 3) {
    ratioStr = ratio.toFixed(3);
  }
  return `${ratioStr}%`;
};

// const quoteExp = /[\'\"]/;
export const unquote = (str: string): string => {
  if (!str) return '';
  let unquoted = str;

  if (str.startsWith('"') || str.startsWith("'")) {
    unquoted = str.slice(1);
  }
  if (str.endsWith('"') || str.endsWith("'")) {
    unquoted = unquoted.slice(0, unquoted.length - 2);
  }

  return unquoted;
};
