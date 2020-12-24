import React from 'react'

import { useRootTheme } from './hooks'
import { ThemeProvider } from './ThemeProvider'
import { ThemeColorName, ThemeColorSchemeKey } from './types'

interface ThemeColorProviderProps {
  children?: React.ReactNode
  scheme?: ThemeColorSchemeKey
  tone?: ThemeColorName
}

export function ThemeColorProvider(props: ThemeColorProviderProps) {
  const { children, scheme, tone } = props
  const root = useRootTheme()

  return (
    <ThemeProvider scheme={scheme || root.scheme} theme={root.theme} tone={tone}>
      {children}
    </ThemeProvider>
  )
}
