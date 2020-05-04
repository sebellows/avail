export type EventHandler<K extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  event: HTMLElementEventMap[K],
) => any;

export type Listener = (this: HTMLElement, ev: TransitionEvent) => any;
