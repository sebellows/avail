import React, { useMemo } from 'react';
import { Repeater } from './Repeater';
import { RadioGroup } from './RadioGroup';
import { Colorpicker } from './Colorpicker';
import { ColorControl } from './ColorControl';
import { SelectControl } from './SelectControl';
import { ToggleControl } from './ToggleControl';
import { Control, ControlProps } from './Control';
import { NumericControl } from './NumericControl';

interface FormControlResolverProps extends ControlProps {
  type: string;
}

const FormControlResolver: React.FC<FormControlResolverProps> = ({ children, type, ...props }) => {
  const formControl = useMemo(() => {
    switch (type) {
      case 'checkbox':
        return <ToggleControl {...props} type={type} />;
      case 'radiogroup':
        return <RadioGroup {...props} type={type} />;
      case 'select':
        return <SelectControl {...props} />;
      case 'colorpicker':
        return <Colorpicker {...props} />;
      case 'repeater':
        return <Repeater {...props} />;
      case 'number':
        return <NumericControl {...props} type={type} />;
      case 'color':
        return <ColorControl {...props} type={type} />;
      // text, color, etc.[...]
      default:
        return <Control {...props} type={type} />;
    }
  }, [type, props]);

  return formControl;
};

FormControlResolver.displayName = 'FormControlResolver';

export { FormControlResolver };
