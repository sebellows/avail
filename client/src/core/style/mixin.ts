/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from 'styled-components'
import { DARK, GRID_BREAKPOINTS, LINK_COLOR, SPACERS, VARIANTS, WHITE } from '../constants'
import { camelize, Color, get, isNil, isNumber, isPlainObject, typeOf } from '../utils'
import { maybeApplyUnit, toEM, toREM } from './units'
import { buttonVariant } from './buttons'
import { dropShadowMixin, shadow, shadowMixin, ShadowFactoryParams } from './shadows'
import { animationMixin, transitionMixin } from './transition'
import { generateSpacer, spacers, spacerMixin } from './spacers'
import { radiusMixin } from './radius'
import { zIndexes } from './zindex'
import { font } from './text'
import { color } from './colors'
import { CSSProperties } from 'react'

type CSSUnit = 'px' | 'em' | 'rem' | '%' | 'vh' | 'vw'

function getUnit(value: string | number, unit: CSSUnit = 'rem') {
  return typeof value === 'string' ? value : maybeApplyUnit(value, unit)
}

type ColorValue = {
  color: string
  opacity: number
}

function getColor(val: string | ColorValue, defaultValue = DARK) {
  if (isPlainObject(val)) {
    const colorValue = getColor((val as ColorValue).color, defaultValue)
    return Color(colorValue).alpha((val as ColorValue).opacity)
  }
  if (val === 'currentColor') {
    return val
  }
  const preset = get(color, val as string)
  if (preset) {
    return preset
  } else if (Color.isColor(val as string)) {
    return Color(val).string()
  }
  return defaultValue
}

export const cssTextToParams = (cssString: string): CSSProperties => {
  if (!cssString) return {}
  const rules = cssString.split(';').map((rule) => rule.trim())
  return rules.reduce((acc, rule) => {
    if (rule.length > 0) {
      let [key, value] = rule.split(': ,').map((r) => r.trim())
      if (value.endsWith(',')) {
        value = value.slice(0, -1)
      }
      acc[camelize(key)] = value
    }
    return acc
  }, {})
}

export const mixin = {
  darken: (colorValue: string, amount: number) => Color(colorValue).darken(amount).string(),
  lighten: (colorValue: string, amount: number) => Color(colorValue).lighten(amount).string(),
  rgba: (colorValue: string, opacity: number) => Color(colorValue).alpha(opacity).string(),
  invert: (hue: string) => (Color(hue).isDark() ? WHITE : DARK),
  buttonVariant,
  animation: animationMixin,
  transition: transitionMixin,
  shadow: shadowMixin,
  boxShadow: {
    bevel: (depth = 1, params: { highlight?: number; shadow?: number } = {}) => {
      return css`
        box-shadow: ${shadow.bevel(depth, params)};
      `
    },
    elevation: (depth = 0, params?: ShadowFactoryParams) => {
      return css`
        box-shadow: ${shadow.elevation(depth, params)};
      `
    },
    focusElevation: (level: number | string) =>
      css`
        box-shadow: ${shadow.focusElevation[level]};
      `,
  },
  dropShadow: dropShadowMixin,
  margin: generateSpacer('margin'),
  padding: generateSpacer('padding'),
  spacer: spacerMixin,
  mq: (bp: number | number[] | string | string[], ...content: any[]) => {
    const mqBP = Array.isArray(bp) ? bp : [bp]
    const queries =
      '@media ' +
      mqBP
        .map((bpUnit, i) => {
          let w = isNumber(bpUnit)
            ? bpUnit
            : bpUnit in GRID_BREAKPOINTS
            ? bpUnit === 'xs'
              ? GRID_BREAKPOINTS.xs.value
              : GRID_BREAKPOINTS[bpUnit]
            : null
          if (w) {
            if (i === 0) {
              return `(min-width: ${toEM(+bpUnit)})`
            } else if (i === mqBP.length - 1) {
              return `(max-width: ${toEM(+bpUnit)})`
            }
          }
          return ''
        })
        .filter((bpUnit) => bpUnit.length > 0)
        .join(' and ')
    return css`
      ${queries} {
        ${content}
      }
    `
  },
  border: (props?: { width?: string; style?: string; color?: string | ColorValue }) => {
    const width = props?.width ?? '1px'
    const style = props?.style ?? 'solid'
    const borderColor = props?.color ?? color.border.base

    return css`
      border: ${width} ${style} ${getColor(borderColor)};
    `
  },
  borderRadius: radiusMixin,
  bgColor: (val: string | ColorValue) =>
    css`
      background-color: ${getColor(val)};
    `,
  color: (val: string | ColorValue) =>
    css`
      color: ${getColor(val)};
    `,
  font: {
    size: font.size,
    weight: font.weight,
  },
  truncateText: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  clickable: css`
    cursor: pointer;
    user-select: none;
  `,
  hardwareAccelerate: css`
    transform: translateZ(0);
  `,
  flex: ({
    direction,
    inline = false,
    center,
    align,
    justify,
  }: {
    direction?: string
    inline?: boolean
    center?: boolean
    align?: string
    justify?: string
  }) => {
    const normalizeProp = (str: string) =>
      str.startsWith('flex-') ? str : str === 'start' || str === 'end' ? `flex-${str}` : str
    center = !isNil(center) ? center : !align && !justify
    align = align ? normalizeProp(align) : center ? 'center' : 'flex-start'
    justify = justify ? normalizeProp(justify) : center ? 'center' : 'flex-start'

    return css`
      display: ${inline ? 'inline-' : ''}flex;
      align-items: ${align};
      justify-content: ${justify};
      ${() => {
        if (direction) {
          return css`
            flex-direction: ${direction};
          `
        }
      }}
    `
  },
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  grid: {
    container: css`
      padding: ${toREM(spacers.base)};
    `,
    row: css`
      display: flex;
      flex-wrap: wrap;
      margin-left: -${toREM(spacers.base / 2)};
      margin-right: -${toREM(spacers.base / 2)};
    `,
    col: css`
      display: block;
      flex-basis: 0;
      flex-grow: 1;
      padding-left: ${toREM(spacers.base / 2)};
      padding-right: ${toREM(spacers.base / 2)};
      position: relative;
      max-width: 100%;
    `,
  },
  inlineFlexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  cover: css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `,
  center: {
    x: (percent = 50) => css`
      position: absolute;
      left: ${typeof percent === 'number' ? `${percent}%` : percent};
      transform: ${typeof percent === 'number'
        ? `translateX(${percent}%)`
        : `translateX(${percent})`};
    `,
    y: (percent = 50) => css`
      position: absolute;
      left: ${typeof percent === 'number' ? `${percent}%` : percent};
      transform: ${typeof percent === 'number'
        ? `translateY(${percent}%)`
        : `translateY(${percent})`};
    `,
    abs: (yPercent = 50, xPercent = yPercent) => {
      const y = typeof yPercent === 'number' ? `${yPercent}%` : yPercent
      const x = typeof xPercent === 'number' ? `${xPercent}%` : xPercent
      return css`
        position: absolute;
        top: ${y};
        left: ${x};
        transform: translate(${y}, ${x});
      `
    },
  },
  size: (width: string | number, height: string | number = width, unit?: CSSUnit) => {
    const w = getUnit(width, unit)
    const h = height !== width ? getUnit(height, unit) : w

    return css`
      width: ${w};
      height: ${h};
    `
  },
  maxHeight: (height: string | number, unit?: CSSUnit) => css`
    max-height: ${getUnit(height, unit)};
  `,
  maxWidth: (width: string | number, unit?: CSSUnit) => css`
    max-width: ${getUnit(width, unit)};
  `,
  minHeight: (height: string | number, unit?: CSSUnit) => css`
    min-height: ${getUnit(height, unit)};
  `,
  minWidth: (width: string | number, unit?: CSSUnit) => css`
    min-width: ${getUnit(width, unit)};
  `,
  minMaxHeight: (min: string | number, max: string | number, unit?: CSSUnit) => css`
    min-height: ${getUnit(min, unit)}
    max-height: ${getUnit(max, unit)}
  `,
  minMaxWidth: (min: string | number, max: string | number, unit?: CSSUnit) => css`
    min-width: ${getUnit(min, unit)}
    max-width: ${getUnit(max, unit)}
  `,
  appearanceNone: css`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  `,
  scrollableY: css`
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `,
  userSelect: css`
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `,
  customScrollbar: ({ width = 8, background = VARIANTS.secondary } = {}) => css`
    &::-webkit-scrollbar {
      width: ${width}px;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 99px;
      background: ${background};
    }
  `,
  link: (colorValue = LINK_COLOR) => css`
    cursor: pointer;
    color: ${colorValue};
    font-weight: 500;
    text-decoration: underline;
    &:hover,
    &:visited,
    &:active {
      color: ${colorValue};
    }
    &:hover {
      text-decoration: none;
    }
  `,
  zIndex: (val: string | number) => css`
    z-index: ${typeof val === 'string'
      ? val in zIndexes
        ? zIndexes[val]
        : isNumber(val)
        ? +val
        : 'initial'
      : val};
  `,
}
