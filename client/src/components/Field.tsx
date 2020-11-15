import React, { forwardRef, Ref } from 'react'
import { ComponentProps } from '../core/contracts'
import { classNames } from '../core/utils/classNames'
import styled from 'styled-components'
import { mixin } from '../core/style'

export const StyledField = styled.div`
  ${mixin.padding.y(1)}
`

const Field = forwardRef<{}, ComponentProps>(({ className, children, ...props }, ref: Ref<any>) => {
  return (
    <StyledField {...props} ref={ref} className={classNames('field', className)}>
      {children}
    </StyledField>
  )
})

Field.displayName = 'Field'

export { Field }
