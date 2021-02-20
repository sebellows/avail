import React, { createElement, forwardRef, isValidElement } from 'react'
import { isValidElementType } from 'react-is'
import styled from 'styled-components/macro'
import { radiusStyle } from '../../styles/mixins'
import { ThemeColorButtonModeKey, ThemeColorVariantKey, ThemeProps, useTheme } from '../../theme'
import {
  BorderRadiusProps,
  FlexJustify,
  FontSizeProps,
  PaddingProps,
  RadiusStyleProps,
  SpaceProps,
} from '../../styles/types'
import { Box } from '../Box'
import { Flex } from '../Flex'
import { Icon } from '../Icon'
import { Text } from '../Text'
import { Spinner } from '../Spinner'
import { IconName } from '../Icon/IconMap'
import { buttonBaseStyles, buttonColorStyles } from './styles'

export interface ButtonProps extends PaddingProps, BorderRadiusProps, FontSizeProps, SpaceProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  mode?: ThemeColorButtonModeKey
  icon?: IconName | React.ComponentType | React.ReactNode
  // icon?: IconName
  iconRight?: React.ComponentType | React.ReactNode
  justify?: FlexJustify | FlexJustify[]
  /**
   * @beta Do not use in production, as this might change.
   */
  loading?: boolean
  selected?: boolean
  // space?: number | number[]
  text?: React.ReactNode
  variant?: ThemeColorVariantKey
  type?: 'button' | 'reset' | 'submit'
}

const Root = styled.button<
  { $mode: ThemeColorButtonModeKey; $variant: ThemeColorVariantKey } & RadiusStyleProps & ThemeProps
>(radiusStyle, buttonBaseStyles, buttonColorStyles)

const LoadingBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--card-bg-color);
  border-radius: inherit;
  z-index: 1;
  box-shadow: inherit;
`

const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<React.HTMLProps<HTMLButtonElement>, 'size'>
>(
  (
    {
      children,
      disabled,
      size,
      icon,
      iconRight,
      justify = 'center',
      loading,
      mode = 'default',
      padding,
      paddingX,
      paddingY,
      paddingTop = 8,
      paddingBottom = 8,
      paddingLeft = 16,
      paddingRight = 16,
      radius = 'sm',
      selected,
      space = 8,
      text,
      variant = 'default',
      type = 'button',
      ...restProps
    },
    ref,
  ) => {
    const theme = useTheme()

    const { space: spaces } = theme

    const boxProps = {
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft: icon && paddingLeft ? spaces[spaces.indexOf(paddingLeft) - 1] : paddingLeft,
      paddingRight:
        iconRight && paddingRight ? spaces[spaces.indexOf(paddingRight) - 1] : paddingRight,
    }

    return (
      <Root
        data-ui="Button"
        {...restProps}
        $mode={mode}
        $radius={radius}
        $variant={variant}
        data-disabled={Boolean(loading || disabled)}
        data-selected={selected ? '' : undefined}
        disabled={Boolean(loading || disabled)}
        ref={ref}
        type={type}
      >
        {Boolean(loading) && (
          <LoadingBox>
            <Spinner />
          </LoadingBox>
        )}

        {(icon || text || iconRight) && (
          <Box as="span" {...boxProps}>
            <Flex as="span" align="center" justify={justify}>
              {icon && (
                <Text as="span" data-icon={true} size={size}>
                  {typeof icon === 'string' ? (
                    <Icon name={icon} />
                  ) : isValidElement(icon) ? (
                    icon
                  ) : (
                    isValidElementType(icon) && createElement(icon)
                  )}
                </Text>
              )}

              {text && (
                <Box
                  as="span"
                  flex={iconRight ? 1 : undefined}
                  marginLeft={icon ? space : undefined}
                  marginRight={iconRight ? space : undefined}
                >
                  <Text size={size} fontWeight={theme.button.textWeight}>
                    {text}
                  </Text>
                </Box>
              )}

              {iconRight && (
                <Text as="span" data-icon={true} size={size}>
                  {isValidElement(iconRight) && iconRight}
                  {isValidElementType(iconRight) && createElement(iconRight)}
                </Text>
              )}
            </Flex>
          </Box>
        )}

        {children && <span>{children}</span>}
      </Root>
    )
  },
)

Button.displayName = 'Button'

export { Button }
