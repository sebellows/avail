import { Color } from '../utils'
import {
  BODY_BG,
  BODY_COLOR,
  COLORS,
  GRAYS,
  VARIANTS,
  WHITE,
  LINK_COLOR,
  BLACK,
} from '../constants'

const BORDER_COLOR_BASE = Color(BLACK).alpha(0.12).string()

export const color = {
  ...COLORS,
  ...VARIANTS,

  text: {
    body: BODY_COLOR,
    dark: VARIANTS.dark,
    medium: GRAYS['gray-600'],
    light: WHITE,
    muted: GRAYS['gray-500'],
    link: LINK_COLOR,
    danger: VARIANTS.danger,
  },

  bg: {
    body: BODY_BG,
    dark: VARIANTS.dark,
    medium: VARIANTS.secondary,
    light: VARIANTS.light,
    hovered: VARIANTS.light,
    focused: Color(VARIANTS.light).darken(0.1).string(),
    muted: GRAYS['gray-500'],
    active: VARIANTS.primary,
    activeLight: Color(VARIANTS.primary).lighten(0.2).string(),
    activeDark: Color(VARIANTS.primary).darken(0.2).string(),
  },

  border: {
    base: Color(BLACK).alpha(0.12).string(),
    light: Color(BLACK).alpha(0.6).string(),
  },

  component: {
    color: BODY_COLOR,
    bg: BODY_BG,
    borderColor: BORDER_COLOR_BASE,
    active: {
      color: WHITE,
      bg: VARIANTS.primary,
      borderColor: VARIANTS.primary,
      focusBg: Color(COLORS.magenta).alpha(0.25).hsl().string(),
      focusBorder: Color(COLORS.magenta).hsl().string(),
    },
  },

  compute: (c: string) => Color(c),
  alpha: (c: string, opacity: number) => Color(c).alpha(opacity).string(),
}
