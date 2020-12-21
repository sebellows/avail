import * as CONST from '../constants'
import { hyphenate, isPlainObject, typeOf } from '../utils'

export type AvailOptionType = string | [string, string] | Avail.OptionProps

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
        label: item,
        value: CONST[item] ?? item,
        readOnly,
      }
    case 'array':
      return {
        label: item[0],
        value: _getValue(item[1]),
        readOnly,
      }
    case 'object':
      const { label, readOnly: optionReadOnly = false, value } = item as Avail.OptionProps
      return {
        label: (label ?? value) as string,
        value: _getValue(value),
        readOnly: optionReadOnly,
      }
    default:
      return {
        label: 'Error',
        value: 'error',
        readOnly,
      }
  }
}

// export const toOption = (item: any) => new Option(item);

const optionsFactory = (collection: AvailOptionType | AvailOptionType[]): Avail.OptionProps[] => {
  if (Array.isArray(collection) && collection.some((item: any) => item instanceof Option)) {
    return collection as Avail.OptionProps[]
  }
  if (isPlainObject(collection) || Array.isArray(collection)) {
    const items = isPlainObject(collection) ? Object.entries(collection) : collection
    return (items as string[]).map(toOption)
  }
  return [toOption(collection)]
}

export const toOptions = (...collection: any[]): Avail.OptionProps[] => {
  return collection.reduce(
    (acc: Avail.OptionProps[], item: string | Avail.OptionProps | [string, string]) => {
      acc.push(...optionsFactory(item))
      return acc
    },
    [] as Avail.OptionProps[],
  )
}

export const isOption = (option: any): boolean =>
  isPlainObject(option) &&
  Object.keys(option).includes('label') &&
  Object.keys(option).includes('value')
