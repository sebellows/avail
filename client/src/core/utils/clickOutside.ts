import { SyntheticEvent } from 'react';

export function handleClickOutside(
  el: Element,
  event: SyntheticEvent,
  fn: (...args: any[]) => void,
) {
  event.persist();

  if (event.target !== el && el.contains(event.target as Node)) {
    fn();
  }
}
