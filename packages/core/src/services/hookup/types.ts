// >>>>> Rule

import { Primitive } from 'type-fest'
import { CollectionItem, CollectionObj } from '../..'

// Modified from https://github.com/yiminghe/async-validator/blob/0d51d60086a127b21db76f44dff28ae18c165c47/src/index.d.ts
export type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email'
  | 'pattern'

export interface ValidateOption {
  // whether to suppress internal warning
  suppressWarning?: boolean

  // when the first validation rule generates an error stop processed
  first?: boolean

  // when the first validation rule of the specified field generates an error stop the field processed, 'true' means all fields.
  firstFields?: boolean | string[]

  messages?: Partial<ValidateMessages>

  /** The name of rules need to be trigger. Will validate all rules if leave empty */
  keys?: string[]

  error?: (rule: InternalRuleItem, message: string) => ValidationError
}

export type SyncErrorType = Error | string
export type SyncValidateResult = boolean | SyncErrorType | SyncErrorType[]
export type ValidateResult = void | Promise<void> | SyncValidateResult

export interface RuleItem {
  type?: RuleType // default type is 'string'
  required?: boolean
  pattern?: RegExp | string
  min?: number // Range of type 'string' and 'array'
  max?: number // Range of type 'string' and 'array'
  len?: number // Length of type 'string' and 'array'
  enum?: Primitive[] // possible values of type 'enum'
  whitespace?: boolean
  fields?: Record<string, Rule> // ignore when without required
  options?: ValidateOption
  defaultField?: Rule // 'object' or 'array' containing validation rules
  transform?: (value: Value) => Value
  message?: string | ((a?: string) => string)
  asyncValidator?: (
    rule: InternalRuleItem,
    value: Value,
    callback: (error?: string | Error) => void,
    source: Values,
    options: ValidateOption,
  ) => void | Promise<void>
  validator?: (
    rule: InternalRuleItem,
    value: Value,
    callback: (error?: string | Error) => void,
    source: Values,
    options: ValidateOption,
  ) => SyncValidateResult | void
}

export type Rule = RuleItem | RuleItem[]

export type Rules = Record<string, Rule>

/**
 *  Rule for validating a value exists in an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 *  @param type Rule type
 */
export type ExecuteRule = (
  rule: InternalRuleItem,
  value: Value,
  source: Values,
  errors: string[],
  options: ValidateOption,
  type?: string,
) => void

/**
 *  Performs validation for any type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
export type ExecuteValidator = (
  rule: InternalRuleItem,
  value: Value,
  callback: (error?: string[]) => void,
  source: Values,
  options: ValidateOption,
) => void

// >>>>> Message
type ValidateMessage<T extends any[] = unknown[]> = string | ((...args: T) => string)
type FullField = string | undefined
type EnumString = string | undefined
type Pattern = string | RegExp | undefined
type Range = number | undefined
type Type = string | undefined

export interface ValidateMessages {
  default?: ValidateMessage
  required?: ValidateMessage<[FullField]>
  enum?: ValidateMessage<[FullField, EnumString]>
  whitespace?: ValidateMessage<[FullField]>
  date?: {
    format?: ValidateMessage
    parse?: ValidateMessage
    invalid?: ValidateMessage
  }
  types?: {
    string?: ValidateMessage<[FullField, Type]>
    method?: ValidateMessage<[FullField, Type]>
    array?: ValidateMessage<[FullField, Type]>
    object?: ValidateMessage<[FullField, Type]>
    number?: ValidateMessage<[FullField, Type]>
    date?: ValidateMessage<[FullField, Type]>
    boolean?: ValidateMessage<[FullField, Type]>
    integer?: ValidateMessage<[FullField, Type]>
    float?: ValidateMessage<[FullField, Type]>
    regexp?: ValidateMessage<[FullField, Type]>
    email?: ValidateMessage<[FullField, Type]>
    url?: ValidateMessage<[FullField, Type]>
    hex?: ValidateMessage<[FullField, Type]>
  }
  string?: {
    len?: ValidateMessage<[FullField, Range]>
    min?: ValidateMessage<[FullField, Range]>
    max?: ValidateMessage<[FullField, Range]>
    range?: ValidateMessage<[FullField, Range, Range]>
  }
  number?: {
    len?: ValidateMessage<[FullField, Range]>
    min?: ValidateMessage<[FullField, Range]>
    max?: ValidateMessage<[FullField, Range]>
    range?: ValidateMessage<[FullField, Range, Range]>
  }
  array?: {
    len?: ValidateMessage<[FullField, Range]>
    min?: ValidateMessage<[FullField, Range]>
    max?: ValidateMessage<[FullField, Range]>
    range?: ValidateMessage<[FullField, Range, Range]>
  }
  pattern?: {
    mismatch?: ValidateMessage<[FullField, Value, Pattern]>
  }
}

export interface InternalValidateMessages extends ValidateMessages {
  clone: () => InternalValidateMessages
}

// >>>>> Values
export type Value = any
export type Values = Record<string, Value>

// >>>>> Validate
// export interface ValidateError {
//   message?: string
//   fieldValue?: Value
//   field?: string
// }

export type ValidateFieldsError = Record<string, ValidationError[]>

export type ValidateCallback = (
  errors: ValidationError[] | null,
  fields: ValidateFieldsError | Values,
) => void

// was `RuleValuePackage`
export interface FieldRuleValue {
  rule: InternalRuleItem
  value: Value
  source: Values
  field: string
}

export interface InternalRuleItem extends Omit<RuleItem, 'validator'> {
  field?: string
  fullField?: string
  fullFields?: string[]
  validator?: RuleItem['validator'] | ExecuteValidator
}

/**************************************************
 *
 * Angular-style Validators
 *
 **************************************************/

export type NestedObj<T = CollectionObj> = CollectionObj<T>

export type Schema<
  Target extends CollectionItem<CollectionObj<any>> = CollectionItem<CollectionObj<any>>,
  Source extends CollectionItem<CollectionObj<any>> = CollectionItem<CollectionObj<any>>,
> = {
  [destinationProperty in keyof Target]?:
    | FieldPath<Source>
    | {
        (
          iteratee: Source,
          source: Source[],
          target: Target[destinationProperty],
        ): Target[destinationProperty]
      }
    | FieldAggregator<Source>
    | FieldSelector<Source>
    | Schema<Target[destinationProperty], Source>
}

export type FieldValue<T = any> = T | { value: T }

export enum FieldStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  PENDING = 'PENDING',
}

export enum FieldAccessorType {
  FieldEntry = 'FieldEntry',
  FieldPaths = 'FieldPaths',
  FieldFn = 'FieldFn',
  FieldSelector = 'FieldSelector',
  FieldAggregator = 'FieldAggregator',
}

export type FieldPath<Source> = string | keyof Source

export type FieldFn<D = any, S = any, R = any> = (iteratee: S, source: S[], target: D) => R

export type FieldAggregator<T extends unknown = unknown> = T extends CollectionObj
  ? (keyof T)[] | string[]
  : string[]

export interface FieldSelector<
  Source extends CollectionItem<CollectionObj> = CollectionItem<CollectionObj>,
> {
  path: FieldPath<Source> | FieldAggregator<Source>
  validators?: ValidatorFn | ValidatorFn[]
  transform?: (value: any, source?: Source) => any
}

/**
 * @description
 * Defines the map of errors returned from failed validation checks.
 */
export type ValidationErrors = {
  [key: string]: any
}
// was `ValidateError`
export interface ValidationError {
  message?: string
  fieldValue?: Value
  field?: string
}

/**
 * @description
 * A function that receives an input and synchronously returns a map of
 * validation errors if present, otherwise null.
 */
export interface ValidatorFn<V = any> {
  (input: FieldValue<V>, errorsFn?: (errors: ValidationError[]) => void): ValidationErrors | null
}
// type ValidateFunc = (data: FieldRuleValue, doIt: (errors: ValidationError[]) => void) => void

export type GenericValidatorFn = (
  input: FieldValue,
  errorsFn?: (errors: ValidationError[]) => void,
) => any

/**
 * @description
 * A function that receives an input and returns a Promise that emits
 * validation errors if present, otherwise null.
 */
export interface AsyncValidatorFn<V = any> {
  (input: FieldValue<V>): Promise<ValidationErrors | null>
}
