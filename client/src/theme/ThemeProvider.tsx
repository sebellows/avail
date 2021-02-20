import React, { createContext, useContext, useState } from 'react'
import { ThemeProvider as StyledThemeProvider, useTheme as useStyledTheme } from 'styled-components'
import { MakeOptional } from '../types'
import { rootTheme } from './config'
import { Theme, RootTheme } from './types'
import { ThemeColorVariant, ThemeColorSchemeKey } from './colors/types'
import { ls } from '../utils'

export interface ThemeContextValue {
  scheme?: ThemeColorSchemeKey
  theme?: RootTheme
  variant?: ThemeColorVariant
  themeLoaded?: boolean
  setScheme?: React.Dispatch<React.SetStateAction<ThemeColorSchemeKey>>
  setVariant?: React.Dispatch<React.SetStateAction<ThemeColorVariant>>
}

export interface ThemeProviderProps
  extends MakeOptional<ThemeContextValue, 'scheme' | 'variant'>,
    Pick<Avail.Props, 'children'> {}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export const ThemeProvider = ({
  children,
  scheme: currentScheme = 'light',
  theme: schemes = rootTheme,
  variant: initialVariant = 'default',
}: ThemeProviderProps) => {
  const [scheme, setScheme] = useState(currentScheme)
  const [variant, setVariant] = useState(initialVariant)
  const [theme, setTheme] = useState({
    ...schemes,
    scheme,
    color: schemes.color[currentScheme][initialVariant],
  })
  const [themeLoaded, setThemeLoaded] = useState<boolean>(false)

  const prevScheme = React.useRef<string>(scheme)

  React.useEffect(() => {
    if (!prevScheme && scheme && !themeLoaded) {
      setThemeLoaded(true)
    }
    if (prevScheme && prevScheme.current !== scheme) {
      // setVariantConfig(rootTheme[scheme][variant])
      const newScheme = { ...schemes, scheme, color: schemes.color[scheme][variant] }
      setTheme(newScheme)
      ls.set('theme', newScheme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheme])

  return (
    <ThemeContext.Provider
      value={{ theme: schemes, scheme, themeLoaded, variant, setScheme, setVariant }}
    >
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme(): Theme {
  return useStyledTheme() as Theme
}

export function useRootTheme() {
  const rootTheme = useContext(ThemeContext)
  // console.log('useRootTheme', rootTheme)

  if (!rootTheme) {
    throw new Error('useRootTheme(): missing context value')
  }

  return rootTheme
}

interface ThemeColorProviderProps {
  children?: React.ReactNode
  scheme?: ThemeColorSchemeKey
  variant?: ThemeColorVariant
}

export const ThemeColorProvider = (props: ThemeColorProviderProps) => {
  const { children, scheme, variant } = props
  const root = useRootTheme()

  return (
    <ThemeProvider scheme={scheme || root.scheme} theme={root.theme} variant={variant}>
      {children}
    </ThemeProvider>
  )
}
