import React from 'react'
import '../App.css'

// import { ThemeProvider, useRootTheme } from '../theme'
import { GlobalStyle, rootTheme, ThemeProvider } from '../theme'
import { AppHeader } from './AppHeader'
// import { GlobalStyle } from '../theme/globalStyle'

export const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={rootTheme}>
      <GlobalStyle />
      <AppHeader />
      {children}
    </ThemeProvider>
  )
}
