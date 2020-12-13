/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react'
import { classNames, containerProps, validFormProps } from '../../core/utils'
import { useTheme } from '../../ThemeContext'
// import { Control } from '../Control'

import { ToggleButtonProps } from './props'
import { Styled } from './styles'

const ToggleButton = React.forwardRef<HTMLLabelElement, ToggleButtonProps>(
  (
    { children, className, disabled, name, type, value, variant, ...props }: ToggleButtonProps,
    ref,
  ) => {
    const { theme } = useTheme()

    const labelProps = containerProps(props)
    const inputProps = validFormProps(props)

    React.useEffect(() => {
      console.log('ToggleButton', name, props)
    }, [name, props])

    return (
      <Styled.Toggle
        {...labelProps}
        ref={ref}
        as="label"
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
        <Styled.ToggleControl type={type} {...inputProps} />
        {children}
      </Styled.Toggle>
    )
  },
)

ToggleButton.displayName = 'ToggleButton'

export { ToggleButton }
