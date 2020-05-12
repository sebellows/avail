import React, { useState, ChangeEvent } from 'react';
import { FormGroupProps, OptionProps as Option } from '../core/contracts';
import { FormGroup } from './FormGroup';
import { RepeaterItem } from './RepeaterItem';
import { classNames } from '../core/utils/classNames';

import '../styles/repeater.css';

export const Repeater: React.FC<FormGroupProps> = ({
  id: initialId,
  className = '',
  options: initialOptions = [],
  presets,
  legend = null,
  onAdd,
  onChange,
  onRemove,
  error,
  inputType,
  ...props
}) => {
  const [options, setOptions] = useState(initialOptions as Option[]);

  const id = `${initialId}-repeater`;

  function handleAdd(event: any) {
    const newOption = { name: '', value: '' };
    setOptions([...options, newOption]);
    if (onAdd) {
      onAdd(event);
    }
  }

  function handleRemove(index: number) {
    setOptions([...options.slice(0, index), ...options.slice(index + 1)]);
    if (onRemove) {
      onRemove(index);
    }
  }

  function handleChange(key: string, index: number, event: any) {
    event.preventDefault();
    const updateOptions = [...options];
    updateOptions[index][key] = event.target.value;
    setOptions(updateOptions);
    if (onChange) {
      onChange(options);
    }
    console.log(options);
  }

  return (
    <fieldset id={id} className={classNames('repeater', className)}>
      {legend && <legend>{legend}</legend>}
      {options.length &&
        options.map((option: Option, i: number) => (
          <RepeaterItem
            key={`${id}-option-${i}`}
            before={i}
            onAdd={handleAdd}
            onRemove={(i: number) => handleRemove(i)}
          >
            <FormGroup
              name={`${id}-${i}-name`}
              label="Utility Class Suffix"
              className={classNames(i === 0 && 'first')}
              value={option.name}
              onChange={(event: ChangeEvent) => handleChange('name', i, event)}
              isValid={!error || !error[id]}
              isInvalid={error && error[id]}
            />
            <span className="sep" aria-hidden="true">
              :
            </span>
            <FormGroup
              name={`${id}-${i}-value`}
              type={inputType}
              label="Property Value"
              className={classNames(i === 0 && 'first')}
              value={option.value}
              options={presets}
              onChange={(event: ChangeEvent) => handleChange('value', i, event)}
              isValid={!error || !error[id]}
              isInvalid={error && error[id]}
            />
          </RepeaterItem>
        ))}
      {props?.description && <small className="form-text text-muted">{props?.description}</small>}
      {props?.isInvalid && error && <small className="form-text text-danger">{error}</small>}
    </fieldset>
  );
};

export default Repeater;
