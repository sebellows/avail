import { CSSObject } from 'styled-components'
import { ThemeProps } from '../../theme'
import { BadgeStyleProps } from './types'

export function badgeStyle(props: BadgeStyleProps & ThemeProps): CSSObject {
  const { $mode, $variant, theme } = props
  const palette = theme.color[$mode === 'outline' ? 'muted' : 'solid']
  const color = palette[$variant] || palette.default

  return {
    backgroundColor: $mode === 'outline' ? 'transparent' : color.active.bg,
    color: color.active.fg,
    boxShadow: `inset 0 0 0 1px ${$mode === 'outline' ? color.active.fg : color.active.border}`,

    '&:not([hidden])': {
      display: 'inline-flex',
      alignItems: 'center',
    },
  }
}
