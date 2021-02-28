import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import {
  labelFontStyle,
  textAlignStyle,
  FontSizeProps,
  FontWeightProps,
  TextAlignProps,
  FontSizeStyleProps,
  FontWeightStyleProps,
  TextAlignStyleProps,
} from '../../styles'
import { labelBaseStyle } from './styles'

interface LabelProps extends Avail.ComponentProps, FontSizeProps, FontWeightProps, TextAlignProps {
  accent?: boolean
  muted?: boolean
}

const Root = styled.div<
  {
    $accent?: boolean
    $muted: boolean
  } & FontSizeStyleProps &
    FontWeightStyleProps &
    TextAlignStyleProps
>(labelFontStyle, textAlignStyle, labelBaseStyle)

const Label = forwardRef<
  HTMLDivElement,
  LabelProps & Omit<React.HTMLProps<HTMLDivElement>, 'size'>
>(({ accent, textAlign, children, muted = false, size = 'sm', fontWeight, ...restProps }, ref) => {
  return (
    <Root
      data-ui="Label"
      {...restProps}
      $accent={accent}
      $textAlign={textAlign}
      $muted={muted}
      $size={size}
      $fontWeight={fontWeight}
      ref={ref}
    >
      {children}
    </Root>
  )
})

Label.displayName = 'Label'

export { Label }
