import { css } from 'styled-components'
import { Theme, ThemeProps, ThemeStyles } from '../../theme/types'
import { ThemeColor, ThemeColorBase, ThemeColorCardStyle } from '../../theme/colors/types'
import { CardStyleProps } from './types'

export function cardStyle(props: CardStyleProps & ThemeProps) {
  return [cardBaseStyle, cardColorStyle(props)]
}

export function cardBaseStyle() {
  return css`
    &[role='button'] {
      -webkit-font-smoothing: inherit;
      appearance: none;
      outline: none;
      font: inherit;
      text-align: inherit;
      border: 0;
      width: stretch;
    }
    &[href],
    [href] & {
      text-decoration: none;
    }
  `
}

function vars(base: ThemeColorBase, color: ThemeColorCardStyle) {
  // Custom properties that may be used by other atoms
  return css`
    --card-bg-color: ${color.bg};
    --card-fg-color: ${color.fg};
    --card-focus-ring-color: ${base.focusRing};
    --card-border-color: ${color.border};
    --card-muted-fg-color: ${color.muted.fg};
    --card-accent-fg-color: ${color.accent.fg};
    --card-link-fg-color: ${color.link.fg};
    --card-code-bg-color: ${color.code.bg};
    --card-code-fg-color: ${color.code.fg};
    --card-shadow-outline-color: ${base.shadow.outline};
    --card-shadow-umbra-color: ${base.shadow.umbra};
    --card-shadow-penumbra-color: ${base.shadow.penumbra};
    --card-shadow-ambient-color: ${base.shadow.ambient};
  `
}

export function cardColorStyle(props: CardStyleProps & ThemeProps) {
  const { theme } = props
  console.log('cardColorStyle', theme, props)
  const { base, card } = theme.color as ThemeColor
  const styles = (theme as Theme).styles as ThemeStyles

  return css`
    ${vars(base, card.active)}
    background-color: var(--card-bg-color);
    color: var(--card-fg-color);
    /* &:is(button) */
    &[role='button'] {
      &:disabled {
        ${vars(base, card.disabled)}
      }
      &:not(:disabled) {
        @media (hover: hover) {
          &:hover {
            ${vars(base, card.hovered)}
          }
          &:active {
            ${vars(base, card.pressed)}
          }
        }
        &:focus {
          ${vars(base, card.selected)}
        }
        &[aria-pressed='true'],
        [aria-selected='true'] > & {
          ${vars(base, card.selected)}
        }
      }
    }
    /* &:is(a) */
    &[href] {
      &[data-disabled] {
        ${vars(base, card.disabled)}
      }
      &:not([data-disabled]) {
        @media (hover: hover) {
          outline: none;
          &:hover {
            ${vars(base, card.hovered)}
          }
          &:active {
            ${vars(base, card.pressed)}
          }
        }
        &:focus {
          ${vars(base, card.selected)}
        }
        [aria-selected='true'] > & {
          ${vars(base, card.selected)}
        }
      }
    }
    ${styles?.card?.root}
  `
}
