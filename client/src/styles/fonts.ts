/* eslint-disable @typescript-eslint/no-unused-vars */
import { CSSObject } from 'styled-components'
import { ThemeFontSize, ThemeFontKey, ThemeProps, BaseTheme, Theme } from '../theme'
import { get, pick, toRatio, toREM } from '../utils'
import {
  FontSizeProps,
  FontSizeStyleProps,
  FontWeightKey,
  FontWeightProps,
  FontWeightStyleProps,
  TextAlignStyleProps,
} from './types'
import { generateStyles } from './utils'

export const textAlignStyle = generateStyles<TextAlignStyleProps & ThemeProps>('textAlign')

export interface FontSettingProps extends FontSizeProps, FontWeightProps {}
export interface FontSettingStyleProps extends FontSizeStyleProps, FontWeightStyleProps {}

/**
 * A utility function getting responsive font styles.
 */
export function fontStyle(fontKey: ThemeFontKey) {
  return (props: FontSettingStyleProps & ThemeProps) => {
    const _fontSizeStyle = generateStyles('size', (value: number, i, props) => {
      // console.log('fontStyle', fontKey, value, props)
      return fontSize(get(props.theme, `fonts.${fontKey}.sizes.${value}`))
    })(props)
    const _fontWeightStyle = generateStyles('fontWeight', (value: FontWeightKey, i, props) => {
      return get(props.theme, `fonts.${fontKey}.weights.${value}`)
    })(props)

    return [_fontSizeStyle, _fontWeightStyle]
  }
}

/**
 * A utility function getting responsive font styles.
 */
export function fontSizeStyle(fontKey: ThemeFontKey, selectedKeys?: string[]) {
  return (props: FontSettingStyleProps & ThemeProps) => {
    return generateStyles('size', (value: number, i, props) => {
      const res = fontSize(get(props.theme, `fonts.${fontKey}.sizes.${value}`))
      return selectedKeys ? pick(res, ...selectedKeys) : res
    })(props)
  }
}

/**
 * A utility function getting responsive font styles.
 */
export function fontWeightStyle(fontKey: ThemeFontKey) {
  return (props: FontSettingStyleProps & ThemeProps) => {
    return generateStyles('fontWeight', (value: FontWeightKey, i, props) => {
      return get(props.theme, `fonts.${fontKey}.weights.${value}`)
    })(props)
  }
}

export const labelFontStyle = fontStyle('label')

export const headingStyle = fontStyle('heading')

const GLOBAL_FONT_SETTINGS = {
  ascenderScale: 0.1875, // 3/16
  descenderScale: 0.1875, // 3/16
  rootFontSize: 16,
  baseLineHeight: 21, // if rootFontSize is 16px, line-height would be ~21px
  iconScale: 1.25, // 20/16
}

function computedDescenderScale(size: ThemeFontSize) {
  if (size?.descenderHeight) {
    return Number((size.descenderHeight / size.fontSize).toFixed(4))
  }
  return GLOBAL_FONT_SETTINGS.descenderScale
}

function fontSize(size: ThemeFontSize): CSSObject {
  // console.log('fontSize', size)
  const descenderScale = computedDescenderScale(size)
  console.log('fontSize', size)
  const capHeight = Number((size.fontSize * (1 - descenderScale)).toFixed(4))
  const iconSize =
    size.iconSize ?? Number((size.fontSize * GLOBAL_FONT_SETTINGS.iconScale).toFixed(4))

  const typeOffset = descenderScale * size.fontSize
  // TODO: Magic number until lineHeight configuration is finalized
  const lineHeight =
    size.lineHeight > 10 ? toRatio(size.lineHeight, size.fontSize) : size.lineHeight
  const verticalSpace = (lineHeight - 1) / 2
  const topOffset = Number(((verticalSpace + descenderScale) * size.fontSize).toFixed(4))
  // console.log('fonts->fontSize', topOffset, verticalSpace, descenderScale, size.fontSize)

  return {
    fontSize: toREM(size.fontSize),
    lineHeight,
    letterSpacing: toREM(size.letterSpacing),
    transform: `translateY(${toREM(typeOffset)})`,

    '&::before': {
      marginTop: `calc(-${toREM(topOffset)} - 1px)`,
    },

    '&::after': {
      marginBottom: `-${toREM(1)}`,
    },

    '& [data-icon]': {
      fontSize: toREM(iconSize),
      lineHeight: 1,
      margin: toREM((capHeight - iconSize) / 2),
    },
  }
}

export function _fontSize(size: ThemeFontSize): CSSObject {
  const negHeight = size.ascenderHeight + size.descenderHeight
  const capHeight = size.lineHeight - negHeight

  return {
    fontSize: toREM(size.fontSize),
    lineHeight: toREM(size.lineHeight),
    letterSpacing: toREM(size.letterSpacing),
    transform: `translateY(${toREM(size.descenderHeight)})`,

    '&:before': {
      marginTop: `calc(${toREM(0 - negHeight)} - 1px)`,
    },

    '&:after': {
      marginBottom: '-1px',
    },

    '& [data-icon]': {
      fontSize: toREM(size.iconSize),
      lineHeight: 1,
      margin: toREM((capHeight - size.iconSize) / 2),
    },
  }
}
