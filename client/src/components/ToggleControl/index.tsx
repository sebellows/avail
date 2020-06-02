import React, { Ref, useRef } from 'react';
import { control } from '../../core/style';
import { validFormProps, containerProps } from '../../core/utils';
import { CheckIcon } from '../Icon';
import { Styled } from './styles';
import { ToggleControlProps } from './props';

const ToggleControl = React.forwardRef<{}, ToggleControlProps>(
  ({ as: Component = 'label', children, type = 'checkbox', ...props }, ref: Ref<any>) => {
    const inputRef = useRef(null);
    const htmlProps = containerProps(props);
    const formProps = validFormProps(props);
    const inputType = type === 'radio' ? type : 'checkbox';

    if (Component === 'label') {
      htmlProps['htmlFor'] = formProps?.name || formProps?.id;
    }

    function handleChange(event: any) {
      if (props.onChange) {
        props.onChange(event);
      }
    }

    return (
      <Styled.Wrapper ref={ref} {...htmlProps} as={Component}>
        <Styled.Control ref={inputRef} type={inputType} {...formProps} onChange={handleChange} />
        <Styled.Container className="toggle-container">
          <Styled.Outer className="toggle-outer" inputType={inputType} />
          <Styled.Inner className="toggle-inner" inputType={inputType}>
            {type === 'checkbox' && (
              <CheckIcon
                fill={formProps?.checked ? control.active.bg : control.bg}
                strokeDashoffset="22.91026"
                strokeDasharray="22.91026"
              />
            )}
          </Styled.Inner>
        </Styled.Container>
        {children && (
          <Styled.Content {...(children as React.ReactElement)?.props}>{children}</Styled.Content>
        )}
      </Styled.Wrapper>
    );
  },
);

ToggleControl.displayName = 'ToggleControl';

export { ToggleControl };
