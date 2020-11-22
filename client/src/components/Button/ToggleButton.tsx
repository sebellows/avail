/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react'
import { classNames } from '../../core/utils'
import { useTheme } from '../../ThemeContext'
import { ToggleControl } from '../ToggleControl'

import { ToggleButtonProps } from './props'
import { Styled } from './styles'

const ToggleButton = React.forwardRef<any, ToggleButtonProps>(
  (
    {
      as = ToggleControl,
      children,
      className,
      disabled,
      name,
      type,
      value,
      variant,
      ...props
    }: ToggleButtonProps,
    ref,
  ) => {
    const { theme } = useTheme()

    React.useEffect(() => {
      console.log('ToggleButton', name, props)
    }, [name, props])

    return (
      <Styled.Toggle
        {...props}
        ref={ref}
        as={ToggleControl}
        type={type}
        theme={theme}
        className={classNames(
          'btn-toggle',
          !!className && className,
          props?.focused && 'focus',
          disabled && 'disabled',
        )}
        variant={variant}
      >
        {children}
      </Styled.Toggle>
    )
  },
)

ToggleButton.displayName = 'ToggleButton'

export { ToggleButton }
