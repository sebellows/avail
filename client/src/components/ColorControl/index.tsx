/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, Ref, useState, ChangeEvent } from 'react';

import { DropletIcon } from '../Icon';
import { ControlProps } from '../Control';
import { validFormProps } from '../../core/utils';
import { Styled } from './styles';

const ColorControl = forwardRef<{}, ControlProps>(
  ({ showLabel = true, ...props }, ref: Ref<any>) => {
    const [color, setColor] = useState(props?.value ?? '#000000');

    const formProps = validFormProps(props);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      setColor(event.target.value);
      props?.onChange?.(event);
    }

    return (
      <>
        <Styled.Control {...formProps} ref={ref} type="color" onChange={handleChange} />
        {showLabel && (
          <Styled.Overlay
            className="color-control-overlay"
            colorValue={color as string}
            aria-hidden="true"
          >
            <DropletIcon className="mr-2" size={16} />
            {color}
          </Styled.Overlay>
        )}
      </>
    );
  },
);

ColorControl.displayName = 'ColorControl';

export { ColorControl };
