import React from 'react'
import styled from 'styled-components'
import { color, mixin } from '../core/style'

interface FeedbackProps extends Avail.ComponentProps {
  type: 'valid' | 'invalid' // Specify whether the validity of the form fields
}

const FieldFeedbackComponent: Avail.RefForwardingComponent<
  'small',
  FeedbackProps
> = React.forwardRef(({ as: Component = 'small', type, ...props }, ref) => {
  return <Component {...props} ref={ref} />
})

const FieldFeedback = styled(FieldFeedbackComponent)<FeedbackProps>`
  display: block;
  ${({ type }) => mixin.color(type === 'invalid' ? color.danger : color.success)}
  ${mixin.font.size('sm')}
  line-height: 1.3;
`

FieldFeedback.defaultProps = {
  type: 'valid',
}
FieldFeedback.displayName = 'FieldFeedback'

export { FieldFeedback }
