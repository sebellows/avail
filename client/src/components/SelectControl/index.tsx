/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, Ref, useEffect, useMemo, useRef } from 'react';
import { OptionProps } from '../../core/contracts';
import { toOptions, Option } from '../../core/models/Option';
import { classNames, validFormProps, containerProps, typeOf } from '../../core/utils';
import { Styled } from './styles';
import { ControlProps } from '../Control';

const SelectControl = forwardRef<{}, ControlProps>(
  (
    {
      as: Component = 'div',
      className,
      defaultOption,
      isValid,
      isInvalid,
      arialabel,
      options: initialOptions,
      ...props
    },
    ref: Ref<any>,
  ) => {
    const options = useMemo(() => {
      if (Array.isArray(initialOptions) && initialOptions.some((opt) => opt instanceof Option)) {
        return initialOptions;
      }
      return toOptions(initialOptions);
    }, [initialOptions]);

    function handleChange(event: any) {
      if (props.onChange) {
        props.onChange(event);
      }
    }

    const { controlClass = '' } = props;
    const htmlProps = containerProps(props, { exclude: ['controlClass'] });
    const formProps = validFormProps(props);

    return (
      <Styled.Wrapper
        {...htmlProps}
        as={Component}
        className={classNames(
          'select',
          isValid && `is-valid`,
          isInvalid && `is-invalid`,
          className,
        )}
      >
        <Styled.Select
          as="select"
          ref={ref}
          {...formProps}
          className={classNames('control', controlClass)}
          aria-label={arialabel}
          onChange={handleChange}
        >
          {defaultOption && <option value="">{defaultOption}</option>}
          {(options as OptionProps[]).map((_option: OptionProps, i: number) => {
            return (
              <option key={`${_option.name}-${i}`} value={_option.value}>
                {_option.name}
              </option>
            );
          })}
        </Styled.Select>
      </Styled.Wrapper>
    );
  },
);

SelectControl.displayName = 'SelectControl';

export { SelectControl };
