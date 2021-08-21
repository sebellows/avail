/* eslint-disable eqeqeq */
/* eslint-disable no-useless-escape */

export const isNode = (value: any): value is HTMLElement =>
  isObject(value) && (value as HTMLElement).nodeType === Node.ELEMENT_NODE

export const getNode = (el: any): Node | boolean => {
  if (isNil(el)) return false
  if (isNode(el)) {
    return el
  }
  if (isNode(el?.current)) {
    return el.current
  }
  if (isPlainObject(el)) {
    let found: Node | boolean
    for (const child in el) {
      if (!isNode(child)) continue
      found = child
    }
    return found ?? false
  }
  return false
}
