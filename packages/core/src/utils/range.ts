/**
 * Generate a range of numbers.
 *
 * @param {number} start The number range should start at.
 * @param {number} stop  The number range should end at.
 * @param {number} step  The length between two points within the range.
 * @return {number[]}    An array of numbers denoting the steps in range.
 */
export function range(start: number, stop?: number, step: number = 1): number[] {
  if (!stop) {
    stop = start
    start = 0
  }
  return Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)
}
