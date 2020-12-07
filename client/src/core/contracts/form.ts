import { ChangeEvent, InputHTMLAttributes } from 'react'
import { AvailClassMap } from './avail'
import { ComponentProps } from './common'

/**************************************************
 *
 * FORM FIELD MODEL INTERFACES
 *
 **************************************************/

export type FieldError = Record<string, string>

export interface OptionProps {
  disabled?: boolean
  name?: string | number
  readOnly?: boolean
  selected?: boolean
  value: string | number
}

export type FormControlType = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement

export interface FormControlProps extends InputHTMLAttributes<FormControlType>, ComponentProps {
  arialabel?: string
  error?: FieldError
  isInvalid?: boolean
  isValid?: boolean
  // <select>
  defaultOption?: OptionProps | string
  options?: OptionProps[] | string[]
  // catch-all
  [key: string]: any
}

export interface FormGroupProps extends ComponentProps {
  classMap?: AvailClassMap
  description?: string
  errors?: FieldError
  id?: string
  keyLabel?: string
  valueLabel?: string
  legend?: string
  presets?: string[] | Record<string, any>
  onAdd?: (event: any) => void
  onChange?: (event: ChangeEvent<FormControlType>) => void
  onRemove?: (event: any) => void
  after?: any // TODO: currently unused
  before?: any // TODO: currently unused
  [key: string]: any
}
