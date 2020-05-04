import { hyphenate, isHTMLElement, isNil, typeOf } from './common';

/**
 * Source: https://github.com/react-bootstrap/dom-helpers
 */

const supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;

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
  | 'skewX';

export default function isTransform(value: string): value is TransformValue {
  return !!(value && supportedTransforms.test(value));
}

function owner(node?: Element): Window {
  const doc = (node && node.ownerDocument) || document;
  return (doc && doc.defaultView) || window;
}

function getComputedStyle(node: HTMLElement, psuedoElement?: string) {
  return owner(node).getComputedStyle(node, psuedoElement);
}

export type PropertyMap = Record<string, string | number>;
export type Property = string | PropertyMap;

export function styles(node: HTMLElement | Property, property?: Property) {
  const transforms: string[] = [];

  if (!isHTMLElement(node) && typeOf(node) === 'object' && !property) {
    return Object.entries(node as PropertyMap).reduce((css, [prop, value]) => (css += `${prop}: ${value};`), '');
  }

  if (isHTMLElement(node) && typeof property === 'string') {
    return (
      node.style.getPropertyValue(hyphenate(property)) ||
      getComputedStyle(node).getPropertyValue(hyphenate(property))
    );
  }

  const cssText = Object.entries(property).reduce((css, [key, value], i: number) => {
    const propKey = isTransform(key as string) ? key : hyphenate(key)
    if (isNil(value)) {
      (node as HTMLElement).style.removeProperty(propKey);
    } else if (isTransform(key as string)) {
      transforms.push(`${key}(${value})`);
    }
    if (i === Object.entries(property).length - 1 && transforms.length) {
      return css += `transform: ${transforms.join(' ')};`;
    } 
    return css += `${hyphenate(key)}: ${value};`;
  }, '');

  (node as HTMLElement).style.cssText += cssText;
}
