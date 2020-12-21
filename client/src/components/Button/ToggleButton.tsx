import React from 'react'
import { useTheme } from '../../ThemeContext'
import { classNames, containerProps, validFormProps } from '../../core/utils'

import { Styled } from './styles'
import { ToggleButtonProps } from './props'

const ToggleButton: Avail.RefForwardingComponent<'label', ToggleButtonProps> = React.forwardRef(
  (
    {
      as: Component = 'label',
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

    const labelProps = containerProps(props)
    const inputProps = validFormProps(props)

    React.useEffect(() => {
      console.log('ToggleButton', name, props)
    }, [name, props])

    return (
      <Styled.Toggle
        {...labelProps}
        ref={ref}
        as={Component}
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
