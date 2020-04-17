import React, { useState, useRef } from 'react';
import { CheckboxProps } from '../core/contracts/form';
import { classNames } from '../core/utils/classNames';

import { CheckIcon } from './Icon';
import { Feedback } from './Feedback';

import '../styles/checkbox.css';

export const CheckboxInput = React.forwardRef<HTMLElement, CheckboxProps>(
  (
    {
      checked: initialChecked = false,
      disabled = false,
      className = null,
      feedback = null,
      id: controlId = null,
      inline = false,
      label: labelText = null,
      name = '',
      isInvalid = false,
      isValid = false,
      tabIndex = 0,
      type = 'checkbox',
      value,
      onChange,
    },
    ref: any,
  ) => {
    const [checked, setCheckedState] = useState(initialChecked);

    const inputRef = useRef(null);

    const id = controlId || name;

    function handleChange(event: any) {
      event.persist();
      if (checked !== event.target.checked) {
        const newChecked = event.target.checked;

        setCheckedState(newChecked);
      }

      if (onChange) {
        onChange(event);
      }
    }

    //   const custom = type === 'switch' ? true : propCustom;

    return (
      <div
        ref={ref}
        className={classNames(
          'form-check',
          className,
          checked ? 'is-checked' : 'is-unchecked',
          isValid && 'is-valid',
          isInvalid && 'is-invalid',
          inline && 'form-check-inline',
        )}
      >
        <label className="form-check-label" htmlFor={name}>
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            ref={inputRef}
            className="form-check-input"
            autoComplete="off"
            checked={!!checked}
            disabled={!!disabled}
            tabIndex={tabIndex}
            onChange={handleChange}
          />
          <div className="form-check-container">
            <div className="form-check-box" />
            <div className="form-check-bg">
              <CheckIcon
                fill={checked ? '#fff' : 'transparent'}
                strokeDashoffset="22.91026"
                strokeDasharray="22.91026"
              />
            </div>
          </div>
          {labelText && (
            <span className="form-check-label-text">
              <span style={{ visibility: 'hidden' }}>&nbsp;</span>
              {labelText}
            </span>
          )}
        </label>
        {(isValid || isInvalid) && (
          <Feedback type={isValid ? 'valid' : 'invalid'}>{feedback}</Feedback>
        )}
      </div>
    );
  },
);
