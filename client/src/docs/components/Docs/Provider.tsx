/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react'
import { usePrefersDark } from '../../../hooks'
// import { LayerProvider } from '../../../providers'

import {
  GlobalStyle,
  rootTheme,
  ThemeColorProvider,
  ThemeColorSchemeKey,
  ThemeProvider,
  zOffsets,
} from '../../../theme'
import { NavItem, NavMenu } from '../../lib/nav/types'

export interface AppContextProps {
  colorScheme?: ThemeColorSchemeKey
  menu?: NavMenu | null
  nav?: NavItem
  setColorScheme: (mode: ThemeColorSchemeKey) => void
  settings?: unknown
  target?: unknown
  zOffsets?: {
    navDrawer: number
    toast: number
  }
}

export const AppContext = createContext<AppContextProps | null>(null)

export interface AppProviderProps extends Avail.PropsWithChildren {
  menu?: NavMenu | null
  nav?: NavItem
  settings?: unknown
  target?: unknown
}

export function AppProvider({
  children = null,
  menu = null,
  nav = null,
  settings = null,
  target = null,
}: AppProviderProps) {
  const prefersDark = usePrefersDark()
  const [colorScheme, setColorScheme] = useState<ThemeColorSchemeKey>(
    prefersDark ? 'dark' : 'light',
  )

  useEffect(() => setColorScheme(prefersDark ? 'dark' : 'light'), [prefersDark])

  return (
    <ThemeProvider scheme={colorScheme} theme={rootTheme}>
      <ThemeColorProvider variant="default">
        <GlobalStyle />
      </ThemeColorProvider>
      <AppContext.Provider
        value={{ colorScheme, menu, nav, setColorScheme, settings, target, zOffsets }}
      >
        {children}
        {/* <LayerProvider>
          <Toast zOffset={zOffsets.toast}>{children}</ToastProvider>
        </LayerProvider> */}
      </AppContext.Provider>
    </ThemeProvider>
  )
}

export function useApp() {
  const app = useContext(AppContext)

  if (!app) {
    throw new Error('App: missing context value')
  }

  return app
}
