import { styles } from "./styles";
import { Listener } from "../contracts";
import { listen } from "./listen";

export const onAnimationEnd = (el: HTMLElement, fn: Function): void => {
  const events = ['webkitAnimationEnd', 'animationend'];

  const handler = (event: any) => {
    fn();
    events.forEach((eventName) => {
      el.removeEventListener(eventName, handler, false);
    });
  };

  if (el && el.addEventListener) {
    events.forEach((eventName) => {
      el.addEventListener(eventName, handler, false);
    });
  }
};

function parseDuration(node: HTMLElement) {
  const str = styles(node, 'transitionDuration') || '';

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

export function onTransitionEnd(
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
