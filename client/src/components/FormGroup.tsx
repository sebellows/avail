import React, { Ref, useRef } from 'react';
import { FormControlProps } from '../core/contracts';
import { classNames } from '../core/utils/classNames';
import { FormControl } from './FormControl';
import { FormCheck } from './FormCheck';
import FormSelect from './FormSelect';

export interface FormGroupProps extends FormControlProps {
  className?: string;
  controlClass?: string;
  description?: string;
  error?: any;
  label?: string;
  labelClass?: string;
}

export const FormGroup = React.forwardRef<{}, FormGroupProps>(
  (
    { className, controlClass, labelClass, description, error, label = null, ...props },
    ref: Ref<any>,
  ) => {
    const controlRef = useRef(null);
    let { type, isValid, isInvalid, onChange, options, ...htmlProps } = props;
    const isCheckbox = type && (type === 'checkbox' || type === 'radio');

    function handleChange(event: any) {
      event.preventDefault();

      if (onChange) {
        onChange(event);
      }
    }

    return (
      <div
        ref={ref}
        className={classNames('form-group', className, props?.isInvalid && 'has-error')}
      >
        {isCheckbox && (
          <FormCheck
            ref={controlRef}
            type={type}
            className={controlClass}
            onChange={handleChange}
            {...htmlProps}
          >
            {htmlProps?.children}
          </FormCheck>
        )}
        {!isCheckbox && (
          <>
            {label && (
              <label className={labelClass} htmlFor={htmlProps.name || htmlProps.id}>
                {label}
              </label>
            )}
            {options && (
              <FormSelect
                ref={controlRef}
                type={type}
                className={controlClass}
                onChange={handleChange}
                options={options}
                {...htmlProps}
              />
            )}
            {!options && (
              <FormControl
                ref={controlRef}
                type={type}
                className={controlClass}
                onChange={handleChange}
                {...htmlProps}
              />
            )}
          </>
        )}
        {description && <small className="form-text text-muted">{description}</small>}
        {props?.isInvalid && error && <small className="form-text text-danger">{error}</small>}
      </div>
    );
  },
);

export default FormGroup;
