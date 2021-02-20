import React from 'react'
import { rootTheme, ThemeProvider } from '../../src/theme'
import { select } from '@storybook/addon-knobs'

export const withTheme = (storyFn: () => JSX.Element) => {
  const scheme = select('Color sheme', { Light: 'light', Dark: 'dark' }, 'light', 'Theme')
  const variant = select(
    'Color variant',
    {
      Transparent: 'transparent',
      Default: 'default',
      Accent: 'accent',
      Primary: 'primary',
      Success: 'success',
      Warning: 'warning',
      Danger: 'danger',
    },
    'transparent',
    'Theme',
  )

  return (
    <ThemeProvider theme={rootTheme} scheme={scheme} variant={variant}>
      {storyFn()}
    </ThemeProvider>
  )
}
