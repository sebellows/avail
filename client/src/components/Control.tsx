/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, ChangeEvent, useState } from 'react'
import styled, { css } from 'styled-components'

import { useTheme } from '../ThemeContext'
import { classNames } from '../core/utils'
import { control, radius, mixin } from '../core/style'
import { useEnsuredRef } from '../hooks'

function isToggle(type: string) {
  return type === 'checkbox' || type === 'radio'
}

export interface ControlProps<As extends React.ElementType = React.ElementType>
  extends Avail.Control<As> {
  eventStates?: boolean
}

type Control = Avail.RefForwardingComponent<'input', ControlProps>

const BaseControl: Control = forwardRef(
  (
    {
      as: Component = 'input',
      className,
      disabled,
      id,
      isValid,
      isInvalid,
      name,
      onChange,
      readOnly,
      value: initialValue,
      eventStates = true,
      ...props
    }: ControlProps,
    ref,
  ) => {
    const [value, setValue] = useState(initialValue)

    const type = Component !== 'input' ? null : props?.type ?? 'text'

    const inputRef = useEnsuredRef<HTMLInputElement>(ref)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      setValue(event.target.value)
      onChange?.(event)
    }

    function handleBlur(event: any) {
      props?.onBlur?.(event)
    }

    function handleKeyUp(event: any) {
      props?.onKeyUp?.(event)
    }

    return (
      <Component
        {...props}
        ref={inputRef}
        type={type}
        id={id ?? name}
        name={name ?? id}
        value={value}
        disabled={readOnly ?? disabled}
        className={classNames('control', { 'is-invalid': !!isInvalid }, className)}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
    )
  },
)

const StyledControl = styled(BaseControl)<ControlProps>`
  background-color: ${({ isInvalid, disabled, theme }: ControlProps) => {
    return isInvalid ? theme.invalid.bg : disabled ? theme.disabled.bg : theme.control.bg
  }};
  background-clip: padding-box;
  border: none;
  border-radius: ${radius.base};
  box-shadow: inset 1px 1px 2px 0px rgba(0, 0, 0, 0.12), 1px 1px 1px 0 rgba(255, 255, 255, 0.2);
  color: ${({ disabled, isInvalid, theme }: ControlProps) => {
    return isInvalid ? theme.invalid.fg : disabled ? theme.disabled.fg : theme.control.fg
  }};
  display: block;
  width: 100%;
  height: ${({ type }) => (isToggle(type) ? '100%' : control.height)};
  ${mixin.padding.all('0.375rem', 'sm')}
  font-family: ${control.fontFamily};
  font-size: ${control.fontSize};
  font-weight: 400;
  line-height: ${control.lineHeight};
  outline: none;
  ${mixin.transition('easeIn', 'background-color', 'outline', 'box-shadow', 'color')}

  ${({ eventStates }) =>
    eventStates &&
    css`
      &:hover {
        ${({ theme }) => mixin.bgColor(theme.control.bg)}
      }
      &:focus {
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.05), 1px 1px 2px 2px rgba(0, 0, 0, 0.03);
        ${({ theme }) => mixin.bgColor(theme.focus.bg)}
      }

      &:disabled {
        pointer-events: none;
      }

      &.is-invalid {
        ${({ theme }) => mixin.bgColor(theme.invalid.bg)}
        border-color: ${({ theme }) => theme.invalid.borderColor};
        ${({ theme }) => mixin.color(theme.invalid.fg)}
      }
    `}
`

const Control: Control = forwardRef((props: ControlProps = {}, ref) => {
  const { theme } = useTheme()

  return <StyledControl eventStates={true} {...props} ref={ref} theme={theme} />
})

Control.displayName = 'Control'

export { BaseControl, Control }
