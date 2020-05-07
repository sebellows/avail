import React, { useState, useRef, Ref } from 'react';
import { CheckboxProps } from '../core/contracts/form';
import { classNames } from '../core/utils/classNames';
import '../styles/switch.css';

export interface SwitchProps extends CheckboxProps {
  as?: JSX.IntrinsicElements;
  onText?: string;
  offText?: string;
}

export const Switch = React.forwardRef<{}, SwitchProps>(
  (
    {
      as: tag = 'div',
      checked: initialChecked = false,
      disabled = false,
      className = null,
      id: controlId = null,
      inline = false,
      label: labelText = null,
      name = '',
      isInvalid = false,
      isValid = false,
      tabIndex = 0,
      type = 'radio',
      value,
      onChange,
      onText = 'On',
      offText = 'Off',
    },
    ref: Ref<any>,
  ) => {
    const [checked, setCheckedState] = useState(initialChecked);

    const inputRef = useRef(null);
    const id = controlId || name;
    const Component = tag as 'div';

    function handleChange(event: any) {
      event.persist();

      if (checked !== event.target.checked) {
        setCheckedState(event.target.checked);
      }

      if (onChange) {
        onChange(event);
      }
    }

    return (
      <Component
        ref={ref}
        className={classNames(
          'avail-switch',
          className,
          checked ? 'is-checked' : 'is-unchecked',
          isValid && 'is-valid',
          isInvalid && 'is-invalid',
        )}
      >
        {labelText && <span className="avail-switch-label-text">{labelText}</span>}
        <label htmlFor={name} className="avail-switch-label">
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            ref={inputRef}
            className="avail-switch-control"
            autoComplete="off"
            checked={!!checked}
            disabled={!!disabled}
            tabIndex={tabIndex}
            onChange={handleChange}
          />
          <span className="avail-switch-toggle on">{onText}</span>
          <span className="avail-switch-toggle off">{offText}</span>
          <span className="avail-switch-toggle-cover" aria-hidden="true"></span>
          <span className="avail-switch-scrim" aria-hidden="true"></span>
        </label>
      </Component>
    );
  },
);
