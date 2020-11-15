/**
 * `isEqual`
 * 
 * Original Source: dequal.js
 * @author Luke Edwards <https://github.com/lukeed>
 * @license MIT {@link https://github.com/lukeed/dequal/blob/master/license}
 * @see {@link https://github.com/lukeed/dequal/blob/master/src/index.js}
 *
 * # dequal [![CI](https://github.com/lukeed/dequal/workflows/CI/badge.svg)]
 * (https://github.com/lukeed/dequal/actions)
 *
 * > A tiny (304B to 489B) utility to check for deep equality
 *
 * This module supports comparison of all types, including `Function`,
 * `RegExp`, `Date`, `Set`, `Map`, `TypedArray`s, `DataView`, `null`,
 * `undefined`, and `NaN` values. Complex values (eg, Objects, Arrays, Sets,
 * Maps, etc) are traversed recursively.
 *
 * > **Important:**
 * > * key order **within Objects** does not matter
 * > * value order **within Arrays** _does_ matter
 * > * values **within Sets and Maps** use value equality
 * > * keys **within Maps** use value equality
 *
 * ## Usage

```js
import { isEqual } from 'isEqual'

isEqual(1, 1) //=> true
isEqual({}, {}) //=> true
isEqual('foo', 'foo') //=> true
isEqual([1, 2, 3], [1, 2, 3]) //=> true
isEqual(isEqual, isEqual) //=> true
isEqual(/foo/, /foo/) //=> true
isEqual(null, null) //=> true
isEqual(NaN, NaN) //=> true
isEqual([], []) //=> true
isEqual(
  [{ a:1 }, [{ b:{ c:[1] } }]],
  [{ a:1 }, [{ b:{ c:[1] } }]]
) //=> true

isEqual(1, '1') //=> false
isEqual(null, undefined) //=> false
isEqual({ a:1, b:[2,3] }, { a:1, b:[2,5] }) //=> false
isEqual(/foo/i, /bar/g) //=> false
```
 */

import { hasOwn } from './common'

type KeyIterator<T> = { keys: () => any } & T

function find<T>(iter: KeyIterator<T>, tar: any, key?: any) {
  for (key of iter.keys()) {
    if (isEqual(key, tar)) return key
  }
}

export function isEqual(foo, bar) {
  let ctor, len, tmp

  if (foo === bar) return true

  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime()
    if (ctor === RegExp) return foo.toString() === bar.toString()

    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && isEqual(foo[len], bar[len])) {}
      }
      return len === -1
    }

    if (ctor === Set) {
      if (foo.size !== bar.size) {
        return false
      }
      for (len of foo) {
        tmp = len
        if (tmp && typeof tmp === 'object') {
          tmp = find(bar, tmp)
          if (!tmp) return false
        }
        if (!bar.has(tmp)) return false
      }
      return true
    }

    if (ctor === Map) {
      if (foo.size !== bar.size) {
        return false
      }
      for (len of foo) {
        tmp = len[0]
        if (tmp && typeof tmp === 'object') {
          tmp = find(bar, tmp)
          if (!tmp) return false
        }
        if (!isEqual(len[1], bar.get(tmp))) {
          return false
        }
      }
      return true
    }

    if (ctor === ArrayBuffer) {
      foo = new Uint8Array(foo)
      bar = new Uint8Array(bar)
    } else if (ctor === DataView) {
      if ((len = foo.byteLength) === bar.byteLength) {
        while (len-- && foo.getInt8(len) === bar.getInt8(len)) {}
      }
      return len === -1
    }

    if (ArrayBuffer.isView(foo)) {
      if ((len = foo.byteLength) === bar.byteLength) {
        while (len-- && foo[len] === bar[len]) {}
      }
      return len === -1
    }

    if (!ctor || typeof foo === 'object') {
      len = 0
      for (ctor in foo) {
        if (hasOwn(foo, ctor) && ++len && !hasOwn(bar, ctor)) return false
        if (!(ctor in bar) || !isEqual(foo[ctor], bar[ctor])) return false
      }
      return Object.keys(bar).length === len
    }
  }

  return false
}

/**
 * Dequal-Lite
 */

export function isFastEqual(foo, bar) {
  if (foo === bar) return true

  let ctor = foo.constructor,
    len

  if (foo && bar && ctor === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime()
    if (ctor === RegExp) return foo.toString() === bar.toString()

    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && isFastEqual(foo[len], bar[len])) {}
      }
      return len === -1
    }

    if (!ctor || typeof foo === 'object') {
      len = 0
      for (ctor in foo) {
        if (hasOwn(foo, ctor) && ++len && !hasOwn(bar, ctor)) return false
        if (!(ctor in bar) || !isFastEqual(foo[ctor], bar[ctor])) return false
      }
      return Object.keys(bar).length === len
    }
  }

  return false
}
