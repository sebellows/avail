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
} from './core/constants'
import { Color } from './core/utils'

const setLightTheme = (name = 'light', primary = COLORS.blue, accent = COLORS.orange) => ({
  name,
  bg: LIGHT,
  fg: DARK,
  primary,
  accent,
  link: {
    color: primary,
    hoverColor: Color(primary).alpha(0.8).string(),
  },
  border: Color(BLACK).alpha(0.12).string(),
  control: {
    bg: Color(BLACK).alpha(0.04).string(),
    fg: Color(BLACK).alpha(0.87).string(),
    border: Color(BLACK).alpha(0.06).string(),
  },
  focus: {
    bg: Color(COLORS.magenta).alpha(0.25).hsl().string(),
    border: Color(COLORS.magenta).hsl().string(),
  },
  hover: {
    bg: GRAY_200,
    border: Color(BLACK).alpha(0.2).string(),
  },
  muted: GRAY_500,
})

const setDarkTheme = (name = 'dark', primary = COLORS.blue, accent = COLORS.orange) => ({
  name,
  bg: GRAY_800,
  fg: WHITE,
  primary,
  accent,
  link: {
    color: primary,
    hoverColor: Color(primary).alpha(0.8).string(),
  },
  border: Color(WHITE).alpha(0.12).string(),
  control: {
    bg: Color(BLACK).alpha(0.01).string(),
    fg: WHITE,
    border: Color(WHITE).alpha(0.06).string(),
  },
  focus: {
    bg: Color(COLORS.magenta).alpha(0.25).hsl().string(),
    border: Color(COLORS.magenta).hsl().string(),
  },
  hover: {
    bg: GRAY_700,
    border: Color(WHITE).alpha(0.2).string(),
  },
  muted: GRAY_500,
})

export const AVAIL_THEME = new Map([
  ['light', setLightTheme()],
  ['magenta-teal', setLightTheme('magenta-light', COLORS.magenta, COLORS.teal)],
  ['dark', setDarkTheme()],
  ['magenta-dark', setDarkTheme('dark-magenta-cyan', COLORS.magenta, COLORS.cyan)],
])

export const ThemeContext = React.createContext<{ bg?: string; fg?: string }>(null)

export const useTheme = () => React.useContext(ThemeContext)
