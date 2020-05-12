import React, { Ref, useRef } from 'react';
import { FormGroupProps } from '../core/contracts';
import { classNames } from '../core/utils/classNames';
import { FormControl } from './FormControl';
import { FormCheck } from './FormCheck';
import FormSelect from './FormSelect';
import { ColorUtil } from '../core/utils';

export const FormGroup = React.forwardRef<{}, FormGroupProps>(
  ({ className, classMap = {}, description, error, label = null, ...props }, ref: Ref<any>) => {
    const controlRef = useRef(null);
    let { type, isValid, isInvalid, onChange, options, ...htmlProps } = props;
    const isCheckbox = type && (type === 'checkbox' || type === 'radio');

    function handleChange(event: any) {
      event.preventDefault();

      if (onChange) {
        onChange(event);
      }
    }

    const formGroupClasses = classNames(
      'form-group',
      className,
      props?.isInvalid && 'has-error',
      type && !['checkbox', 'radio', 'select', 'text'].includes(type) && `control-type-${type}`,
    );

    return (
      <div ref={ref} className={formGroupClasses}>
        {isCheckbox && (
          <FormCheck
            ref={controlRef}
            type={type}
            className={classMap?.control}
            onChange={handleChange}
            {...htmlProps}
          >
            {htmlProps?.children}
          </FormCheck>
        )}
        {!isCheckbox && (
          <>
            {label && (
              <label className={classMap?.label} htmlFor={htmlProps.name || htmlProps.id}>
                {label}
              </label>
            )}
            {options && (
              <FormSelect
                ref={controlRef}
                type={type}
                className={classMap?.control}
                onChange={handleChange}
                options={options}
                {...htmlProps}
              />
            )}
            {!options && (
              <>
                <FormControl
                  ref={controlRef}
                  type={type}
                  className={classMap?.control}
                  onChange={handleChange}
                  {...htmlProps}
                />
                {type === 'color' && htmlProps.value && (
                  <div
                    className={classNames(
                      'color-label',
                      ColorUtil.isDark(htmlProps.value) && 'text-white',
                    )}
                    aria-hidden="true"
                  >
                    {htmlProps.value}
                  </div>
                )}
              </>
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
