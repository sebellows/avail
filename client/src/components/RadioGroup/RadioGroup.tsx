import React, { forwardRef } from 'react'
import { classNames } from '../../core/utils'
import { Radio } from '../ToggleControl'
import { FieldFeedback } from '../FieldFeedback'
import { FieldDescription } from '../FieldDescription'
import { Styled } from './styles'

const RadioGroup: Avail.RefForwardingComponent<'fieldset', Avail.ControlGroup> = forwardRef(
  (
    {
      as: Component = 'fieldset',
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
    ref,
  ) => {
    function handleChange(e: any) {
      console.log('RadioGroup=>handleChange', e.target, value)
      onChange?.(e)
    }

    return (
      <Styled.Wrapper ref={ref} as={Component} className={className}>
        <Styled.Legend className={classNames(classMap?.legend)}>{legend}</Styled.Legend>
        <Styled.FormGroup className="radio-group">
          {(options as Avail.OptionProps[]).map((option, i: number) => (
            <Radio
              key={`${option.label}-${i}`}
              type="radio"
              id={`${option.label}-${i}`}
              name={props?.name ?? id}
              value={option.value}
              checked={value === option.value}
              inline={inline ? true : false}
              className={classNames(classMap?.control)}
              onChange={handleChange}
            >
              <span>{option.label}</span>
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
