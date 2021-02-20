import React, { forwardRef, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useForwardedRef } from '../../hooks'
import {
  switchBaseStyles,
  switchRepresentationStyles,
  switchThumbStyles,
  switchTrackStyles,
  switchInputStyles,
} from './styles'

interface SwitchProps {
  indeterminate?: boolean
}

const Root = styled.span(switchBaseStyles)
const Input = styled.input(switchInputStyles)
const Representation = styled.span(switchRepresentationStyles)
const Track = styled.span(switchTrackStyles)
const Thumb = styled.span<{ $checked?: boolean; $indeterminate?: boolean }>(switchThumbStyles)

const Switch = forwardRef<
  HTMLInputElement,
  Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & SwitchProps
>(({ className, disabled, indeterminate, readOnly, style, ...props }, ref) => {
  const forwardedRef = useForwardedRef<HTMLInputElement>(ref as any)

  useEffect(() => {
    if (forwardedRef.current) {
      // Set the indeterminate state
      forwardedRef.current.indeterminate = indeterminate || false
    }
  }, [indeterminate, forwardedRef])

  return (
    <Root className={className} data-ui="Switch" style={style}>
      <Input
        data-read-only={!disabled && readOnly ? '' : undefined}
        {...props}
        disabled={disabled || readOnly}
        type="checkbox"
        ref={forwardedRef}
      />
      <Representation aria-hidden data-name="representation">
        <Track />
        <Thumb $checked={props?.checked} $indeterminate={indeterminate} />
      </Representation>
    </Root>
  )
})

Switch.displayName = 'Switch'

export { Switch }
