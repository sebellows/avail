import React, { Ref } from 'react';

import { ComponentProps } from '../core/contracts';
import styled from 'styled-components';
import { color, font, toREM } from '../core/style';

interface FieldDescriptionProps extends ComponentProps {
  /** Add `text-muted` class */
  muted?: boolean;
}

const StyledFieldDescription = styled.small`
  display: inline-block;
  color: ${(props: FieldDescriptionProps) => (props.muted ? color.text.muted : color.text.body)};
  font-size: ${toREM(font.sizes.sm)};
  line-height: 1.3;
`;

const FieldDescription = React.forwardRef<{}, FieldDescriptionProps>(
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
