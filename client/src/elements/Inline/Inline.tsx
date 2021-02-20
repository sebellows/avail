import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { Box, BoxProps } from '../Box'
import { flattenChildren } from '../../utils'
import { inlineBaseStyle, inlineSpaceStyle } from './styles'
import { InlineSpaceStyleProps } from './types'

export interface InlineProps extends Omit<BoxProps, 'display'> {
  space?: number | number[]
}

const Root = styled(Box)<InlineSpaceStyleProps>(inlineBaseStyle, inlineSpaceStyle)

export const Inline = forwardRef<HTMLDivElement, InlineProps & React.HTMLProps<HTMLDivElement>>(
  ({ as, children: childrenProp, space, ...props }, ref) => {
    const children = flattenChildren(childrenProp).filter(Boolean)

    return (
      <Root data-ui="Inline" {...props} $space={space} forwardedAs={as} ref={ref}>
        {children.map((child, idx) => (
          <div key={idx}>{child}</div>
        ))}
      </Root>
    )
  },
)

Inline.displayName = 'Inline'
