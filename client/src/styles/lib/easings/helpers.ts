/** Round to 2 decimal places */
export function roundTo2DecimalPlaces(decimal: number): number {
  return Math.round(decimal * 100) / 100
}
