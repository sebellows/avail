/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  DeepPartial,
  Field,
  FieldValue,
  FieldValues,
  //   FormStateProxy,
} from '../contracts/form';
import {
  isCheckBoxInput,
  isHTMLElement,
  isNil,
  //   isObject,
  //   isRadioOrCheckbox,
  isRadioInput,
  isRadioOrCheckbox,
} from './common';

export type FormValues = FieldValues;

export function useForm<FormValues>(initialValues = {} as FormValues) {
  const [state, setState] = React.useState(initialValues);

  const setFieldValue = React.useCallback(
    (
      field: Field,
      rawValue: FieldValue<FormValues> | DeepPartial<FormValues> | undefined | null | boolean,
    ): boolean => {
      const ref = field.ref;
      const options = field.options;
      const { type } = ref;
      const value = isHTMLElement(ref) && isNil(rawValue) ? '' : rawValue;

      //   if (isRadioInput(ref) && options) {
      //     (options as RadioOrCheckboxOption[]).forEach(
      //       ({ ref: radioRef }) => (radioRef.checked = radioRef.value === value),
      //     );
      //   } else if (isCheckBoxInput(ref) && options) {
      //     options.length > 1
      //       ? (options as RadioOrCheckboxOption[]).forEach(
      //           ({ ref: checkboxRef }) =>
      //             (checkboxRef.checked = (value as string).includes(
      //               checkboxRef.value,
      //             )),
      //         )
      //       : ((options as RadioOrCheckboxOption[])[0].ref.checked = !!value);
      //   } else {
      //     ref.value = value;
      //   }

      return !!type;
    },
    [],
  );

  //   const formState = new Proxy<FormValues>(state, {
  //       get: (obj, prop: keyof FormStateProxy) => {
  //         if (prop in obj) {
  //           formStateRef.current[prop] = true;
  //           return obj[prop];
  //         }

  //         return {};
  //       },
  //     });
  //   }
}
