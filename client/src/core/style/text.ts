import { CSS_VALUE_PRESETS } from '../presets'
import {
  FONT_FAMILY_BASE,
  FONT_SIZE_BASE,
  FONT_SIZE_SM,
  FONT_SIZE_LG,
  H1_FONT_SIZE,
  H2_FONT_SIZE,
  H4_FONT_SIZE,
  H5_FONT_SIZE,
  H6_FONT_SIZE,
  H3_FONT_SIZE,
  LINE_HEIGHT_SM,
  LINE_HEIGHT_BASE,
  LINE_HEIGHT_LG,
} from '../constants'
import { maybeApplyUnit } from './units'

export const PresetFontSizes = Object.freeze({
  base: FONT_SIZE_BASE,
  sm: FONT_SIZE_SM,
  lg: FONT_SIZE_LG,
  h1: H1_FONT_SIZE,
  h2: H2_FONT_SIZE,
  h3: H3_FONT_SIZE,
  h4: H4_FONT_SIZE,
  h5: H5_FONT_SIZE,
  h6: H6_FONT_SIZE,
})

export type PresetFontSizeKey = keyof typeof PresetFontSizes
export type PresetFontSizeValue = typeof PresetFontSizes[PresetFontSizeKey]

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
  sizes: PresetFontSizes,
  size: (size: number | PresetFontSizeKey, unit = 'px') => {
    const fontSize =
      typeof size === 'string' && size in PresetFontSizes ? PresetFontSizes[size] : size
    return `font-size: ${maybeApplyUnit(fontSize, unit)};`
  },
}
