import React, { forwardRef, Ref, ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import { FormControlProps } from '../core/contracts';
import { validFormProps, classNames } from '../core/utils';
import { control, transition, radius, mixin } from '../core/style';

function isToggle(type: string) {
  return type === 'checkbox' || type === 'radio';
}

export const StyledBaseInput = styled.input<FormControlProps>`
  background-color: ${({ disabled, isInvalid }: FormControlProps) => {
    return isInvalid ? control.invalid.bg : disabled ? control.disabled.bg : control.bg;
  }};
  background-clip: padding-box;
  border-width: ${control.borderWidth};
  border-style: solid;
  border-color: ${({ disabled, isInvalid }: FormControlProps) => {
    return isInvalid
      ? control.invalid.borderColor
      : disabled
      ? control.disabled.borderColor
      : control.borderColor;
  }};
  border-radius: ${radius.base};
  box-shadow: none;
  color: ${({ disabled, isInvalid }: FormControlProps) => {
    return isInvalid ? control.invalid.color : disabled ? control.disabled.color : control.color;
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
  transition: background-color ${transition.duration.easeIn} ${transition.timing.easeIn},
    outline ${transition.duration.easeIn} ${transition.timing.easeIn},
    color ${transition.duration.easeIn} ${transition.timing.easeIn},
    box-shadow ${transition.duration.easeIn} ${transition.timing.easeIn};
`;

export const StyledControl = styled(StyledBaseInput)<FormControlProps>`
  &:hover,
  &:focus {
    color: ${control.active.color};
    background-color: ${control.active.bg};
    box-shadow: ${control.active.boxShadow};
  }
  &:hover {
    border-color: ${control.active.borderColor};
  }
  &:focus {
    border-color: ${control.focus.borderColor};
  }

  &:disabled {
    pointer-events: none;
  }

  &.is-invalid {
    background-color: ${control.invalid.bg};
    border-color: ${control.invalid.borderColor};
    color: ${control.invalid.color};
  }
`;

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
    const [value, setValue] = useState(initialValue);
    const formProps = validFormProps(props, { exclude: ['onChange'] });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      event.persist();
      setValue(event.target.value);
      onChange?.(event);
    }

    function handleBlur(event: any) {
      event.persist();
      props?.onBlur?.(event);
    }

    return (
      <StyledControl
        {...formProps}
        ref={ref}
        type={type}
        id={id ?? name}
        name={name ?? id}
        value={value}
        disabled={readOnly ?? disabled}
        className={classNames('control', { 'is-invalid': !!isInvalid }, className)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  },
);

Control.displayName = 'Control';

export { Control };
