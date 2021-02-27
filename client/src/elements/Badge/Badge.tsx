import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { Label } from '../Label'
import { Box, BoxProps } from '../Box'
import { BorderRadiusProps, FontSizeProps, radiusStyle, RadiusStyleProps } from '../../styles'
import { badgeStyle } from './styles'
import { BadgeStyleProps, BadgeMode, BadgeVariant } from './types'

export interface BadgeProps extends BoxProps, BorderRadiusProps, FontSizeProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  // fontSize?: string | string[]
  mode?: BadgeMode
  variant?: BadgeVariant
}

const Root = styled(Box)<BadgeStyleProps & RadiusStyleProps>(radiusStyle, badgeStyle)

export const Badge = forwardRef((props: BadgeProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {
    children,
    size = 'sm',
    mode = 'default',
    p = 4,
    radius = 'sm',
    variant = 'default',
    ...restProps
  } = props

  return (
    <Root
      data-ui="Badge"
      {...restProps}
      $mode={mode}
      $variant={variant}
      $radius={radius}
      $p={p}
      ref={ref}
    >
      <Label size={size}>{children}</Label>
    </Root>
  )
})

Badge.displayName = 'Badge'
