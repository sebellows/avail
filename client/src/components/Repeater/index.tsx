import React, { ChangeEvent, forwardRef, Ref, useState } from 'react';

import { classNames } from '../../core/utils/classNames';
import { OptionProps as Option } from '../../core/contracts';

import { Control } from '../Control';
import { FieldFeedback } from '../FieldFeedback';
import { FieldDescription } from '../FieldDescription';
import { formControlResolver } from '../formControlResolver';

import { RepeaterItem } from './RepeaterItem';
import { Styled } from './styles';
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
    }

    return (
      <Styled.Wrapper ref={ref} id={id} className={classNames('repeater', className)}>
        {legend && <Styled.Legend>{legend}</Styled.Legend>}
        {items.length &&
          items.map((item: Option, i: number) => (
            <RepeaterItem
              key={`${id}-repeater-item-${i}`}
              before={i}
              onAdd={handleAdd}
              onRemove={(i: number) => handleRemove(i)}
            >
              <Styled.Field>
                <Styled.Label first={i === 0} htmlFor={`${id}-${i}-key`}>
                  {keyLabel}
                </Styled.Label>
                <Control
                  name={`${id}-${i}-key`}
                  className={classNames(i === 0 && 'first')}
                  value={item.name}
                  onChange={(event: ChangeEvent) => handleChange('name', i, event)}
                  isValid={!error || !error[id]}
                  isInvalid={error && error[id]}
                />
              </Styled.Field>

              <Styled.Separator className="sep" aria-hidden="true">
                :
              </Styled.Separator>

              <Styled.Field>
                <Styled.Label first={i === 0} htmlFor={`${id}-${i}-value`}>
                  {valueLabel}
                </Styled.Label>
                {formControlResolver(inputType, {
                  name: `${id}-${i}-value`,
                  arialabel: `${id}-${i}-value`,
                  value: item.value,
                  readOnly: item.readOnly,
                  options,
                  onChange: (event: ChangeEvent) => handleChange('value', i, event),
                  isValid: !error || !error[id],
                  isInvalid: error && error[id],
                })}
              </Styled.Field>
            </RepeaterItem>
          ))}
        {props?.description && <FieldDescription>{props?.description}</FieldDescription>}
        {props?.isInvalid && error && <FieldFeedback type="invalid">{error[id]}</FieldFeedback>}
      </Styled.Wrapper>
    );
  },
);

Repeater.displayName = 'Repeater';

export { Repeater };
