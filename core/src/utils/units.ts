import { isNumber } from './common'

const BASE_FONT_SIZE = 16

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

export const normalizeUnit = (value: string | number, baseFontSize = BASE_FONT_SIZE): number => {
  const unit = getUnit(value)
  const baseUnitSize = !unit || unit === 'px' ? 1 : baseFontSize
  return stripUnit(value) * baseUnitSize
}

export const normalizeUnits = (...values: (string | number)[]): number => {
  return values.reduce(
    (acc: number, size: string | number) => acc + normalizeUnit(size),
    0,
  ) as number
}

export const toRatio = (value: number | string, baseUnitSize = BASE_FONT_SIZE): number => {
  const denominator = baseUnitSize ? normalizeUnit(baseUnitSize) : baseUnitSize
  return normalizeUnit(value) / denominator
}

export const toPX = (value: string | number) => `${Math.floor(normalizeUnit(value))}px`

// TODO: Replace w/ `toRatio`
const toRelativeUnit = (value: string | number, baseFontSize = BASE_FONT_SIZE) =>
  normalizeUnit(value) / baseFontSize

export const toEM = (value: number) => (value > 0 ? `${toRelativeUnit(value)}em` : '0')
export const toREM = (value: number) => (value > 0 ? `${toRelativeUnit(value)}rem` : '0')

export const toPercent = (num: number, den?: number) =>
  den ? `${(num / den) * 100}%` : num > 0 && num < 1 ? `${num * 100}%` : `${num}%`

export const percentage = (num: number, den: number): string => {
  const ratio = Number.parseFloat(String((num / den) * 100))
  let ratioStr = `${ratio}`
  if (ratioStr.split('.').length > 1 && ratioStr.split('.')[1].length > 3) {
    ratioStr = ratio.toFixed(3)
  }
  return `${ratioStr}%`
}

export const maybeApplyUnit = (value: any, unit = 'rem') => {
  if (isUnit(value)) return value

  switch (unit) {
    case 'rem':
      return toREM(value)
    case 'em':
      return toEM(value)
    case '%':
      return toPercent(value)
    case 'px':
    default:
      return toPX(value)
  }
}
