import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import {
  flexItemStyle,
  boxStyle,
  gridItemStyle,
  paddingStyle,
  marginStyle,
  BoxProps as CSSBoxProps,
  PaddingProps,
  MarginProps,
  FlexSizeProps,
  GridItemProps,
  MarginStyleProps,
  PaddingStyleProps,
  GridItemStyleProps,
  BoxStyleProps,
  FlexSizeStyleProps,
} from '../../styles'

export interface BoxProps
  extends Avail.ComponentProps,
    FlexSizeProps,
    CSSBoxProps,
    GridItemProps,
    MarginProps,
    PaddingProps {}

const Root = styled.div<
  FlexSizeStyleProps & BoxStyleProps & GridItemStyleProps & MarginStyleProps & PaddingStyleProps
>(flexItemStyle, boxStyle, gridItemStyle, marginStyle, paddingStyle)

const Box = forwardRef<HTMLDivElement, BoxProps & Omit<React.HTMLProps<HTMLDivElement>, 'height'>>(
  (
    {
      as: Component = 'div',
      column,
      columnStart,
      columnEnd,
      display = 'block',
      flex,
      height,
      margin = 0,
      marginX,
      marginY,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      overflow,
      padding = 0,
      paddingX,
      paddingY,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      row,
      rowStart,
      rowEnd,
      sizing,
      ...restProps
    },
    ref,
  ) => {
    return (
      <Root
        data-ui="Box"
        {...restProps}
        $padding={padding}
        $paddingX={paddingX}
        $paddingY={paddingY}
        $paddingTop={paddingTop}
        $paddingRight={paddingRight}
        $paddingBottom={paddingBottom}
        $paddingLeft={paddingLeft}
        $column={column}
        $columnStart={columnStart}
        $columnEnd={columnEnd}
        $display={display}
        $flex={flex}
        $height={height}
        $margin={margin}
        $marginX={marginX}
        $marginY={marginY}
        $marginTop={marginTop}
        $marginRight={marginRight}
        $marginBottom={marginBottom}
        $marginLeft={marginLeft}
        $overflow={overflow}
        $row={row}
        $rowStart={rowStart}
        $rowEnd={rowEnd}
        $sizing={sizing}
        as={Component}
        ref={ref}
      />
    )
  },
)

Box.displayName = 'Box'

export { Box }
