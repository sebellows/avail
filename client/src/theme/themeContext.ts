import { createContext } from 'react'
import { RootTheme, ThemeColorName, ThemeColorSchemeKey } from './types'

export interface ThemeContextValue {
  scheme: ThemeColorSchemeKey
  theme: RootTheme
  tone: ThemeColorName
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
