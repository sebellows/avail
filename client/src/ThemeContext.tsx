import React, { useState } from 'react'
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
import { capitalize, Color } from './core/utils'

export interface ThemeProps {
  bg?: string
  fg?: string
  borderColor?: string
  boxShadow?: string
  hoverColor?: string
}

export interface Theme {
  name: string
  bg: string
  fg: string
  primary: string
  accent: string
  link: ThemeProps
  borderColor: string
  control: ThemeProps
  disabled: ThemeProps
  focus: ThemeProps
  hover: ThemeProps
  invalid: ThemeProps
  muted: string
}

export type ThemeOptions = Record<string, Theme>

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

const setLightTheme = (name = 'light', primary = COLORS.blue, accent = COLORS.orange): Theme => ({
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

const setDarkTheme = (name = 'dark', primary = COLORS.blue, accent = COLORS.orange): Theme => ({
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

const themeMap: ThemeOptions = {
  light: setLightTheme(),
  'magenta-teal': setLightTheme('magenta-light', COLORS.magenta, COLORS.teal),
  dark: setDarkTheme(),
  'magenta-dark': setDarkTheme('dark-magenta-cyan', COLORS.magenta, COLORS.cyan),
}

const THEME_NAMES = Object.freeze(
  Object.keys(themeMap).reduce((acc, theme) => {
    acc[theme] = theme
      .split('-')
      .map((str) => capitalize(str))
      .join(' ')
    return acc
  }, {}),
)

export const AVAIL_THEME = new Map<string, Theme>(Object.entries(themeMap))

export interface ThemeContextProps {
  activeTheme: string
  setActiveTheme: React.Dispatch<React.SetStateAction<string>>
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
  themes: Map<keyof typeof themeMap, typeof themeMap[keyof typeof themeMap]>
  themeNames: Record<keyof typeof themeMap, string>
}

export const ThemeContext = React.createContext<ThemeContextProps>(null)

export const ThemeProvider = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState('light')
  const [theme, setTheme] = useState(AVAIL_THEME.get(activeTheme) as Theme)

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        activeTheme,
        setActiveTheme,
        themes: AVAIL_THEME,
        themeNames: THEME_NAMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => React.useContext(ThemeContext)
