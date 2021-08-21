/**
 * Round to 2 decimal places
 *
 * @example
 * const num = roundTo2DecimalPlaces(1.32345678) //=> 1.32
 */
export function roundTo2DecimalPlaces(decimal: number): number {
  return Math.round(decimal * 100) / 100
}
