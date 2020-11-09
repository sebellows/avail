import React, { forwardRef, Ref, ChangeEvent, useState } from 'react'
import styled from 'styled-components'

import { FormControlProps } from '../core/contracts'
import { validFormProps, classNames } from '../core/utils'
import { control, radius, mixin } from '../core/style'
import { useTheme } from '../ThemeContext'

function isToggle(type: string) {
  return type === 'checkbox' || type === 'radio'
}

export const StyledBaseInput = styled.input<FormControlProps>`
  background-color: ${({ isInvalid, disabled, theme }: FormControlProps) => {
    return isInvalid ? theme.invalid.bg : disabled ? theme.disabled.bg : theme.control.bg
  }};
  background-clip: padding-box;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ disabled, isInvalid, theme }: FormControlProps) => {
    return isInvalid
      ? theme.invalid.borderColor
      : disabled
      ? theme.disabled.borderColor
      : theme.control.borderColor
  }};
  border-radius: ${radius.base};
  box-shadow: none;
  color: ${({ disabled, isInvalid, theme }: FormControlProps) => {
    return isInvalid ? theme.invalid.fg : disabled ? theme.disabled.fg : theme.control.fg
  }};
  display: block;
  width: 100%;
  height: ${({ type }) => (isToggle(type) ? '100%' : control.height)};
  ${mixin.padding.all('controlY', 'controlX')}
  font-family: ${control.fontFamily};
  font-size: ${control.fontSize};
  font-weight: 400;
  line-height: ${control.lineHeight};
  outline: none;
  ${mixin.transition('easeIn', 'background-color', 'outline', 'color', 'box-shadow')}
`

export const StyledControl = styled(StyledBaseInput)<FormControlProps>`
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.control.fg};
    background-color: ${control.active.bg};
    box-shadow: ${({ theme }) => theme.focus.boxShadow};
  }
  &:hover {
    border-color: ${({ theme }) => theme.control.borderColor};
  }
  &:focus {
    border-color: ${({ theme }) => theme.focus.borderColor};
  }

  &:disabled {
    pointer-events: none;
  }

  &.is-invalid {
    background-color: ${({ theme }) => theme.invalid.bg};
    border-color: ${({ theme }) => theme.invalid.borderColor};
    color: ${({ theme }) => theme.invalid.fg};
  }
`

const Control = forwardRef<HTMLInputElement, FormControlProps>(
  (
    {
      className,
      disabled,
      id,
      isValid,
      isInvalid,
      name,
      onChange,
      readOnly,
      type = 'text',
      value: initialValue,
      ...props
    },
    ref: Ref<HTMLInputElement>,
  ) => {
    const theme = useTheme()
    const [value, setValue] = useState(initialValue)
    const formProps = validFormProps(props, { exclude: ['onChange'] })

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      event.persist()
      setValue(event.target.value)
      onChange?.(event)
    }

    function handleBlur(event: any) {
      event.persist()
      props?.onBlur?.(event)
    }

    return (
      <StyledControl
        {...formProps}
        ref={ref}
        type={type}
        id={id ?? name}
        name={name ?? id}
        theme={theme}
        value={value}
        disabled={readOnly ?? disabled}
        className={classNames('control', { 'is-invalid': !!isInvalid }, className)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    )
  },
)

Control.displayName = 'Control'

export { Control }
