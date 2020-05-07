/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Ref, useRef, useEffect } from 'react';
import { FormControlProps } from '../core/contracts';
import { classNames, validFormProps, containerProps } from '../core/utils';
import { FormControl } from './FormControl';
import { CheckIcon } from './Icon';

import '../styles/checkbox.css';

interface FormControlCheckProps extends FormControlProps {
  children?: any;
}

const FormCheck = React.forwardRef<HTMLElement, FormControlCheckProps>(
  ({ as: Tag = 'label', children, type = 'checkbox', ...props }, ref: Ref<any>) => {
    const inputRef = useRef(null);
    const htmlProps = containerProps(props);
    const formProps = validFormProps(props);
    const inputType = type === 'radio' ? type : 'checkbox';
    const Component = Tag as 'label';

    const child = React.Children.only(children);

    return (
      <Component
        ref={ref}
        {...htmlProps}
        className="form-check"
        htmlFor={formProps?.name || formProps?.id}
      >
        <FormControl ref={inputRef} type={inputType} {...formProps} />
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
