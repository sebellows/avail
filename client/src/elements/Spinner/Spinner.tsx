import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { keyframes } from 'styled-components'
import { Icon } from '../Icon'
import { Text } from '../Text'

interface SpinnerProps {
  muted?: boolean
  size?: number | number[]
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Root = styled(Text)`
  & > svg {
    animation: ${rotate} 500ms linear infinite;
  }
`

export const Spinner = forwardRef<
  HTMLDivElement,
  SpinnerProps & Omit<React.HTMLProps<HTMLDivElement>, 'as'>
>((props, ref) => {
  return (
    <Root data-ui="Spinner" {...props} ref={ref}>
      <Icon name="loader" />
    </Root>
  )
})

Spinner.displayName = 'Spinner'
