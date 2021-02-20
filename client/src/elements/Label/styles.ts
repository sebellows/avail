import { css } from 'styled-components'
import { ThemeProps } from '../../theme'

export function labelBaseStyle(props: { $accent?: boolean; $muted: boolean } & ThemeProps) {
  const {
    $accent,
    $muted,
    theme: { fonts },
  } = props

  return css`
    text-transform: uppercase;
    [data-ui='Badge'] & {
      transform: translateY(0);
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
      font-family: ${fonts.code.family};
      border-radius: 1px;
    }
    & a {
      text-decoration: none;
      border-radius: 1px;
    }
  `
}
