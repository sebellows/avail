/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Ref } from 'react';
import { FormControlProps } from '../core/contracts';
import { classNames, validFormProps } from '../core/utils';

const FormControl = React.forwardRef<{}, FormControlProps>(
  ({ children, className, type = 'text', isValid, isInvalid, ...props }, ref: Ref<any>) => {
    const isCheckbox = type === 'checkbox' || type === 'radio';
    const classes = {
      'form-control': !isCheckbox,
      'form-check-input': isCheckbox,
    };

    const formProps = validFormProps(props);

    return (
      <input
        ref={ref}
        type={type}
        {...formProps}
        className={classNames(classes, isValid && `is-valid`, isInvalid && `is-invalid`, className)}
      />
    );
  },
);

FormControl.displayName = 'FormControl';

export { FormControl };
