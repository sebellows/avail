/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { usePrevious } from '../../hooks/usePrevious';

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
      onBlur,
      ...props
    },
    ref: Ref<any>,
  ) => {
    const [items, setItems] = useState(initialItems);
    const prevItemsCount = usePrevious(initialItems.length);

    useEffect(() => {
      if (prevItemsCount !== initialItems.length) {
        setItems(initialItems as Option[]);
      }
    }, [initialItems, prevItemsCount]);

    function handleAdd(item: Record<string, string>) {
      onAdd?.(item);
    }

    function handleRemove(itemID: string) {
      onRemove?.(itemID);
    }

    function handleChange(event: any) {
      event.preventDefault();
      onChange?.(event);
    }

    function handleBlur(event: any) {
      onBlur?.(event);
    }

    return (
      <Styled.Wrapper ref={ref} id={id} className={classNames('repeater', className)}>
        {legend && <Styled.Legend>{legend}</Styled.Legend>}
        {items.length &&
          items.map((item: Option, i: number) => {
            const itemID = `${id}_items_${i}`;
            const nameID = `${itemID}_name`;
            const valueID = `${itemID}_value`;

            return (
              <RepeaterItem
                key={itemID}
                before={i}
                id={itemID}
                onAdd={handleAdd}
                onRemove={handleRemove}
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
                    onChange={handleChange}
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
                    onBlur={onBlur}
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
