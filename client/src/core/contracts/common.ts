import React from 'react'

export type Constructor = new (...args: any[]) => any
export type Func = (...args: any[]) => any

export type Primitive = string | boolean | number | symbol | null | undefined

export type LiteralToPrimitive<T extends any> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T

export type CollectionObj<T> = Record<string, T>
export type CollectionArray<T> = CollectionObj<T>[]
export type Collection<T> = CollectionObj<T> | CollectionArray<T>

export interface ComponentProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  className?: string
  children?: React.ReactNode
  id?: string
  theme?: Record<string, any>
}

export interface BsPrefixAndClassNameOnlyProps {
  className?: string
}

export interface DynamicComponentProps<As extends React.ElementType = React.ElementType>
  extends BsPrefixAndClassNameOnlyProps {
  as?: As
  theme?: Record<string, any>
}

export type DynamicComponentPropsWithChildren<
  As extends React.ElementType = React.ElementType
> = React.PropsWithChildren<DynamicComponentProps<As>>
// ComponentPropsWithRef<T extends ElementType>
