import React, { forwardRef, Ref } from 'react';
import { classNames } from '../../core/utils';
import { FormGroupProps, OptionProps } from '../../core/contracts';
import { ToggleControl } from '../ToggleControl';
import { FieldFeedback } from '../FieldFeedback';
import { FieldDescription } from '../FieldDescription';
import { Styled } from './styles';

const RadioGroup = forwardRef<{}, FormGroupProps>(
  (
    {
      className,
      classMap = {},
      description,
      error,
      id,
      isValid,
      isInvalid,
      legend,
      options,
      onChange,
      value,
      inline = true,
      ...props
    },
    ref: Ref<any>,
  ) => {
    return (
      <Styled.Wrapper ref={ref} className={className}>
        <legend className={classNames(classMap?.legend)}>{legend}</legend>
        <Styled.FormGroup className="radio-group">
          {options.map((option: OptionProps, i: number) => (
            <ToggleControl
              key={`${option.name}-${i}`}
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              label={option.name}
              inline={inline ? 1 : 0}
              className={classNames(classMap?.control)}
            >
              <span>{option.name}</span>
            </ToggleControl>
          ))}
        </Styled.FormGroup>
        {description && <FieldDescription>{description}</FieldDescription>}
        {props?.isInvalid && error && <FieldFeedback type="invalid">{error[id]}</FieldFeedback>}
      </Styled.Wrapper>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
