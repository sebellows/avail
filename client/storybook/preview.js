import { addDecorator } from '@storybook/react'

import { withTheme } from './decorators/theme'

addDecorator(withTheme)

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
}
