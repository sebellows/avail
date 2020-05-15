import React, { forwardRef, Ref } from 'react';
import { ComponentProps } from '../core/contracts';
import { classNames } from '../core/utils/classNames';
import styled from 'styled-components';

export const StyledField = styled.div`
  padding-top: var(--spacer-1);
  padding-bottom: var(--spacer-1);
`;

const Field = forwardRef<{}, ComponentProps>(({ className, children, ...props }, ref: Ref<any>) => {
  const formGroupClasses = classNames('field', className);

  return (
    <StyledField {...props} ref={ref} className={formGroupClasses}>
      {children}
    </StyledField>
  );
});

Field.displayName = 'Field';

export { Field };
