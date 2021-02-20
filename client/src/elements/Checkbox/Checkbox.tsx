import React, { forwardRef, useEffect } from 'react'
import styled from 'styled-components'
import { useForwardedRef, useCustomValidity } from '../../hooks'
import { Icon } from '../Icon'
import { checkboxBaseStyles, inputElementStyles } from './styles'

interface CheckboxProps {
  indeterminate?: boolean
  customValidity?: string
}

const Root = styled.div(checkboxBaseStyles)
const Input = styled.input(inputElementStyles)

const Checkbox = forwardRef<
  HTMLInputElement,
  Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & CheckboxProps
>(({ className, disabled, indeterminate, customValidity, readOnly, style, ...props }, ref) => {
  const forwardedRef = useForwardedRef(ref as any)

  useCustomValidity(forwardedRef, customValidity)

  useEffect(() => {
    if (forwardedRef.current) {
      // Set the indeterminate state
      forwardedRef.current.indeterminate = indeterminate || false
    }
  }, [indeterminate, forwardedRef])

  return (
    <Root className={className} data-ui="Checkbox" style={style}>
      <Input
        data-read-only={!disabled && readOnly ? '' : undefined}
        {...props}
        disabled={disabled || readOnly}
        type="checkbox"
        readOnly={readOnly}
        ref={forwardedRef}
      />
      <span>
        <Icon name="checkmark" />
        <Icon name="minus" />
      </span>
    </Root>
  )
})

Checkbox.displayName = 'Checkbox'
export { Checkbox }
