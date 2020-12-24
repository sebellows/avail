import React, { useState } from 'react'
import {
  DARK,
  LIGHT,
  // GRAY_200,
  // GRAY_500,
  // GRAY_700,
  // GRAY_800,
  BLACK,
  WHITE,
  COLORS,
  VARIANTS,
} from './core/constants'
import { Color } from './core/style/libs'
import { capitalize } from './core/utils'

export type ThemeOptions = Record<string, Avail.Theme>

const themeCommon = {
  invalid: {
    bg: Color(VARIANTS.danger).alpha(0.2).string(),
    borderColor: VARIANTS.danger,
    fg: VARIANTS.danger,
  },
}

// hsl(210deg 16% 93%)
const shade = (l = 93) => Color(BLACK).hue(210).saturationl(12).lightness(l).string()

const setLightTheme = (
  name = 'light',
  primary = COLORS.blue,
  accent = COLORS.orange,
): Avail.Theme => ({
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
    // bg: Color(BLACK).alpha(0.04).string(),
    bg: shade(93),
    borderColor: shade(89),
    checked: Color(primary).hsl().string(),
    fg: shade(15),
  },
  disabled: {
    bg: Color(BLACK).alpha(0.075).string(),
    borderColor: Color(BLACK).alpha(0.12).string(),
    checked: Color(BLACK).alpha(0.075).string(),
    fg: Color(BLACK).alpha(0.8).string(),
  },
  focus: {
    bg: WHITE,
    borderColor: Color(COLORS.yellow).hsl().string(),
    boxShadow: `0 0 0 0.25rem ${Color(COLORS.yellow).alpha(0.25).hsl().string()}`,
  },
  hover: {
    bg: shade(89), // GRAY_200
    borderColor: shade(84), // Color(BLACK).alpha(0.2).string()
    fg: DARK,
  },
  muted: shade(71), // GRAY_500
  ...themeCommon,
})

const setDarkTheme = (
  name = 'dark',
  primary = COLORS.blue,
  accent = COLORS.orange,
): Avail.Theme => ({
  name,
  bg: shade(23), // GRAY_800
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
    checked: Color(primary).string(),
    fg: WHITE,
  },
  disabled: {
    bg: Color(WHITE).alpha(0.075).string(),
    borderColor: Color(WHITE).alpha(0.12).string(),
    checked: Color(WHITE).alpha(0.075).string(),
    fg: Color(WHITE).alpha(0.8).string(),
  },
  focus: {
    bg: Color(COLORS.yellow).alpha(0.25).hsl().string(),
    borderColor: Color(COLORS.yellow).hsl().string(),
    boxShadow: `0 0 0 0.25rem ${Color(COLORS.yellow).alpha(0.25).hsl().string()}`,
  },
  hover: {
    bg: shade(31), // GRAY_700
    borderColor: Color(WHITE).alpha(0.2).string(),
    fg: WHITE,
  },
  muted: shade(71),
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

export const AVAIL_THEME = new Map<string, Avail.Theme>(Object.entries(themeMap))

export interface ThemeContextProps {
  activeTheme: string
  setActiveTheme: React.Dispatch<React.SetStateAction<string>>
  theme: Avail.Theme
  setTheme: React.Dispatch<React.SetStateAction<Avail.Theme>>
  themes: Map<keyof typeof themeMap, typeof themeMap[keyof typeof themeMap]>
  themeNames: Record<keyof typeof themeMap, string>
}

export const ThemeContext = React.createContext<ThemeContextProps>(null)

export const ThemeProvider = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState('light')
  const [theme, setTheme] = useState(AVAIL_THEME.get(activeTheme) as Avail.Theme)

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
