/**
 * Generate a unique ID.
 *
 * @example `const id = uuid(5, 'checkbox-'); // returns 'checkbox-0js9s'
 *
 * @author Gordon Brander <github.com/gordonbrander>
 * @see https://gist.github.com/gordonbrander/2230317
 *
 * @param {Number} limit The max length of the generated ID
 * @param {String} prefix Text to prepend to the ID
 * @returns {String}
 *
 * NOTE: There is no 100% guarantee of unique-ness here. `Math.random` "should" be
 * unique because of its seeding algorithm. Convert it to base-36 (numbers + letters),
 * and grab the first 9 characters after the decimal.
 */
export const uuid = (limit = 9, prefix = ''): string =>
  prefix + Math.random().toString(36).substring(2, limit)
