/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  forwardRef,
  InputHTMLAttributes,
  Ref,
  useEffect,
  useState,
  ChangeEvent,
  useRef,
} from 'react';
import styled from 'styled-components';

import { OptionProps, ComponentProps } from '../core/contracts';
import { validFormProps, classNames } from '../core/utils';
import { control, transition, radius, mixin } from '../core/style';
import { usePrevious } from '../hooks/usePrevious';

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

export const Styled = {
  Input: styled.input<ControlProps>`
    background-color: ${({ isInvalid }) => (isInvalid ? control.invalid.bg : control.bg)};
    background-clip: padding-box;
    border-width: ${control.borderWidth};
    border-style: solid;
    border-color: ${({ isInvalid }) =>
      isInvalid ? control.invalid.borderColor : control.borderColor};
    border-radius: ${radius.base};
    box-shadow: none;
    color: ${({ isInvalid }: ControlProps) => (isInvalid ? control.invalid.color : control.color)};
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
};

const Control = forwardRef<{}, ControlProps>(
  (
    { className, disabled: initialDisabled, type = 'text', isValid, isInvalid, value, ...props },
    ref: Ref<any>,
  ) => {
    // const [value, setValue] = useState(initialValue);
    const [disabled, setDisabled] = useState(initialDisabled);

    const formProps = validFormProps(props, { exclude: ['onChange'] });

    useEffect(() => {
      if (!formProps.name && formProps.id) {
        formProps.name = formProps.id;
      }
      if (formProps.readOnly) {
        setDisabled(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      event.persist();
      props?.onChange?.(event);
    }

    return (
      <Styled.Input
        {...formProps}
        ref={ref}
        type={type}
        value={value}
        disabled={disabled}
        className={classNames('control', className)}
        onChange={handleChange}
      />
    );
  },
);

Control.displayName = 'Control';

export { Control };
