/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Ref, useRef } from 'react';
import { validFormProps, containerProps, color } from '../../core/utils';
import { CheckIcon } from '../Icon';
import {
  StyledToggleControl,
  ToggleWrapper,
  ToggleContainer,
  ToggleOuter,
  ToggleInner,
  ToggleLabelText,
  // ToggleIcon,
} from './styles';
import { ToggleControlProps } from './props';

const ToggleControl = React.forwardRef<{}, ToggleControlProps>(
  ({ as: Component = 'label', children, type = 'checkbox', ...props }, ref: Ref<any>) => {
    const inputRef = useRef(null);
    const htmlProps = containerProps(props);
    const formProps = validFormProps(props);
    const inputType = type === 'radio' ? type : 'checkbox';

    if (Component === 'label') {
      htmlProps['htmlForm'] = formProps?.name || formProps?.id;
    }

    // const child = React.Children.only(children);

    function handleChange(event: any) {
      if (props.onChange) {
        props.onChange(event);
      }
    }

    return (
      <ToggleWrapper ref={ref} {...htmlProps} as={Component}>
        <StyledToggleControl
          ref={inputRef}
          type={inputType}
          {...formProps}
          onChange={handleChange}
        />
        <ToggleContainer className="toggle-container">
          <ToggleOuter className="toggle-outer" />
          <ToggleInner className="toggle-inner">
            {type === 'checkbox' && (
              <CheckIcon
                fill={formProps?.checked ? color.control.active.bg : color.control.bg}
                strokeDashoffset="22.91026"
                strokeDasharray="22.91026"
              />
            )}
          </ToggleInner>
        </ToggleContainer>
        {children && (
          <ToggleLabelText {...(children as React.ReactElement)?.props}>{children}</ToggleLabelText>
        )}
      </ToggleWrapper>
    );
  },
);

ToggleControl.displayName = 'ToggleControl';

export { ToggleControl };
