/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, Ref, useEffect, useMemo, useRef } from 'react';
import { OptionProps, FormControlProps } from '../core/contracts';
import { toOptions } from '../core/new-config';
import { classNames, validFormProps, containerProps } from '../core/utils';

export const FormSelect = forwardRef<{}, FormControlProps>(
  (
    {
      as: Tag = 'div',
      className,
      defaultOption,
      isValid,
      isInvalid,
      label,
      options: initialOptions,
      ...props
    },
    ref: Ref<any>,
  ) => {
    const options = useMemo(() => toOptions(initialOptions), [initialOptions]);

    const { controlClass = '' } = props;
    const htmlProps = containerProps(props, { exclude: ['controlClass'] });
    const formProps = validFormProps(props);

    const Component = Tag as 'div';

    return (
      <Component
        {...htmlProps}
        className={classNames(
          'form-select',
          isValid && `is-valid`,
          isInvalid && `is-invalid`,
          className,
        )}
      >
        <select
          ref={ref}
          className={classNames('form-control', controlClass)}
          aria-label={label}
          {...formProps}
        >
          {defaultOption && <option value="">{defaultOption}</option>}
          {options.map((_option: OptionProps) => {
            return (
              <option key={_option.value} value={_option.value}>
                {_option.name}
              </option>
            );
          })}
        </select>
      </Component>
    );
  },
);

export default FormSelect;
