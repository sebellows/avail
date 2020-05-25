import React, { Ref } from 'react';
import { classNames } from '../../core/utils';

import { StyledButton, StyledFAB } from './styles';
import { ButtonProps } from './props';

export const Button = React.forwardRef<{}, ButtonProps>(
  ({ children, size = null, fab = false, variant, ...props }, ref: Ref<any>) => {
    return (
      <>
        {!fab && (
          <StyledButton
            {...props}
            ref={ref}
            type="button"
            className={classNames('btn', props.className)}
            variant={variant}
          >
            {children}
          </StyledButton>
        )}
        {fab && (
          <StyledFAB
            {...props}
            ref={ref}
            type="button"
            className={classNames('fab', props.className)}
            variant={variant}
            size={size}
          >
            {children}
          </StyledFAB>
        )}
      </>
    );
  },
);
