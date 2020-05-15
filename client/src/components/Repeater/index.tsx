/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, forwardRef, Ref, useState } from 'react';

import { classNames } from '../../core/utils/classNames';
import { OptionProps as Option } from '../../core/contracts';

import { Field } from '../Field';
import { Control } from '../Control';
import { FieldFeedback } from '../FieldFeedback';
import { FieldDescription } from '../FieldDescription';
import { formControlResolver } from '../formControlResolver';

import { RepeaterItem } from './RepeaterItem';
import { Wrapper } from './styles';
import { FormArrayProps } from './props';

const Repeater = forwardRef<{}, FormArrayProps>(
  (
    {
      id: initialId,
      className = '',
      error,
      inputType,
      items: initialItems = [],
      legend = null,
      options,
      keyLabel = 'Utility Class Suffix',
      valueLabel = 'Property Value',
      onAdd,
      onChange,
      onRemove,
      ...props
    },
    ref: Ref<any>,
  ) => {
    const [items, setItems] = useState(initialItems as Option[]);

    const id = `${initialId}-repeater`;

    function handleAdd(event: any) {
      const newItem = { name: '', value: '' };

      setItems([...items, newItem]);

      if (onAdd) {
        onAdd(event);
      }
    }

    function handleRemove(index: number) {
      setItems([...items.slice(0, index), ...items.slice(index + 1)]);

      if (onRemove) {
        onRemove(index);
      }
    }

    function handleChange(key: string, index: number, event: any) {
      event.preventDefault();

      const updateItems = [...items];

      updateItems[index][key] = event.target.value;

      setItems(updateItems);

      if (onChange) {
        onChange(items);
      }
      console.log(items);
    }

    return (
      <Wrapper ref={ref} id={id} className={classNames('form-array', className)}>
        {legend && <legend>{legend}</legend>}
        {items.length &&
          items.map((item: Option, i: number) => (
            <RepeaterItem
              key={`${id}-repeater-item-${i}`}
              before={i}
              onAdd={handleAdd}
              onRemove={(i: number) => handleRemove(i)}
            >
              <Field className={classNames(i === 0 && 'first')}>
                <label htmlFor={`${id}-${i}-key`}>{keyLabel}</label>
                <Control
                  name={`${id}-${i}-key`}
                  className={classNames(i === 0 && 'first')}
                  value={item.name}
                  onChange={(event: ChangeEvent) => handleChange('name', i, event)}
                  isValid={!error || !error[id]}
                  isInvalid={error && error[id]}
                />
              </Field>

              <span className="sep" aria-hidden="true">
                :
              </span>

              <Field className={classNames(i === 0 && 'first')}>
                <label htmlFor={`${id}-${i}-value`}>{valueLabel}</label>
                {formControlResolver(inputType, {
                  name: `${id}-${i}-value`,
                  arialabel: `${id}-${i}-value`,
                  value: item.value,
                  options,
                  onChange: (event: ChangeEvent) => handleChange('value', i, event),
                  isValid: !error || !error[id],
                  isInvalid: error && error[id],
                })}
              </Field>
            </RepeaterItem>
          ))}
        {props?.description && <FieldDescription>{props?.description}</FieldDescription>}
        {props?.isInvalid && error && <FieldFeedback type="invalid">{error[id]}</FieldFeedback>}
      </Wrapper>
    );
  },
);

Repeater.displayName = 'Repeater';

export { Repeater };
