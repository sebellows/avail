import { hyphenate } from './common';

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

export type Property = string | Record<string, string | number>;

export function style(node: HTMLElement, property: Property) {
  let css = '';
  let transforms = '';

  if (typeof property === 'string') {
    return (
      node.style.getPropertyValue(hyphenate(property)) ||
      getComputedStyle(node).getPropertyValue(hyphenate(property))
    );
  }

  Object.keys(property).forEach((key: Property, i: number) => {
    const value = property[key as string];
    if (!value && value !== 0) {
      node.style.removeProperty(hyphenate(key));
    } else if (isTransform(key as string)) {
      transforms += `${key}(${value}) `;
    } else {
      css += `${hyphenate(key)}: ${value};`;
    }
  });

  if (transforms) {
    css += `transform: ${transforms};`;
  }

  node.style.cssText += `;${css}`;
}

export type EventHandler<K extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  event: HTMLElementEventMap[K],
) => any;

function listen<K extends keyof HTMLElementEventMap>(
  node: HTMLElement,
  eventName: K,
  handler: EventHandler<K>,
  options?: boolean | AddEventListenerOptions,
) {
  node.addEventListener(eventName, handler, options);
  return () => {
    node.removeEventListener(eventName, handler, options);
  };
}

export type Listener = (this: HTMLElement, ev: TransitionEvent) => any;

function parseDuration(node: HTMLElement) {
  const str = style(node, 'transitionDuration') || '';

  const mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

function triggerTransitionEnd(element: HTMLElement) {
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent('transitionend', true, true);
  element.dispatchEvent(evt);
}

function emulateTransitionEnd(
  element: HTMLElement,
  duration: number,
  padding = 5,
) {
  let called = false;

  const handle = setTimeout(() => {
    if (!called) triggerTransitionEnd(element);
  }, duration + padding);

  const remove = listen(
    element,
    'transitionend',
    () => {
      called = true;
    },
    { once: true },
  );

  return () => {
    clearTimeout(handle);
    remove();
  };
}

export function transitionEnd(
  element: HTMLElement,
  handler: Listener,
  duration?: number | null,
  padding?: number,
) {
  if (duration == null) duration = parseDuration(element) || 0;
  const removeEmulate = emulateTransitionEnd(element, duration, padding);

  const remove = listen(element, 'transitionend', handler);

  return () => {
    removeEmulate();
    remove();
  };
}
