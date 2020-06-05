import React, { useContext, useMemo } from 'react';
import { Repeater } from './Repeater';
import { RadioGroup } from './RadioGroup';
import { Colorpicker } from './Colorpicker';
import { ColorControl } from './ColorControl';
import { SelectControl } from './SelectControl';
import { ToggleControl } from './ToggleControl';
import { Control, ControlProps } from './Control';
import { NumericControl } from './NumericControl';
import { FormContext } from '../context/FormContext';

interface FormControlResolverProps extends ControlProps {
  type: string;
}

// onBlur={(event: any) => {
//   console.log('updateSettings', event.target.name, settings);
//   context.dispatchSettings(event);
// }}
// onChange={(event: any) => {
//   if (
//     field.type === 'radiogroup' ||
//     field.type === 'checkbox' ||
//     field.type === 'select'
//   ) {
//     console.log('updateSettings', event.target.name, settings);
//     context.dispatchSettings(event);
//   }
// }}

const FormControlResolver: React.FC<FormControlResolverProps> = ({
  children,
  type: controlType,
  ...props
}) => {
  const { dispatchSettings } = useContext(FormContext);

  const handlers = {
    onChange: ({ target: { name, value, type } }) => {
      if (type === 'radio' || type === 'checkbox' || type === 'select') {
        dispatchSettings({ name, value });
      }
    },
    onBlur: ({ target: { name, value, type } }) => {
      if (type === 'input') {
        dispatchSettings({ name, value });
      }
    },
  };

  const formControl = useMemo(() => {
    switch (controlType) {
      case 'checkbox':
        return <ToggleControl {...props} {...handlers} type={controlType} />;
      case 'radiogroup':
        return <RadioGroup {...props} {...handlers} type={controlType} />;
      case 'select':
        return <SelectControl {...props} {...handlers} />;
      case 'colorpicker':
        return <Colorpicker {...props} {...handlers} />;
      case 'repeater':
        return <Repeater {...props} {...handlers} />;
      case 'number':
        return <NumericControl {...props} {...handlers} type={controlType} />;
      case 'color':
        return <ColorControl {...props} {...handlers} type={controlType} />;
      // text, color, etc.[...]
      default:
        return <Control {...props} {...handlers} type={controlType} />;
    }
  }, [controlType, props, handlers]);

  return formControl;
};

FormControlResolver.displayName = 'FormControlResolver';

export { FormControlResolver };
