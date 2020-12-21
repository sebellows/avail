import React, { forwardRef } from 'react'

import { classNames } from '../../core/utils'
import { useTheme } from '../../ThemeContext'

import { Styled } from './styles'

const PillTabs: Avail.RefForwardingComponent<'ol', Avail.ComponentProps> = forwardRef(
  ({ as: Component = 'ol', id, children, ...props }, ref) => {
    const { theme } = useTheme()

    return (
      <Styled.Tabs
        {...props}
        ref={ref}
        as={Component}
        id={id}
        className={classNames('pill-tabs', props.className)}
        theme={theme}
      >
        {children}
      </Styled.Tabs>
    )
  },
)

PillTabs.displayName = 'PillTabs'

export { PillTabs }
