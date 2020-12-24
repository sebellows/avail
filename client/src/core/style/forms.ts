import { BLACK, BORDER_RADIUS, FONT_SIZE_ROOT, VARIANTS } from '../constants'
import { Color } from './libs'
import { font } from './text'
import { color } from './colors'
import { toEM, toREM } from './units'

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

export const CONTROL_SETTINGS: ControlSettings = {
  fontSize: FONT_SIZE_ROOT,
  lineHeight: BASE_LINE_HEIGHT,
  paddingX: CONTROL_PADDING_X,
  paddingY: CONTROL_PADDING_Y,
  borderWidth: CONTROL_BORDER_WIDTH,
}

export const calcControlHeight = (config: Partial<ControlSettings> = {}) => {
  const { paddingY, borderWidth, fontSize, lineHeight } = { ...CONTROL_SETTINGS, ...config }
  const py = paddingY * 2
  const bw = borderWidth * 2
  const innerHeight = fontSize * lineHeight

  return innerHeight + py + bw
}

export const control = {
  color: color.text.body,
  bg: color.bg.light,
  borderColor: color.border.light, // 'hsla(200, 7%, 8%, 0.05)'
  borderWidth: toREM(CONTROL_SETTINGS.borderWidth),
  borderRadius: toREM(BORDER_RADIUS),
  fontFamily: font.family.base,
  fontSize: toEM(CONTROL_SETTINGS.fontSize),
  lineHeight: CONTROL_SETTINGS.lineHeight,
  height: toREM(calcControlHeight()),
  paddingX: toREM(CONTROL_SETTINGS.paddingX),
  paddingY: toREM(CONTROL_SETTINGS.paddingY),
  active: {
    bg: color.component.active.bg,
    borderColor: color.border.light, // 'hsla(200, 7%, 8%, 0.1)' [light gray]
    boxShadowColor: color.component.active.focusBg, // --magenta
    boxShadow: `0 0 0 0.25rem ${color.component.active.focusBg}`,
    color: color.text.body,
  },
  checked: {
    bg: color.component.active.bg,
    borderColor: color.component.active.borderColor,
    invalid: VARIANTS.danger,
  },
  disabled: {
    bg: Color(BLACK).alpha(0.075).string(),
    color: Color(BLACK).alpha(0.8).string(),
    borderColor: color.component.borderColor,
  },
  focus: {
    borderColor: Color(color.component.active.focusBorder).alpha(0.4).string(), // --magenta
  },
  invalid: {
    bg: Color(VARIANTS.danger).alpha(0.2).string(),
    borderColor: VARIANTS.danger,
    color: VARIANTS.danger,
  },
}
