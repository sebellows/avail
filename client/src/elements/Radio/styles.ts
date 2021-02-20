import { css } from 'styled-components'
import { toREM } from '../../utils'
import { BaseTheme, ThemeProps } from '../../theme'
import { focusRingBorderStyle, focusRingStyle } from '../../styles'

export function radioBaseStyle() {
  return css`
    position: relative;

    &:not([hidden]) {
      display: inline-block;
    }

    &[data-read-only] {
      outline: 1px solid red;
    }
  `
}

export function inputElementStyle(props: ThemeProps<BaseTheme>) {
  const { theme } = props
  const { focusRing, input } = theme
  const color = theme.color.input
  const dist = (input.radio.size - input.radio.markSize) / 2

  return css`
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    outline: none;
    z-index: 1;
    padding: 0;
    margin: 0;
    border-radius: ${toREM(input.radio.size / 2)};
    border: none;

    /* active */
    & + span {
      display: block;
      position: relative;
      height: ${toREM(input.radio.size)};
      width: ${toREM(input.radio.size)};
      border-radius: ${toREM(input.radio.size / 2)};
      background: ${color.default.active.bg};
      box-shadow: ${focusRingBorderStyle({
        color: color.default.active.border,
        width: input.border.width,
      })};

      &::after {
        content: '';
        position: absolute;
        top: ${toREM(dist)};
        left: ${toREM(dist)};
        height: ${toREM(input.radio.markSize)};
        width: ${toREM(input.radio.markSize)};
        border-radius: ${toREM(input.radio.markSize / 2)};
        background: ${color.default.active.fg};
        opacity: 0;
      }
    }

    /* focused */
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

    &:checked + span::after {
      opacity: 1;
    }

    /* disabled */
    &:not([data-read-only]):disabled + span {
      box-shadow: 0 0 0 1px ${color.default.disabled.border};
      background: ${color.default.disabled.bg};

      &::after {
        background: ${color.default.disabled.fg};
      }
    }
  `
}
