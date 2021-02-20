import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import {
  FontStyleProps,
  FontStyleStyleProps,
  TextAlignProps,
  TextAlignStyleProps,
  textAlignStyle,
  fontStyle,
} from '../../styles'
import { MakeOptional } from '../../types'
import { textBaseStyle, TextBaseStyleProps } from './styles'

export interface TextProps extends FontStyleProps, TextAlignProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  accent?: boolean
  muted?: boolean
}

const Root = styled.div<FontStyleStyleProps & TextAlignStyleProps & TextBaseStyleProps>(
  fontStyle('text'),
  textAlignStyle,
  textBaseStyle,
)

export const Text = forwardRef<
  HTMLDivElement,
  MakeOptional<TextProps, 'size' | 'fontWeight'> & Omit<React.HTMLProps<HTMLDivElement>, 'size'>
>(
  (
    {
      accent = false,
      textAlign,
      children,
      muted = false,
      size = 'sm',
      fontWeight = 'regular',
      ...restProps
    },
    ref,
  ) => {
    return (
      <Root
        data-ui="Text"
        {...restProps}
        $accent={accent}
        $align={textAlign}
        $muted={muted}
        ref={ref}
        $size={size}
        $fontWeight={fontWeight}
      >
        {children}
      </Root>
    )
  },
)

Text.displayName = 'Text'
