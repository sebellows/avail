import React, { forwardRef, Ref, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { classNames } from '../../core/utils/classNames';
import { OptionProps as Option, OptionProps } from '../../core/contracts';

import { Control } from '../Control';
import { FieldFeedback } from '../FieldFeedback';
import { FieldDescription } from '../FieldDescription';
import { FormControlResolver } from '../formControlResolver';

import { RepeaterItem } from './RepeaterItem';
import { Styled } from './styles';
import { RepeaterProps } from './props';
import { usePrevious } from '../../hooks/usePrevious';

// const Msg = ({ closeToast, id, msg }) => (
//   <div>
//     {msg}
//     <button>Retry</button>
//     <button onClick={closeToast}>Close</button>
//   </div>
// )

const Repeater = forwardRef<{}, RepeaterProps>(
  (
    {
      id,
      className = '',
      errors: initialErrors = {},
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
    const [errors, setErrors] = useState(initialErrors);
    const prevItemsCount = usePrevious(initialItems.length);

    useEffect(() => {
      if (prevItemsCount !== initialItems.length) {
        setItems(initialItems as Option[]);
      }
    }, [initialItems, prevItemsCount]);

    useEffect(() => {
      if (Object.keys(errors).length) {
        Object.values(errors).forEach((errMsg: string) => {
          toast.error(errMsg, { position: 'top-right' });
        });
      }
      return () => {
        Object.keys(errors).forEach((err) => delete errors[err]);
      };
    }, [errors]);

    function _removeError(name: string) {
      const _errors = { ...errors };
      delete _errors[name];
      setErrors(_errors);
    }

    function handleAdd() {
      const nextID = items.length === 0 ? 1 : items.length;
      onAdd?.({ name: `${id}_items_${nextID}`, value: '' });
    }

    function handleRemove(itemID: string) {
      onRemove?.(itemID);
    }

    function handleChange(event: any) {
      event.preventDefault();
      onChange?.(event);
    }

    function handleBlur(event: any) {
      const { classList, name, value } = event.target;

      if (classList.contains('repeater-name')) {
        // Check if the name value already exists.
        const itemNames = items.filter((item: OptionProps) => item.name === event.target.value);
        if (itemNames.length > 1) {
          setErrors({
            ...errors,
            [name]: `The utility class suffix \`${value}\` already exists for ${id}!`,
          });
        } else if (Object.keys(errors).includes(name)) {
          _removeError(name);
        }
      }
      // All repeater `value` fields are required.
      if (classList.contains('repeater-value')) {
        if (value.length === 0) {
          setErrors({ ...errors, [name]: `A value for \`${name}\` is required in ${id} utility!` });
        } else if (Object.keys(errors).includes(name)) {
          _removeError(name);
        }
      }
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
                    className="repeater-name"
                    value={item.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isValid={!errors || !errors[nameID]}
                    isInvalid={errors && errors[nameID]}
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
                    className="repeater-value"
                    name={valueID}
                    arialabel={valueID}
                    value={item.value}
                    readOnly={readOnly}
                    disabled={readOnly}
                    required
                    options={options}
                    onBlur={handleBlur}
                    isValid={!errors || !errors[id]}
                    isInvalid={errors && errors[id]}
                  />
                </Styled.Field>
              </RepeaterItem>
            );
          })}
        {props?.description && <FieldDescription>{props?.description}</FieldDescription>}
        {props?.isInvalid && errors && <FieldFeedback type="invalid">{errors[id]}</FieldFeedback>}
      </Styled.Wrapper>
    );
  },
);

Repeater.displayName = 'Repeater';

export { Repeater };
