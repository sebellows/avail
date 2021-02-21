import React from 'react'
import { GlobalStyle, rootTheme, ThemeProvider } from '../../src/theme'
import { select } from '@storybook/addon-knobs'

export const withTheme = (storyFn: () => JSX.Element) => {
  const scheme = select('Color scheme', { Light: 'light', Dark: 'dark' }, 'light', 'Theme')
  const variant = select(
    'Color variant',
    {
      Default: 'default',
      Transparent: 'transparent',
      Accent: 'accent',
      Primary: 'primary',
      Success: 'success',
      Warning: 'warning',
      Danger: 'danger',
    },
    'default',
    'Theme',
  )

  return (
    <ThemeProvider theme={rootTheme} scheme={scheme} variant={variant}>
      <GlobalStyle />
      {storyFn()}
    </ThemeProvider>
  )
}
