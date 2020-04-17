import React from 'react';
import { OptionProps, SelectInputProps } from '../core/contracts';

export const SelectInput: React.FC<SelectInputProps> = ({
  defaultOption,
  error,
  label,
  name,
  options,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
      <select name={name} value={value} onChange={onChange} className="form-control" {...props}>
        {defaultOption && <option value="">{defaultOption}</option>}
        {(options as OptionProps[]).map((_option: OptionProps) => {
          return (
            <option key={_option.value} value={_option.value}>
              {_option.name}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectInput;
