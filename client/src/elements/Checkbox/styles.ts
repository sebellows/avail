import { css } from 'styled-components'
import { BaseTheme, ThemeProps } from '../../theme'
import { focusRingBorderStyle, focusRingStyle } from '../../styles'
import { toREM } from '../../utils'

export function checkboxBaseStyles() {
  return css`
    position: relative;
    display: inline-block;
  `
}

export function inputElementStyles(props: ThemeProps<BaseTheme>) {
  const { theme } = props
  const { color: themeColor, focusRing, input, radius } = theme
  const color = themeColor.input

  return css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    z-index: 1;
    padding: 0;
    margin: 0;

    & + span {
      position: relative;
      display: block;
      height: ${toREM(input.checkbox.size)};
      width: ${toREM(input.checkbox.size)};
      box-sizing: border-box;
      box-shadow: ${focusRingBorderStyle({
        color: color.default.active.border,
        width: input.border.width,
      })};
      border-radius: ${toREM(radius[2])};
      line-height: 1;
      background: ${color.default.active.bg};

      & > svg {
        display: block;
        position: absolute;
        opacity: 0;
        height: 100%;
        width: 100%;

        & > path {
          vector-effect: non-scaling-stroke;
          stroke-width: 2 !important;
        }
      }
    }

    &:not(:disabled):focus + span {
      box-shadow: ${focusRingStyle({
        border: { width: input.border.width, color: color.default.active.border },
        focusRing,
      })};
    }

    &:not(:disabled):focus:not(:focus-visible) + span {
      box-shadow: ${focusRingBorderStyle({
        color: color.default.active.border,
        width: input.border.width,
      })};
    }

    &:checked + span > svg:first-child {
      opacity: 1;
    }

    &:not([data-read-only]):disabled + span {
      background: ${color.default.disabled.bg};
      box-shadow: ${focusRingBorderStyle({
        width: input.border.width,
        color: color.default.disabled.border,
      })};
      color: ${color.default.disabled.fg};
    }

    &:indeterminate + span > svg:last-child {
      opacity: 1;
    }
  `
}
