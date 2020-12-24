import { CSSObject } from 'styled-components'
import { focusRingBorderStyle, focusRingStyle } from '../focusRing'
import { responsiveStyle } from '../../helpers'
import { ThemeProps } from '../types'
import { toREM } from '../../units'
import { ThemeFontWeightKey } from '../../../../theme'

export interface TextInputInputStyleProps {
  fontSize?: number | number[]
  weight?: ThemeFontWeightKey
}

export interface TextInputRepresentationStyleProps {
  border?: boolean
  hasPrefix?: boolean
  hasSuffix?: boolean
}

export const textInputStyle = {
  root: () => [rootStyle],
  control: () => [inputBaseStyle, inputFontSize],
  representation: representationStyle,
}

function rootStyle(): CSSObject {
  return {
    '&:not([hidden])': {
      display: 'flex',
    },
  }
}

function inputBaseStyle(props: TextInputInputStyleProps & ThemeProps): CSSObject {
  const { theme, weight } = props
  const font = theme.fonts.text
  const color = theme.color.control

  return {
    appearance: 'none',
    background: 'none',
    border: 0,
    borderRadius: 0,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: font.family,
    fontWeight: (weight && font.weights[weight]) || font.weights.regular,
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

const inputFontSize = responsiveStyle<TextInputInputStyleProps>(
  ['fontSize', [2]],
  (sizeIndex: number, { fonts }) => {
    const size = fonts.text.sizes[sizeIndex] || fonts.text.sizes[2]

    return {
      fontSize: toREM(size.fontSize),
      lineHeight: size.lineHeight / size.fontSize,
    }
  },
)

// function inputFontSizeStyle(props: TextInputInputStyleProps & ThemeProps) {
//   const { theme } = props
//   const { fonts, media } = theme

//   return responsive(media, getResponsiveProp(props.fontSize, [2]), (sizeIndex: number) => {
//     const size = fonts.text.sizes[sizeIndex] || fonts.text.sizes[2]

//     return {
//       fontSize: toREM(size.fontSize),
//       lineHeight: size.lineHeight / size.fontSize,
//     }
//   })
// }

function representationStyle(props: TextInputRepresentationStyleProps & ThemeProps): CSSObject[] {
  const { border, hasPrefix, hasSuffix, theme } = props
  const { focusRing, control } = theme
  const color = theme.color.control

  return [
    {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'block',
      pointerEvents: 'none',
      zIndex: 0,

      // active
      color: color.default.active.fg,
      backgroundColor: color.default.active.bg,
      boxShadow: border
        ? focusRingBorderStyle({
            color: color.default.active.borderColor,
            width: control.border.width,
          })
        : undefined,

      // invalid
      '*:not(:disabled):invalid + &': {
        color: color.invalid.active.fg,
        backgroundColor: color.invalid.active.bg,
        boxShadow: border
          ? focusRingBorderStyle({
              color: color.invalid.active.borderColor,
              width: control.border.width,
            })
          : 'none',
      },

      // focused
      '*:not(:disabled):focus + &': {
        boxShadow: focusRingStyle({
          border: border
            ? { color: color.default.active.borderColor, width: control.border.width }
            : undefined,
          focusRing,
        }),
      },

      // disabled
      '*:disabled + &': {
        color: color.default.disabled.fg,
        backgroundColor: color.default.disabled.bg,
        boxShadow: border
          ? focusRingBorderStyle({
              color: color.default.disabled.borderColor,
              width: control.border.width,
            })
          : 'none',
      },

      // hovered
      '@media (hover: hover)': {
        '*:not(:disabled):not(:invalid):hover + &': {
          color: color.default.hovered.fg,
          backgroundColor: color.default.hovered.bg,
        },

        '*:not(:disabled):not(:invalid):not(:focus):hover + &': {
          boxShadow: border
            ? focusRingBorderStyle({
                color: color.default.hovered.borderColor,
                width: control.border.width,
              })
            : 'none',
        },
      },
    },
    hasPrefix ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {},
    hasSuffix ? { borderTopRightRadius: 0, borderBottomRightRadius: 0 } : {},
  ]
}
