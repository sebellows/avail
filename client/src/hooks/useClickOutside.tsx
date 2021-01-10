import { useEffect, MutableRefObject } from 'react'
import { useLatest } from './useLatest'

// const MOUSEDOWN = 'mousedown'
// const TOUCHSTART = 'touchstart'

enum HandledEvent {
  MOUSEDOWN = 'mousedown',
  TOUCHSTART = 'touchstart',
}

// type HandledEvents = [HandledEvent.MOUSEDOWN, HandledEvent.TOUCHSTART];
// type HandledEventsType = HandledEvents[number]
type PossibleEvent = {
  [key in HandledEvent]: HTMLElementEventMap[key]
}[HandledEvent]

/**
 * Allow for `event.preventDefault()`-like behavior on touch events
 * via "passive" event listeners.
 *
 * See {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners}
 */
const getOptions = (event: HandledEvent) => {
  if (event !== HandledEvent.TOUCHSTART) {
    return
  }

  /* Feature detection */
  let passiveOption: Record<string, boolean> | boolean = false

  try {
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        get: function () {
          passiveOption = { passive: false }
          return passiveOption
        },
      }),
    )
  } catch (err) {}

  return passiveOption as EventListenerOptions
}

const events: HandledEvent[] = [HandledEvent.MOUSEDOWN, HandledEvent.TOUCHSTART]

function getElementFromRef<T extends HTMLElement = HTMLElement>(
  ref: MutableRefObject<T> | T,
): T | null {
  if ('contains' in ref) return ref as T
  if ((ref as MutableRefObject<T>).current) {
    return getElementFromRef((ref as MutableRefObject<T>).current) as T
  }
  return null
}

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: MutableRefObject<T>,
  onClickOutside: (event: PossibleEvent) => void,
  disabled = false,
) {
  const onClickOutsideRef = useLatest(onClickOutside)

  useEffect(() => {
    const { current: currentClickOutsideRef } = onClickOutsideRef

    if (!currentClickOutsideRef || !ref) return

    const listener = (event: PossibleEvent) => {
      setTimeout(() => {
        const currentRef = getElementFromRef(ref)

        if (!currentRef || (currentRef as T).contains(event.target as Node)) {
          return
        }

        currentClickOutsideRef(event)
      })
    }

    events.forEach((event: HandledEvent) => {
      if (!disabled) {
        document.addEventListener(event, listener, getOptions(event))
      } else {
        document.removeEventListener(event, listener, getOptions(event))
      }
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, listener, getOptions(event))
      })
    }
  }, [disabled, onClickOutsideRef, ref])

  return onClickOutsideRef
}
