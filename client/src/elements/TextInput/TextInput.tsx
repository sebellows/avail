import React, { createElement, forwardRef, isValidElement, useCallback } from 'react'
import { isValidElementType } from 'react-is'
import styled from 'styled-components/macro'
import { useForwardedRef, useCustomValidity } from '../../hooks'
import {
  radiusStyle,
  RadiusStyleProps,
  inputPaddingStyle,
  textInputStyle,
  TextInputStyleProps,
  TextInputRepresentationStyleProps,
  TextInputPaddingStyleProps,
  BorderProps,
  FontSettingProps,
  SpaceProps,
  BorderRadiusProps,
  PaddingProps,
} from '../../styles'
import { variadic } from '../../utils'
import { ThemeColorButtonModeKey } from '../../theme'
import { Box } from '../Box'
import { Card } from '../Card'
import { Text } from '../Text'
import { Icon } from '../Icon'
import { Button, ButtonProps } from '../Button'

interface TextInputProps
  extends BorderProps,
    BorderRadiusProps,
    FontSettingProps,
    PaddingProps,
    SpaceProps {
  // border?: boolean
  /** @beta */
  clearButton?:
    | boolean
    | (Omit<ButtonProps, 'as'> & Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'ref'>)
  customValidity?: string
  // size?: string | string[]
  icon?: React.ComponentType | React.ReactNode
  iconRight?: React.ComponentType | React.ReactNode
  /** @beta */
  onClear?: () => void
  // padding?: number | number[]
  prefix?: React.ReactNode
  // radius?: number | number[] | string | string[]
  // space?: number | number[]
  suffix?: React.ReactNode
  type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'url'
    | 'month'
    | 'number'
    | 'password'
    | 'tel'
    | 'time'
    | 'text'
    | 'week'
  // weight?: ThemeFontWeightKey
}

const Root = styled.span(textInputStyle.root)

const InputRoot = styled.span`
  flex: 1;
  min-width: 0;
  display: block;
  position: relative;
`

const Prefix = styled(Card).attrs({ forwardedAs: 'span' })`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  & > span {
    display: block;
    margin: -1px;
  }
`

const Suffix = styled(Card).attrs({ forwardedAs: 'span' })`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  & > span {
    display: block;
    margin: -1px;
  }
`

const Input = styled.input<TextInputPaddingStyleProps & TextInputStyleProps>(
  inputPaddingStyle,
  textInputStyle.input,
)

const Presentation = styled.span<RadiusStyleProps & TextInputRepresentationStyleProps>(
  radiusStyle,
  textInputStyle.representation,
)

const LeftBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
`

const RightBox = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
`

const TextInput = forwardRef<
  HTMLInputElement,
  TextInputProps & Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'>
>(
  (
    {
      border = true,
      clearButton,
      disabled = false,
      size = 'sm',
      icon,
      iconRight,
      onClear,
      padding: paddingProp = 3,
      prefix,
      radius = 'sm',
      space = 3,
      suffix,
      customValidity,
      type = 'text',
      ...restProps
    },
    ref,
  ) => {
    const forwardedRef = useForwardedRef(ref as any)

    const padding = variadic(paddingProp)

    useCustomValidity<HTMLInputElement>(forwardedRef, customValidity)

    // Prevent the clear button from taking the focus away from the input
    const handleClearMouseDown = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }, [])

    const handleClearClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()

        if (onClear) onClear()

        // Focus the input, in case focus has been lost when clicking the clear button
        forwardedRef.current?.focus()
      },
      [onClear, forwardedRef],
    )

    const presProps = {
      $border: border,
      $hasPrefix: Boolean(prefix),
      $hasSuffix: Boolean(suffix),
      $radius: radius,
    }

    return (
      <Root data-ui="TextInput">
        {prefix && (
          <Prefix borderTop borderLeft borderBottom radius={radius} sizing="border">
            <span>{prefix}</span>
          </Prefix>
        )}

        <InputRoot>
          <Input
            data-as="input"
            {...restProps}
            $iconLeft={Boolean(icon)}
            $iconRight={Boolean(iconRight) || Boolean(clearButton)}
            $padding={padding}
            $size={size}
            disabled={disabled}
            ref={forwardedRef}
            type={type}
          />

          <Presentation {...presProps}>
            {icon && (
              <LeftBox padding={padding}>
                <Text size={size}>
                  {isValidElement(icon) && icon}
                  {isValidElementType(icon) && createElement(icon)}
                </Text>
              </LeftBox>
            )}

            {!clearButton && iconRight && (
              <RightBox padding={padding}>
                <Text size={size}>
                  {isValidElement(iconRight) && iconRight}
                  {isValidElementType(iconRight) && createElement(iconRight)}
                </Text>
              </RightBox>
            )}
          </Presentation>

          {clearButton && (
            <RightBox padding={padding.map((v) => v - 2)} style={{ zIndex: 2 }}>
              <Button
                {...(typeof clearButton === 'object' ? clearButton : {})}
                data-qa="clear-button"
                size={size}
                icon={<Icon name="close" />}
                mode={'bleed' as ThemeColorButtonModeKey}
                onClick={handleClearClick}
                onMouseDown={handleClearMouseDown}
                padding={padding.map((v) => v - 1)}
              />
            </RightBox>
          )}
        </InputRoot>

        {suffix && (
          <Suffix borderTop borderRight borderBottom radius={radius} sizing="border">
            <span>{suffix}</span>
          </Suffix>
        )}
      </Root>
    )
  },
)

TextInput.displayName = 'TextInput'

export { TextInput }
export default TextInput
