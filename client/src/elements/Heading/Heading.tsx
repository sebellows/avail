import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import {
  FontStyleProps,
  FontStyleStyleProps,
  headingStyle,
  TextAlignProps,
  textAlignStyle,
  TextAlignStyleProps,
  TextTruncateProps,
  truncateTextStyle,
} from '../../styles'
// import { ThemeFontWeightKey } from '../../theme'
import { headingBaseStyle } from './styles'
import { HeadingStyleProps } from './types'

export interface HeadingProps extends Avail.ComponentProps, FontStyleProps, TextAlignProps {
  accent?: boolean
  muted?: boolean
  truncate?: boolean
}

const Root = styled.div<HeadingStyleProps & TextAlignStyleProps & FontStyleStyleProps>(
  headingBaseStyle,
  textAlignStyle,
  headingStyle,
)

const SpanWithTextOverflow = styled.span<TextTruncateProps>(truncateTextStyle)

export const Heading = forwardRef<
  HTMLHeadingElement,
  HeadingProps & Omit<React.HTMLProps<HTMLHeadingElement>, 'size'>
>(
  (
    {
      as: Component = 'h1',
      accent = false,
      textAlign,
      children: _children,
      muted = false,
      size = Component,
      truncate,
      fontWeight,
      ...props
    },
    ref,
  ) => {
    let children = _children

    if (truncate) {
      children = <SpanWithTextOverflow>{children}</SpanWithTextOverflow>
    }

    return (
      <Root
        data-ui="Heading"
        {...props}
        $accent={accent}
        $textAlign={textAlign}
        $muted={muted}
        $size={size}
        $fontWeight={fontWeight}
        ref={ref}
        as={Component}
      >
        {children}
      </Root>
    )
  },
)

Heading.displayName = 'Heading'
