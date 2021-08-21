import { noop } from './common'

const FORM_CONTROL_PROPS = [
  'autoFocus',
  'autoComplete',
  'checked',
  'cols',
  'disabled',
  'height',
  'id',
  'list',
  'max',
  'maxLength',
  'min',
  'minLength',
  'multiple',
  'name',
  'pattern',
  'placeholder',
  'readOnly',
  'required',
  'rows',
  'size',
  'step',
  'style',
  'tabIndex',
  'value',
  'width',
  'onBlur',
  'onChange',
  'onFocus',
  'onKeyDown',
  'onKeyUp',
  'aria-checked',
  'aria-describedby',
  'aria-labelledby',
]

const COMPONENT_PROPS = ['children', 'className', 'style']

type FilterFn = (
  props: string[],
  excludeProps: string[],
) => (prop: string, i?: number, arr?: string[]) => boolean

const validPropsFilter: FilterFn = (props: string[], excludeProps: string[] = []) => (
  prop: string,
): boolean => props.indexOf(prop) !== -1 && excludeProps.indexOf(prop) === -1

const invalidPropsFilter: FilterFn = (props: string[], excludeProps: string[] = []) => (
  prop: string,
): boolean => props.indexOf(prop) === -1 && excludeProps.indexOf(prop) === -1

interface PropsFilterOptions {
  include?: string[]
  exclude?: string[]
}

const propsFilter = (filterFn: FilterFn, validProps = FORM_CONTROL_PROPS) => {
  return function (
    props: Record<string, any>,
    options: PropsFilterOptions = {},
  ): Record<string, any> {
    options = { include: [], exclude: [], ...options }

    if (!props || Object.keys(props).length === 0) {
      return {}
    }

    const _validProps = [...validProps, ...options.include]
    const validatorFn = filterFn(_validProps, options.exclude)

    return Object.keys(props)
      .filter(validatorFn)
      .reduce((_props, prop) => {
        _props[prop] = props[prop]
        return _props
      }, {})
  }
}

export const validFormProps = propsFilter(validPropsFilter)
export const containerProps = propsFilter(invalidPropsFilter)
export const standardComponentProps = propsFilter(validPropsFilter, COMPONENT_PROPS)

function readOnlyPropType(handler: string, name: string) {
  return function (props: any, propName: string) {
    if (props[propName] !== undefined) {
      if (!props[handler]) {
        return new Error(
          `You have provided a \`${propName}\` prop to \`${name}\` ` +
            `without an \`${handler}\` handler prop. This will render a read-only field. ` +
            `If the field should be mutable use \`${defaultKey(propName)}\`. ` +
            `Otherwise, set \`${handler}\`.`,
        )
      }
    }
  }
}

export function uncontrolledPropTypes(controlledValues: any, displayName: string) {
  let propTypes = {}

  Object.keys(controlledValues).forEach((prop) => {
    // add default propTypes for folks that use runtime checks
    propTypes[defaultKey(prop)] = noop

    if (process.env.NODE_ENV !== 'production') {
      const handler = controlledValues[prop]
      if (typeof handler === 'string' && handler.trim().length) {
        throw new Error(
          `[Avail] Uncontrolled Prop Type - ${displayName}: the prop \`${prop}\` needs a valid handler key name in order to make it uncontrollable`,
        )
      }

      propTypes[prop] = readOnlyPropType(handler, displayName)
    }
  })

  return propTypes
}

export function isProp<P>(props: P, prop: keyof P) {
  return props[prop] !== undefined
}

export function defaultKey(key: string) {
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1)
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
export function canAcceptRef(component: any) {
  return (
    !!component &&
    (typeof component !== 'function' ||
      (component.prototype && component.prototype.isReactComponent))
  )
}
