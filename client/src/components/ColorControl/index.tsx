/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, Ref } from 'react';

import { DropletIcon } from '../Icon';
import { ControlProps } from '../Control';
import { validFormProps } from '../../core/utils';
import { Styled } from './styles';

const ColorControl = forwardRef<{}, ControlProps>(
  ({ showLabel = true, ...props }, ref: Ref<any>) => {
    const formProps = validFormProps(props);

    return (
      <>
        <Styled.Control {...formProps} ref={ref} type="color" />
        {showLabel && (
          <Styled.Overlay
            className="color-control-overlay"
            colorValue={props.value as string}
            aria-hidden="true"
          >
            <DropletIcon className="mr-2" size={16} />
            {props.value}
          </Styled.Overlay>
        )}
      </>
    );
  },
);

ColorControl.displayName = 'ColorControl';

export { ColorControl };
