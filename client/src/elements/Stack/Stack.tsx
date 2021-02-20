import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { GridProps } from '../../styles'
import { Box, BoxProps } from '../Box'
import { stackBaseStyle, stackSpaceStyle, StackSpaceStyleProps } from './styles'

interface StackProps extends BoxProps, Pick<GridProps, 'gap'> {}

const Root = styled(Box)<StackSpaceStyleProps>(stackBaseStyle, stackSpaceStyle)

export const Stack = forwardRef<HTMLDivElement, StackProps & React.HTMLProps<HTMLDivElement>>(
  ({ as, gap, ...restProps }, ref) => {
    return (
      <Root
        data-as={typeof as === 'string' ? as : undefined}
        data-ui="Stack"
        {...restProps}
        $gap={gap}
        forwardedAs={as}
        ref={ref}
      />
    )
  },
)

Stack.displayName = 'Stack'
