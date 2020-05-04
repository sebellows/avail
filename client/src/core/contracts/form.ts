import { CSSProperties, FocusEvent, KeyboardEvent, InputHTMLAttributes } from 'react';

/**
 * Form Handling
 */

export type FieldValues = Record<string, any>;

export type FieldName<FormValues extends FieldValues> = (keyof FormValues & string) | string;

export type FieldValue<FormValues extends FieldValues> = FormValues[FieldName<FormValues>];

export type NestDataObject<FormValues, Value> = {
  [Key in keyof FormValues]?: FormValues[Key] extends Array<infer U>
    ? 0 extends 1 & U
      ? any
      : unknown extends U
      ? Value[]
      : object extends U
      ? Value[]
      : U extends Date
      ? Value[]
      : U extends object
      ? NestDataObject<U, Value>[]
      : Value[]
    : 0 extends 1 & FormValues[Key]
    ? any
    : unknown extends FormValues[Key]
    ? Value
    : object extends FormValues[Key]
    ? Value
    : FormValues[Key] extends Date
    ? Value
    : FormValues[Key] extends object
    ? NestDataObject<FormValues[Key], Value>
    : Value;
};

export type FieldError = {
  type: string;
  ref?: Ref;
  types?: Record<string, string | boolean | undefined>;
  message?: string;
  isManual?: boolean;
};
export type FieldErrors<FormValues> = NestDataObject<FormValues, FieldError>;

export type Touched<FormValues> = NestDataObject<FormValues, true>;

export type FormStateProxy<FormValues extends FieldValues = FieldValues> = {
  dirty: boolean;
  dirtyFields: Set<FieldName<FormValues>>;
  isSubmitted: boolean;
  submitCount: number;
  touched: Touched<FormValues>;
  isSubmitting: boolean;
  isValid: boolean;
};

export type CustomElement = {
  name: string;
  type?: string;
  value?: any;
  checked?: boolean;
  options?: HTMLOptionsCollection;
  files?: FileList | null;
  focus?: () => void;
};

export type FieldElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | CustomElement;

export type Ref = FieldElement;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T[P] extends { [key: string]: unknown }
    ? DeepPartial<T[P]>
    : T[P];
};

export type Field = {
  ref: Ref;
  options?: HTMLInputElement[]; // `radio` or `checkbox` options
};

export type RadioOrCheckboxOption = {
  ref: HTMLInputElement;
};

/**************************************************
 *
 * FORM FIELD MODEL INTERFACES
 *
 **************************************************/

export type InputType =
  | 'button'
  // 'checkbox' |
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  // 'radio' |
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | 'datetime';

// type FormControlField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export interface FormGroup<T> {
  className?: string;
  classMap?: Record<string, string>;
  control?: FormControl<T>;
  description?: string;
  id?: string;
  label?: string;
}

export interface FormControlGroup {
  className?: string;
  error?: Record<string, any>; // TODO: replace with FieldError map?
  legend?: string;
  options?: any;
  id?: string;
  onAdd?: (event: any) => void;
  onRemove?: (event: any) => void;
  after?: any;
  before?: any;
}

export interface FormControl<T> extends InputHTMLAttributes<T> {
  //   autoComplete?: string;
  //   autoFocus?: boolean;
  className?: string;
  //   disabled?: boolean;
  error?: string;
  feedback?: string;
  id?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  label?: string;
  //   name: string;
  onBlur?: (event: FocusEvent<T>) => void;
  //   onChange?: (event: ChangeEvent<T>) => void;
  onFocus?: (event: FocusEvent<T>) => void;
  onKeyDown?: (event: KeyboardEvent<T>) => void;
  onKeyUp?: (event: KeyboardEvent<T>) => void;
  //   required?: boolean;
  style?: CSSProperties;
  tabIndex?: number;
  //   value?: string;
}

// export interface TextFieldProps<T> extends FormControl<T> {
//   maxLength?: number; // password, search, tel, text, url, TEXTAREA
//   minLength?: number; // password, search, tel, text, url, TEXTAREA
//   placeholder?: string; // text/TEXTAREA
// }

export interface TextInputProps extends FormControl<HTMLInputElement> {}
// export interface TextInputProps extends TextFieldProps<HTMLInputElement> {
//   max?: number; // numeric types
//   min?: number; // numeric types
//   multiple?: boolean; // email, file, SELECT
//   pattern?: RegExp; // password, text, tel
//   size?: number; // email, password, tel, text, SELECT
//   step?: number; // numeric types
//   list?: string; // id of a corresponding <datalist>
//   type?: InputType; // INPUT
// }

export interface TextAreaProps extends FormControl<HTMLTextAreaElement> {
  cols?: number; // default: 20;
  rows?: number;
  //   spellCheck?: boolean | 'default' | 'false' | 'true'; // default: `default`
  wrap?: 'hard' | 'off' | 'soft' | null; // default: 'soft'
}

export interface CheckboxProps extends FormControl<HTMLInputElement> {
  checked?: boolean; // CHECKBOX, RADIO
  inline?: boolean; // UI prop
  type?: 'checkbox' | 'radio';
}

export interface OptionProps {
  disabled?: boolean;
  name?: string;
  selected?: boolean;
  value: string;
}

export interface SelectInputProps extends FormControl<HTMLSelectElement> {
  defaultOption?: OptionProps | string;
  multiple?: boolean;
  options?: OptionProps[] | string[];
  size?: number;
}
