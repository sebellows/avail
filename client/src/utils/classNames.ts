import { AnyObject, Primitive } from '../types'
import { hasOwn, isNil, typeOf } from './common'

type ClassArray = (Primitive | AnyObject)[]
export type ClassValue = Primitive | AnyObject | ClassArray

export function classNames(...args: ClassValue[]): string {
  const classes: any[] = []

  for (const arg of args) {
    if (isNil(arg) || arg === '') continue

    switch (typeOf(arg)) {
      case 'string':
      case 'number':
        classes.push(arg)
        break
      case 'array':
        if ((arg as ClassArray).length) {
          const inner = classNames.apply(null, arg as ClassArray)
          if (inner) {
            classes.push(inner)
          }
        }
        break
      case 'object':
        for (const key in arg as AnyObject) {
          if (hasOwn(arg, key) && arg[key]) {
            classes.push(key)
          }
        }
        break
    }
  }

  return classes.join(' ')
}
