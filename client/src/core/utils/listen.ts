import { EventHandler } from "../contracts";

export function listen<K extends keyof HTMLElementEventMap>(
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
