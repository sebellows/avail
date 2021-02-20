/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ComponentProps,
  ComponentType,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react'
import { motion, MotionProps } from 'framer-motion'
import { styles } from './dom'
import { listen } from './listen'

/**
 * Utility to create a type-safe motion.custom
 * @see {@link https://github.com/framer/motion/issues/290#issuecomment-532228205}
 *
 * @example
 * const AnimatedBox = animated(Box)
 */
type OmitMotionProps<Props> = Omit<Props, keyof MotionProps>
export function animated<Props = {}>(Component: ComponentType<Props>) {
  return (motion.custom(Component) as unknown) as ForwardRefExoticComponent<
    MotionProps &
      RefAttributes<Element> &
      OmitMotionProps<ComponentProps<typeof Component>> & {
        children: ReactNode
      }
  >
}

// Fade in over 2000 ms = 2 seconds.
const FADE_DURATION = 1.0 * 1000

// Function to render current frame (whatever frame that may be)
function render(el: HTMLElement, currTime: number, duration: number) {
  // How opaque should el be? Its fade started at `currTime=0`.
  // Over FADE_DURATION ms, opacity goes from 0 to 1
  el.style.opacity = `${currTime / duration}`
}

function parseDuration(el: HTMLElement) {
  const str = styles(el, 'transitionDuration') || ''

  const mult = str.indexOf('ms') === -1 ? 1000 : 1
  return parseFloat(str) * mult
}

function triggerTransitionEnd(element: HTMLElement) {
  const evt = document.createEvent('HTMLEvents')
  evt.initEvent('transitionend', true, true)
  element.dispatchEvent(evt)
}

function emulateTransitionEnd(element: HTMLElement, duration: number, padding = 5) {
  let called = false

  const handle = setTimeout(() => {
    if (!called) triggerTransitionEnd(element)
  }, duration + padding)

  const remove = listen(
    element,
    'transitionend',
    () => {
      called = true
    },
    { once: true },
  )

  return () => {
    clearTimeout(handle)
    remove()
  }
}

export const onAnimationEnd = (el: HTMLElement, fn: Function): void => {
  const events = ['webkitAnimationEnd', 'animationend']

  const handler = (event: any) => {
    fn()
    events.forEach((eventName) => {
      el.removeEventListener(eventName, handler, false)
    })
  }

  if (el && el.addEventListener) {
    events.forEach((eventName) => {
      el.addEventListener(eventName, handler, false)
    })
  }
}

export function onTransitionEnd(
  el: HTMLElement,
  handler: Avail.Listener,
  duration?: number | null,
  padding?: number,
) {
  if (duration == null) duration = parseDuration(el) || 0
  const removeEmulate = emulateTransitionEnd(el, duration, padding)

  const remove = listen(el, 'transitionend', handler)

  return () => {
    removeEmulate()
    remove()
  }
}

async function nextFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve)
  })
}

export async function fadeIn(el: HTMLElement, duration = FADE_DURATION) {
  const startTime = new Date().getTime()
  let currentTime = () => new Date().getTime() - startTime

  while (currentTime() < duration) {
    await nextFrame()
    el.style.opacity = `${currentTime() / duration}`
  }
}
