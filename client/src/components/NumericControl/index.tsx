import React, { forwardRef, Ref, useEffect, useState } from 'react';
import { ControlProps } from '../Control';
import { MinusIcon, PlusIcon } from '../Icon';
import { DOWN, UP, containerProps, validFormProps, classNames } from '../../core/utils';
import { Styled } from './styles';

interface NumericControlProps extends ControlProps {
  step?: number;
}

const NumericControl = forwardRef<{}, NumericControlProps>(
  (
    {
      min = 0,
      max = Infinity,
      step = 1,
      disabled: initialDisabled,
      readOnly,
      value: initialValue,
      ...props
    },
    ref: Ref<any>,
  ) => {
    const [value, setValue] = useState(initialValue);
    const [disabled, setDisabled] = useState(initialDisabled);

    useEffect(() => {
      if (readOnly) {
        setDisabled(true);
      }
    }, [readOnly]);

    useEffect(() => {
      if (+value <= min) {
        setValue(`${min}`);
      }
      if (+value >= max) {
        setValue(`${max}`);
      }
    }, [min, max, value, setValue]);

    function increment(event: any) {
      event.preventDefault();
      if (disabled || +value >= max) return;

      setValue(`${+value + 1 * step}`);

      console.log('increment', JSON.stringify(value));
    }

    function decrement(event: any) {
      event.preventDefault();
      if (disabled || +value <= min) return;

      setValue(`${+value + -1 * step}`);
    }

    function handleKeyUp(event: any) {
      event.preventDefault();

      if (event.keyCode === UP) {
        increment(event);
      }
      if (event.keyCode === DOWN) {
        decrement(event);
      }
    }

    function handleChange(event: any) {
      console.log('handleChange', event);
    }

    const _containerProps = containerProps(props, { exclude: ['type'] });
    const _controlProps = validFormProps(props);

    return (
      <Styled.Wrapper
        {..._containerProps}
        ref={ref}
        className={classNames('control-group', 'numeric', props.className)}
      >
        <Styled.Control
          {..._controlProps}
          type="number"
          disabled={disabled}
          readOnly={readOnly}
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
        <Styled.IncrementButton
          className="decrement-btn"
          disabled={disabled || value >= max}
          onClick={increment}
        >
          <PlusIcon size={20} />
        </Styled.IncrementButton>
        <Styled.DecrementButton
          className="decrement-btn"
          disabled={disabled || value <= min}
          onClick={decrement}
        >
          <MinusIcon size={20} />
        </Styled.DecrementButton>
      </Styled.Wrapper>
    );
  },
);

NumericControl.displayName = 'NumericControl';

export { NumericControl };
