import React from 'react'
import {
  DARK,
  LIGHT,
  GRAY_200,
  GRAY_500,
  GRAY_700,
  GRAY_800,
  BLACK,
  WHITE,
  COLORS,
  VARIANTS,
} from './core/constants'
import { Color } from './core/utils'

const themeCommon = {
  focus: {
    bg: Color(COLORS.magenta).alpha(0.25).hsl().string(),
    borderColor: Color(COLORS.magenta).hsl().string(),
    boxShadow: `0 0 0 0.25rem ${Color(COLORS.magenta).alpha(0.25).hsl().string()}`,
  },
  invalid: {
    bg: Color(VARIANTS.danger).alpha(0.2).string(),
    borderColor: VARIANTS.danger,
    fg: VARIANTS.danger,
  },
}

const setLightTheme = (name = 'light', primary = COLORS.blue, accent = COLORS.orange) => ({
  name,
  bg: LIGHT,
  fg: DARK,
  primary,
  accent,
  link: {
    fg: primary,
    hoverColor: Color(primary).alpha(0.8).string(),
  },
  borderColor: Color(BLACK).alpha(0.12).string(),
  control: {
    bg: Color(BLACK).alpha(0.04).string(),
    borderColor: Color(BLACK).alpha(0.06).string(),
    fg: Color(BLACK).alpha(0.87).string(),
  },
  disabled: {
    bg: Color(BLACK).alpha(0.075).string(),
    borderColor: Color(BLACK).alpha(0.12).string(),
    fg: Color(BLACK).alpha(0.8).string(),
  },
  hover: {
    bg: GRAY_200,
    borderColor: Color(BLACK).alpha(0.2).string(),
  },
  muted: GRAY_500,
  ...themeCommon,
})

const setDarkTheme = (name = 'dark', primary = COLORS.blue, accent = COLORS.orange) => ({
  name,
  bg: GRAY_800,
  fg: WHITE,
  primary,
  accent,
  link: {
    fg: primary,
    hoverColor: Color(primary).alpha(0.8).string(),
  },
  borderColor: Color(WHITE).alpha(0.12).string(),
  control: {
    bg: Color(BLACK).alpha(0.01).string(),
    borderColor: Color(WHITE).alpha(0.06).string(),
    fg: WHITE,
  },
  disabled: {
    bg: Color(WHITE).alpha(0.075).string(),
    borderColor: Color(WHITE).alpha(0.12).string(),
    fg: Color(WHITE).alpha(0.8).string(),
  },
  hover: {
    bg: GRAY_700,
    borderColor: Color(WHITE).alpha(0.2).string(),
  },
  muted: GRAY_500,
  ...themeCommon,
})

const themeMap = {
  light: setLightTheme(),
  'magenta-teal': setLightTheme('magenta-light', COLORS.magenta, COLORS.teal),
  dark: setDarkTheme(),
  'magenta-dark': setDarkTheme('dark-magenta-cyan', COLORS.magenta, COLORS.cyan),
}

export const AVAIL_THEME = new Map(Object.entries(themeMap))

export const ThemeContext = React.createContext<Record<string, any>>(null)

export const useTheme = () => React.useContext(ThemeContext)
