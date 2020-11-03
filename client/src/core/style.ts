import { css } from 'styled-components'
import { Color, isNil, isString } from './utils'
import { CSS_VALUE_PRESETS } from './presets'
import {
  BODY_BG,
  BODY_COLOR,
  COLORS,
  GRAYS,
  VARIANTS,
  WHITE,
  LINK_COLOR,
  FONT_FAMILY_BASE,
  FONT_SIZE_BASE,
  FONT_SIZE_SM,
  FONT_SIZE_LG,
  FONT_SIZE_ROOT,
  H1_FONT_SIZE,
  H2_FONT_SIZE,
  H4_FONT_SIZE,
  H5_FONT_SIZE,
  H6_FONT_SIZE,
  H3_FONT_SIZE,
  SPACERS,
  LINK_DECORATION,
  LINK_HOVER_COLOR,
  LINK_HOVER_DECORATION,
  BLACK_06,
  BLACK_12,
  LINE_HEIGHT_SM,
  LINE_HEIGHT_BASE,
  LINE_HEIGHT_LG,
} from './constants'
import { isNumber } from './utils'
// set in px units
export const BASE_FONT_SIZE = 16
export const BASE_LINE_HEIGHT = 1.5
export const CONTROL_PADDING_X = 12
export const CONTROL_PADDING_Y = 5
export const CONTROL_BORDER_WIDTH = 1.5

export interface ControlSettings {
  fontSize: number
  lineHeight: number
  paddingX: number
  paddingY: number
  borderWidth: number
}

export type CSSUnit = 'px' | 'em' | 'rem'

export const CONTROL_SETTINGS: ControlSettings = {
  fontSize: FONT_SIZE_ROOT,
  lineHeight: BASE_LINE_HEIGHT,
  paddingX: CONTROL_PADDING_X,
  paddingY: CONTROL_PADDING_Y,
  borderWidth: CONTROL_BORDER_WIDTH,
}

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

export const color = {
  ...COLORS,
  ...VARIANTS,

  text: {
    body: BODY_COLOR,
    dark: VARIANTS.dark,
    medium: GRAYS['gray-600'],
    light: WHITE,
    muted: GRAYS['gray-500'],
    link: LINK_COLOR,
  },

  bg: {
    body: BODY_BG,
    dark: VARIANTS.dark,
    medium: VARIANTS.secondary,
    light: VARIANTS.light,
    hovered: VARIANTS.light,
    focused: Color(VARIANTS.light).darken(0.1).string(),
    muted: GRAYS['gray-500'],
    active: VARIANTS.primary,
    activeLight: Color(VARIANTS.primary).lighten(0.2).string(),
    activeDark: Color(VARIANTS.primary).darken(0.2).string(),
  },

  border: {
    base: BLACK_12,
    light: BLACK_06,
  },

  component: {
    active: {
      color: WHITE,
      bg: VARIANTS.primary,
      borderColor: VARIANTS.primary,
      focusBg: Color(COLORS.magenta).alpha(0.25).hsl().string(),
      focusBorder: Color(COLORS.magenta).hsl().string(),
    },
  },

  compute: (c: string) => Color(c),
}

export const font = {
  family: {
    base: FONT_FAMILY_BASE,
  },
  lineHeight: {
    base: LINE_HEIGHT_BASE,
    sm: LINE_HEIGHT_SM,
    lg: LINE_HEIGHT_LG,
  },
  weight: (value: string | number) => {
    if (CSS_VALUE_PRESETS.fontWeight.includes(`${value}`)) {
      return `font-weight: ${CSS_VALUE_PRESETS.fontWeight[`${value}`]};`
    }
    return `font-weight: normal;`
  },
  sizes: {
    base: FONT_SIZE_BASE,
    sm: FONT_SIZE_SM,
    lg: FONT_SIZE_LG,
    h1: H1_FONT_SIZE,
    h2: H2_FONT_SIZE,
    h3: H3_FONT_SIZE,
    h4: H4_FONT_SIZE,
    h5: H5_FONT_SIZE,
    h6: H6_FONT_SIZE,
  },
  size: (size: number) => `font-size: ${size}px;`,
}

export const calcControlHeight = (config: Partial<ControlSettings> = {}) => {
  const { paddingY, borderWidth, fontSize, lineHeight } = { ...CONTROL_SETTINGS, ...config }
  const py = paddingY * 2
  const bw = borderWidth * 2
  const innerHeight = fontSize * lineHeight

  return innerHeight + py + bw
}

export const spacers = {
  ...SPACERS,
  none: SPACERS[0],
  xs: SPACERS[1],
  sm: SPACERS[2],
  base: SPACERS[3],
  lg: SPACERS[4],
  xl: SPACERS[5],
  controlX: CONTROL_PADDING_X,
  controlY: CONTROL_PADDING_Y,
  auto: 'auto',
}

export const radius = {
  none: '0',
  base: '0.25rem',
  sm: '0.2rem',
  lg: '0.325rem',
  pill: '50rem',
  circle: '50%',
}

// const SHADOW_UMBRA = Color(BLACK).alpha(0.2).string()
// const SHADOW_PENUMBRA = Color(BLACK).alpha(0.14).string()
// const SHADOW_AMBIENCE = Color(BLACK).alpha(0.12).string()

const FOCUS_SHADOW_UMBRA = Color(COLORS.magenta).alpha(0.5).string()
const FOCUS_SHADOW_PENUMBRA = Color(COLORS.magenta).alpha(0.3).string()
const FOCUS_SHADOW_AMBIENCE = Color(COLORS.magenta).alpha(0.18).string()

const DEFAULT_SHADOW_SETTINGS = { umbra: 0.2, penumbra: 0.14, ambience: 0.12 }
const FOCUS_SHADOW_SETTINGS = { umbra: 0.5, penumbra: 0.3, ambience: 0.18 }

type ShadowFactoryParams = {
  ambience?: number
  umbra?: number
  penumbra?: number
}

// const umbraFactory = (d: number) => `0 ${d}px`
const shadowFactory = (
  hue: string = color.black,
  params: ShadowFactoryParams = DEFAULT_SHADOW_SETTINGS,
) => {
  params = { ambience: 0, umbra: 0, penumbra: 0, ...params }
  const umbra = Color(hue).alpha(params.umbra).string()
  const penumbra = Color(hue).alpha(params.penumbra).string()
  const ambience = Color(hue).alpha(params.ambience).string()

  return {
    0: `0 1px 2px 0px ${ambience}`,
    1: `0 2px 4px -1px ${umbra}`,
    2: `0 4px 5px 0 ${penumbra}`,
    3: `0 1px 10px 0 ${ambience}`,
    depth1: `0 2px 1px -1px ${umbra}, 0 1px 1px 0 ${penumbra}, 0 1px 3px 0 ${ambience}`,
    depth2: `0 1px 5px 0 ${umbra}, 0 2px 2px 0 ${penumbra}, 0 3px 1px -2px ${ambience}`,
    depth3: `0 1px 8px 0 ${umbra}, 0 3px 4px 0 ${penumbra}, 0 3px 3px -2px ${ambience}`,
    depth4: `0 2px 4px -1px ${umbra}, 0 4px 5px 0 ${penumbra}, 0 1px 10px 0 ${ambience}`,
    depth5: `0 3px 5px -1px ${umbra}, 0 5px 8px 0 ${penumbra}, 0 1px 14px 0 ${ambience}`,
    depth6: `0 3px 5px -1px ${umbra}, 0 6px 10px 0 ${penumbra}, 0 1px 18px 0 ${ambience}`,
  }
}

const shadowLevels = shadowFactory()

export const shadow = {
  levels: shadowLevels,
  get: (...depths: any[]) =>
    depths
      .reduce((acc, depth) => {
        if (shadowLevels[depth]) {
          acc.push(shadowLevels[depth])
        } else {
          acc.push(depth)
        }
        return acc
      }, [])
      .join(', '),
  bevel: ({ highlight = 0.5, shadow = 0.25, depth: d = 1 }) => {
    return (
      `inset ${d}px ${d}px ${d + 1}px 0 ${color.compute(color.white).alpha(highlight).string()}, ` +
      `inset -${d}px -${d}px ${d + 1}px 0 ${color.compute(color.white).alpha(shadow).string()}`
    )
  },
  focusShadow: shadowFactory(color.magenta, FOCUS_SHADOW_SETTINGS),
}

export const focusShadow = shadow.focusShadow

export const focusDropShadow = {
  0: `0 0px 2px ${FOCUS_SHADOW_PENUMBRA}`,
  1: `0 0px 4px ${FOCUS_SHADOW_UMBRA}`,
  2: `0 0px 5px ${FOCUS_SHADOW_PENUMBRA}`,
  3: `0 0px 10px ${FOCUS_SHADOW_UMBRA}`,
  depth1: `0 0px 2px ${FOCUS_SHADOW_AMBIENCE}`,
  depth2: `0 0px 2px ${FOCUS_SHADOW_PENUMBRA}`,
  depth3: `0 0px 4px ${FOCUS_SHADOW_UMBRA}`,
  depth4: `0 0px 5px ${FOCUS_SHADOW_PENUMBRA}`,
  depth5: `0 0px 10px ${FOCUS_SHADOW_UMBRA}`,
}

export const link = {
  color: LINK_COLOR,
  decoration: LINK_DECORATION,
  hover: {
    color: LINK_HOVER_COLOR,
    decoration: LINK_HOVER_DECORATION,
  },
}

export const control = {
  color: VARIANTS.dark,
  bg: VARIANTS.light,
  borderColor: BLACK_06, // 'hsla(200, 7%, 8%, 0.05)'
  borderWidth: toREM(CONTROL_SETTINGS.borderWidth),
  borderRadius: radius.base,
  fontFamily: font.family.base,
  fontSize: toEM(CONTROL_SETTINGS.fontSize),
  lineHeight: CONTROL_SETTINGS.lineHeight,
  height: toREM(calcControlHeight()),
  paddingX: toREM(CONTROL_SETTINGS.paddingX),
  paddingY: toREM(CONTROL_SETTINGS.paddingY),
  active: {
    bg: WHITE,
    borderColor: Color(BLACK_06).darken(0.05).string(), // 'hsla(200, 7%, 8%, 0.1)' [light gray]
    boxShadowColor: 'hsla(330, 67%, 52%, 0.1)', // --magenta
    boxShadow: '0 0 0 0.25rem hsla(330, 67%, 52%, 0.1)',
    color: VARIANTS.dark,
  },
  checked: {
    bg: VARIANTS.primary,
    borderColor: VARIANTS.primary,
    invalid: VARIANTS.danger,
  },
  disabled: {
    bg: Color(VARIANTS.light).darken(0.3).alpha(0.3).string(),
    color: Color(VARIANTS.dark).lighten(0.3).alpha(0.8).string(),
    borderColor: BLACK_12,
  },
  focus: {
    borderColor: Color(COLORS.magenta).alpha(0.4).hsl().string(), // --magenta
  },
  invalid: {
    bg: Color(VARIANTS.danger).alpha(0.2).string(),
    borderColor: VARIANTS.danger,
    color: VARIANTS.danger,
  },
}

const buttonVariant = (value: string) => {
  const bg = Color(value)
  const borderColor = Color(value)
  const textColor = Color(value).isDark() ? Color(color.white) : Color(color.dark)

  return css`
    background-color: ${bg.string()};
    border: ${control.borderWidth} solid ${borderColor.string()};
    color: ${textColor.string()};
    text-decoration: none;
    &:hover,
    &:focus {
      background-color: ${bg.darken(0.2).string()};
      border-color: ${borderColor.darken(0.2).string()};
      color: ${textColor.string()};
      text-decoration: none;
    }
    &:disabled {
      background-color: ${bg.alpha(0.8).desaturate(0.3).string()};
      border-color: transparent;
      color: ${textColor.alpha(0.8).string()};
      outline: none;
      pointer-events: none;
    }
  `
}

export const sizes = {
  minViewportWidth: 1000,
}

export const zIndexes = {
  modal: 1000,
  dialog: 1001,
  submitBtn: 50,
  tooltip: 100,
  dropdown: 101,
  toast: 105,
}

export const transition = {
  duration: {
    linear: '80ms',
    enter: '300ms',
    leave: '300ms',
    easeIn: '300ms',
    easeOut: '400ms',
    easeInOut: '500ms',
  },
  timing: {
    enter: 'cubic-bezier(0, 0, 0.2, 0.1)', // linearOutSlowIn
    leave: 'cubic-bezier(0.4, 0, 1, 1)', // fastOutLinearIn
    easeIn: 'cubic-bezier(0.55, 0, 0.55, 0.2)',
    easeOut: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    easeInOut: 'cubic-bezier(0.35, 0, 0.25, 1)',
    fastOutSlowIn: 'cubic-bezier(0.4, 0, 0.2, 1)',
    fastOutLinearIn: 'cubic-bezier(0.4, 0, 1, 1)',
    linearOutSlowIn: 'cubic-bezier(0, 0, 0.2, 0.1)',
  },
}

const directions = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  x: 'left right',
  y: 'top bottom',
}

export function generateSpacer(prop: string) {
  function makeRule(dir: string, ...sizes: any[]) {
    let spacing = '0'
    let rule = ''

    spacing = sizes.map((sz) => (isUnitless(sz) ? toREM(spacers[sz]) ?? toREM(sz) : sz)).join(' ')

    if (!dir) {
      rule = `${prop}: ${spacing};`
    } else {
      if (dir === 'x' || dir === 'y') {
        const [start, end] = directions[dir].split(' ')
        rule = `${prop}-${start}: ${spacing}; ${prop}-${end}: ${spacing};`
      } else {
        rule = `${prop}-${directions[dir]}: ${spacing};`
      }
    }

    return css`
      ${rule}
    `
  }

  return {
    all: (...sizes: any[]) => makeRule(null, ...sizes),
    top: (...sizes: any[]) => makeRule('top', ...sizes),
    right: (...sizes: any[]) => makeRule('right', ...sizes),
    bottom: (...sizes: any[]) => makeRule('bottom', ...sizes),
    left: (...sizes: any[]) => makeRule('left', ...sizes),
    x: (...sizes: any[]) => makeRule('x', ...sizes),
    y: (...sizes: any[]) => makeRule('y', ...sizes),
  }
}

interface TransitionParams {
  dur?: string
  timing?: string
  delay?: string
}

export const mixin = {
  darken: (colorValue: string, amount: number) => Color(colorValue).darken(amount).string(),
  lighten: (colorValue: string, amount: number) => Color(colorValue).lighten(amount).string(),
  rgba: (colorValue: string, opacity: number) => Color(colorValue).alpha(opacity).string(),
  buttonVariant,
  transition: (params: string | TransitionParams, ...props: string[]) => {
    let dur,
      timing,
      delay = '0ms'
    if (typeof params == 'string') {
      dur = params
      timing = params
    } else {
      dur = params.dur
      timing = params?.timing ?? params.dur
      if (params?.delay) delay = params.delay
    }
    const transValue = `${transition[dur] ?? dur} ${transition[timing] ?? timing} ${delay}`
    if (props?.length) {
      return css`
        transition: ${props.map((prop) => prop + ' ' + transValue).join(', ')};
      `
    }
    return css`
      transition: all ${transValue};
    `
  },
  invert: (hue: string) => (Color(hue).isDark() ? color.white : color.dark),
  shadow: (...levels: (number | string)[]) => css`
    box-shadow: ${levels
      .reduce((acc, depth) => {
        if (shadow.levels[depth]) {
          acc.push(shadow.levels[depth])
        } else {
          acc.push(depth)
        }
        return acc
      }, [])
      .join(', ')};
  `,
  dropShadow: (...levels: number[]) => css`
    filter: ${levels
      .reduce((acc, depth) => {
        if (shadow[depth]) {
          acc.push(`drop-shadow(${shadow[depth]})`)
        } else {
          acc.push(`drop-shadow(${depth})`)
        }
        return acc
      }, [])
      .join(' ')};
  `,
  margin: generateSpacer('margin'),
  padding: generateSpacer('padding'),
  spacer: (...keys: (number | string)[]) => {
    return keys
      .reduce((acc, key) => {
        acc.push(isString(key) && !isNil(spacers[key]) ? toREM(spacers[key]) : maybeApplyUnit(key))
        return acc
      }, [])
      .join(' ')
  },
  borderRadius: (...keys: string[]) => css`
    border-radius: ${keys
      .reduce((acc, key) => {
        acc.push(radius[key])
        return acc
      }, [])
      .join(' ')};
  `,
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
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
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
  size: (width: string, height: string = width) => css`
    width: ${width};
    height: ${height};
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
  customScrollbar: ({ width = 8, background = color.bg.medium } = {}) => css`
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
  link: (colorValue = color.text.link) => css`
    cursor: pointer;
    color: ${colorValue};
    ${font.weight(500)}
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
}
