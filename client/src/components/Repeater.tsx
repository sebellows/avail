import React, { useState, ChangeEvent } from 'react';
import { FormControlGroup, OptionProps as Option } from '../core/contracts';
import { TextInput } from './TextInput';
import { RepeaterItem } from './RepeaterItem';
import { classNames } from '../core/utils/classNames';

import '../styles/repeater.css';

export const Repeater: React.FC<FormControlGroup> = ({
  id: initialId,
  className = '',
  options: initialOptions = [],
  legend = null,
  onAdd,
  onRemove,
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
            <TextInput
              name={`${id}-${i}-name`}
              label="Utility Class Suffix"
              className={classNames(i === 0 && 'first')}
              value={option.name}
              onChange={(event: ChangeEvent) => handleChange('name', i, event)}
            />
            <span className="sep" aria-hidden="true">
              :
            </span>
            <TextInput
              name={`${id}-${i}-value`}
              label="Property Value"
              className={classNames(i === 0 && 'first')}
              value={option.value}
              onChange={(event: ChangeEvent) => handleChange('value', i, event)}
            />
          </RepeaterItem>
        ))}
    </fieldset>
  );
};

export default Repeater;
