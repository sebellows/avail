import { BaseTheme, ColorHueKey, ThemeColorVariantKey, ThemeProps } from '../theme'
import { get, toPX } from '../utils'

export interface ScrollbarProps {
  scrollbarWidth?: number
  scrollbarColor?: ThemeColorVariantKey | ColorHueKey
}

export interface ScrollbarStyleProps {
  $scrollbarWidth?: number
  $scrollbarColor?: ThemeColorVariantKey | ColorHueKey
}

export function scrollbarStyle(props: ScrollbarStyleProps & ThemeProps<BaseTheme>) {
  const { $scrollbarWidth = 8, theme } = props
  const bg = props.$scrollbarColor ?? get(theme, 'color.muted.default.active.bg')

  return {
    '&::-webkit-scrollbar': {
      width: toPX($scrollbarWidth),
    },
    '&::-webkit-scrollbar-track': {
      background: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '99px',
      background: bg,
    },
  }
}
