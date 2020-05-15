import React from 'react';
import { Control, ControlProps } from './Control';
import { SelectControl } from './SelectControl';
import { Colorpicker } from './Colorpicker';
import { ToggleControl } from './ToggleControl';
import { FormRadioGroup } from './FormRadioGroup';
import { Repeater } from './Repeater';

export function formControlResolver(type: string, props: ControlProps = {}, key?: string) {
  switch (type) {
    case 'checkbox':
      return <ToggleControl {...props} type={type} key={key} />;
    case 'radiogroup':
      return <FormRadioGroup {...props} type={type} key={key} />;
    case 'select':
      return <SelectControl {...props} key={key} />;
    case 'colorpicker':
      return <Colorpicker {...props} key={key} />;
    case 'repeater':
      return <Repeater {...props} key={key} />;
    // text, color, number, etc.[...]
    default:
      return <Control {...props} type={type} key={key} />;
  }
}
