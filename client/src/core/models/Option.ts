import * as CONST from '../constants'
import { hyphenate, isPlainObject, typeOf } from '../utils'
import { OptionProps } from '../contracts'

export type AvailOptionType = string | [string, string] | OptionProps

export const toOption = (item: AvailOptionType) => {
  function _getValue(value: any) {
    let _value = value
    if (isPlainObject(value)) {
      // side-effect
      readOnly = value.readOnly ?? false
      _value = value.value
    }
    return hyphenate(typeof _value == 'string' ? _value : `${_value}`)
  }

  let readOnly = false

  switch (typeOf(item)) {
    case 'string':
      item = item as string
      return {
        name: item,
        value: CONST[item] ?? item,
        readOnly,
      }
    case 'array':
      return {
        name: item[0],
        value: _getValue(item[1]),
        readOnly,
      }
    case 'object':
      const { name, readOnly: optionReadOnly = false, value } = item as OptionProps
      return {
        name: (name ?? value) as string,
        value: _getValue(value),
        readOnly: optionReadOnly,
      }
    default:
      return {
        name: 'Error',
        value: 'error',
        readOnly,
      }
  }
}

// export const toOption = (item: any) => new Option(item);

const optionsFactory = (collection: AvailOptionType | AvailOptionType[]): OptionProps[] => {
  if (Array.isArray(collection) && collection.some((item: any) => item instanceof Option)) {
    return collection as OptionProps[]
  }
  if (isPlainObject(collection) || Array.isArray(collection)) {
    const items = isPlainObject(collection) ? Object.entries(collection) : collection
    return (items as string[]).map(toOption)
  }
  return [toOption(collection)]
}

export const toOptions = (...collection: any[]): OptionProps[] => {
  return collection.reduce((acc: OptionProps[], item: string | OptionProps | [string, string]) => {
    acc.push(...optionsFactory(item))
    return acc
  }, [] as OptionProps[])
}

export const isOption = (option: any): boolean =>
  isPlainObject(option) &&
  Object.keys(option).includes('name') &&
  Object.keys(option).includes('value')
