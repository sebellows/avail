import assert from 'assert'
import { hasOwn, isBoolean, isPlainObject } from '../../../core/src'

/**
 * @name clear
 * @description - Clear the terminal screen if possible.
 *
 * Adapted from `node-clear` package
 * @see {@link https://github.com/bahamas10/node-clear}
 */
export function clear(opts: boolean | { fullClear?: boolean }): void {
  if (typeof opts === 'boolean') {
    opts = {
      fullClear: opts as boolean,
    }
  }

  const optsObj = (opts ?? {}) as { fullClear?: boolean }

  assert(isPlainObject(optsObj), '`opts` must be an object')

  optsObj.fullClear = hasOwn(optsObj, 'fullClear') ? opts.fullClear : true

  assert(isBoolean(opts.fullClear), '`fullClear` for `clear` options must be a boolean')

  if (opts.fullClear === true) {
    process.stdout.write('\x1b[2J')
  }

  process.stdout.write('\x1b[0f')
}
