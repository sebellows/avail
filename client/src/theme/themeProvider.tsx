import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { RootTheme, Theme, ThemeColorSchemeKey, ThemeColorName } from './types'
import { ThemeContext } from './ThemeContext'

export function ThemeProvider(props: {
  children?: React.ReactNode
  scheme?: ThemeColorSchemeKey
  theme: RootTheme
  tone?: ThemeColorName
}) {
  const { children, scheme = 'light', theme: rootTheme, tone = 'neutral' } = props
  const { color: rootColor, ...restTheme } = rootTheme
  const colorScheme = rootColor[scheme] || rootColor.light
  const color = colorScheme[tone] || colorScheme.neutral
  const theme: Theme = { ...restTheme, color }

  return (
    <ThemeContext.Provider value={{ theme: rootTheme, scheme, tone }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
