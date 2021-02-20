import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { Label } from '../Label'
import { Box, BoxProps } from '../Box'
import { BorderRadiusProps, radiusStyle, RadiusStyleProps } from '../../styles'
import { badgeStyle } from './styles'
import { BadgeStyleProps, BadgeMode, BadgeVariant } from './types'

export interface BadgeProps extends BoxProps, BorderRadiusProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: string | string[]
  mode?: BadgeMode
  variant?: BadgeVariant
}

const Root = styled(Box)<BadgeStyleProps & RadiusStyleProps>(radiusStyle, badgeStyle)

export const Badge = forwardRef((props: BadgeProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {
    children,
    fontSize,
    mode = 'default',
    padding = 4,
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
      padding={padding}
      ref={ref}
    >
      <Label size={fontSize}>{children}</Label>
    </Root>
  )
})

Badge.displayName = 'Badge'
