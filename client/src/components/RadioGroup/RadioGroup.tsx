import React, { ChangeEvent, forwardRef, Ref } from 'react'
import { classNames } from '../../core/utils'
import { FormGroupProps, OptionProps } from '../../core/contracts'
import { Radio } from '../ToggleControl'
import { FieldFeedback } from '../FieldFeedback'
import { FieldDescription } from '../FieldDescription'
import { Styled } from './styles'

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
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      console.log('RadioGroup=>handleChange', event.target, value)
      onChange?.(event)
    }

    return (
      <Styled.Wrapper ref={ref} className={className}>
        <Styled.Legend className={classNames(classMap?.legend)}>{legend}</Styled.Legend>
        <Styled.FormGroup className="radio-group">
          {options.map((option: OptionProps, i: number) => (
            <Radio
              key={`${option.name}-${i}`}
              type="radio"
              id={`${option.name}-${i}`}
              name={props?.name ?? id}
              value={option.value}
              checked={value === option.value}
              inline={inline ? true : false}
              className={classNames(classMap?.control)}
              onChange={handleChange}
            >
              <span>{option.name}</span>
            </Radio>
          ))}
        </Styled.FormGroup>
        {description && <FieldDescription>{description}</FieldDescription>}
        {props?.isInvalid && error && <FieldFeedback type="invalid">{error[id]}</FieldFeedback>}
      </Styled.Wrapper>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'

export { RadioGroup }
