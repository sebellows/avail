import React, { createContext, useContext } from 'react'
import { ThemeProvider as StyledThemeProvider, useTheme as useStyledTheme } from 'styled-components'
import { MakeOptional } from '../types'
// import { rootTheme } from './config'
import { Theme, RootTheme } from './types'
import { ThemeColorVariant, ThemeColorSchemeKey } from './colors/types'
import { ls } from '../utils'

export interface ThemeContextValue {
  scheme?: ThemeColorSchemeKey
  theme?: RootTheme
  variant?: ThemeColorVariant
  themeLoaded?: boolean
  version?: number
  setScheme?: React.Dispatch<React.SetStateAction<ThemeColorSchemeKey>>
  setVariant?: React.Dispatch<React.SetStateAction<ThemeColorVariant>>
}

export interface ThemeProviderProps
  extends MakeOptional<ThemeContextValue, 'scheme' | 'variant'>,
    Pick<Avail.Props, 'children'> {}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export const ThemeProvider = ({
  children,
  scheme = 'light',
  theme: rootTheme,
  variant = 'default',
}: ThemeProviderProps) => {
  // const { children, scheme = 'light', theme: rootTheme, tone = 'default' } = props
  // const [themeLoaded, setThemeLoaded] = useState<boolean>(false)

  const theme: Theme = React.useMemo(() => {
    const { color: rootColor, ...restTheme } = rootTheme
    const colorScheme = rootColor[scheme] || rootColor.light
    const color = colorScheme[variant] || colorScheme.default

    return { ...restTheme, color }
  }, [rootTheme, scheme, variant])

  const value: ThemeContextValue = React.useMemo(() => {
    const currentTheme = {
      version: 0.0,
      theme: rootTheme,
      scheme,
      variant,
    }
    ls.set('theme', currentTheme)
    return currentTheme
  }, [rootTheme, scheme, variant])

  // const [scheme, setScheme] = useState(currentScheme)
  // const [variant, setVariant] = useState(initialVariant)
  // const [theme, setTheme] = useState({
  //   ...schemes,
  //   scheme,
  //   color: schemes.color[currentScheme][initialVariant],
  // })

  // const prevScheme = React.useRef<string>(scheme)

  // React.useEffect(() => {
  //   if (!prevScheme && scheme && !themeLoaded) {
  //     setThemeLoaded(true)
  //   }
  //   if (prevScheme && prevScheme.current !== scheme) {
  //     // setVariantConfig(rootTheme[scheme][variant])
  //     const newScheme = { ...currentTheme, scheme, color: currentTheme.color[scheme][variant] }
  //     // setTheme(newScheme)
  //     ls.set('theme', newScheme)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [scheme])

  // { theme: schemes, scheme, themeLoaded, variant, setScheme, setVariant }
  return (
    <ThemeContext.Provider value={value}>
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
