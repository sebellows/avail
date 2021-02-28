import React from 'react'
import { ArgType as SbArgType } from '@storybook/api'

/**
 * Extend Storybook's `ArgType` interface which only defines `name`, `defaultValue`, & `description`,
 * but leaves the rest open-ended (`[key: string]: any`).
 * @see {@link https://github.com/storybookjs/storybook/blob/master/lib/api/src/index.tsx#L111}
 */
export interface ArgType extends SbArgType {
  table?: {
    type?: {
      summary?: string
      detail?: string
    }
    defaultValue?: string
  }
  control?: {
    type?: string
    [key: string]: any
  }
}

/** No operation */
export type Noop = (...args: any[]) => any

/**
 * Remove null or undefined from properties of a type
 * @see https://stackoverflow.com/a/53050575
 */
export type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> }

/**
 * Declare TypeScript Static Method From React Functional Component
 * @see https://stackoverflow.com/a/59526833
 */
export interface ComponentWithStaticMethod<TProps> extends React.FC<TProps> {
  storyName?: string
  argTypes?: { [key in keyof TProps]: any }
}
