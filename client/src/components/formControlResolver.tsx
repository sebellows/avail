import React from 'react';
import { Repeater } from './Repeater';
import { RadioGroup } from './RadioGroup';
import { Colorpicker } from './Colorpicker';
import { SelectControl } from './SelectControl';
import { ToggleControl } from './ToggleControl';
import { Control, ControlProps } from './Control';
import { NumericControl } from './NumericControl';

export function formControlResolver(type: string, props: ControlProps = {}, key?: string) {
  switch (type) {
    case 'checkbox':
      return <ToggleControl {...props} type={type} key={key} />;
    case 'radiogroup':
      return <RadioGroup {...props} type={type} key={key} />;
    case 'select':
      return <SelectControl {...props} key={key} />;
    case 'colorpicker':
      return <Colorpicker {...props} key={key} />;
    case 'repeater':
      return <Repeater {...props} key={key} />;
    case 'number':
      return <NumericControl {...props} type={type} key={key} />;
    // text, color, etc.[...]
    default:
      return <Control {...props} type={type} key={key} />;
  }
}
