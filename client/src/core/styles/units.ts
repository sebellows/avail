import { FONT_SIZE_ROOT } from '../constants'
import { isNumber } from '../utils'

export type CSSUnit = 'px' | 'em' | 'rem'

export const isUnit = (value: number | string): boolean =>
  /[-+]{0,1}\d(.?)+(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/g.test(String(value))

export const isUnitless = (value: number | string): boolean => isNumber(value) || !isUnit(value)

export const getUnit = (value: number | string): string | null => {
  if (!isUnit(value)) return null

  const numStr = String(value)
  const unitStartIndex = numStr.split('').findIndex((str) => /[a-z]/g.test(str))

  return numStr.slice(unitStartIndex)
}

export const stripUnit = (value: number | string): number =>
  (isUnit(value) ? parseFloat(String(value)) : value) as number

export const normalizeUnit = (value: string | number): number => {
  const unit = getUnit(value)
  const baseUnitSize = !unit || unit === 'px' ? 1 : FONT_SIZE_ROOT
  return stripUnit(value) * baseUnitSize
}

export const normalizeUnits = (...values: (string | number)[]): number => {
  return values.reduce(
    (acc: number, size: string | number) => acc + normalizeUnit(size),
    0,
  ) as number
}

export const toRatio = (value: number | string, baseUnitSize): number => {
  const denominator = baseUnitSize ? normalizeUnit(baseUnitSize) : FONT_SIZE_ROOT
  return normalizeUnit(value) / denominator
}

export const toPX = (value: string | number) => `${Math.floor(normalizeUnit(value))}px`

const toRelativeUnit = (value: string | number) => normalizeUnit(value) / FONT_SIZE_ROOT

export const toEM = (value: number) => `${toRelativeUnit(value)}em`
export const toREM = (value: number, flag?: string) => {
  if (flag) {
    console.log(`${flag}->toREM`, value, toRelativeUnit(value))
  }
  return `${toRelativeUnit(value)}rem`
}

export const maybeApplyUnit = (value: any, unit = 'rem') => {
  if (isUnit(value)) return value

  switch (unit) {
    case 'rem':
      return toREM(value)
    case 'em':
      return toEM(value)
    case '%':
      return `${value}%`
    case 'px':
    default:
      return toPX(value)
  }
}
