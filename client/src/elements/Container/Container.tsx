import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { MaxWidthProps, MaxWidthStyleProps } from '../../styles'
import { maxWidthStyle } from '../../styles/size'
import { Box, BoxProps } from '../Box'

export interface ContainerProps extends BoxProps, MaxWidthProps {}

export function containerBaseStyle() {
  return { width: '100%', marginLeft: 'auto', marginRight: 'auto' }
}

const Root = styled(Box)<MaxWidthStyleProps>(containerBaseStyle, maxWidthStyle)

export const Container = forwardRef<
  HTMLDivElement,
  ContainerProps & Omit<React.HTMLProps<HTMLDivElement>, 'height' | 'width'>
>(({ as: Component, maxWidth = 'md', ...restProps }, ref) => {
  return (
    <Root
      data-ui="Container"
      {...restProps}
      $maxWidth={maxWidth}
      as={Component}
      forwardedAs={Component}
      ref={ref}
    />
  )
})

Container.displayName = 'Container'
