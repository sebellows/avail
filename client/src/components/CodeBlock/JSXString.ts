import React, { JSXElementConstructor } from 'react'
import { range } from '../../utils'

const indent = (count: number, tabSize = 2) => {
  return range(tabSize * count).reduce((acc, i) => (acc += ` `), '')
}

export function JsxString<
  P = any,
  T extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>
    | React.FunctionComponent<P>
>(component: React.ReactElement<P, T>, counter = 0, indentAmt = 2) {
  let type: any = component
  const isComponent = typeof component !== 'string'

  if (component?.type) {
    switch (typeof component.type) {
      case 'function':
        type = (component.type as JSXElementConstructor<any>)?.name
        break
      case 'object':
        type = (component.type as React.FunctionComponent<P>)?.displayName
        break
      case 'string': // a regular DOM Element
        type = component.type
        break
      default:
      //
    }
  }

  let props = component.props || {}
  let propsString = ''

  for (let key in props) {
    if (key !== 'children') {
      let propValue: any = props[key]
      let value = ''
      if (typeof propValue === 'function') {
        propValue = { [propValue.name]: propValue.toString() }
      }
      if (propValue && propValue instanceof Object) {
        value = `{${JSON.stringify(propValue).replace(/['"]+/g, '')}}`
      } else {
        value = `"${propValue}"`
      }
      propsString += ` ${key}=${value}`
    }
  }
  if (props['children']) {
    counter += 1
    let children = props['children']

    if (children !== 'string') {
      if (!Array.isArray(children)) {
        children = [children]
      }
      children = children.reduce((acc: string, child: any, i: number) => {
        let childStr = JsxString(child, counter)
        if (i !== children.length - 1) {
          childStr += `\n`
        }
        return (acc += childStr)
      }, '')
    }

    return `<${type}${propsString}>
${indent(counter)}${children}
${indent(counter - 1)}</${type}>`
  }

  return isComponent ? `${indent(counter)}<${type}${propsString} />` : type
}
