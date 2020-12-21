import React from 'react'
import { classNames } from '../../core/utils'

import { Styled } from './styles'
import { ButtonProps } from './props'
import { useTheme } from '../../ThemeContext'

export const Button: Avail.RefForwardingComponent<'button', ButtonProps> = React.forwardRef(
  (
    {
      as: Component = 'button',
      children,
      size = 54,
      fab = false,
      icon = false,
      type = 'button',
      variant,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme()
    const btnStyle = fab ? 'fab' : icon ? 'icon' : 'base'
    const normalizedSize = typeof size === 'string' ? parseInt('' + size, 10) : size

    return (
      <>
        {btnStyle === 'base' && (
          <Styled.Button
            {...props}
            as={Component}
            ref={ref}
            type={type}
            theme={theme}
            className={classNames('btn', props.className)}
            variant={variant}
          >
            {children}
          </Styled.Button>
        )}
        {btnStyle === 'fab' && (
          <Styled.FAB
            {...props}
            as={Component}
            ref={ref}
            type={type}
            theme={theme}
            className={classNames('fab', props.className)}
            variant={variant}
            size={normalizedSize}
          >
            {children}
          </Styled.FAB>
        )}
        {btnStyle === 'icon' && (
          <Styled.Icon
            {...props}
            as={Component}
            ref={ref}
            type={type}
            theme={theme}
            className={classNames('icon-btn', props.className)}
            variant={variant}
            size={normalizedSize}
          >
            {children}
          </Styled.Icon>
        )}
      </>
    )
  },
)
