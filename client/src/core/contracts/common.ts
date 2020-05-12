import React from 'react';

export type Constructor = new (...args: any[]) => any;
export type Func = (...args: any[]) => any;

export type Primitive = string | boolean | number | symbol | null | undefined;

export type LiteralToPrimitive<T extends any> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T;

export type CollectionObj = Record<string, any>;
export type CollectionArray = CollectionObj[];
export type Collection = CollectionObj | CollectionArray;

export interface ComponentProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  className?: string;
  children?: React.ReactNode;
}
