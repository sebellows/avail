import { css } from 'styled-components'
import { ThemeProps } from '../../theme'
import { HeadingStyleProps } from './types'

export function headingBaseStyle(props: HeadingStyleProps & ThemeProps) {
  const { $accent, $muted, theme } = props

  return css`
    &:before {
      content: '';
      display: block;
      height: 0;
    }

    &:after {
      content: '';
      display: block;
      height: 0;
    }

    ${
      $accent &&
      css`
        color: var(--accent-fg-color);
      `
    }

    ${
      $muted &&
      css`
        color: var(--muted-fg-color);
      `
    }

    & code {
      font-family: ${theme.fonts.code.family};
      border-radius: 1px;
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

    & [data-icon] {
      lineHeight: 1,
      vertical-align: baseline;
    }

    [data-ui="Stack"] > & {
      margin-bottom: 0;
    }
  `
}
