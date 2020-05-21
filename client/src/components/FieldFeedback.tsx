import React, { Ref } from 'react';
import styled from 'styled-components';
import { color, toREM, font } from '../core/style';
import { ComponentProps } from '../core/contracts';

interface FeedbackProps extends ComponentProps {
  type: 'valid' | 'invalid'; // Specify whether the validity of the form fields
}

const StyledFieldFeedback = styled.small`
  display: block;
  color: ${(props: FeedbackProps) => (props.type === 'invalid' ? color.danger : color.success)};
  font-size: ${toREM(font.sizes.sm)};
  line-height: 1.3;
`;

const FieldFeedback = React.forwardRef<{}, FeedbackProps>(
  ({ type = 'valid', ...props }, ref: Ref<any>) => {
    return <StyledFieldFeedback {...props} ref={ref} />;
  },
);

FieldFeedback.displayName = 'FieldFeedback';

export { FieldFeedback };
