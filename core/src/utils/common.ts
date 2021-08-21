import { isNil } from './lang'

export const noop = (): void => void 0

/** Check whether an object has the property. */
export const hasOwn = (obj: unknown, key: string): boolean => {
  return (
    Object.prototype.hasOwnProperty.call(obj, key) ||
    !isNil(Object.getOwnPropertyDescriptor(obj, key))
  )
}
