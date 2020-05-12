/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Ref, useRef, useEffect } from 'react';
import { FormControlProps } from '../core/contracts';
import { classNames, validFormProps, containerProps } from '../core/utils';
import { FormControl } from './FormControl';
import { CheckIcon } from './Icon';

import '../styles/checkbox.css';

interface FormControlCheckProps extends FormControlProps {
  children?: any;
  inline?: boolean;
}

const FormCheck = React.forwardRef<HTMLElement, FormControlCheckProps>(
  ({ as: Tag = 'label', children, type = 'checkbox', ...props }, ref: Ref<any>) => {
    const inputRef = useRef(null);
    const htmlProps = containerProps(props);
    const formProps = validFormProps(props);
    const inputType = type === 'radio' ? type : 'checkbox';
    const Component = Tag as 'label';

    const child = React.Children.only(children);

    function handleChange(event: any) {
      if (props.onChange) {
        props.onChange(event);
      }
    }

    return (
      <Component
        ref={ref}
        {...htmlProps}
        className={classNames(
          'form-check',
          htmlProps?.inline && 'form-check-inline',
          htmlProps?.className,
        )}
        htmlFor={formProps?.name || formProps?.id}
      >
        <FormControl ref={inputRef} type={inputType} {...formProps} onChange={handleChange} />
        {type === 'checkbox' && (
          <div className="form-check-container">
            <div className="form-check-box" />
            <div className="form-check-bg">
              <CheckIcon
                fill={
                  formProps?.checked ? 'var(--control-active-bg-color)' : 'var(--control-bg-color)'
                }
                strokeDashoffset="22.91026"
                strokeDasharray="22.91026"
              />
            </div>
          </div>
        )}
        {type === 'radio' && (
          <div className="form-radio-container">
            <div className="form-radio-outer-circle"></div>
            <div className="form-radio-inner-circle"></div>
          </div>
        )}
        {child &&
          React.cloneElement(child, {
            className: classNames('form-check-label-text', child?.props?.className),
          })}
      </Component>
    );
  },
);

FormCheck.displayName = 'FormCheck';

export { FormCheck };
