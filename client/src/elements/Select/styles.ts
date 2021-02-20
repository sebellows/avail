/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from 'styled-components'
import {
  focusRingBorderStyle,
  focusRingStyle,
  FontSizeStyleProps,
  inputPaddingIconRightStyle,
  radiusStyle,
} from '../../styles'
import { get, toREM } from '../../utils'
import { BaseTheme, ThemeProps } from '../../theme'
import { generateStyles } from '../../styles/utils'
import { RenameKey } from '../../types'

function rootStyle() {
  return css`
    position: relative;
    width: stretch;

    &:not([hidden]) {
      display: inline-block;
    }
  `
}

const inputBaseStyle = (props: ThemeProps) => {
  const fontFamily = get(props, 'theme.fonts.text.family')

  return css`
    -webkit-font-smoothing: antialiased;
    appearance: none;
    border: 0;
    font-family: ${fontFamily};
    color: inherit;
    width: 100%;
    outline: none;
    margin: 0;

    &:disabled {
      opacity: 1;
    }
  `
}

function inputColorStyle(props: ThemeProps<BaseTheme>) {
  const { theme } = props
  const { color: themeColor, focusRing, input } = theme
  const color = themeColor.input

  return css`
    /* active */
    background-color: ${color.default.active.bg};
    color: ${color.default.active.fg};
    box-shadow: ${focusRingBorderStyle({
      color: color.default.active.border,
      width: input.border.width,
    })};

    /* hovered */
    @media (hover: hover) {
      &:not(:disabled):hover {
        background-color: ${color.default.hovered.bg};
        color: ${color.default.hovered.fg};
        box-shadow: ${focusRingBorderStyle({
          color: color.default.hovered.border,
          width: input.border.width,
        })};
      }
    }

    /* focused */
    &:not(:disabled):focus {
      box-shadow: ${focusRingStyle({
        border: { width: input.border.width, color: color.default.active.border },
        focusRing,
      })};
    }

    /* disabled */
    &:not([data-read-only]):disabled {
      background-color: ${color.default.disabled.bg};
      color: ${color.default.disabled.fg};
      box-shadow: ${focusRingBorderStyle({
        color: color.default.disabled.border,
        width: input.border.width,
      })};
    }
  `
}

const inputTextSizeStyle = generateStyles<
  RenameKey<FontSizeStyleProps, '$size', '$fontSize'> & ThemeProps
>('fontSize', (value, i, props) => {
  const sizes = get(props, 'theme.fonts.text.sizes')
  const { fontSize, lineHeight } = sizes[value] ?? sizes.sm
  return { fontSize: toREM(fontSize), lineHeight: lineHeight }
})

function inputStyle() {
  return [
    radiusStyle,
    inputBaseStyle,
    inputColorStyle,
    inputTextSizeStyle,
    inputPaddingIconRightStyle,
  ]
}

function iconBoxStyle(props: ThemeProps<BaseTheme>) {
  const color = get(props, 'theme.color.input.default')

  return css`
    position: absolute;
    top: 0;
    right: 0;
    line-height: 1;
    pointer-events: none;

    /* active */
    --card-fg-color: ${color.active.fg};

    /* hover */
    @media (hover: hover) {
      select:not(disabled):not(:read-only):hover + & {
        --card-fg-color: ${color.hovered.fg};
      }
    }

    /* disabled */
    select:disabled + & {
      --card-fg-color: ${color.disabled.fg};
    }

    /* read-only */
    select[data-read-only] + & {
      opacity: 0;
    }
  `
}

export const selectStyle = {
  root: rootStyle,
  input: inputStyle,
  iconBox: iconBoxStyle,
}
