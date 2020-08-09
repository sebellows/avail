import { InputHTMLAttributes, SyntheticEvent } from 'react';
import { AvailClassMap } from './avail';
import { ComponentProps } from './common';

/**************************************************
 *
 * FORM FIELD MODEL INTERFACES
 *
 **************************************************/

export type FieldError = Record<string, string>;

export interface OptionProps {
  disabled?: boolean;
  name?: string | number;
  readOnly?: boolean;
  selected?: boolean;
  value: string | number;
}

export type FormControlType = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement;

export interface FormControlProps extends InputHTMLAttributes<FormControlType>, ComponentProps {
  arialabel?: string;
  error?: FieldError;
  isInvalid?: boolean;
  isValid?: boolean;
  // <select>
  defaultOption?: OptionProps | string;
  options?: OptionProps[] | string[];
  // catch-all
  [key: string]: any;
}

export interface FormGroupProps extends ComponentProps {
  classMap?: AvailClassMap;
  description?: string;
  errors?: FieldError;
  id?: string;
  keyLabel?: string;
  valueLabel?: string;
  legend?: string;
  presets?: string[] | Record<string, any>;
  onAdd?: (event: any) => void;
  onChange?: (event: SyntheticEvent<FormControlType>) => void;
  onRemove?: (event: any) => void;
  after?: any; // TODO: currently unused
  before?: any; // TODO: currently unused
  [key: string]: any;
}

// export type InputType =
//   | 'button'
//   | 'checkbox'
//   | 'color'
//   | 'date'
//   | 'datetime-local'
//   | 'email'
//   | 'file'
//   | 'hidden'
//   | 'image'
//   | 'month'
//   | 'number'
//   | 'password'
//   | 'radio'
//   | 'range'
//   | 'reset'
//   | 'search'
//   | 'submit'
//   | 'tel'
//   | 'text'
//   | 'time'
//   | 'url'
//   | 'week'
//   | 'datetime';

// // type FormControlField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
// export interface FormGroup<T> {
//   className?: string;
//   classMap?: AvailClassMap;
//   control?: FormControl<T>;
//   description?: string;
//   id?: string;
//   label?: string;
// }

// export interface FormControlGroup {
//   className?: string;
//   description?: string;
//   error?: Record<string, any>; // TODO: replace with FieldError map?
//   isInvalid?: boolean;
//   isValid?: boolean;
//   legend?: string;
//   options?: any;
//   presets?: string[] | Record<string, any>;
//   id?: string;
//   onAdd?: (event: any) => void;
//   onChange?: (...args: any[]) => void;
//   onRemove?: (event: any) => void;
//   after?: any;
//   before?: any;
// }

// export interface FormControl<T> extends InputHTMLAttributes<T> {
//   className?: string;
//   error?: string;
//   id?: string;
//   isInvalid?: boolean;
//   isValid?: boolean;
//   label?: string;
//   onBlur?: (event: FocusEvent<T>) => void;
//   onFocus?: (event: FocusEvent<T>) => void;
//   onKeyDown?: (event: KeyboardEvent<T>) => void;
//   onKeyUp?: (event: KeyboardEvent<T>) => void;
//   style?: CSSProperties;
//   tabIndex?: number;
//   [key: string]: any;
// }

// export interface TextInputProps extends FormControl<HTMLInputElement> {}

// export interface TextAreaProps extends FormControl<HTMLTextAreaElement> {
//   cols?: number; // default: 20;
//   rows?: number;
//   //   spellCheck?: boolean | 'default' | 'false' | 'true'; // default: `default`
//   wrap?: 'hard' | 'off' | 'soft' | null; // default: 'soft'
// }

// export interface CheckboxProps extends FormControl<HTMLInputElement> {
//   checked?: boolean; // CHECKBOX, RADIO
//   inline?: boolean; // UI prop
//   type?: 'checkbox' | 'radio';
// }

// export interface OptionProps {
//   disabled?: boolean;
//   name?: string | number;
//   readOnly?: boolean;
//   selected?: boolean;
//   value: string | number;
// }

// export interface SelectInputProps extends FormControl<HTMLSelectElement> {
//   defaultOption?: OptionProps | string;
//   multiple?: boolean;
//   options?: OptionProps[] | string[];
//   size?: number;
// }

// export type FormControlType = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement;

// export interface FormControlProps extends InputHTMLAttributes<FormControlType> {
//   as?: string | JSX.IntrinsicAttributes;
//   className?: string;
//   error?: string;
//   id?: string;
//   isInvalid?: boolean;
//   isValid?: boolean;
//   onBlur?: (event: FocusEvent<FormControlType>) => void;
//   onFocus?: (event: FocusEvent<FormControlType>) => void;
//   onKeyDown?: (event: KeyboardEvent<FormControlType>) => void;
//   onKeyUp?: (event: KeyboardEvent<FormControlType>) => void;
//   style?: CSSProperties;
//   tabIndex?: number;
//   defaultOption?: OptionProps | string;
//   options?: OptionProps[] | string[];
//   [key: string]: any;
// }

// export interface FormGroupProps extends Omit<FormControlProps, 'error'> {
//   className?: string;
//   classMap?: AvailClassMap;
//   description?: string;
//   error?: Record<string, any>; // TODO: replace with FieldError map?
//   // id?: string;
//   // isInvalid?: boolean;
//   // isValid?: boolean;
//   legend?: string;
//   // options?: any;
//   presets?: string[] | Record<string, any>;
//   onAdd?: (event: any) => void;
//   onChange?: (...args: any[]) => void;
//   onRemove?: (event: any) => void;
//   after?: any;
//   before?: any;
//   [key: string]: any;
// }
