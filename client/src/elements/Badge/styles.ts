import { CSSObject } from 'styled-components'
import { ThemeProps } from '../../theme'
import { BadgeStyleProps } from './types'

export function badgeStyle(props: BadgeStyleProps & ThemeProps): CSSObject {
  const { $mode, $variant, theme } = props
  const palette = theme.color[$mode === 'outline' ? 'muted' : 'solid']
  const color = palette[$variant] || palette.default

  // console.log('badgeStyle', $mode, $variant, color, color.active.bg)

  return {
    backgroundColor: color.active.bg,
    color: color.active.fg,
    boxShadow: `inset 0 0 0 1px ${color.active.border}`,

    '&:not([hidden])': {
      display: 'inline-block',
    },
  }
}
