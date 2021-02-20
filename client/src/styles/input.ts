import { CSSObject } from 'styled-components'
import { BaseTheme, ThemeProps } from '../theme'
import { range, variadic, toREM } from '../utils'
import { FontSettingProps, FontSettingStyleProps, fontSizeStyle } from './fonts'
import {
  BorderStyleProps,
  // FontSizeProps,
  // FontSizeStyleProps,
  PaddingProps,
  PaddingStyleProps,
} from './types'
import { focusRingBorderStyle, focusRingStyle } from './focusRing'
import { generateResponsiveStyles } from './utils'
import { getBorderStyle } from './mixins'

export interface TextInputPaddingStyleProps
  extends FontSettingStyleProps,
    Pick<PaddingStyleProps, '$padding'> {
  $iconLeft?: boolean
  $iconRight?: boolean
}

export const inputPaddingStyle = ({
  $iconLeft,
  $iconRight,
  theme,
  ...props
}: TextInputPaddingStyleProps & ThemeProps) => {
  const { fonts, space: spaceScale } = theme

  const padding = variadic(props?.$padding ?? 0)
  const size = variadic(props?.$size ?? 'sm')

  const _padding: number[] = []
  const _size: number[] = []

  const sizeKeys = Object.keys(theme.fonts.text.sizes)

  const vals = range(Math.max(padding.length, size.length))
  vals.forEach((_, i) => {
    _padding[i] = padding[i] === undefined ? _padding[i - 1] : padding[i]
    _size[i] = size[sizeKeys[i]] === undefined ? _size[sizeKeys[i - 1]] : size[sizeKeys[i]]
  })

  return generateResponsiveStyles(theme, _padding, (_, i) => {
    const size = fonts.text.sizes[_size[i]] || fonts.text.sizes.sm
    const emSize = size.lineHeight - size.ascenderHeight - size.descenderHeight
    const valIndex = spaceScale.indexOf(_padding[i])
    // Need to set a default spacing value if one of the values passed is invalid.
    const p = valIndex > 0 ? spaceScale[valIndex] : spaceScale[3]

    // If the `[ascender/descender]Height` settings are larger than the padding value,
    // we need to ensure that a negative value or NaN is not passed instead.
    const pt = size.ascenderHeight < p ? p - size.ascenderHeight : p / 3
    const pb = size.descenderHeight < p ? p - size.descenderHeight : p / 3

    const styles = {
      paddingTop: toREM(pt),
      paddingRight: toREM(p),
      paddingBottom: toREM(pb),
      paddingLeft: toREM(p),
    }

    if ($iconRight) styles.paddingRight = toREM(p + emSize + p)
    if ($iconLeft) styles.paddingLeft = toREM(p + emSize + p)

    return styles
  })
}

interface InputPaddingStyleParams
  extends ThemeProps,
    FontSettingProps,
    Pick<PaddingProps, 'padding'> {}

export function inputPaddingIconsStyle(props: InputPaddingStyleParams) {
  return inputPaddingStyle({ ...props, $iconLeft: true, $iconRight: true })
}

export function inputPaddingIconLeftStyle(props: InputPaddingStyleParams) {
  return inputPaddingStyle({ ...props, $iconLeft: true })
}

export function inputPaddingIconRightStyle(props: InputPaddingStyleParams) {
  return inputPaddingStyle({ ...props, $iconRight: true })
}

export const textInputStyle = {
  root: () => [rootStyle],
  input: () => [inputBaseStyle, inputFontSizeStyle],
  representation: [representationStyle],
}

function rootStyle(): CSSObject {
  return {
    '&:not([hidden])': {
      display: 'flex',
    },
  }
}

export interface TextInputStyleProps extends FontSettingStyleProps {}

function inputBaseStyle({
  $fontWeight,
  theme,
}: TextInputStyleProps & ThemeProps<BaseTheme>): CSSObject {
  const { fonts, color: themeColor } = theme
  const font = fonts.text
  const color = themeColor.input

  return {
    appearance: 'none',
    background: 'none',
    border: 0,
    borderRadius: 0,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: font.family,
    fontWeight: ($fontWeight && font.weights[$fontWeight]) || font.weights.regular,
    margin: 0,
    position: 'relative',
    zIndex: 1,
    display: 'block',

    // &:is(textarea)
    '&[data-as="textarea"]': {
      resize: 'none',
    },

    // active
    '&:not(:invalid):not(:disabled)': {
      color: color.default.active.fg,

      '&::placeholder': {
        color: color.default.active.placeholder,
      },
    },

    // disabled
    '&:not(:invalid):disabled': {
      color: color.default.disabled.fg,

      '&::placeholder': {
        color: color.default.disabled.placeholder,
      },
    },

    // invalid
    '&:invalid': {
      color: color.invalid.active.fg,

      '&::placeholder': {
        color: color.invalid.active.placeholder,
      },
    },
  }
}

const inputFontSizeStyle = fontSizeStyle('text', ['fontSize', 'lineHeight'])
// const inputFontSizeStyle = generateStyles('size', (value: string, i, props) => {
//   console.log('inputFontSizeStyle', value, props)
//   return pick(fontSize(get(props.theme, `fonts.text.sizes.${value}`)), 'fontSize', 'lineHeight')
// })

export interface TextInputRepresentationStyleProps extends BorderStyleProps {
  // $hasBorder?: boolean
  $hasPrefix?: boolean
  $hasSuffix?: boolean
}

function representationStyle({
  // $hasBorder,
  $border,
  $hasPrefix,
  $hasSuffix,
  theme,
  ...props
}: TextInputRepresentationStyleProps & ThemeProps<BaseTheme>): CSSObject {
  const { color: themeColor, focusRing, input } = theme
  const color = themeColor.input

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'block',
    pointerEvents: 'none',
    zIndex: 0,

    // active
    '*:not(:disabled) + &': {
      '--card-bg-color': color.default.active.bg,
      '--card-fg-color': color.default.active.fg,
      backgroundColor: color.default.active.bg,
      boxShadow: $border
        ? focusRingBorderStyle({ color: color.default.active.border, width: input.border.width })
        : undefined,
    },

    // invalid
    '*:not(:disabled):invalid + &': {
      '--card-bg-color': color.invalid.active.bg,
      '--card-fg-color': color.invalid.active.fg,
      backgroundColor: color.invalid.active.bg,
      boxShadow: $border
        ? focusRingBorderStyle({ color: color.invalid.active.border, width: input.border.width })
        : 'none',
    },

    // focused
    '*:not(:disabled):not(:read-only):focus + &': {
      boxShadow: focusRingStyle({
        border: $border && getBorderStyle($border, 0, { ...props, theme }),
        focusRing,
      }),
    },

    // disabled
    '*:disabled + &': {
      '--card-bg-color': color.default.disabled.bg,
      '--card-fg-color': color.default.disabled.fg,
      backgroundColor: color.default.disabled.bg,
      boxShadow: $border
        ? focusRingBorderStyle({
            color: color.default.disabled.border,
            width: input.border.width,
          })
        : 'none',
    },

    // hovered
    '@media (hover: hover)': {
      '*:not(:disabled):not(:read-only):not(:invalid):hover + &': {
        '--card-bg-color': color.default.hovered.bg,
        '--card-fg-color': color.default.hovered.fg,
        backgroundColor: color.default.hovered.bg,
      },

      '*:not(:disabled):not(:read-only):not(:invalid):not(:focus):hover + &': {
        boxShadow: $border
          ? focusRingBorderStyle({
              color: color.default.hovered.border,
              width: input.border.width,
            })
          : 'none',
      },
    },

    borderTopLeftRadius: $hasPrefix ? 0 : undefined,
    borderBottomLeftRadius: $hasPrefix ? 0 : undefined,
    borderTopRightRadius: $hasSuffix ? 0 : undefined,
    borderBottomRightRadius: $hasSuffix ? 0 : undefined,
  }
}
