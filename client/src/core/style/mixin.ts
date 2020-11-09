import { css } from 'styled-components'
import { DARK, LINK_COLOR, VARIANTS, WHITE } from '../constants'
import { Color } from '../utils'
import { maybeApplyUnit } from './units'
import { buttonVariant } from './buttons'
import { dropShadowMixin, shadowMixin } from './shadows'
import { animationMixin, transitionMixin } from './transition'
import { generateSpacer, spacerMixin } from './spacers'
import { radiusMixin } from './radius'

export const mixin = {
  darken: (colorValue: string, amount: number) => Color(colorValue).darken(amount).string(),
  lighten: (colorValue: string, amount: number) => Color(colorValue).lighten(amount).string(),
  rgba: (colorValue: string, opacity: number) => Color(colorValue).alpha(opacity).string(),
  invert: (hue: string) => (Color(hue).isDark() ? WHITE : DARK),
  buttonVariant,
  animation: animationMixin,
  transition: transitionMixin,
  shadow: shadowMixin,
  dropShadow: dropShadowMixin,
  margin: generateSpacer('margin'),
  padding: generateSpacer('padding'),
  spacer: spacerMixin,
  borderRadius: radiusMixin,
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
  size: (width: string | number, height: string | number = width, unit = 'rem') => {
    function getUnit(value: string | number) {
      return typeof value === 'string' ? value : maybeApplyUnit(value, unit)
    }
    const w = getUnit(width)
    const h = height !== width ? getUnit(height) : w

    return css`
      width: ${w};
      height: ${h};
    `
  },
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
  customScrollbar: ({ width = 8, background = VARIANTS.secondary } = {}) => css`
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
  link: (colorValue = LINK_COLOR) => css`
    cursor: pointer;
    color: ${colorValue};
    font-weight: 500;
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
