type EventHandler<K extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  event: HTMLElementEventMap[K],
) => any

export function listen<K extends keyof HTMLElementEventMap>(
  node: HTMLElement,
  eventName: K,
  handler: EventHandler<K>,
  options?: boolean | AddEventListenerOptions,
) {
  node.addEventListener(eventName, handler, options)
  return () => {
    node.removeEventListener(eventName, handler, options)
  }
}
