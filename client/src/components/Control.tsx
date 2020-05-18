/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, InputHTMLAttributes, Ref, useState } from 'react';
import styled from 'styled-components';

import { OptionProps, ComponentProps } from '../core/contracts';
import { validFormProps } from '../core/utils';
import { color, control, font, transition, radius, mixin } from '../core/style';
import Color from 'color';

export type ControlType = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement;

export interface ControlProps extends InputHTMLAttributes<ControlType>, ComponentProps {
  arialabel?: string;
  error?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  // <select>
  defaultOption?: OptionProps | string;
  options?: OptionProps[] | string[];
  // catch-all
  [key: string]: any;
}

function isToggle(type: string) {
  return type === 'checkbox' || type === 'radio';
}

interface StyledProps {
  colorValue?: string;
}

export const Styled = {
  Control: styled.input<ControlProps>`
    background-color: ${({ isInvalid }) => (isInvalid ? control.invalid.bg : control.bg)};
    background-clip: padding-box;
    border-width: ${control.borderWidth};
    border-style: solid;
    border-color: ${({ isInvalid }) => {
      return isInvalid ? control.invalid.borderColor : control.borderColor;
    }};
    border-radius: ${radius.base};
    box-shadow: none;
    color: ${({ isInvalid }: ControlProps) => (isInvalid ? control.invalid.color : control.color)};
    display: block;
    width: 100%;
    height: ${({ type }) => (isToggle(type) ? '100%' : control.height)};
    padding: ${control.paddingY} ${control.paddingX};
    font-family: ${control.fontFamily};
    font-size: ${control.fontSize};
    font-weight: 400;
    line-height: ${control.lineHeight};
    outline: none;
    transition: background-color ${transition.duration.easeIn} ${transition.timing.easeIn},
      outline ${transition.duration.easeIn} ${transition.timing.easeIn},
      color ${transition.duration.easeIn} ${transition.timing.easeIn},
      box-shadow ${transition.duration.easeIn} ${transition.timing.easeIn};

    &[type='color'] {
      padding: 0.3125rem;
    }

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
  `,
  ColorLabel: styled.div<StyledProps>`
    ${mixin.flexCenter}
    position: absolute;
    top: 0.25rem;
    left: 0;
    width: 100%;
    height: ${control.height};
    z-index: 1;
    color: ${({ colorValue }) => (Color(colorValue).isDark() ? color.text.light : color.text.dark)};
    pointer-events: none;
  `,
};

const Control = forwardRef<{}, ControlProps>(
  (
    {
      className,
      disabled: initialDisabled,
      type = 'text',
      isValid,
      isInvalid,
      value: initialValue,
      ...props
    },
    ref: Ref<any>,
  ) => {
    const [value, setValue] = useState(initialValue);
    const [disabled, setDisabled] = useState(initialDisabled);

    const formProps = validFormProps(props, { exclude: ['onChange'] });

    React.useEffect(() => {
      if (!formProps.name && formProps.id) {
        formProps.name = formProps.id;
      }
      if (formProps.readOnly) {
        setDisabled(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleChange(event: any) {
      event.persist();
      setValue(event.target.value);

      if (props.onChange) {
        props.onChange(event);
      }
    }

    return (
      <>
        <Styled.Control
          {...formProps}
          ref={ref}
          type={type}
          value={value}
          disabled={disabled}
          className={className}
          onChange={handleChange}
        />
        {type === 'color' && (
          <Styled.ColorLabel colorValue={value as string} aria-hidden="true">
            {value}
          </Styled.ColorLabel>
        )}
      </>
    );
  },
);

Control.displayName = 'Control';

export { Control };
