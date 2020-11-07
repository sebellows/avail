import React, { useState, useRef, Ref } from 'react';
import { classNames, validFormProps } from '../../core/utils';

import { Styled } from './styles';
import { SwitchProps } from './props';
import { SwitchIcon } from './SwitchIcon';

export const Switch = React.forwardRef<{}, SwitchProps>(
  (
    {
      checked: initialChecked = false,
      children,
      className = null,
      disabled = false,
      inline = false,
      isInvalid = false,
      isValid = false,
      alignLabel = 'right',
      label: labelText = null,
      type = 'checkbox',
      onChange,
      ...props
    },
    ref: Ref<any>,
  ) => {
    const [checked, setCheckedState] = useState(initialChecked);

    const inputRef = useRef(null);

    function handleChange(event: any) {
      event.persist();

      setCheckedState(!checked);

      if (onChange) {
        onChange(event);
      }
    }

    const formProps = validFormProps(props);

    return (
      <Styled.Wrapper
        ref={ref}
        className={classNames(
          'switch',
          className,
          checked ? 'is-checked' : 'is-unchecked',
          isValid && 'is-valid',
          isInvalid && 'is-invalid',
        )}
      >
        <Styled.Label htmlFor={formProps.name ?? formProps.id} className="switch-label">
          <Styled.Bar checked={checked}>
            <Styled.Control
              {...formProps}
              ref={inputRef}
              type={type}
              checked={checked}
              onChange={handleChange}
            />
            <Styled.Toggle className="on" checked={checked}>
              <Styled.ToggleInner>
                <SwitchIcon checked={checked} size={16} />
              </Styled.ToggleInner>
            </Styled.Toggle>
          </Styled.Bar>
          {children && (
            <Styled.Content {...(children as React.ReactElement)?.props}>{children}</Styled.Content>
          )}
        </Styled.Label>
      </Styled.Wrapper>
    );
  },
);
