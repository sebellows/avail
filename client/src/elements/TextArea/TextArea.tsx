import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { useForwardedRef, useCustomValidity } from '../../hooks'
import {
  inputPaddingStyle,
  radiusStyle,
  RadiusStyleProps,
  textInputStyle,
  TextInputPaddingStyleProps,
  TextInputStyleProps,
  TextInputRepresentationStyleProps,
  BorderRadiusProps,
  FontSettingProps,
  PaddingProps,
  BorderProps,
} from '../../styles'

interface TextInputProps
  extends BorderRadiusProps,
    FontSettingProps,
    Pick<BorderProps, 'border'>,
    Pick<PaddingProps, 'padding'> {
  customValidity?: string
}

const Root = styled.span(textInputStyle.root)

const InputRoot = styled.span`
  flex: 1;
  min-width: 0;
  display: block;
  position: relative;
`

const Input = styled.textarea<TextInputPaddingStyleProps & TextInputStyleProps>(
  inputPaddingStyle,
  textInputStyle.input,
)

const Presentation = styled.div<TextInputRepresentationStyleProps & RadiusStyleProps>(
  radiusStyle,
  textInputStyle.representation,
)

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextInputProps & Omit<React.HTMLProps<HTMLTextAreaElement>, 'as'>
>(
  (
    {
      border = true,
      customValidity,
      disabled = false,
      size = 'sm',
      padding = 3,
      radius = 'md',
      ...restProps
    },
    ref,
  ) => {
    const forwardedRef = useForwardedRef(ref as any)

    useCustomValidity(forwardedRef, customValidity)

    return (
      <Root data-ui="TextArea">
        <InputRoot>
          <Input
            data-as="textarea"
            {...restProps}
            $size={size}
            $padding={padding}
            disabled={disabled}
            ref={ref}
          />
          <Presentation $border={border} $radius={radius} />
        </InputRoot>
      </Root>
    )
  },
)

TextArea.displayName = 'TextArea'
