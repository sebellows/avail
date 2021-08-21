import { hasOwn, isPlainObject, isPresent, noop } from '../../utils'

import {
  FieldValue,
  ValidationError,
  ValidateOption,
  FieldRuleValue,
  InternalRuleItem,
  SyncErrorType,
  Value,
  Values,
  ValidatorFn,
} from './types'

export const getFieldValue = (input: FieldValue): FieldValue =>
  isPlainObject(input) && 'value' in input ? input.value : input

export const isFieldSelector = (value: unknown): boolean => {
  return (
    (isPlainObject(value) && hasOwn(value, 'path') && hasOwn(value, 'validators')) ||
    hasOwn(value, 'transform')
  )
}

/**
 * From async-validator package
 * @see {@link }
 */

const formatRegExp = /%[sdj%]/g

export let warning: (type: string, errors: SyncErrorType[]) => void = noop

// don't print warning message when in production env or node runtime
if (
  typeof process !== 'undefined' &&
  process.env &&
  process.env.NODE_ENV !== 'production' &&
  typeof window !== 'undefined' &&
  typeof document !== 'undefined'
) {
  warning = (type, errors) => {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every((e) => typeof e === 'string')) {
        console.warn(type, errors)
      }
    }
  }
}

export function convertFieldsError(errors: ValidationError[]): Record<string, ValidationError[]> {
  if (!errors || !errors.length) return null
  const fields = {}

  errors.forEach((error) => {
    const field = error.field

    fields[field] = fields[field] || []
    fields[field].push(error)
  })

  return fields
}

export function format(template: ((...args: any[]) => string) | string, ...args: any[]): string {
  let i = 0
  const len = args.length

  if (typeof template === 'function') {
    return template(...args)
  }

  if (typeof template === 'string') {
    return template.replace(formatRegExp, (x) => {
      if (x === '%%') {
        return '%'
      }

      if (i >= len) {
        return x
      }

      switch (x) {
        case '%s':
          return String(args[i++])
        case '%d':
          return Number(args[i++]) as unknown as string

        case '%j':
          try {
            return JSON.stringify(args[i++])
          } catch (_) {
            return '[Circular]'
          }

        default:
          return x
      }
    })
  }

  return template
}

function isNativeStringType(type: string): boolean {
  return ['string', 'url', 'hex', 'email', 'date', 'pattern'].includes(type)
}

export function isEmptyFieldValue(value: Value, type?: string): boolean {
  if (value === undefined || value === null) {
    return true
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true
  }

  return false
}

function asyncParallelArray(
  arr: FieldRuleValue[],
  func: ValidatorFn<FieldRuleValue>,
  callback: (errors: ValidationError[]) => void,
) {
  const results: ValidationError[] = []
  let total = 0
  const arrLength = arr.length

  function count(errors: ValidationError[]) {
    results.push(...(errors || []))
    total++

    if (total === arrLength) {
      callback(results)
    }
  }

  arr.forEach((a) => {
    func(a, count)
  })
}

function serializeErrors(
  arr: FieldRuleValue[],
  func: ValidatorFn<FieldRuleValue>,
  callback: (errors: ValidationError[]) => void,
) {
  let index = 0
  const len = arr.length

  function next(errors: ValidationError[]) {
    if (errors && errors.length) {
      callback(errors)

      return
    }

    const currentIndex = index

    index = index + 1

    if (currentIndex < len) {
      func(arr[currentIndex], next)
    } else {
      callback([])
    }
  }

  next([])
}

export class AsyncValidationError extends Error {
  errors: ValidationError[]
  fields: Record<string, ValidationError[]>

  constructor(errors: ValidationError[], fields: Record<string, ValidationError[]>) {
    super('Async Validation Error')
    this.errors = errors
    this.fields = fields
  }
}

export function asyncMap(
  objArr: Record<string, FieldRuleValue[]>,
  option: ValidateOption,
  func: ValidatorFn<FieldRuleValue>,
  callback: (errors: ValidationError[]) => void,
  source: Values,
): Promise<Values> {
  if (option.first) {
    const pending = new Promise<Values>((resolve, reject) => {
      const next = (errors: ValidationError[]) => {
        callback(errors)

        return errors.length
          ? reject(new AsyncValidationError(errors, convertFieldsError(errors)))
          : resolve(source)
      }

      const flattenArr = Object.values(objArr)
        .map((value: FieldRuleValue[]) => (isPresent(value) ? value : []))
        .flat()

      serializeErrors(flattenArr, func, next)
    })

    pending.catch((e) => e)

    return pending
  }

  const firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || []

  const objArrKeys = Object.keys(objArr)
  const objArrLength = objArrKeys.length
  let total = 0
  const results: ValidationError[] = []
  const pending = new Promise<Values>((resolve, reject) => {
    const next = (errors: ValidationError[]) => {
      results.push(...errors)
      total++

      if (total === objArrLength) {
        callback(results)

        return results.length
          ? reject(new AsyncValidationError(results, convertFieldsError(results)))
          : resolve(source)
      }
    }

    if (!objArrKeys.length) {
      callback(results)
      resolve(source)
    }

    objArrKeys.forEach((key) => {
      const arr = objArr[key]

      if (firstFields.indexOf(key) !== -1) {
        serializeErrors(arr, func, next)
      } else {
        asyncParallelArray(arr, func, next)
      }
    })
  })

  pending.catch((e) => e)

  return pending
}

function isErrorObj(obj: ValidationError | string | (() => string)): obj is ValidationError {
  return !!(obj && (obj as ValidationError).message)
}

function getValue(value: Values, path: string[]) {
  let v = value

  for (let i = 0; i < path.length; i++) {
    if (v == undefined) {
      return v
    }

    v = v[path[i]]
  }

  return v
}

export function complementError(rule: InternalRuleItem, source: Values) {
  return (œ: ValidationError | (() => string) | string): ValidationError => {
    let fieldValue: Values

    if (rule.fullFields) {
      fieldValue = getValue(source, rule.fullFields)
    } else {
      fieldValue = source[(œ as FieldRuleValue).field || rule.fullField]
    }

    if (isErrorObj(œ)) {
      œ.field = œ.field || rule.fullField
      œ.fieldValue = fieldValue

      return œ
    }

    return {
      message: typeof œ === 'function' ? œ() : œ,
      fieldValue,
      field: (œ as unknown as ValidationError).field || rule.fullField,
    }
  }
}
