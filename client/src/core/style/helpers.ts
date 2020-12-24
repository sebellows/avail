import { CSSObject, FlattenSimpleInterpolation } from 'styled-components'
import { camelize, variadic } from '../utils'
import { GRID_BREAKPOINTS } from '../constants'
import { ThemeProps } from './types'
import { isUnit, stripUnit, toEM, toREM } from './units'

export function toCSSObject(propKeys: string[], value: any): CSSObject {
  return propKeys.reduce((obj: CSSObject, propKey) => {
    obj[propKey] = value

    return obj
  }, {})
}

export const cssStringToObject = (cssString: string | FlattenSimpleInterpolation): CSSObject => {
  if (!cssString) return {}
  const parseStr = typeof cssString === 'string' ? cssString : cssString.toString()
  const rules = parseStr.split(';').map((rule) => rule.trim())
  return rules.reduce((acc, rule) => {
    if (rule.length > 0) {
      let [key, value] = rule.split(': ,').map((r) => r.trim())
      if (value?.endsWith(',')) {
        value = value.slice(0, -1)
      }
      acc[camelize(key)] = value
    }
    return acc
  }, {})
}

export function parseBreakpoints(...breakpoints: (number | string)[]) {
  return breakpoints
    .map((bp, i) => {
      if (typeof bp === 'string') {
        if (bp in GRID_BREAKPOINTS && bp !== 'xs') {
          return GRID_BREAKPOINTS[bp]
        }
        if (isUnit(bp)) {
          return stripUnit(bp)
        }
        return 0
      }
      return bp
    })
    .sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    }) as number[]
}

/**
 * Nest a CSSObject within a media-query-keyed CSSObject.
 */
export function responsive<T>(
  bps: number | number[] | string | string[],
  content: any[],
  callback: (value: T, index: number, array: T[]) => CSSObject,
): CSSObject[] {
  const rules = content.map(callback)
  const breakpoints = parseBreakpoints(...variadic(bps))

  return rules.map((rule, bpIndex) => {
    if (bpIndex === 0) return rule

    return { [`@media screen and (min-width: ${toEM(breakpoints[bpIndex - 1])})`]: rule }
  })
}

export function getResponsiveProp<T = number>(val: T | T[] | undefined, defaultVal: T[] = []): T[] {
  if (val === undefined) return defaultVal

  return Array.isArray(val) ? val : [val]
}

export function getResponsiveSpace(
  config: Record<string, any>, // Avail.Config<T>
  props: string[],
  spaceIndexes: number[] = [],
) {
  if (!Array.isArray(spaceIndexes)) {
    throw new Error('the property must be array of numbers')
  }

  if (spaceIndexes.length === 0) {
    return null
  }

  return responsive(config.media, spaceIndexes, (spaceIndex: number) =>
    toCSSObject(props, toREM(config.space[spaceIndex] as number)),
  )
}

export function responsiveStyle<T>(
  prop: string | [string, any],
  propValue: any = 'inherit',
  defaultValue: any = 'inherit',
) {
  return (props: T & ThemeProps) => {
    const { theme } = props
    const { media, ..._theme } = theme
    const [propName, propArg] = variadic(prop)

    return responsive(media, getResponsiveProp(props[propName], propArg), (value) => {
      if (typeof propValue === 'function') {
        return propValue(value, _theme)
      }
      return value ? { '&&': { [propName]: propValue } } : { '&&': { [propName]: defaultValue } }
    })
  }
}
