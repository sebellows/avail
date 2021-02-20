import { Icon } from '../Icon'
import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { useForwardedRef, useCustomValidity } from '../../hooks'
import { Box } from '../Box'
// import { Text } from '../Text'
import { selectStyle } from './styles'
import { RenameKey } from '../../types'
import {
  FontSizeStyleProps,
  RadiusStyleProps,
  FontSizeProps,
  BorderRadiusProps,
} from '../../styles'

interface SelectProps
  extends RenameKey<FontSizeProps, 'size', 'fontSize'>,
    Pick<BorderRadiusProps, 'radius'> {
  // fontSize?: string | string[]
  padding?: number | number[]
  // radius?: number | number[] | string | string[]
  customValidity?: string
}

const Root = styled.div(selectStyle.root)

const Input = styled.select<
  {
    // $fontSize?: string | string[]
    $padding?: number | number[]
  } & RenameKey<FontSizeStyleProps, '$size', '$fontSize'> &
    Pick<RadiusStyleProps, '$radius'>
>(selectStyle.input)

const IconBox = styled(Box)(selectStyle.iconBox)

export const Select = forwardRef<
  HTMLSelectElement,
  SelectProps & Omit<React.HTMLProps<HTMLSelectElement>, 'as' | 'size'>
>(
  (
    {
      children,
      customValidity,
      disabled,
      fontSize = 'sm',
      padding = 3,
      radius = 'sm',
      readOnly,
      ...restProps
    },
    ref,
  ) => {
    const forwardedRef = useForwardedRef<HTMLSelectElement>(ref as any)

    useCustomValidity(forwardedRef, customValidity)

    return (
      <Root data-ui="Select">
        <Input
          data-read-only={!disabled && readOnly ? '' : undefined}
          data-ui="Select"
          {...restProps}
          $fontSize={fontSize}
          $padding={padding}
          $radius={radius}
          disabled={disabled || readOnly}
          ref={forwardedRef}
        >
          {children}
        </Input>

        <IconBox padding={padding}>
          <Icon name="chevron-down" />
        </IconBox>
      </Root>
    )
  },
)

Select.displayName = 'Select'
