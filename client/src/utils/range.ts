/**
 * Generate a range of numbers.
 *
 * @param {number} start The number range should start at.
 * @param {number} stop  The number range should end at.
 * @param {number} step  The length between two points within the range.
 * @return {number[]}    An array of numbers denoting the steps in range.
 */
export function range(
  start: number,
  stop?: number,
  step: number = 1,
): number[] {
  if (!stop) {
    stop = start;
    start = 0;
  }
  return Array.from(
    { length: (stop - start) / step },
    (_, i) => start + i * step,
  );
}

/** OLD */

/**
 * Generate an array of numbers within a range.
 *
 * @param {Number} from  The number range should start at.
 * @param {Number} to    [Optional] The number range should end at.
 * @param {Number} step  [Optional] The length between two points within the range.
 * @return {Number[]}    An array of numbers denoting the steps in range.
 *
 * @example:
 * ```
 * const r = range(2, 5); // => [2, 3, 4, 5]`
 * const r2 = range(7); // => [1, 2, 3, 4, 5, 6, 7]`
 * const r3 = range(0, 10, 2); // => [0, 2, 4, 6, 8, 10]`
 * const r4 = range(1, 10, 2); // => [2, 4, 6, 8, 10]`
 * ```
 */
// export const range = (from: number, to?: number, step = 1): number[] => {
//   const arr = [];

//   if (!to) {
//     to = from;
//     from = 1;
//   }
//   while (from <= to) {
//     arr.push(from);
//     from++;
//   }

//   return arr.filter((num) => num % step === 0);
// };
