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
      m = 0,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      margin = 0,
      marginX,
      marginY,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      overflow,
      p = 0,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
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
        $padding={p ?? padding}
        $paddingX={px ?? paddingX}
        $paddingY={py ?? paddingY}
        $paddingTop={pt ?? paddingTop}
        $paddingRight={pr ?? paddingRight}
        $paddingBottom={pb ?? paddingBottom}
        $paddingLeft={pl ?? paddingLeft}
        $column={column}
        $columnStart={columnStart}
        $columnEnd={columnEnd}
        $display={display}
        $flex={flex}
        $height={height}
        $margin={m ?? margin}
        $marginX={mx ?? marginX}
        $marginY={my ?? marginY}
        $marginTop={mt ?? marginTop}
        $marginRight={mr ?? marginRight}
        $marginBottom={mb ?? marginBottom}
        $marginLeft={ml ?? marginLeft}
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
