import { hasOwn, isNil, isNumber, isObject, isString } from './common';

export function classNames(...args: any[]): string {
  const classes: any[] = [];

  for (const arg of args) {
    if (isNil(arg) || arg === '') continue;

    if (isString(arg) || isNumber(arg)) {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = classNames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (isObject(arg)) {
      for (const key in arg) {
        if (hasOwn(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}
