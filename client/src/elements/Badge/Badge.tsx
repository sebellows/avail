import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { Label } from '../Label'
import { Box, BoxProps } from '../Box'
import { getElementSize, toPX } from '../../utils'
import { useEnsuredForwardedRef, usePrevious } from '../../hooks'
import { BorderRadiusProps, FontSizeProps, radiusStyle, RadiusStyleProps } from '../../styles'
import { badgeStyle } from './styles'
import { BadgeStyleProps, BadgeMode, BadgeVariant } from './types'

export interface BadgeProps extends BoxProps, BorderRadiusProps, FontSizeProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  mode?: BadgeMode
  variant?: BadgeVariant
}

const Root = styled(Box)<BadgeStyleProps & RadiusStyleProps>(radiusStyle, badgeStyle)

export const Badge = forwardRef<HTMLDivElement, BadgeProps & React.HTMLProps<HTMLDivElement>>(
  (
    {
      children,
      size = 'sm',
      mode = 'default',
      p = 4,
      radius = 'sm',
      style: initialStyle,
      variant = 'default',
      ...restProps
    },
    ref,
  ) => {
    const [style, setStyle] = React.useState(initialStyle)
    const componentRef = useEnsuredForwardedRef<HTMLDivElement>(ref)
    const prevRadius = usePrevious(radius)

    React.useEffect(() => {
      console.log('Badge radius change: ', radius, getElementSize(componentRef.current))
      if (radius && prevRadius !== radius) {
        let wpStyles = { width: null, height: null }
        if (radius === 'circle') {
          const [width] = getElementSize(componentRef.current)
          wpStyles = { width: toPX(width), height: toPX(width) }
        }
        setStyle((prevStyle) => ({ ...prevStyle, ...wpStyles }))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [radius, componentRef])

    return (
      <Root
        data-ui="Badge"
        {...restProps}
        $mode={mode}
        $variant={variant}
        $radius={radius}
        $p={p}
        style={style}
        ref={componentRef}
      >
        <Label size={size}>{children}</Label>
      </Root>
    )
  },
)

Badge.displayName = 'Badge'
