import React, { ChangeEvent, forwardRef, Ref, useState, useEffect } from 'react';

import { classNames } from '../../core/utils/classNames';
import { OptionProps as Option } from '../../core/contracts';

import { Control } from '../Control';
import { FieldFeedback } from '../FieldFeedback';
import { FieldDescription } from '../FieldDescription';
import { FormControlResolver } from '../formControlResolver';

import { RepeaterItem } from './RepeaterItem';
import { Styled } from './styles';
import { FormArrayProps } from './props';

const Repeater = forwardRef<{}, FormArrayProps>(
  (
    {
      id,
      className = '',
      error,
      inputType,
      items: initialItems = [],
      legend = null,
      options,
      keyLabel = 'Utility Class Suffix',
      readOnly = false,
      valueLabel = 'Property Value',
      onAdd,
      onChange,
      onRemove,
      ...props
    },
    ref: Ref<any>,
  ) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
      setItems(initialItems as Option[]);
    }, [initialItems]);

    function handleAdd(event: any) {
      const newItem = { name: '', value: '' };

      setItems([...items, newItem]);

      onAdd?.(event);
    }

    function handleRemove(index: number) {
      setItems([...items.slice(0, index), ...items.slice(index + 1)]);

      onRemove?.(index);
    }

    function handleChange(key: string, index: number, event: any) {
      event.preventDefault();

      const updateItems = [...items];

      updateItems[index][key] = event.target.value;

      setItems(updateItems);

      onChange?.(event);
    }

    function handleBlur(event: any) {
      props?.onBlur?.(event);
    }

    return (
      <Styled.Wrapper ref={ref} id={id} className={classNames('repeater', className)}>
        {legend && <Styled.Legend>{legend}</Styled.Legend>}
        {items.length &&
          items.map((item: Option, i: number) => {
            const nameID = `${id}_items_${i}_name`;
            const valueID = `${id}_items_${i}_value`;

            return (
              <RepeaterItem
                key={`${id}_items_${i}`}
                before={i}
                onAdd={handleAdd}
                onRemove={(i: number) => handleRemove(i)}
              >
                <Styled.Field>
                  <Styled.Label first={i === 0} htmlFor={nameID}>
                    {keyLabel}
                  </Styled.Label>
                  <Control
                    id={nameID}
                    name={nameID}
                    className={classNames(i === 0 && 'first')}
                    value={item.name}
                    onBlur={handleBlur}
                    onChange={(event: ChangeEvent) => handleChange('name', i, event)}
                    isValid={!error || !error[id]}
                    isInvalid={error && error[id]}
                  />
                </Styled.Field>

                <Styled.Separator className="sep" aria-hidden="true">
                  :
                </Styled.Separator>

                <Styled.Field>
                  <Styled.Label first={i === 0} htmlFor={valueID}>
                    {valueLabel}
                  </Styled.Label>
                  <FormControlResolver
                    type={inputType}
                    id={valueID}
                    name={valueID}
                    arialabel={valueID}
                    value={item.value}
                    readOnly={readOnly}
                    disabled={readOnly}
                    options={options}
                    onBlur={handleBlur}
                    onChange={(event: ChangeEvent) => handleChange('value', i, event)}
                    isValid={!error || !error[id]}
                    isInvalid={error && error[id]}
                  />
                </Styled.Field>
              </RepeaterItem>
            );
          })}
        {props?.description && <FieldDescription>{props?.description}</FieldDescription>}
        {props?.isInvalid && error && <FieldFeedback type="invalid">{error[id]}</FieldFeedback>}
      </Styled.Wrapper>
    );
  },
);

Repeater.displayName = 'Repeater';

export { Repeater };
