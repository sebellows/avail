/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react'

import { FormControlProps } from '../core/contracts'

import { Repeater } from './Repeater'
import { RadioGroup } from './RadioGroup'
import { Colorpicker } from './Colorpicker'
import { ColorControl } from './ColorControl'
import { SelectControl } from './SelectControl'
import { ToggleControl } from './ToggleControl'
import { Control } from './Control'
import { NumericControl } from './NumericControl'

interface FormControlResolverProps extends FormControlProps {
  type: string
}

const FormControlResolver: React.FC<FormControlResolverProps> = ({
  children,
  type: controlType,
  onAdd = null,
  onRemove = null,
  onUpdate = (...args: any[]) => {},
  ...props
}) => {
  // console.log('onUpdate', controlType, onUpdate, onAdd)
  const handlers = {
    onChange: (event: any) => {
      const {
        target: { name, value, type },
        type: eventType,
      } = event
      console.log('FormControlResolver->onChange', name, value, type, eventType, onUpdate)

      if (type === 'radio' || type === 'checkbox' || type === 'select' || eventType === 'click') {
        onUpdate({ name, value }, event)
      }

      props?.onChange?.(event)
    },
    onBlur: (event: any) => {
      const {
        target: { name, value, tagName, type },
        type: eventType,
      } = event

      if (tagName === 'INPUT' && eventType !== 'blur') {
        console.log('FormControlResolver->onBlur', name, value, eventType)
        onUpdate?.({ name, value }, event)
      }

      props?.onBlur?.(event)
    },
  }

  if (controlType === 'repeater') {
    ;[onAdd, onRemove].forEach((fn) => {
      if (fn && typeof fn == 'function') {
        handlers[fn.name] = fn
      }
    })
  }

  const formControl = useMemo(() => {
    switch (controlType) {
      case 'checkbox':
        return <ToggleControl {...props} {...handlers} children={props?.label} />
      case 'radiogroup':
        return <RadioGroup {...props} {...handlers} />
      case 'select':
        return <SelectControl {...props} {...handlers} />
      case 'colorpicker':
        return <Colorpicker {...props} {...handlers} />
      case 'repeater':
        return <Repeater {...props} {...handlers} />
      case 'number':
        return <NumericControl {...props} {...handlers} />
      case 'color':
        return <ColorControl {...props} {...handlers} />
      // text, color, etc.[...]
      default:
        // return <h1 className="text-danger">{props.id}</h1>;
        return <Control {...props} {...handlers} />
    }
  }, [controlType, props, handlers])

  return formControl
}

FormControlResolver.displayName = 'FormControlResolver'

export { FormControlResolver }
