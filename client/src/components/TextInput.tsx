import React from 'react';
import { TextInputProps } from '../core/contracts';
import { classNames } from '../core/utils/classNames';

export const TextInput: React.FC<TextInputProps> = ({
  className = null,
  id = '',
  name,
  label = null,
  onChange,
  placeholder = '',
  type = 'text',
  value = '',
  error,
  ...props
}) => {
  function handleChange(event: any) {
    if (onChange) {
      onChange(event);
    }
  }

  return (
    <div className={classNames('form-group', className, error && error.length > 0 && 'has-error')}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={id || name}
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value || ''}
        onChange={handleChange}
        {...props}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextInput;
