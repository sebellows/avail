import { Primitive, ValueOf } from 'type-fest'

export type Constructor<T = any> = new (args: any) => T
export type Func = (...args: any[]) => any

export type valueof<T> = T[keyof T]

export type Config = { [key: string]: any }

export type NumberProp = number | string

export type LiteralToPrimitive<T extends any> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T

export type Booleanish = boolean | 'true' | 'false'

/** Avoid type "any object" */
export type ObjectType<T = unknown> = Record<string, T>
export type CollectionObj<T = unknown> = Record<string, T>
export type Collection<T = any> = CollectionObj<T>[]
export type CollectionItem<T extends Record<string, unknown>> = T
export type CollectionIter<Item = CollectionItem<ObjectType>, V = any> = (
  v: ValueOf<Item>,
  i?: number,
  o?: Item,
) => V

/**
 * Get function or non-function properties from defined types.
 * @see {@link https://stackoverflow.com/a/58210459}
 */
// export type FunctionPropertyNames<T> = {
//   [K in keyof T]: T[K] extends Function ? K : never
// }[keyof T]
// export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>
// export type NonFunctionPropertyNames<T> = {
//   [K in keyof T]: T[K] extends Function ? never : K
// }[keyof T]
// export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

/**
 * Replace property Target in T with Replacement
 * @example
 * type Example = Replace<{foo: string}, 'foo', number>
 */
export type Replace<T, Target extends keyof T, Replacement> = Omit<T, Target> &
  { [key in Target]: Replacement }

export type RenameKey<T, K extends keyof T, R extends PropertyKey> = {
  [P in keyof T as P extends K ? R : P]: T[P]
}

/**
 * @type {CSSObject}
 * @example
 * [
 *   {
 *     borderRadius: "0.1875rem"
 *   }, {
 *     "@media screen and (min-width: 35.9375em)": {
 *       borderRadius: "0.3125rem"
 *     }
 *   }, {
 *     "@media screen and (min-width: 61.8125em)": {
 *       borderRadius: "0.5625rem"
 *     }
 *   }
 * ]
 */
export type SimpleCSSObject<T = Primitive> = Record<string, T>
export type CSSObject<T = Primitive> = SimpleCSSObject<T> | SimpleCSSObject<SimpleCSSObject<T>>
