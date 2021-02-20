/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from 'styled-components'
import { focusRingBorderStyle, focusRingStyle } from '../../styles'
import {
  ThemeColorButtonModeKey,
  ThemeColorVariantKey,
  BaseTheme,
  ThemeColorButtonStyle,
  ThemeProps,
} from '../../theme'

export function buttonBaseStyles() {
  return css`
    -webkit-font-smoothing: inherit;
    appearance: none;
    display: inline-flex;
    align-items: center;
    font: inherit;
    border: 0;
    outline: none;
    user-select: none;
    text-decoration: none;
    border: 0;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    text-align: left;
    position: relative;

    & > * {
      display: block;
      flex: 1;
      min-width: 0;
      border-radius: inherit;
    }
  `
}

const buttonTheme = { border: { width: 1 } }

function buttonColorVarsStyle(color: ThemeColorButtonStyle) {
  return {
    '--card-bg-color': color.bg,
    '--card-fg-color': color.fg,
    '--card-border-color': color.border,
  }
}

export function buttonColorStyles(
  props: { $mode: ThemeColorButtonModeKey; $variant: ThemeColorVariantKey } & ThemeProps<BaseTheme>,
) {
  const { $mode, theme } = props
  const { focusRing } = theme
  const base = theme.color.base
  const mode = theme.color.button[$mode] || theme.color.button.default
  const color = mode[props.$variant] || mode.default
  const border = { width: buttonTheme.border.width, color: 'var(--card-border-color)' }
  console.log('buttonColorVarsStyle', mode, '$mode:', $mode)

  return [
    buttonColorVarsStyle(color.active),
    {
      backgroundColor: 'var(--card-bg-color)',
      color: 'var(--card-fg-color)',
      boxShadow: focusRingBorderStyle(border),
      '&:disabled, &[data-disabled="true"]': buttonColorVarsStyle(color.disabled),
      "&:not([data-disabled='true'])": {
        '&:focus': {
          boxShadow: focusRingStyle({ base, border, focusRing }),
        },
        '&:focus:not(:focus-visible)': {
          boxShadow: focusRingBorderStyle(border),
        },
        '@media (hover: hover)': {
          '&:hover': buttonColorVarsStyle(color.hovered),
          '&:active': buttonColorVarsStyle(color.pressed),
        },
        '&[data-selected]': buttonColorVarsStyle(color.selected),
      },
    },
    theme.styles?.button?.root,
  ]
}
