import { css } from 'styled-components'
import { ThemeProps } from '../../theme'

export type TextBaseStyleProps = { $accent?: boolean; $muted?: boolean } & ThemeProps

export function textBaseStyle({ $accent, $muted, theme }: TextBaseStyleProps) {
  const { weights } = theme.fonts.text

  return css`
    color: var(--card-fg-color);
    &:before,
    &:after {
      content: '';
      display: block;
      height: 0;
    }
    ${$accent &&
    css`
      color: var(--card-accent-fg-color);
    `}
    ${$muted &&
    css`
      color: var(--card-muted-fg-color);
    `}
    & code {
      font-family: ${theme.fonts.code.family};
      border-radius: 1px;
      background-color: var(--card-code-bg-color);
      color: var(--card-code-fg-color);
    }
    & a {
      text-decoration: none;
      border-radius: 1px;
      color: var(--card-link-color);
      outline: none;
      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }
      &:focus {
        box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color);
      }
      &:focus:not(:focus-visible) {
        box-shadow: none;
      }
    }
    & strong {
      font-weight: ${weights.bold};
    }
  `
}
