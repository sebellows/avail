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
isEqual('a', 'a') //=> true
isEqual([1, 2, 3], [1, 2, 3]) //=> true
isEqual(isEqual, isEqual) //=> true
isEqual(/a/, /a/) //=> true
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
isEqual(/a/i, /b/g) //=> false
```
 */

import { hasOwn, typeOf } from './common'

export function isEqual(a: any, b: any) {
  let ctor = typeOf(a),
    len: number,
    i: number

  if (a === b) return true

  if (a && b && ctor === typeOf(b)) {
    if (ctor === 'date') return a.getTime() === b.getTime()
    if (ctor === 'regexp') return a.toString() === b.toString()

    if (ctor === 'array') {
      if ((len = a.length) === b.length) {
        while (len-- && isEqual(a[len], b[len])) {}
      }
      return len === -1
    }

    if (ctor === 'map' || ctor === 'set') {
      if (a.size !== b.size) return false
      let entries = a.entries(),
        e: any
      while (!(e = entries.next()).done) if (!b.has(e.value[0])) return false
      if (ctor === 'map') {
        while (!(e = entries.next()).done) if (!isEqual(e.value[1], b.get(e.value[0]))) return false
      }
      return true
    }

    if (ctor === 'arraybuffer') {
      a = new Uint8Array(a)
      b = new Uint8Array(b)
    } else if (ctor === 'dataview') {
      if ((len = a.byteLength) === b.byteLength) {
        while (len-- && a.getInt8(len) === b.getInt8(len)) {}
      }
      return len === -1
    }

    if (ArrayBuffer.isView(a)) {
      if ((len = a.byteLength) === b.byteLength) {
        while (len-- && a[len] === b[len]) {}
      }
      return len === -1
    }

    if (ctor === 'object') {
      let keys = Object.keys(a)
      len = Object.keys(a).length
      for (i = len; i-- !== 0; ) {
        if (!hasOwn(b, keys[i])) return false
        if (!isEqual(a[keys[i]], b[keys[i]])) return false
      }
      return Object.keys(b).length === len
    }
  }

  return false
}

/**
 * Dequal-Lite
 */

export function isFastEqual(a: any, b: any) {
  if (a === b) return true

  let ctor = typeOf(a),
    keys: string[],
    len: number,
    i: number

  if (a && b && ctor === b.constructor) {
    if (ctor === 'date') return a.getTime() === b.getTime()
    if (ctor === 'regexp') return a.toString() === b.toString()

    if (ctor === 'array') {
      if ((len = a.length) === b.length) {
        while (len-- && isFastEqual(a[len], b[len])) {}
      }
      return len === -1
    }

    if (ctor === 'object') {
      keys = Object.keys(a)
      len = Object.keys(a).length
      for (i = len; i-- !== 0; ) {
        if (!hasOwn(b, keys[i])) return false
        if (!isFastEqual(a[keys[i]], b[keys[i]])) return false
      }
      return Object.keys(b).length === len
    }
  }

  return false
}
