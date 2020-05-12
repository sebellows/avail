/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Ref, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import { OptionProps, ComponentProps } from '../core/contracts';
import { classNames, validFormProps, color, mixin, font, transition, radius } from '../core/utils';

export type ControlType = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement;

export interface ControlProps extends InputHTMLAttributes<ControlType>, ComponentProps {
  error?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  // <select>
  defaultOption?: OptionProps | string;
  options?: OptionProps[] | string[];
  // catch-all
  [key: string]: any;
}

// const textInputTypes = ['text', 'search', 'password', 'email', 'url', 'tel'];

function isToggle(type: string) {
  return type === 'checkbox' || type === 'radio';
}

export const StyledControl = styled.input`
  background-color: ${({ isInvalid }) => (isInvalid ? color.control.invalid.bg : color.control.bg)};
  background-clip: padding-box;
  border-width: 0.09375rem;
  border-style: solid;
  border-color: ${({ isInvalid }) => {
    return isInvalid ? color.control.invalid.border : color.control.border;
  }};
  border-radius: ${radius.base};
  box-shadow: none;
  color: ${({ isInvalid }: ControlProps) =>
    isInvalid ? color.control.invalid.text : color.control.text};
  display: block;
  width: 100%;
  height: ${({ type }) => (isToggle(type) ? '100%' : 'var(--control-height)')};
  padding: var(--control-padding-y) var(--control-padding-x);
  font-family: ${font.family.base};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
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
    color: ${color.control.active.text};
    background-color: ${color.control.active.bg};
    box-shadow: 0 0 0 0.25rem ${color.control.active.boxShadow};
  }
  &:hover {
    border-color: ${color.control.active.border};
  }
  &:focus {
    border-color: ${color.control.focus.border};
  }
`;

const Control = React.forwardRef<{}, ControlProps>(
  ({ className, type = 'text', isValid, isInvalid, ...props }, ref: Ref<any>) => {
    const formProps = validFormProps(props, { exclude: ['onChange'] });

    function handleChange(event: any) {
      event.persist();
      if (props.onChange) {
        props.onChange(event);
      }
    }

    return (
      <StyledControl
        {...formProps}
        ref={ref}
        type={type}
        className={className}
        onChange={handleChange}
      />
    );
  },
);

Control.displayName = 'Control';

export { Control };
