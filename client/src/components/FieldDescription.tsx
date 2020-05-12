import React, { Ref } from 'react';

import { ComponentProps } from '../core/contracts';
import styled from 'styled-components';
import { color } from '../core/utils';

interface FieldDescriptionProps extends ComponentProps {
  /** Add `text-muted` class */
  muted?: boolean;
}

const StyledFieldDescription = styled.small`
  color: ${(props: FieldDescriptionProps) => (props.muted ? color.text.muted : color.text.body)};
`;

const FieldDescription = React.forwardRef<{}, FieldDescriptionProps>(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({ muted = true, ...props }, ref: Ref<any>) => {
    return (
      <StyledFieldDescription {...props} as={props.as} muted={muted} ref={ref}>
        {props.children}
      </StyledFieldDescription>
    );
  },
);

FieldDescription.displayName = 'FieldDescription';

export { FieldDescription };
