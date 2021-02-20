import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { labelFontStyle, textAlignStyle, FontWeightKey, TextAlignKey } from '../../styles'
import { labelBaseStyle } from './styles'

interface LabelProps {
  accent?: boolean
  textAlign?: TextAlignKey | TextAlignKey[]
  as?: React.ElementType | keyof JSX.IntrinsicElements
  muted?: boolean
  size?: string | string[]
  fontWeight?: FontWeightKey
}

const Root = styled.div<{
  $accent?: boolean
  $textAlign?: TextAlignKey | TextAlignKey[]
  $muted: boolean
  $size: string[]
}>(labelFontStyle, textAlignStyle, labelBaseStyle)

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
