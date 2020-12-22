import React from 'react'
import styled from 'styled-components'

export interface BoxProps
  extends FlexItemStyleProps,
    ResponsiveBoxStyleProps,
    ResponsiveGridItemStyleProps,
    ResponsiveMarginStyleProps,
    ResponsivePaddingStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<
  FlexItemStyleProps &
    ResponsiveBoxStyleProps &
    ResponsiveGridItemStyleProps &
    ResponsiveMarginStyleProps &
    ResponsivePaddingStyleProps
>(
  flexItemStyle,
  responsiveBoxStyle,
  responsiveGridItemStyle,
  responsiveMarginStyle,
  responsivePaddingStyle,
)

export const Box = React.forwardRef(
  (props: BoxProps & Omit<React.HTMLProps<HTMLDivElement>, 'height'>, ref) => {
    const { as: asProp = 'div', display = 'block', margin = 0, padding = 0, ...restProps } = props

    return (
      <Root
        data-ui="Box"
        {...restProps}
        as={asProp}
        display={display}
        margin={margin}
        padding={padding}
        ref={ref}
      >
        {props.children}
      </Root>
    )
  },
)

Box.displayName = 'Box'
