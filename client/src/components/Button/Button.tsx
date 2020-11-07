import React, { Ref } from 'react'
import { classNames } from '../../core/utils'

import { Styled } from './styles'
import { ButtonProps } from './props'

export const Button = React.forwardRef<{}, ButtonProps>(
  (
    { children, size = null, fab = false, icon = false, type = 'button', variant, ...props },
    ref: Ref<any>,
  ) => {
    const btnStyle = fab ? 'fab' : icon ? 'icon' : 'base'

    return (
      <>
        {btnStyle === 'base' && (
          <Styled.Button
            {...props}
            ref={ref}
            type={type}
            className={classNames('btn', props.className)}
            variant={variant}
          >
            {children}
          </Styled.Button>
        )}
        {btnStyle === 'fab' && (
          <Styled.FAB
            {...props}
            ref={ref}
            type={type}
            className={classNames('fab', props.className)}
            variant={variant}
            size={size}
          >
            {children}
          </Styled.FAB>
        )}
        {btnStyle === 'icon' && (
          <Styled.Icon
            {...props}
            ref={ref}
            type={type}
            className={classNames('icon-btn', props.className)}
            variant={variant}
            size={size}
          >
            {children}
          </Styled.Icon>
        )}
      </>
    )
  },
)
