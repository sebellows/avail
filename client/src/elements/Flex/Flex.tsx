import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { flexItemStyle, flexStyle } from '../../styles'
import {
  FlexProps as CSSFlexProps,
  FlexSizeProps,
  FlexSizeStyleProps,
  FlexStyleProps,
} from '../../styles/types'
import { Box, BoxProps } from '../Box'

interface FlexProps extends BoxProps, CSSFlexProps, FlexSizeProps {
  inline?: boolean
}

const Root = styled(Box)<FlexSizeStyleProps & FlexStyleProps>(flexItemStyle, flexStyle)

export const Flex = forwardRef<HTMLDivElement, FlexProps & React.HTMLProps<HTMLDivElement>>(
  ({ align, as: Component, direction = 'row', inline, justify, wrap, ...restProps }, ref) => {
    return (
      <Root
        data-ui="Flex"
        {...restProps}
        $display={inline ? 'inline-flex' : 'flex'}
        $align={align}
        $direction={direction}
        $justify={justify}
        $wrap={wrap}
        as={Component}
        forwardedAs={Component}
        ref={ref}
      />
    )
  },
)

Flex.displayName = 'Flex'
