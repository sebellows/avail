import React, { forwardRef } from 'react'
import { isValidElementType } from 'react-is'
import styled from 'styled-components/macro'
import {
  borderStyle,
  flexItemStyle,
  marginStyle,
  paddingStyle,
  radiusStyle,
  shadowStyle,
  BorderProps,
  BorderStyleProps,
  BorderRadiusProps,
  RadiusStyleProps,
  ShadowProps,
  ShadowStyleProps,
  MarginStyleProps,
  PaddingStyleProps,
  MarginProps,
  PaddingProps,
  FlexSizeStyleProps,
} from '../../styles'
import {
  ThemeColorProvider,
  ThemeColorSchemeKey,
  ThemeColorVariantKey,
  useRootTheme,
} from '../../theme'
import { Box, BoxProps } from '../Box'
import { cardStyle } from './styles'
import { CardStyleProps } from './types'

export interface CardProps
  extends BoxProps,
    BorderProps,
    BorderRadiusProps,
    MarginProps,
    PaddingProps,
    ShadowProps {
  scheme?: ThemeColorSchemeKey
  variant?: ThemeColorVariantKey | 'inherit'
}

const Root = styled(Box)<
  FlexSizeStyleProps &
    CardStyleProps &
    MarginStyleProps &
    PaddingStyleProps &
    RadiusStyleProps &
    BorderStyleProps &
    ShadowStyleProps
>(borderStyle, flexItemStyle, marginStyle, paddingStyle, radiusStyle, shadowStyle, cardStyle)

// type CardComponent = Avail.RefForwardingComponent<'div', CardProps & Omit<React.HTMLProps<HTMLDivElement>, 'height'>>

const Card = forwardRef<'div', CardProps & Omit<React.HTMLProps<HTMLDivElement>, 'height'>>(
  (
    {
      as: asProp = 'div',
      border,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
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
      padding = [4, 16],
      paddingX,
      paddingY,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      radius = 'none',
      row,
      rowStart,
      rowEnd,
      sizing,
      scheme,
      shadow,
      variant: computedVariant = 'default',
      ...restProps
    },
    ref,
  ) => {
    const rootTheme = useRootTheme()
    const as = isValidElementType(asProp) ? asProp : 'div'
    const variant = computedVariant === 'inherit' ? rootTheme.variant : computedVariant

    return (
      <ThemeColorProvider scheme={scheme} variant={variant}>
        <Root
          as={asProp}
          data-as={typeof as === 'string' ? as : null}
          data-scheme={rootTheme.scheme}
          data-ui="Card"
          data-variant={variant}
          {...restProps}
          $border={border}
          $borderTop={borderTop}
          $borderRight={borderRight}
          $borderBottom={borderBottom}
          $borderLeft={borderLeft}
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
          $padding={padding}
          $paddingX={paddingX}
          $paddingY={paddingY}
          $paddingTop={paddingTop}
          $paddingRight={paddingRight}
          $paddingBottom={paddingBottom}
          $paddingLeft={paddingLeft}
          $radius={radius}
          $row={row}
          $rowStart={rowStart}
          $rowEnd={rowEnd}
          $shadow={shadow}
          $sizing={sizing}
          $variant={variant}
          forwardedAs={as}
          ref={ref}
        >
          {restProps?.children}
        </Root>
      </ThemeColorProvider>
    )
  },
)

Card.displayName = 'Card'

export { Card }
