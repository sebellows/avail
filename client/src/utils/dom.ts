import { hyphenate, isNil, isObject, isPlainObject, typeOf } from '@avail/core'

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

/**
 * Source: https://github.com/react-bootstrap/dom-helpers
 */

const supportedTransforms =
  /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i

export type TransformValue =
  | 'translate'
  | 'translateY'
  | 'translateX'
  | 'translateZ'
  | 'translate3d'
  | 'rotate'
  | 'rotateY'
  | 'rotateX'
  | 'rotateZ'
  | 'rotate3d'
  | 'scale'
  | 'scaleY'
  | 'scaleX'
  | 'scaleZ'
  | 'scale3d'
  | 'matrix'
  | 'matrix3d'
  | 'perspective'
  | 'skew'
  | 'skewY'
  | 'skewX'

export default function isTransform(value: string): value is TransformValue {
  return !!(value && supportedTransforms.test(value))
}

function owner(node?: Element): Window {
  const doc = (node && node.ownerDocument) || document
  return (doc && doc.defaultView) || window
}

function getComputedStyle(node: HTMLElement, psuedoElement?: string) {
  return owner(node).getComputedStyle(node, psuedoElement)
}

export type PropertyMap = Record<string, string | number>
export type Property = string | PropertyMap

export function styles(node: HTMLElement | Property, property?: Property) {
  const transforms: string[] = []

  if (!isNode(node) && typeOf(node) === 'object' && !property) {
    return Object.entries(node as PropertyMap).reduce(
      (css, [prop, value]) => (css += `${prop}: ${value};`),
      '',
    )
  }

  if (isNode(node) && typeof property === 'string') {
    return (
      node.style.getPropertyValue(hyphenate(property)) ||
      getComputedStyle(node).getPropertyValue(hyphenate(property))
    )
  }

  const cssText = Object.entries(property).reduce((css, [key, value], i: number) => {
    const propKey = isTransform(key as string) ? key : hyphenate(key)
    if (isNil(value)) {
      ;(node as HTMLElement).style.removeProperty(propKey)
    } else if (isTransform(key as string)) {
      transforms.push(`${key}(${value})`)
    }
    if (i === Object.entries(property).length - 1 && transforms.length) {
      return (css += `transform: ${transforms.join(' ')};`)
    }
    return (css += `${hyphenate(key)}: ${value};`)
  }, '')

  ;(node as HTMLElement).style.cssText += cssText
}

export function getElementPosition(el: Element, relativeToViewport: boolean) {
  const rect = el.getBoundingClientRect()

  let x = rect.left || 0
  let y = rect.top || 0

  if (!relativeToViewport) {
    const viewPos = getViewPosition()

    x += viewPos[0]
    y += viewPos[1]
  }

  return [x, y]
}

export function getViewPosition() {
  const { clientLeft, clientTop, scrollLeft, scrollTop } = document.documentElement

  return [
    (window.pageXOffset || scrollLeft) - (clientLeft || 0),
    (window.pageYOffset || scrollTop) - (clientTop || 0),
  ]
}

export function getViewSize() {
  const doc = document.documentElement
  return [window.innerWidth || doc.clientWidth, window.innerHeight || doc.clientHeight]
}

export function getElementSize(el: HTMLElement) {
  return [el.offsetWidth, el.offsetHeight]
}

// get pointer's X/Y coordinates relative to viewport
export function getAbsPointerPosition(event: any) {
  let x = 0
  let y = 0

  const { changedTouches, clientX, clientY } = event

  if (typeof changedTouches !== 'undefined' && changedTouches.length) {
    // touch devices
    x = changedTouches[0].clientX
    y = changedTouches[0].clientY
  } else if (typeof clientX === 'number') {
    x = clientX
    y = clientY
  }

  return { x, y }
}

// get pointer's X/Y coordinates relative to target element
export function getRelPointerPosition(event: any) {
  let { changedTouches, clientX = 0, clientY = 0, srcElement, target: evtTarget } = event
  const target = evtTarget || srcElement
  const targetRect = target.getBoundingClientRect()

  if (typeof changedTouches !== 'undefined' && changedTouches.length) {
    // touch devices
    clientX = changedTouches[0].clientX
    clientY = changedTouches[0].clientY
  }

  let x = clientX - targetRect.left || 0
  let y = clientY - targetRect.top || 0

  return { x, y }
}
