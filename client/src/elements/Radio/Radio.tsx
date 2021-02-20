import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { useForwardedRef, useCustomValidity } from '../../hooks'
import { radioBaseStyle, inputElementStyle } from './styles'

interface RadioProps {
  customValidity?: string
}

const Root = styled.div(radioBaseStyle)
const Input = styled.input(inputElementStyle)

export const Radio = forwardRef<
  HTMLInputElement,
  Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & RadioProps
>(({ className, disabled, style, customValidity, readOnly, ...props }, ref) => {
  const forwardedRef = useForwardedRef<HTMLInputElement>(ref as any)

  useCustomValidity(forwardedRef as React.MutableRefObject<HTMLInputElement>, customValidity)

  return (
    <Root className={className} data-ui="Radio" style={style}>
      <Input
        data-read-only={!disabled && readOnly ? '' : undefined}
        {...props}
        disabled={disabled || readOnly}
        readOnly={readOnly}
        ref={forwardedRef}
        type="radio"
      />
      <span />
    </Root>
  )
})

Radio.displayName = 'Radio'
